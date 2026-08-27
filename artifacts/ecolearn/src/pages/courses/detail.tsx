import { Layout } from "@/components/layout/Layout";
import { useGetCourse, useCreateEnrollment, useListEnrollments } from "@workspace/api-client-react";
import { useParams, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle2, PlayCircle, FileText, Award, AlertCircle, Lock, BookOpen, Users } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@clerk/react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CourseDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { isSignedIn } = useAuth();
  const { toast } = useToast();
  
  const courseId = parseInt(id || "0", 10);
  const { data: course, isLoading } = useGetCourse(courseId, { query: { enabled: !!courseId, queryKey: ['course', courseId] } });
  const { data: enrollments } = useListEnrollments();
  
  const existingEnrollment = enrollments?.find((e: any) => e.courseId === courseId);
  const enrollMutation = useCreateEnrollment();

  const handleEnroll = () => {
    if (!isSignedIn) {
      setLocation("/sign-in");
      return;
    }

    if (existingEnrollment) {
      setLocation(`/learn/${existingEnrollment.id}`);
      return;
    }

    enrollMutation.mutate(
      { data: { courseId } },
      {
        onSuccess: (enrollment) => {
          toast({
            title: "Course Ready",
            description: "Opening course player...",
          });
          setLocation(`/learn/${enrollment.id}`);
        },
        onError: (err: any) => {
          toast({
            title: "Course Access",
            description: err?.message || "Opening your dashboard...",
          });
          setLocation("/dashboard");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold font-serif mb-4">Course not found</h1>
          <Button asChild>
            <Link href="/courses">Browse all courses</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
              <Link href="/courses">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to courses
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="outline" className="bg-background">
                  {course.categoryName || "General Sustainability"}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {course.level}
                </Badge>
                {course.includesCertificate && (
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                    <Award className="h-3 w-3 mr-1" /> Certificate Included
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-tight text-foreground">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{course.durationMinutes} Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>{course.lessons?.length || 0} Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{course.enrollmentCount || 0} Enrolled</span>
                </div>
              </div>
            </div>

            {/* Sticky Action Card */}
            <div className="bg-card border rounded-2xl shadow-xl overflow-hidden sticky top-24">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img 
                  src={course.thumbnailUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60"} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {existingEnrollment ? (
                <div className="p-6 space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full h-12 text-base font-semibold shadow-md bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
                    asChild
                  >
                    <Link href={`/learn/${existingEnrollment.id}`}>
                      <PlayCircle className="h-5 w-5" />
                      {existingEnrollment.status === "completed"
                        ? "Review Course"
                        : (existingEnrollment.progressPct ?? 0) > 0
                        ? "Continue Course"
                        : "Start Course"}
                    </Link>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    {existingEnrollment.status === "completed"
                      ? "✓ Course Completed"
                      : `${existingEnrollment.progressPct ?? 0}% completed`}
                  </p>
                </div>
              ) : (
                <div className="p-6">
                  <Button 
                    size="lg" 
                    className="w-full h-12 text-base font-semibold shadow-md"
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                  >
                    {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Corporate billing available for teams
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Learning Objectives */}
            {course.learningObjectives && course.learningObjectives.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold font-serif mb-6">What you'll learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.learningObjectives.map((obj: string, i: number) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Course Content */}
            {course.lessons && course.lessons.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold font-serif mb-6">Course Content</h2>
                <div className="mb-4 text-sm text-muted-foreground flex justify-between">
                  <span>{course.lessons.length} lessons</span>
                  <span>{course.durationMinutes} minutes total</span>
                </div>
                
                <Accordion type="single" collapsible className="w-full border rounded-xl overflow-hidden bg-card">
                  {course.lessons.map((lesson) => (
                    <AccordionItem key={lesson.id} value={`lesson-${lesson.id}`}>
                      <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
                        <div className="flex items-center gap-4 text-left">
                          {lesson.videoUrl ? <PlayCircle className="h-5 w-5 text-primary shrink-0" /> : <FileText className="h-5 w-5 text-primary shrink-0" />}
                          <div>
                            <div className="font-semibold">{lesson.title}</div>
                            <div className="text-xs text-muted-foreground font-normal mt-1">{lesson.durationMinutes} minutes</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                        {lesson.content ? lesson.content.substring(0, 150) + "..." : "Learn the core concepts and applications in this detailed lesson."}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
