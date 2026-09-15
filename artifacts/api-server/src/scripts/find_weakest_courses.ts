import fs from "node:fs";
import path from "node:path";

function analyze() {
  const data = JSON.parse(fs.readFileSync("src/audits/courseAssessmentQualityInventory15_2_10B.json", "utf-8"));
  const courses = data.courses;
  
  // Sort by missing option feedback descending, then scenarioPct ascending
  const sorted = [...courses].sort((a, b) => {
    if (b.missingOptionFeedbackCount !== a.missingOptionFeedbackCount) {
      return b.missingOptionFeedbackCount - a.missingOptionFeedbackCount;
    }
    return a.scenarioPct - b.scenarioPct;
  });

  console.log("Top 20 courses needing remediation (missing feedback, low scenario %):");
  for (const c of sorted.slice(0, 20)) {
    console.log(`Course [${c.courseId}] ${c.courseCode}: ${c.title} (v${c.version}, pass: ${c.passingScore}%) - missingFeedback: ${c.missingOptionFeedbackCount}/${c.totalQuestions}, scenario%: ${c.scenarioPct}%`);
  }
}

analyze();
