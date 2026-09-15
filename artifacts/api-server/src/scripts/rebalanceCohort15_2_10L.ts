import fs from "node:fs";
import path from "node:path";
import { COHORT_15_2_10L_GROUP_L1_PART1_DATA } from "../lib/cohort15_2_10l_group_l1_part1.js";
import { COHORT_15_2_10L_GROUP_L1_PART2_DATA } from "../lib/cohort15_2_10l_group_l1_part2.js";
import { COHORT_15_2_10L_GROUP_L2_DATA } from "../lib/cohort15_2_10l_group_l2_data.js";
import type { CohortCourseRemediationData } from "../lib/cohort15_2_10l_group_l1_part1.js";

function balanceCourse(course: CohortCourseRemediationData): CohortCourseRemediationData {
  const is8Q = course.questions.length === 8;
  const targetPattern = is8Q
    ? [0, 1, 2, 3, 0, 1, 2, 3]
    : [0, 1, 2, 3, 0, 1, 2, 3, 1, 2];

  const balancedQuestions = course.questions.map((q, idx) => {
    const target = targetPattern[idx];
    const current = q.correct;
    if (current === target) {
      return { ...q };
    }

    const newOptions = [...q.options];
    const newFeedback = [...q.optionFeedback];

    // Swap current and target positions
    const tempOpt = newOptions[target];
    newOptions[target] = newOptions[current];
    newOptions[current] = tempOpt;

    const tempFb = newFeedback[target];
    newFeedback[target] = newFeedback[current];
    newFeedback[current] = tempFb;

    return {
      ...q,
      options: newOptions,
      optionFeedback: newFeedback,
      correct: target
    };
  });

  return {
    ...course,
    questions: balancedQuestions
  };
}

function writeModule(filePath: string, exportName: string, data: CohortCourseRemediationData[]) {
  const balanced = data.map(balanceCourse);
  const tsContent = `import { CohortCourseRemediationData } from "./cohort15_2_10l_group_l1_part1";

export const ${exportName}: CohortCourseRemediationData[] = ${JSON.stringify(balanced, null, 2)};
`;
  fs.writeFileSync(filePath, tsContent, "utf-8");
  console.log(`Updated and balanced: ${filePath}`);
}

async function main() {
  const p1File = path.resolve("src/lib/cohort15_2_10l_group_l1_part1.ts");
  const p2File = path.resolve("src/lib/cohort15_2_10l_group_l1_part2.ts");
  const l2File = path.resolve("src/lib/cohort15_2_10l_group_l2_data.ts");

  // For Part 1, we also need to keep the type definitions at top
  const balancedP1 = COHORT_15_2_10L_GROUP_L1_PART1_DATA.map(balanceCourse);
  const p1TsContent = `export interface CohortQuestionDefinition {
  order: number;
  question: string;
  options: string[];
  correct: number;
  correctExplanation: string;
  incorrectExplanation: string;
  optionFeedback: string[];
  competencyArea?: string;
}

export interface CohortCourseRemediationData {
  courseId: number;
  courseCode: string;
  title: string;
  passingScore: number;
  questions: CohortQuestionDefinition[];
}

export const COHORT_15_2_10L_GROUP_L1_PART1_DATA: CohortCourseRemediationData[] = ${JSON.stringify(balancedP1, null, 2)};
`;
  fs.writeFileSync(p1File, p1TsContent, "utf-8");
  console.log(`Updated and balanced: ${p1File}`);

  writeModule(p2File, "COHORT_15_2_10L_GROUP_L1_PART2_DATA", COHORT_15_2_10L_GROUP_L1_PART2_DATA);
  writeModule(l2File, "COHORT_15_2_10L_GROUP_L2_DATA", COHORT_15_2_10L_GROUP_L2_DATA);

  console.log("All 16 courses successfully balanced with exact target answer patterns!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
