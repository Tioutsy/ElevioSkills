import { useParams } from "wouter";
import DatabaseCoursePlayer from "./DatabaseCoursePlayer";

export default function Learn() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const id = parseInt(enrollmentId || "0", 10);

  return <DatabaseCoursePlayer enrollmentId={id} />;
}
