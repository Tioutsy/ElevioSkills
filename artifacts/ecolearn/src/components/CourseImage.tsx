import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FALLBACK_COURSE_IMAGE, getCourseImageRecord } from "@/lib/courseImageManifest";
import { BookOpen } from "lucide-react";

export interface CourseImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  alt: string;
  courseCode?: string;
  focalPosition?: string;
  priority?: boolean;
  aspectRatioClassName?: string;
  containerClassName?: string;
  imageClassName?: string;
  fallbackSrc?: string;
}

export const CourseImage: React.FC<CourseImageProps> = ({
  src,
  alt,
  courseCode,
  focalPosition,
  priority = false,
  loading,
  aspectRatioClassName = "aspect-video",
  containerClassName,
  imageClassName,
  fallbackSrc = FALLBACK_COURSE_IMAGE,
  className,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cross reference with manifest for canonical image or focalPosition if courseCode is provided
  const manifestRecord = courseCode ? getCourseImageRecord(courseCode) : undefined;
  const effectiveFocal = focalPosition || manifestRecord?.focalPosition || "center";
  const primarySrc = src || manifestRecord?.imagePath || fallbackSrc;
  const finalSrc = hasError ? fallbackSrc : primarySrc;

  // Determine eager vs lazy
  const effectiveLoading = loading || (priority ? "eager" : "lazy");

  // Compute CSS object-position
  const objectPositionStyle: React.CSSProperties = {
    objectPosition: effectiveFocal,
    objectFit: "cover",
  };

  const handleImageError = () => {
    if (!hasError) {
      // Primary image failed -> attempt fallback once
      setHasError(true);
      setIsLoaded(false);
    } else {
      // Fallback ALSO failed -> terminate attempts and switch to non-image UI placeholder
      setFallbackFailed(true);
      setIsLoaded(true);
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/60 select-none",
        aspectRatioClassName,
        containerClassName
      )}
      style={{ aspectRatio: "16 / 9" }}
    >
      {/* Loading Skeleton / Placeholder */}
      {!isLoaded && !fallbackFailed && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse z-0" 
          aria-hidden="true"
        />
      )}

      {/* Non-image ultimate fallback when both primary & fallback image fail */}
      {fallbackFailed ? (
        <div 
          className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-slate-200 text-center"
          role="img"
          aria-label={alt || manifestRecord?.altText || "ELEVIO Skills Course"}
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 mb-2 border border-emerald-500/30">
            <BookOpen className="w-6 h-6" aria-hidden="true" />
          </div>
          {courseCode && (
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              {courseCode}
            </span>
          )}
          <span className="text-xs font-medium text-slate-300 mt-1 line-clamp-1 max-w-[90%]">
            {manifestRecord?.title || "ELEVIO Skills Course"}
          </span>
        </div>
      ) : (
        /* Course Image */
        <img
          src={finalSrc}
          alt={alt || manifestRecord?.altText || "Course thumbnail"}
          loading={effectiveLoading}
          decoding="async"
          {...(priority ? ({ fetchPriority: "high" } as any) : {})}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          style={objectPositionStyle}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            !isLoaded ? "opacity-0" : "opacity-100",
            imageClassName,
            className
          )}
          {...rest}
        />
      )}
    </div>
  );
};

export default CourseImage;

