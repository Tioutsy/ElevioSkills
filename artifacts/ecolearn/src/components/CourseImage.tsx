import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FALLBACK_COURSE_IMAGE, getCourseImageRecord } from "@/lib/courseImageManifest";

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
  aspectRatioClassName = "aspect-video",
  containerClassName,
  imageClassName,
  fallbackSrc = FALLBACK_COURSE_IMAGE,
  className,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If courseCode is given, cross reference with manifest for canonical image or focalPosition
  const manifestRecord = courseCode ? getCourseImageRecord(courseCode) : undefined;
  const effectiveFocal = focalPosition || manifestRecord?.focalPosition || "center";
  const primarySrc = src || manifestRecord?.imagePath || fallbackSrc;
  const finalSrc = hasError ? fallbackSrc : primarySrc;

  // Compute CSS object-position
  const objectPositionStyle: React.CSSProperties = {
    objectPosition: effectiveFocal,
    objectFit: "cover",
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
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse z-0" />
      )}

      {/* Course Image */}
      <img
        src={finalSrc}
        alt={alt || manifestRecord?.altText || "Course thumbnail"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoaded(true);
          }
        }}
        style={objectPositionStyle}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          !isLoaded && !hasError ? "opacity-0" : "opacity-100",
          imageClassName,
          className
        )}
        {...rest}
      />
    </div>
  );
};

export default CourseImage;
