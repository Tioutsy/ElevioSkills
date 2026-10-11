import os, sys, re, json

BASE_DIR = "/Users/sharonlennon/Downloads/elevio-skills-2"
API_LIB = f"{BASE_DIR}/artifacts/api-server/src/lib"
sys.path.append(f"{BASE_DIR}/artifacts/api-server/src/scripts")
from sprint17_0A_course_data import COURSES_DATA

print("Applying Sprint 17.0A course updates...")

# 1. Update ELH-01
elh01_path = f"{API_LIB}/ensureFoundationsCourse.ts"
with open(elh01_path, "r", encoding="utf-8") as f:
    elh01_content = f.read()

# Check if Q8 already in elh01_content
if "How does preventing resource waste" not in elh01_content:
    new_q_ts = """  {
    order: 7,
    question: "How does preventing resource waste (such as energy, water, and single-use packaging) directly strengthen the commercial resilience and business performance of an organisation?",
    options: [
      "It eliminates unnecessary operating expenses, preserves operational cash flow, and enhances brand credibility with clients and partners who value responsible business practices.",
      "It forces the company to increase customer prices to fund expensive external sustainability consultants.",
      "It has no impact on business performance because environmental actions only generate accounting losses.",
      "It guarantees that the company will never experience equipment breakdowns or supply chain delays."
    ],
    correct: 0,
    correctExplanation: "Correct! Eliminating resource waste cuts recurring operational overheads, protects margins, and builds commercial trust with sustainability-conscious customers and corporate clients.",
    incorrectExplanation: "Incorrect. Waste prevention reduces operating costs and improves business performance.",
    optionFeedback: [
      "Correct. Eliminating operational waste directly lowers utilities and procurement overheads while reinforcing market trust.",
      "Incorrect. Practical resource conservation lowers operational costs rather than requiring customer price hikes.",
      "Incorrect. Multiple studies demonstrate that eco-efficiency improvements yield net financial savings.",
      "Incorrect. While sustainability improves asset care, it does not magically eliminate all mechanical failures."
    ]
  },
  {
    order: 8,
    question: "An administrative employee identifies that meeting rooms frequently have lights and monitors powered on during weekends when the office is vacant. What is the most effective and professional workplace action to address this issue?",
    options: [
      "Secretly disable the main electrical breaker for the entire floor on Friday evening.",
      "Post an anonymous complaint on social media to embarrass company management.",
      "Ignore the situation because facilities and electricity billing are outside the administrative job description.",
      "Propose a standard end-of-day checklist for meeting rooms or notify facilities to explore automated timer sensors for unoccupied spaces."
    ],
    correct: 3,
    correctExplanation: "Correct! Proposing practical closing procedures or automated controls solves root causes constructively without disrupting critical infrastructure.",
    incorrectExplanation: "Incorrect. Constructive escalation and standard operational checklists are the proper workplace response.",
    optionFeedback: [
      "Incorrect. Disabling main breakers risks disrupting critical IT servers or security systems.",
      "Incorrect. Public complaints damage workplace trust without creating internal operational solutions.",
      "Incorrect. Reporting avoidable energy waste helps the whole organisation operate more responsibly.",
      "Correct. Constructive procedural recommendations or sensors eliminate persistent standby waste safely."
    ]
  },
  {
    order: 9,
    question: "When an organisation launches a workplace sustainability initiative, how can team members most effectively build long-term sustainable habits across their department?",
    options: [
      "Publicly criticize colleagues who make mistakes while sorting waste or turning off devices.",
      "Wait for external government inspectors to mandate rules before changing any departmental routine.",
      "Integrate simple sustainability checks into standard daily handover routines, share positive results openly, and encourage constructive peer suggestions.",
      "Rely exclusively on executive management to inspect desks and monitor employee behaviour every day."
    ],
    correct: 2,
    correctExplanation: "Correct! Embedding simple sustainability actions into daily routines and fostering open peer encouragement creates enduring, self-sustaining culture.",
    incorrectExplanation: "Incorrect. Lasting change comes from integrating practical habits into daily routines with collaborative encouragement.",
    optionFeedback: [
      "Incorrect. Public shaming discourages participation and harms team morale.",
      "Incorrect. Proactive internal adoption delivers immediate operational and environmental benefits without waiting for regulatory penalties.",
      "Correct. Daily operational routines and positive peer feedback embed sustainability naturally into company culture.",
      "Incorrect. Executive policing is unsustainable; daily success depends on collective employee ownership."
    ]
  }
];"""
    # Replace closing of NEW_QUIZ
    elh01_content = re.sub(r"(\s*\}\s*\];\s*export async function ensureFoundationsCourse)", r",\n" + new_q_ts + r"\n\nexport async function ensureFoundationsCourse", elh01_content, count=1)
    # Update seed name
    elh01_content = elh01_content.replace('SEED_NAME = "sustainability-foundations-pilot-v4";', 'SEED_NAME = "sustainability-foundations-pilot-v5";')
    # Update repair check
    elh01_content = elh01_content.replace('existingQuestions.length < 7', 'existingQuestions.length < 10')
    # Update version in COURSE_META
    elh01_content = elh01_content.replace('badgeDescription: "Awarded for completing the Sustainability Foundations course and making a personal workplace commitment."', 'badgeDescription: "Awarded for completing the Sustainability Foundations course and making a personal workplace commitment.",\n  version: 2,\n  recommendedNextCourseId: 2')
    # Update coursesTable.set
    elh01_content = elh01_content.replace('badgeDescription: COURSE_META.badgeDescription,', 'badgeDescription: COURSE_META.badgeDescription,\n          version: COURSE_META.version,\n          recommendedNextCourseId: COURSE_META.recommendedNextCourseId,')
    
    with open(elh01_path, "w", encoding="utf-8") as f:
        f.write(elh01_content)
    print("  ✔ ELH-01 updated to 10 questions with v5 seed & v2 course version.")

# 2. Update ELH-02 through ELH-11
file_mapping = {
    "ELH-02": f"{API_LIB}/ensureWasteSortingCourse.ts",
    "ELH-03": f"{API_LIB}/ensureEnergyEfficiencyCourse.ts",
    "ELH-04": f"{API_LIB}/ensureWaterConservationCourse.ts",
    "ELH-05": f"{API_LIB}/ensureSustainableProcurementCourse.ts",
    "ELH-06": f"{API_LIB}/ensureGreenOfficePracticesCourse.ts",
    "ELH-07": f"{API_LIB}/ensureCarbonFootprintCourse.ts",
    "ELH-08": f"{API_LIB}/ensureBiodiversityCourse.ts",
    "ELH-09": f"{API_LIB}/ensureEsgBasicsCourse.ts",
    "ELH-10": f"{API_LIB}/ensureEnvironmentalComplianceCourse.ts",
    "ELH-11": f"{API_LIB}/ensureCircularEconomyCourse.ts"
}

for code, fpath in file_mapping.items():
    data = COURSES_DATA[code]
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Build replacement TypeScript string for NEW_QUIZ
    quiz_items = []
    for q in data["questions"]:
        options_ts = json.dumps(q["options"], indent=6)
        fb_ts = json.dumps(q["optionFeedback"], indent=6)
        item = f"""  {{
    order: {q["order"]},
    question: {json.dumps(q["question"])},
    options: {options_ts},
    correct: {q["correct"]},
    correctExplanation: {json.dumps(q["correctExplanation"])},
    incorrectExplanation: {json.dumps(q["incorrectExplanation"])},
    optionFeedback: {fb_ts}
  }}"""
        quiz_items.append(item)
        
    new_quiz_ts = "const NEW_QUIZ = [\n" + ",\n".join(quiz_items) + "\n];"
    
    # Replace NEW_QUIZ block
    content = re.sub(r"const NEW_QUIZ\s*=\s*\[.*?\];", lambda m: new_quiz_ts, content, flags=re.DOTALL)
    
    # Update repair check
    content = content.replace("existingQuizQuestions.length !== 5", "existingQuizQuestions.length !== 10")
    
    # Ensure optionFeedback is inserted in quizQuestionsTable
    content = re.sub(
        r"incorrectExplanation:\s*q\.incorrectExplanation,\s*isArchived:\s*false",
        "incorrectExplanation: q.incorrectExplanation,\n          optionFeedback: q.optionFeedback,\n          isArchived: false",
        content
    )
    
    # Update version and recommendedNextCourseId in coursesTable.update
    if "version: 2," not in content:
        content = re.sub(
            r"(recommendedNextCourseId:\s*nextCourseId,)",
            r"\1\n          version: 2,",
            content
        )
        
    # Bump seed name
    old_seed = re.search(r"SEED_NAME\s*=\s*[\"\x27]([^\"]+)[\"\x27]", content).group(1)
    new_seed = data["seedName"]
    content = content.replace(f'SEED_NAME = "{old_seed}"', f'SEED_NAME = "{new_seed}"')
    
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"  ✔ {code} updated successfully ({new_seed}).")

print("All 11 course files updated with authoritative Sprint 17.0A content!")
