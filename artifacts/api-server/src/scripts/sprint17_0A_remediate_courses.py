import os, sys, re, json

BASE_DIR = "/Users/sharonlennon/Downloads/elevio-skills-2"
API_LIB = f"{BASE_DIR}/artifacts/api-server/src/lib"

# Load diagnostic prompts for zero-overlap verification
with open(f"{API_LIB}/diagnosticEngine.ts") as f:
    diag_prompts = set(re.findall(r"prompt:\s*[\"\x27`]([^\"]+)[\"\x27`]", f.read()))

print(f"Loaded {len(diag_prompts)} diagnostic prompts for isolation guard.")

# Course 1: ELH-01
# Preserve Q1-Q7, add Q8, Q9, Q10
ELH01_NEW_QUESTIONS = [
  {
    "order": 7,
    "question": "How does preventing resource waste (such as energy, water, and single-use packaging) directly strengthen the commercial resilience and business performance of an organisation?",
    "options": [
      "It eliminates unnecessary operating expenses, preserves operational cash flow, and enhances brand credibility with clients and partners who value responsible business practices.",
      "It forces the company to increase customer prices to fund expensive external sustainability consultants.",
      "It has no impact on business performance because environmental actions only generate accounting losses.",
      "It guarantees that the company will never experience equipment breakdowns or supply chain delays."
    ],
    "correct": 0,
    "correctExplanation": "Correct! Eliminating resource waste cuts recurring operational overheads, protects margins, and builds commercial trust with sustainability-conscious customers and corporate clients.",
    "incorrectExplanation": "Incorrect. Waste prevention reduces operating costs and improves business performance.",
    "optionFeedback": [
      "Correct. Eliminating operational waste directly lowers utilities and procurement overheads while reinforcing market trust.",
      "Incorrect. Practical resource conservation lowers operational costs rather than requiring customer price hikes.",
      "Incorrect. Multiple studies demonstrate that eco-efficiency improvements yield net financial savings.",
      "Incorrect. While sustainability improves asset care, it does not magically eliminate all mechanical failures."
    ]
  },
  {
    "order": 8,
    "question": "An administrative employee identifies that meeting rooms frequently have lights and monitors powered on during weekends when the office is vacant. What is the most effective and professional workplace action to address this issue?",
    "options": [
      "Secretly disable the main electrical breaker for the entire floor on Friday evening.",
      "Post an anonymous complaint on social media to embarrass company management.",
      "Ignore the situation because facilities and electricity billing are outside the administrative job description.",
      "Propose a standard end-of-day checklist for meeting rooms or notify facilities to explore automated timer sensors for unoccupied spaces."
    ],
    "correct": 3,
    "correctExplanation": "Correct! Proposing practical closing procedures or automated controls solves root causes constructively without disrupting critical infrastructure.",
    "incorrectExplanation": "Incorrect. Constructive escalation and standard operational checklists are the proper workplace response.",
    "optionFeedback": [
      "Incorrect. Disabling main breakers risks disrupting critical IT servers or security systems.",
      "Incorrect. Public complaints damage workplace trust without creating internal operational solutions.",
      "Incorrect. Reporting avoidable energy waste helps the whole organisation operate more responsibly.",
      "Correct. Constructive procedural recommendations or sensors eliminate persistent standby waste safely."
    ]
  },
  {
    "order": 9,
    "question": "When an organisation launches a workplace sustainability initiative, how can team members most effectively build long-term sustainable habits across their department?",
    "options": [
      "Publicly criticize colleagues who make mistakes while sorting waste or turning off devices.",
      "Wait for external government inspectors to mandate rules before changing any departmental routine.",
      "Integrate simple sustainability checks into standard daily handover routines, share positive results openly, and encourage constructive peer suggestions.",
      "Rely exclusively on executive management to inspect desks and monitor employee behaviour every day."
    ],
    "correct": 2,
    "correctExplanation": "Correct! Embedding simple sustainability actions into daily routines and fostering open peer encouragement creates enduring, self-sustaining culture.",
    "incorrectExplanation": "Incorrect. Lasting change comes from integrating practical habits into daily routines with collaborative encouragement.",
    "optionFeedback": [
      "Incorrect. Public shaming discourages participation and harms team morale.",
      "Incorrect. Proactive internal adoption delivers immediate operational and environmental benefits without waiting for regulatory penalties.",
      "Correct. Daily operational routines and positive peer feedback embed sustainability naturally into company culture.",
      "Incorrect. Executive policing is unsustainable; daily success depends on collective employee ownership."
    ]
  }
]

print("ELH01 questions defined.")
