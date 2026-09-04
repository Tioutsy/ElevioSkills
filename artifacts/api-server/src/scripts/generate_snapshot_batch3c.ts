import { db, coursesTable, lessonsTable, quizQuestionsTable } from '@workspace/db';
import { inArray, eq } from 'drizzle-orm';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const targets = [
  'ELH-57', 'ELH-58', 'ELH-59', 'ELH-60', 'ELH-62', 'ELH-63',
  'ELH-64', 'ELH-65', 'ELH-66', 'ELH-67', 'ELH-69', 'ELH-70',
  'ELH-74', 'ELH-75', 'ELH-76', 'ELH-77', 'ELH-78', 'ELH-79'
];

async function generatePreflightSnapshot() {
  const allCourses = await db.select().from(coursesTable);
  const targetRecords = [];
  for (const code of targets) {
    const c = allCourses.find(x => x.courseCode === code);
    if (!c) throw new Error('Missing target: ' + code);
    const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, c.id));
    const questions = await db.select().from(quizQuestionsTable).where(eq(quizQuestionsTable.courseId, c.id));
    const payload = JSON.stringify({ course: c, lessons, questions });
    const checksum = crypto.createHash('sha256').update(payload).digest('hex');
    targetRecords.push({
      id: c.id,
      courseCode: c.courseCode,
      title: c.title,
      version: c.version,
      level: c.level,
      categoryId: c.categoryId,
      lessonCount: lessons.length,
      questionCount: questions.length,
      beforeChecksum: checksum
    });
  }
  const snapshot = {
    generatedAt: new Date().toISOString(),
    totalCanonicalCourses: allCourses.length,
    v2Count: allCourses.filter(c => c.version === 2 || (c.version && c.version >= 2)).length,
    v1Count: allCourses.filter(c => !c.version || c.version === 1).length,
    batch: 'Batch 3C',
    targetCount: targetRecords.length,
    targets: targetRecords
  };
  const outPath = path.resolve(process.cwd(), 'src/lib/preRemediationSnapshotBatch3C.json');
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
  console.log('Snapshot generated successfully at:', outPath);
  console.log('V2 count:', snapshot.v2Count, 'V1 count:', snapshot.v1Count, 'Total:', snapshot.totalCanonicalCourses);
  process.exit(0);
}
generatePreflightSnapshot().catch((err) => {
  console.error(err);
  process.exit(1);
});

