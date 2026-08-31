import { db, coursesTable, lessonsTable, quizQuestionsTable, categoriesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export interface Wave2CourseDefinition {
  id: number;
  courseCode: string;
  title: string;
  description: string;
  fullDescription: string;
  categoryName: string;
  durationMinutes: number;
  priceUsd: string;
  level: "Universal Core" | "Applied Workplace Practice" | "Role Specialist" | "Management & Leadership" | "Strategic" | "Specialist";
  isFeatured: boolean;
  learningObjectives: string[];
  intendedRoles: string[];
  badgeName: string;
  badgeDescription: string;
  completionMessage: string;
  isEssentialUniversal: boolean;
  relevanceLayer: "universal_core" | "cross_sector_core" | "sector_specific" | "department_specific" | "role_specialist" | "management_leadership" | "advanced_esg_professional";
  primaryClassification: "UNIVERSAL_CORE" | "CROSS_SECTOR_CORE" | "SECTOR_SPECIFIC" | "DEPARTMENT_SPECIFIC" | "ROLE_SPECIALIST" | "MANAGEMENT_LEADERSHIP" | "ADVANCED_ESG_PROFESSIONAL";
  applicableSectors: string[];
  applicableDepartments: string[];
  applicableJobFamilies: string[];
  applicableSeniorityTiers: string[];
  primaryCompetency: string;
  lessons: Array<{
    title: string;
    durationMinutes: number;
    content: string;
  }>;
  quizQuestions: Array<{
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
    correctExplanation: string;
    incorrectExplanation: string;
  }>;
}

export const WAVE_2_COURSES: Wave2CourseDefinition[] = [
  {
    "id": 53,
    "courseCode": "ELH-38",
    "title": "Hotel Laundry & Water Stewardship",
    "description": "Master water, thermal energy, and chemical optimization in commercial hospitality laundry operations.",
    "fullDescription": "Commercial hotel laundries are among the highest consumers of water and thermal energy. This course delivers actionable engineering and housekeeping SOPs for wash cycle staging, ozone wash systems, heat recovery, and chemical dosage controls.",
    "categoryName": "Hospitality & Tourism Operations",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Applied Workplace Practice",
    "isFeatured": false,
    "learningObjectives": [
      "Analyze water and thermal energy consumption per kilogram of processed hotel linen",
      "Implement wash cycle batching and full-load staging protocols",
      "Evaluate ozone cold-water wash retrofit feasibility",
      "Manage chemical wash dilution to prevent fabric degradation and effluent toxicity"
    ],
    "intendedRoles": [
      "Laundry Manager",
      "Executive Housekeeper",
      "Laundry Attendant",
      "Chief Engineer"
    ],
    "badgeName": "Hospitality Laundry Water Steward",
    "badgeDescription": "Certified in low-water, energy-efficient commercial laundry management.",
    "completionMessage": "Congratulations! You have mastered sustainable hotel laundry operations.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_HOSPITALITY"
    ],
    "applicableDepartments": [
      "DEP_HOUSEKEEPING",
      "DEP_ENGINEERING"
    ],
    "applicableJobFamilies": [
      "JF_FRONTLINE",
      "JF_TECHNICAL",
      "JF_SUPERVISOR"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR"
    ],
    "primaryCompetency": "COMP_WATER",
    "lessons": [
      {
        "title": "1. Foundations of Hotel Laundry & Water Stewardship",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Hotel Laundry & Water Stewardship. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Hotel Laundry & Water Stewardship."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Hotel Laundry & Water Stewardship."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Hotel Laundry & Water Stewardship?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Hotel Laundry & Water Stewardship is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 54,
    "courseCode": "ELH-40",
    "title": "Resort Guest Engagement & Green Nudges",
    "description": "Design behavioral choice architecture and guest communications that drive resource conservation without sacrificing luxury.",
    "fullDescription": "Hospitality sustainability depends heavily on guest cooperation. This course teaches front office, concierge, and guest experience professionals how to craft subtle behavioral nudges, social proof messaging, and seamless eco-concierge touchpoints that delight guests while reducing water, energy, and food waste.",
    "categoryName": "Hospitality & Tourism Operations",
    "durationMinutes": 20,
    "priceUsd": "49.00",
    "level": "Applied Workplace Practice",
    "isFeatured": false,
    "learningObjectives": [
      "Apply behavioral economics principles to guest room towel and linen reuse programs",
      "Design effective point-of-decision signage for buffet food waste reduction",
      "Train front desk and concierge staff to communicate sustainability initiatives authentically",
      "Measure guest participation rates in conservation activities"
    ],
    "intendedRoles": [
      "Front Office Manager",
      "Guest Relations Officer",
      "Concierge",
      "Resort Operations Manager"
    ],
    "badgeName": "Hospitality Guest Nudge Specialist",
    "badgeDescription": "Certified in guest-facing behavioral sustainability and green communications.",
    "completionMessage": "Congratulations! You have mastered hospitality guest engagement and behavioral nudges.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_HOSPITALITY"
    ],
    "applicableDepartments": [
      "DEP_FRONT_OFFICE",
      "DEP_GUEST_EXPERIENCE"
    ],
    "applicableJobFamilies": [
      "JF_FRONTLINE",
      "JF_SUPERVISOR"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR"
    ],
    "primaryCompetency": "COMP_SOCIAL",
    "lessons": [
      {
        "title": "1. Foundations of Resort Guest Engagement & Green Nudges",
        "durationMinutes": 3,
        "content": "This introductory module establishes the core operational baseline for Resort Guest Engagement & Green Nudges. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 3,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Resort Guest Engagement & Green Nudges."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 3,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 3,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 3,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Resort Guest Engagement & Green Nudges."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 3,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Resort Guest Engagement & Green Nudges?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Resort Guest Engagement & Green Nudges is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 55,
    "courseCode": "ELH-41",
    "title": "Sustainable Event & Banquet Management",
    "description": "Plan and deliver zero-waste corporate conferences, banquets, and weddings with sustainable catering and event operations.",
    "fullDescription": "Banqueting and events represent major revenue and environmental impact centers in hospitality. This course provides event sales, banquet managers, and chefs with the tools to deliver ISO 20121-aligned sustainable conferences, eliminate single-use plastics and decor waste, minimize meal carbon intensity, and implement zero-waste food recovery.",
    "categoryName": "Hospitality & Tourism Operations",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Applied Workplace Practice",
    "isFeatured": false,
    "learningObjectives": [
      "Implement ISO 20121 event sustainability management principles for banqueting",
      "Design low-carbon, plant-forward banquet menus with guaranteed portion precision",
      "Eliminate single-use banquet decor, staging plastics, and printed collaterals",
      "Establish food surplus donation and on-site composting workflows with certified NGOs"
    ],
    "intendedRoles": [
      "Banquet Manager",
      "Events Director",
      "Executive Chef",
      "F&B Director"
    ],
    "badgeName": "Sustainable Event Specialist",
    "badgeDescription": "Certified in low-carbon, zero-waste banquet and conference execution.",
    "completionMessage": "Congratulations! You have mastered sustainable banquet and event management.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_HOSPITALITY"
    ],
    "applicableDepartments": [
      "DEP_FOOD_BEVERAGE",
      "DEP_SALES"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_CIRCULARITY",
    "lessons": [
      {
        "title": "1. Foundations of Sustainable Event & Banquet Management",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Sustainable Event & Banquet Management. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Sustainable Event & Banquet Management."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Sustainable Event & Banquet Management."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Sustainable Event & Banquet Management?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Sustainable Event & Banquet Management is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 56,
    "courseCode": "ELH-45",
    "title": "Sustainable Hospitality Sourcing & Local Purchasing",
    "description": "Establish resilient, ethical, and low-carbon local supply chains for resort food, beverages, and operating supplies.",
    "fullDescription": "Island and resort supply chains frequently depend on carbon-intensive air freight and imported goods. This course trains hospitality buyers, F&B managers, and chefs on how to establish direct farmer partnerships, audit supplier sustainability, prioritize certified sustainable seafood, and minimize supply chain carbon intensity.",
    "categoryName": "Hospitality & Tourism Operations",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Audit Tier 1 food and operating suppliers against ESG and fair-trade standards",
      "Establish direct-from-farm procurement contracts with local agricultural producers",
      "Implement Sustainable Seafood sourcing guidelines (MSC/ASC certified)",
      "Reduce packaging waste and Scope 3 transport emissions through supplier consolidation"
    ],
    "intendedRoles": [
      "Purchasing Manager",
      "F&B Cost Controller",
      "Executive Chef",
      "Financial Controller"
    ],
    "badgeName": "Hospitality Sustainable Sourcing Leader",
    "badgeDescription": "Certified in low-carbon hospitality procurement and local supplier development.",
    "completionMessage": "Congratulations! You have mastered sustainable hospitality purchasing.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_HOSPITALITY"
    ],
    "applicableDepartments": [
      "DEP_PROCUREMENT",
      "DEP_FOOD_BEVERAGE"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_PROCUREMENT",
    "lessons": [
      {
        "title": "1. Foundations of Sustainable Hospitality Sourcing & Local Purchasing",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Sustainable Hospitality Sourcing & Local Purchasing. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Sustainable Hospitality Sourcing & Local Purchasing."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Sustainable Hospitality Sourcing & Local Purchasing."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Sustainable Hospitality Sourcing & Local Purchasing?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Sustainable Hospitality Sourcing & Local Purchasing is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 57,
    "courseCode": "ELH-50",
    "title": "Sustainable Building Materials & Low-Carbon Concrete",
    "description": "Specify, evaluate, and source low-embodied carbon structural materials, timber, and blended cements for green construction.",
    "fullDescription": "Embodied carbon in building structures accounts for over 11% of global greenhouse gas emissions. This course provides property developers, structural engineers, project managers, and procurement officers with actionable methodologies to calculate upfront carbon (A1-A5), specify supplementary cementitious materials (GGBS, fly ash, pozzolans), and source certified sustainably harvested timber.",
    "categoryName": "Property & Infrastructure Decarbonization",
    "durationMinutes": 30,
    "priceUsd": "59.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Calculate upfront embodied carbon (EN 15978 Modules A1-A5) using Environmental Product Declarations (EPDs)",
      "Specify low-carbon blended concretes replacing Ordinary Portland Cement (OPC) with GGBS and calcined clays",
      "Verify Chain of Custody certifications (FSC / PEFC) for mass timber and engineered wood structures",
      "Conduct cradle-to-gate material lifecycle assessments (LCA) for major development projects"
    ],
    "intendedRoles": [
      "Project Manager",
      "Structural Engineer",
      "Architect",
      "Procurement Manager",
      "Facilities Developer"
    ],
    "badgeName": "Low-Carbon Materials Specialist",
    "badgeDescription": "Certified in embodied carbon reduction, EPD evaluation, and low-carbon cement specification.",
    "completionMessage": "Congratulations! You have mastered sustainable building materials and low-carbon concrete.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_PROPERTY",
      "SEC_CONSTRUCTION"
    ],
    "applicableDepartments": [
      "DEP_ENGINEERING",
      "DEP_FACILITIES",
      "DEP_OPERATIONS"
    ],
    "applicableJobFamilies": [
      "JF_TECHNICAL",
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_CIRCULARITY",
    "lessons": [
      {
        "title": "1. Foundations of Sustainable Building Materials & Low-Carbon Concrete",
        "durationMinutes": 5,
        "content": "This introductory module establishes the core operational baseline for Sustainable Building Materials & Low-Carbon Concrete. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 5,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Sustainable Building Materials & Low-Carbon Concrete."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 5,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 5,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 5,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Sustainable Building Materials & Low-Carbon Concrete."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 5,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Sustainable Building Materials & Low-Carbon Concrete?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Sustainable Building Materials & Low-Carbon Concrete is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 58,
    "courseCode": "ELH-51",
    "title": "Indoor Environmental Quality & Well-Being",
    "description": "Optimize indoor air quality, thermal comfort, biophilia, and acoustics to maximize employee health and productivity.",
    "fullDescription": "Employees spend over 90% of their working hours indoors. Poor ventilation and toxic off-gassing degrade cognitive function and employee well-being. This course equips facilities managers, HR leaders, and building operators with WELL and LEED-aligned strategies to control CO2 levels, eliminate VOCs, optimize daylighting, and implement acoustic comfort controls.",
    "categoryName": "Property & Infrastructure Decarbonization",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Applied Workplace Practice",
    "isFeatured": false,
    "learningObjectives": [
      "Manage indoor CO2 concentrations below 800 ppm using demand-controlled ventilation",
      "Specify zero/low-VOC paints, adhesives, and composite wood materials",
      "Implement biophilic design elements to enhance workplace cognitive function",
      "Balance indoor environmental quality (IEQ) with HVAC energy efficiency"
    ],
    "intendedRoles": [
      "Facilities Manager",
      "HR Director",
      "Office Manager",
      "HSE Officer"
    ],
    "badgeName": "Indoor Environmental Quality Specialist",
    "badgeDescription": "Certified in WELL-aligned indoor air quality, biophilic design, and occupant well-being.",
    "completionMessage": "Congratulations! You have mastered indoor environmental quality and well-being.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_PROPERTY",
      "SEC_PROF_SERVICES"
    ],
    "applicableDepartments": [
      "DEP_FACILITIES",
      "DEP_HR",
      "DEP_HSE"
    ],
    "applicableJobFamilies": [
      "JF_TECHNICAL",
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_HEALTH_SAFETY",
    "lessons": [
      {
        "title": "1. Foundations of Indoor Environmental Quality & Well-Being",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Indoor Environmental Quality & Well-Being. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Indoor Environmental Quality & Well-Being."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Indoor Environmental Quality & Well-Being."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Indoor Environmental Quality & Well-Being?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Indoor Environmental Quality & Well-Being is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 59,
    "courseCode": "ELH-59",
    "title": "Industrial Wastewater & Effluent Treatment",
    "description": "Operate and optimize on-site wastewater treatment plants (ETP), membrane bioreactors, and Zero Liquid Discharge systems.",
    "fullDescription": "Industrial manufacturing, textile dyeing, food processing, and chemical production generate complex effluent streams. This course equips plant engineers, HSE officers, and environmental technicians with practical operational SOPs to control COD/BOD, optimize chemical coagulation, maintain biological bioreactors, and implement Zero Liquid Discharge (ZLD) recycling loops.",
    "categoryName": "Manufacturing & Industrial Decarbonization",
    "durationMinutes": 30,
    "priceUsd": "59.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Monitor and control Chemical Oxygen Demand (COD), Biological Oxygen Demand (BOD), and Total Suspended Solids (TSS)",
      "Optimize coagulant (poly-aluminum chloride) and polymer dosing in dissolved air flotation (DAF) units",
      "Troubleshoot biological activated sludge and Membrane Bioreactor (MBR) operations",
      "Design closed-loop wastewater recycling systems to achieve Zero Liquid Discharge (ZLD)"
    ],
    "intendedRoles": [
      "ETP Operator",
      "Plant Environmental Engineer",
      "HSE Manager",
      "Manufacturing Operations Manager"
    ],
    "badgeName": "Industrial Wastewater Operations Specialist",
    "badgeDescription": "Certified in industrial effluent treatment plant (ETP) operation and zero-discharge water recycling.",
    "completionMessage": "Congratulations! You have mastered industrial wastewater and effluent treatment.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_MANUFACTURING",
      "SEC_AGRICULTURE"
    ],
    "applicableDepartments": [
      "DEP_ENGINEERING",
      "DEP_HSE",
      "DEP_OPERATIONS"
    ],
    "applicableJobFamilies": [
      "JF_TECHNICAL",
      "JF_SUPERVISOR",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_WATER",
    "lessons": [
      {
        "title": "1. Foundations of Industrial Wastewater & Effluent Treatment",
        "durationMinutes": 5,
        "content": "This introductory module establishes the core operational baseline for Industrial Wastewater & Effluent Treatment. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 5,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Industrial Wastewater & Effluent Treatment."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 5,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 5,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 5,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Industrial Wastewater & Effluent Treatment."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 5,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Industrial Wastewater & Effluent Treatment?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Industrial Wastewater & Effluent Treatment is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 60,
    "courseCode": "ELH-61",
    "title": "Lean Green Manufacturing: Waste Elimination",
    "description": "Integrate Kaizen, 5S, and Value Stream Mapping to eliminate industrial material waste, scrap, and energy loss.",
    "fullDescription": "Lean manufacturing and environmental sustainability are deeply complementary. This course trains plant managers, industrial engineers, and production supervisors on how to identify the '8 Environmental Wastes', construct Material Flow Cost Accounting (MFCA) models, and execute Kaizen continuous improvement blitzes that eliminate factory scrap.",
    "categoryName": "Manufacturing & Industrial Decarbonization",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Applied Workplace Practice",
    "isFeatured": false,
    "learningObjectives": [
      "Map material, water, and energy losses using Green Value Stream Mapping (GVSM)",
      "Implement Material Flow Cost Accounting (ISO 14051) to quantify hidden scrap costs",
      "Execute factory-floor 5S and Kaizen blitzes targeting chemical and packaging waste",
      "Design closed-loop scrap recycling systems within production lines"
    ],
    "intendedRoles": [
      "Plant Manager",
      "Continuous Improvement Lead",
      "Production Supervisor",
      "Process Engineer"
    ],
    "badgeName": "Lean Green Manufacturing Champion",
    "badgeDescription": "Certified in Lean-Green waste elimination and Material Flow Cost Accounting.",
    "completionMessage": "Congratulations! You have mastered Lean Green Manufacturing.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_MANUFACTURING"
    ],
    "applicableDepartments": [
      "DEP_OPERATIONS",
      "DEP_ENGINEERING",
      "DEP_QUALITY"
    ],
    "applicableJobFamilies": [
      "JF_FRONTLINE",
      "JF_SUPERVISOR",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_CIRCULARITY",
    "lessons": [
      {
        "title": "1. Foundations of Lean Green Manufacturing: Waste Elimination",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Lean Green Manufacturing: Waste Elimination. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Lean Green Manufacturing: Waste Elimination."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Lean Green Manufacturing: Waste Elimination."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Lean Green Manufacturing: Waste Elimination?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Lean Green Manufacturing: Waste Elimination is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 61,
    "courseCode": "ELH-63",
    "title": "Sustainable Packaging Design in Manufacturing",
    "description": "Design and transition to mono-material, compostable, and 100% recyclable product packaging with zero over-packaging.",
    "fullDescription": "Packaging represents a significant share of municipal plastic pollution and Scope 3 lifecycle footprint. This course equips product designers, packaging engineers, QA managers, and supply chain specialists with strategies to eliminate composite multi-layer films, specify PCR (post-consumer recycled) resins, and lightweight primary and tertiary packaging.",
    "categoryName": "Manufacturing & Industrial Decarbonization",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Eliminate multi-layer non-recyclable laminate films in favor of mono-material polyethylene (PE) or polypropylene (PP)",
      "Optimize package headspace, barrier coatings, and material thickness (lightweighting)",
      "Specify certified Post-Consumer Recycled (PCR) resin content compliant with food safety regulations",
      "Conduct packaging recyclability assessments according to Ellen MacArthur Foundation guidelines"
    ],
    "intendedRoles": [
      "Packaging Engineer",
      "R&D Manager",
      "Quality Assurance Lead",
      "Procurement Specialist"
    ],
    "badgeName": "Sustainable Packaging Engineer",
    "badgeDescription": "Certified in circular packaging design, mono-material engineering, and plastic elimination.",
    "completionMessage": "Congratulations! You have mastered sustainable packaging design.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_MANUFACTURING",
      "SEC_RETAIL"
    ],
    "applicableDepartments": [
      "DEP_OPERATIONS",
      "DEP_PROCUREMENT",
      "DEP_QUALITY"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_TECHNICAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_CIRCULARITY",
    "lessons": [
      {
        "title": "1. Foundations of Sustainable Packaging Design in Manufacturing",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Sustainable Packaging Design in Manufacturing. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Sustainable Packaging Design in Manufacturing."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Sustainable Packaging Design in Manufacturing."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Sustainable Packaging Design in Manufacturing?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Sustainable Packaging Design in Manufacturing is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 62,
    "courseCode": "ELH-67",
    "title": "Supermarket Cold Chain & Refrigeration Efficiency",
    "description": "Manage commercial refrigeration systems, eliminate high-GWP refrigerant leaks, and optimize grocery display cases.",
    "fullDescription": "Supermarket refrigeration systems account for over 50% of retail grocery electricity consumption and significant Scope 1 fugitive greenhouse gas emissions. This course trains supermarket store managers, facility engineers, and technicians on leak detection protocols, transition to natural refrigerants (CO2 / R290), night blind deployment, and suction pressure optimization.",
    "categoryName": "Retail & Commercial Trade",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Establish F-Gas compliant refrigerant leak detection and electronic monitoring protocols",
      "Evaluate natural refrigerant systems (Transcranial CO2 / R744 and Propane / R290)",
      "Implement refrigerated display cabinet retrofits (glass doors, EC fans, and night blinds)",
      "Optimize rack floating suction and condensing pressure setpoints"
    ],
    "intendedRoles": [
      "Supermarket Store Manager",
      "Refrigeration Technician",
      "Retail Facilities Engineer",
      "Operations Director"
    ],
    "badgeName": "Commercial Refrigeration Efficiency Specialist",
    "badgeDescription": "Certified in low-GWP supermarket cold chain optimization and F-Gas leak management.",
    "completionMessage": "Congratulations! You have mastered supermarket cold chain efficiency.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_RETAIL",
      "SEC_LOGISTICS"
    ],
    "applicableDepartments": [
      "DEP_OPERATIONS",
      "DEP_FACILITIES"
    ],
    "applicableJobFamilies": [
      "JF_TECHNICAL",
      "JF_SUPERVISOR",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_ENERGY",
    "lessons": [
      {
        "title": "1. Foundations of Supermarket Cold Chain & Refrigeration Efficiency",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Supermarket Cold Chain & Refrigeration Efficiency. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Supermarket Cold Chain & Refrigeration Efficiency."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Supermarket Cold Chain & Refrigeration Efficiency."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Supermarket Cold Chain & Refrigeration Efficiency?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Supermarket Cold Chain & Refrigeration Efficiency is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 63,
    "courseCode": "ELH-68",
    "title": "Retail Food Waste & Dynamic Markdown Management",
    "description": "Prevent retail perishable food waste through dynamic discounting, AI ordering precision, and charity redistribution.",
    "fullDescription": "Supermarkets and food retail outlets discard billions of dollars in fresh produce and perishables annually due to rigid sell-by dates. This course provides store managers, category merchandisers, and inventory staff with the operational tools to implement dynamic expiry markdowns, consumer app partnerships, and certified surplus food recovery.",
    "categoryName": "Retail & Commercial Trade",
    "durationMinutes": 20,
    "priceUsd": "49.00",
    "level": "Applied Workplace Practice",
    "isFeatured": false,
    "learningObjectives": [
      "Implement tiered dynamic markdown pricing protocols for nearing-expiry perishable goods",
      "Deploy surplus food redistribution apps and NGO donation logistics workflows",
      "Improve fresh produce ordering precision using historical weather and sell-through analytics",
      "Segregate retail organic waste for commercial composting and anaerobic digestion"
    ],
    "intendedRoles": [
      "Store Manager",
      "Department Head (Fresh Produce/Bakery)",
      "Inventory Controller",
      "Merchandiser"
    ],
    "badgeName": "Retail Food Waste Prevention Champion",
    "badgeDescription": "Certified in perishable inventory optimization, dynamic discounting, and surplus food redistribution.",
    "completionMessage": "Congratulations! You have mastered retail food waste management.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_RETAIL"
    ],
    "applicableDepartments": [
      "DEP_OPERATIONS",
      "DEP_SALES",
      "DEP_LOGISTICS"
    ],
    "applicableJobFamilies": [
      "JF_FRONTLINE",
      "JF_SUPERVISOR",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_CIRCULARITY",
    "lessons": [
      {
        "title": "1. Foundations of Retail Food Waste & Dynamic Markdown Management",
        "durationMinutes": 3,
        "content": "This introductory module establishes the core operational baseline for Retail Food Waste & Dynamic Markdown Management. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 3,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Retail Food Waste & Dynamic Markdown Management."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 3,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 3,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 3,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Retail Food Waste & Dynamic Markdown Management."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 3,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Retail Food Waste & Dynamic Markdown Management?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Retail Food Waste & Dynamic Markdown Management is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 64,
    "courseCode": "ELH-71",
    "title": "Eliminating Single-Use Plastics in Retail",
    "description": "Transition checkout, bakery, and produce sections to reusable, paper, and certified home-compostable alternatives.",
    "fullDescription": "Single-use retail plastics face tightening international legislation and consumer backlash. This course equips retail supervisors, store staff, and procurement officers with operational playbooks to eliminate checkout plastic bags, deploy bulk refill stations, replace plastic produce netting, and train front-line checkout cashiers.",
    "categoryName": "Retail & Commercial Trade",
    "durationMinutes": 20,
    "priceUsd": "49.00",
    "level": "Applied Workplace Practice",
    "isFeatured": false,
    "learningObjectives": [
      "Comply with national and regional bans on single-use carrier bags and disposable plastics",
      "Implement bulk dispensing and bring-your-own-container (BYOC) grocery retail stations",
      "Replace virgin plastic packaging across bakery, deli, and fresh produce departments",
      "Train checkout cashiers to encourage reusable bags and communicate sustainability policies"
    ],
    "intendedRoles": [
      "Store Supervisor",
      "Checkout Team Leader",
      "Retail Buyer",
      "Customer Service Officer"
    ],
    "badgeName": "Retail Plastic Elimination Specialist",
    "badgeDescription": "Certified in retail plastic phase-out, bulk refill operations, and circular packaging retail.",
    "completionMessage": "Congratulations! You have mastered retail plastic elimination.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_RETAIL"
    ],
    "applicableDepartments": [
      "DEP_OPERATIONS",
      "DEP_SALES",
      "DEP_PROCUREMENT"
    ],
    "applicableJobFamilies": [
      "JF_FRONTLINE",
      "JF_SUPERVISOR"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR"
    ],
    "primaryCompetency": "COMP_CIRCULARITY",
    "lessons": [
      {
        "title": "1. Foundations of Eliminating Single-Use Plastics in Retail",
        "durationMinutes": 3,
        "content": "This introductory module establishes the core operational baseline for Eliminating Single-Use Plastics in Retail. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 3,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Eliminating Single-Use Plastics in Retail."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 3,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 3,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 3,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Eliminating Single-Use Plastics in Retail."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 3,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Eliminating Single-Use Plastics in Retail?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Eliminating Single-Use Plastics in Retail is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 65,
    "courseCode": "ELH-75",
    "title": "Sustainable Lending & Green Credit Underwriting",
    "description": "Structure green loans, sustainability-linked credit facilities, and verify ESG covenants in commercial banking.",
    "fullDescription": "Commercial banks are reorienting balance sheets toward net-zero aligned lending portfolios. This course trains credit analysts, loan underwriters, relationship managers, and risk officers on how to apply LMA Green Loan Principles, structure Sustainability-Linked Loans (SLLs) with verified KPI ratchets, and prevent greenwashing in corporate lending.",
    "categoryName": "Financial Services & Green Banking",
    "durationMinutes": 30,
    "priceUsd": "59.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Apply Loan Market Association (LMA) Green Loan and Sustainability-Linked Loan Principles",
      "Structure meaningful SPTs (Sustainability Performance Targets) and interest rate margin step-down/step-up ratchets",
      "Verify Use of Proceeds and independent Second Party Opinions (SPOs)",
      "Audit annual borrower sustainability compliance reporting and penalty clauses"
    ],
    "intendedRoles": [
      "Commercial Credit Underwriter",
      "Corporate Relationship Manager",
      "Credit Risk Analyst",
      "Head of Lending"
    ],
    "badgeName": "Green Credit Underwriting Specialist",
    "badgeDescription": "Certified in green loan structuring, sustainability-linked credit covenants, and LMA principles.",
    "completionMessage": "Congratulations! You have mastered sustainable lending and green credit underwriting.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_FINANCE"
    ],
    "applicableDepartments": [
      "DEP_FINANCE",
      "DEP_RISK_COMPLIANCE"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_STRATEGY",
    "lessons": [
      {
        "title": "1. Foundations of Sustainable Lending & Green Credit Underwriting",
        "durationMinutes": 5,
        "content": "This introductory module establishes the core operational baseline for Sustainable Lending & Green Credit Underwriting. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 5,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Sustainable Lending & Green Credit Underwriting."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 5,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 5,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 5,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Sustainable Lending & Green Credit Underwriting."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 5,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Sustainable Lending & Green Credit Underwriting?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Sustainable Lending & Green Credit Underwriting is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 66,
    "courseCode": "ELH-76",
    "title": "ESG Risk Integration in Commercial Credit",
    "description": "Evaluate physical and transition climate risks, carbon asset stranding, and ESG vulnerabilities in commercial loan portfolios.",
    "fullDescription": "Climate change presents material financial risks to bank capital adequacy. This course equips credit committees, risk managers, and underwriting professionals with tools to assess borrower physical asset vulnerability to floods and sea level rise, evaluate transition carbon taxation risks, and integrate ESG scoring into probability of default (PD) calculations.",
    "categoryName": "Financial Services & Green Banking",
    "durationMinutes": 30,
    "priceUsd": "59.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Assess physical climate risk exposure (coastal flooding, extreme heat) on borrower collateral assets",
      "Model transition climate risk and carbon pricing impacts on borrower debt service coverage ratios (DSCR)",
      "Integrate ESG risk scorecards into credit rating models and Probability of Default (PD) matrices",
      "Conduct scenario analysis compliant with NGFS (Network for Greening the Financial System) frameworks"
    ],
    "intendedRoles": [
      "Credit Risk Manager",
      "Chief Risk Officer",
      "Senior Credit Analyst",
      "Portfolio Risk Lead"
    ],
    "badgeName": "ESG Credit Risk Specialist",
    "badgeDescription": "Certified in commercial loan climate stress testing, physical risk mapping, and ESG credit scoring.",
    "completionMessage": "Congratulations! You have mastered ESG risk integration in commercial credit.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_FINANCE"
    ],
    "applicableDepartments": [
      "DEP_FINANCE",
      "DEP_RISK_COMPLIANCE"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_RISK",
    "lessons": [
      {
        "title": "1. Foundations of ESG Risk Integration in Commercial Credit",
        "durationMinutes": 5,
        "content": "This introductory module establishes the core operational baseline for ESG Risk Integration in Commercial Credit. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 5,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in ESG Risk Integration in Commercial Credit."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 5,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 5,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 5,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in ESG Risk Integration in Commercial Credit."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 5,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of ESG Risk Integration in Commercial Credit?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of ESG Risk Integration in Commercial Credit is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 67,
    "courseCode": "ELH-79",
    "title": "Anti-Greenwashing in Financial Products",
    "description": "Navigate SFDR, green taxonomy disclosures, and regulatory marketing rules to prevent misleading ESG product claims.",
    "fullDescription": "Regulatory scrutiny over deceptive ESG fund and product marketing is at an all-time high. This course trains financial compliance officers, wealth managers, marketing directors, and legal advisors on how to ensure total truth in advertising, classify sustainable funds accurately under EU SFDR / local taxonomy rules, and verify ESG claims with audit-ready data.",
    "categoryName": "Financial Services & Green Banking",
    "durationMinutes": 25,
    "priceUsd": "59.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Comply with EU Sustainable Finance Disclosure Regulation (SFDR Article 6, 8, 9) requirements",
      "Verify that marketing claims match underlying portfolio investment mandates and ESG methodologies",
      "Identify high-risk greenwashing traps in naming conventions and marketing collateral",
      "Establish internal ESG compliance sign-off workflows prior to public product launches"
    ],
    "intendedRoles": [
      "Compliance Officer",
      "Legal Counsel",
      "Product Development Manager",
      "Wealth Management Director"
    ],
    "badgeName": "Anti-Greenwashing Compliance Specialist",
    "badgeDescription": "Certified in financial ESG taxonomy compliance, SFDR disclosure rules, and ethical investment marketing.",
    "completionMessage": "Congratulations! You have mastered anti-greenwashing compliance in financial products.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_FINANCE",
      "SEC_PROF_SERVICES"
    ],
    "applicableDepartments": [
      "DEP_LEGAL_COMPLIANCE",
      "DEP_FINANCE",
      "DEP_MARKETING"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_GOVERNANCE",
    "lessons": [
      {
        "title": "1. Foundations of Anti-Greenwashing in Financial Products",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Anti-Greenwashing in Financial Products. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Anti-Greenwashing in Financial Products."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Anti-Greenwashing in Financial Products."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Anti-Greenwashing in Financial Products?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Anti-Greenwashing in Financial Products is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 68,
    "courseCode": "ELH-84",
    "title": "Commercial Fleet Electrification & EV Charging",
    "description": "Plan and execute commercial fleet transitions to electric vehicles, optimize depot charging, and manage battery lifecycles.",
    "fullDescription": "Commercial delivery fleets, utility vans, and corporate shuttles are transitioning rapidly to electric mobility. This course provides fleet managers, logistics directors, and facility engineers with the technical and financial methodologies to assess Total Cost of Ownership (TCO), size smart depot charging infrastructure, manage peak electrical grid demand, and train drivers on EV operation.",
    "categoryName": "Logistics & Sustainable Fleet Operations",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Conduct Total Cost of Ownership (TCO) comparisons between diesel and commercial electric vehicles",
      "Size depot EV charging infrastructure (AC Level 2 vs DC Fast Charging) and electrical service capacity",
      "Implement smart charge management software to avoid expensive utility peak demand charges",
      "Establish EV regenerative braking driver protocols and battery health maintenance SOPs"
    ],
    "intendedRoles": [
      "Fleet Manager",
      "Logistics Operations Lead",
      "Facilities Engineer",
      "Transport Supervisor"
    ],
    "badgeName": "Commercial EV Fleet Specialist",
    "badgeDescription": "Certified in commercial fleet electrification, smart depot charging, and EV TCO modeling.",
    "completionMessage": "Congratulations! You have mastered commercial fleet electrification.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_LOGISTICS",
      "SEC_RETAIL"
    ],
    "applicableDepartments": [
      "DEP_LOGISTICS",
      "DEP_OPERATIONS",
      "DEP_FACILITIES"
    ],
    "applicableJobFamilies": [
      "JF_TECHNICAL",
      "JF_SUPERVISOR",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_ENERGY",
    "lessons": [
      {
        "title": "1. Foundations of Commercial Fleet Electrification & EV Charging",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Commercial Fleet Electrification & EV Charging. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Commercial Fleet Electrification & EV Charging."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Commercial Fleet Electrification & EV Charging."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Commercial Fleet Electrification & EV Charging?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Commercial Fleet Electrification & EV Charging is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 69,
    "courseCode": "ELH-86",
    "title": "Route Optimization & Logistics Efficiency",
    "description": "Deploy telematics, dynamic vehicle routing software, and load consolidation to minimize fleet fuel and empty miles.",
    "fullDescription": "Empty miles and congested delivery routes waste millions in fuel and drive excessive greenhouse gas emissions. This course teaches dispatchers, logistics planners, and transport managers how to utilize dynamic routing algorithms, optimize vehicle volumetric fill rates, implement off-peak delivery windows, and monitor driver telematics.",
    "categoryName": "Logistics & Sustainable Fleet Operations",
    "durationMinutes": 25,
    "priceUsd": "49.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Utilize dynamic vehicle routing and dispatch optimization software to eliminate redundant mileage",
      "Maximize vehicle cubing and payload capacity utilization to reduce total trip counts",
      "Establish night-time and off-peak delivery schedules to bypass urban traffic congestion",
      "Monitor driver telematics dashboards to identify idling, harsh acceleration, and route deviations"
    ],
    "intendedRoles": [
      "Logistics Dispatcher",
      "Transport Planner",
      "Distribution Center Manager",
      "Fleet Operations Lead"
    ],
    "badgeName": "Logistics Route Optimization Specialist",
    "badgeDescription": "Certified in telematics-driven dispatch, vehicle load consolidation, and fleet mileage reduction.",
    "completionMessage": "Congratulations! You have mastered route optimization and logistics efficiency.",
    "isEssentialUniversal": false,
    "relevanceLayer": "sector_specific",
    "primaryClassification": "SECTOR_SPECIFIC",
    "applicableSectors": [
      "SEC_LOGISTICS",
      "SEC_RETAIL",
      "SEC_MANUFACTURING"
    ],
    "applicableDepartments": [
      "DEP_LOGISTICS",
      "DEP_OPERATIONS"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_SUPERVISOR",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_ENERGY",
    "lessons": [
      {
        "title": "1. Foundations of Route Optimization & Logistics Efficiency",
        "durationMinutes": 4,
        "content": "This introductory module establishes the core operational baseline for Route Optimization & Logistics Efficiency. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 4,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Route Optimization & Logistics Efficiency."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 4,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 4,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 4,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Route Optimization & Logistics Efficiency."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 4,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Route Optimization & Logistics Efficiency?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Route Optimization & Logistics Efficiency is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 70,
    "courseCode": "ELH-95",
    "title": "Green Software Engineering & Cloud Efficiency",
    "description": "Architect energy-efficient cloud infrastructure, optimize software algorithms, and reduce digital carbon footprints.",
    "fullDescription": "Data centers and enterprise cloud computing account for over 2% of global electricity consumption. This course provides software developers, cloud architects, DevOps engineers, and IT managers with the principles of Green Software Engineering: measuring Software Carbon Intensity (SCI), rightsizing cloud compute clusters, scheduling batch workloads in low-carbon grid regions, and optimizing database queries.",
    "categoryName": "Technology & Digital Infrastructure",
    "durationMinutes": 30,
    "priceUsd": "59.00",
    "level": "Role Specialist",
    "isFeatured": false,
    "learningObjectives": [
      "Calculate Software Carbon Intensity (SCI) according to Green Software Foundation standards",
      "Right-size cloud compute instances and implement autoscaling to eliminate idle server power",
      "Architect carbon-aware workloads that shift batch computing to regions and times with high renewable grid mix",
      "Optimize database queries, asset payloads, and API caching to minimize compute cycles"
    ],
    "intendedRoles": [
      "Software Engineer",
      "Cloud Architect",
      "DevOps Lead",
      "Chief Technology Officer"
    ],
    "badgeName": "Green Software Architect",
    "badgeDescription": "Certified in Green Software Engineering, cloud carbon optimization, and carbon-aware computing.",
    "completionMessage": "Congratulations! You have mastered Green Software Engineering and cloud efficiency.",
    "isEssentialUniversal": false,
    "relevanceLayer": "role_specialist",
    "primaryClassification": "ROLE_SPECIALIST",
    "applicableSectors": [
      "SEC_ICT",
      "SEC_PROF_SERVICES"
    ],
    "applicableDepartments": [
      "DEP_ENGINEERING",
      "DEP_IT"
    ],
    "applicableJobFamilies": [
      "JF_TECHNICAL",
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER"
    ],
    "primaryCompetency": "COMP_ENERGY",
    "lessons": [
      {
        "title": "1. Foundations of Green Software Engineering & Cloud Efficiency",
        "durationMinutes": 5,
        "content": "This introductory module establishes the core operational baseline for Green Software Engineering & Cloud Efficiency. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 5,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Green Software Engineering & Cloud Efficiency."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 5,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 5,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 5,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Green Software Engineering & Cloud Efficiency."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 5,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Green Software Engineering & Cloud Efficiency?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Green Software Engineering & Cloud Efficiency is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 71,
    "courseCode": "ELH-131",
    "title": "Executive ESG Strategy & Board Oversight",
    "description": "Embed ESG into core corporate governance, manage fiduciary duties, navigate global disclosure mandates, and lead enterprise transition.",
    "fullDescription": "Corporate boards and executive committees face escalating legal, fiduciary, and investor expectations regarding climate resilience and stakeholder governance. This masterclass equips CEOs, board directors, chief executives, and corporate secretaries with frameworks to govern climate risks, align executive remuneration with ESG performance, and oversee CSRD/IFRS disclosure integrity.",
    "categoryName": "Executive Leadership & Board Governance",
    "durationMinutes": 30,
    "priceUsd": "99.00",
    "level": "Strategic",
    "isFeatured": true,
    "learningObjectives": [
      "Integrate ESG and double materiality into corporate board oversight and long-term strategy",
      "Fulfill director fiduciary duties concerning climate risk and transition planning",
      "Align executive compensation packages and long-term incentive plans (LTIP) with verified ESG targets",
      "Oversee international ESG disclosure readiness (CSRD, IFRS S1/S2, TCFD, SEC)"
    ],
    "intendedRoles": [
      "Chief Executive Officer",
      "Board Director",
      "Managing Director",
      "Corporate Secretary",
      "Executive Vice President"
    ],
    "badgeName": "Executive ESG Governance Fellow",
    "badgeDescription": "Certified in board-level ESG fiduciary oversight, corporate transition strategy, and executive governance.",
    "completionMessage": "Congratulations! You have mastered Executive ESG Strategy & Board Oversight.",
    "isEssentialUniversal": false,
    "relevanceLayer": "advanced_esg_professional",
    "primaryClassification": "ADVANCED_ESG_PROFESSIONAL",
    "applicableSectors": [],
    "applicableDepartments": [
      "DEP_EXECUTIVE",
      "DEP_LEGAL_COMPLIANCE",
      "DEP_SUSTAINABILITY"
    ],
    "applicableJobFamilies": [
      "JF_EXECUTIVE"
    ],
    "applicableSeniorityTiers": [
      "SEN_EXECUTIVE"
    ],
    "primaryCompetency": "COMP_GOVERNANCE",
    "lessons": [
      {
        "title": "1. Foundations of Executive ESG Strategy & Board Oversight",
        "durationMinutes": 5,
        "content": "This introductory module establishes the core operational baseline for Executive ESG Strategy & Board Oversight. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 5,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Executive ESG Strategy & Board Oversight."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 5,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 5,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 5,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Executive ESG Strategy & Board Oversight."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 5,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Executive ESG Strategy & Board Oversight?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Executive ESG Strategy & Board Oversight is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  },
  {
    "id": 72,
    "courseCode": "ELH-133",
    "title": "Advanced GHG Accounting: Scope 1, 2 & 3 Emissions",
    "description": "Master GHG Protocol corporate accounting across complex supply chains, calculate upstream/downstream emissions, and build audit-ready carbon inventories.",
    "fullDescription": "Robust carbon accounting is the bedrock of credible corporate net-zero commitments. This advanced course provides sustainability directors, carbon accountants, and financial controllers with master-level methodologies to calculate Scope 1 stationary and mobile combustion, Scope 2 location and market-based grid emissions, and all 15 Scope 3 value chain categories compliant with the GHG Protocol Corporate Standard.",
    "categoryName": "Advanced Sustainability & Carbon Accounting",
    "durationMinutes": 35,
    "priceUsd": "99.00",
    "level": "Specialist",
    "isFeatured": true,
    "learningObjectives": [
      "Apply GHG Protocol Corporate Accounting and Scope 3 Value Chain Standards with rigor",
      "Calculate Scope 1 direct emissions and Scope 2 dual-reporting (location-based vs market-based REC/PPA accounting)",
      "Model all 15 categories of Scope 3 emissions using hybrid activity-based and supplier-specific emission factors",
      "Construct audit-ready greenhouse gas inventories for limited and reasonable assurance audits"
    ],
    "intendedRoles": [
      "Sustainability Director",
      "Carbon Accountant",
      "ESG Controller",
      "Senior Environmental Consultant"
    ],
    "badgeName": "Master Carbon Accounting Practitioner",
    "badgeDescription": "Certified in master-level GHG Protocol Scope 1, 2, and 3 carbon accounting and inventory audit readiness.",
    "completionMessage": "Congratulations! You have mastered Advanced GHG Accounting across Scopes 1, 2, and 3.",
    "isEssentialUniversal": false,
    "relevanceLayer": "advanced_esg_professional",
    "primaryClassification": "ADVANCED_ESG_PROFESSIONAL",
    "applicableSectors": [],
    "applicableDepartments": [
      "DEP_SUSTAINABILITY",
      "DEP_FINANCE",
      "DEP_RISK_COMPLIANCE"
    ],
    "applicableJobFamilies": [
      "JF_PROFESSIONAL",
      "JF_MANAGER"
    ],
    "applicableSeniorityTiers": [
      "SEN_INDIVIDUAL",
      "SEN_SUPERVISOR",
      "SEN_MANAGER",
      "SEN_HEAD"
    ],
    "primaryCompetency": "COMP_GHG",
    "lessons": [
      {
        "title": "1. Foundations of Advanced GHG Accounting: Scope 1, 2 & 3 Emissions",
        "durationMinutes": 5,
        "content": "This introductory module establishes the core operational baseline for Advanced GHG Accounting: Scope 1, 2 & 3 Emissions. Learners will examine direct workplace applications, key regulatory standards, and essential performance benchmarks."
      },
      {
        "title": "2. Operational Standards & Technical Workflows",
        "durationMinutes": 5,
        "content": "Mastering standard operating procedures (SOPs) is critical for consistent execution. This lesson details technical controls, measurement parameters, and routine inspection protocols in Advanced GHG Accounting: Scope 1, 2 & 3 Emissions."
      },
      {
        "title": "3. Strategic Implementation & Resource Management",
        "durationMinutes": 5,
        "content": "Scaling sustainable practice requires structured workflows, capital budgeting alignment, cross-departmental coordination, and ongoing monitoring to ensure operational efficiency."
      },
      {
        "title": "4. Practical Workplace Decision Scenarios",
        "durationMinutes": 5,
        "content": "SCENARIO 1: An urgent operational conflict arises requiring a decision between rapid short-term workarounds and compliant long-term sustainable procedures. Choosing the compliant protocol prevents regulatory penalties, protects worker safety, and secures resource longevity.\\n\\nSCENARIO 2: A budget constraint threatens a critical sustainability upgrade. Developing a quantified return-on-investment model based on resource savings and risk mitigation successfully secures executive capital approval."
      },
      {
        "title": "5. Risk Mitigation & Verification Protocols",
        "durationMinutes": 5,
        "content": "Establishing robust verification and auditing routines protects organizations from compliance breaches, operational downtime, and reputation risk in Advanced GHG Accounting: Scope 1, 2 & 3 Emissions."
      },
      {
        "title": "6. Continuous Improvement & Audit Readiness",
        "durationMinutes": 5,
        "content": "Establishing continuous KPI tracking, employee feedback loops, and transparent management review cycles guarantees long-term sustainability maturity and compliance."
      }
    ],
    "quizQuestions": [
      {
        "question": "What is the primary operational objective of Advanced GHG Accounting: Scope 1, 2 & 3 Emissions?",
        "options": [
          "To establish standardized, compliant, and resource-efficient workflows that optimize operational performance and reduce environmental impact",
          "To generate unnecessary paperwork that slows down daily workplace tasks",
          "To replace all human employees with automated robots",
          "To eliminate all customer interactions permanently"
        ],
        "correctAnswerIndex": 0,
        "explanation": "The core focus of Advanced GHG Accounting: Scope 1, 2 & 3 Emissions is delivering rigorous, actionable operational efficiency and environmental compliance.",
        "correctExplanation": "Correct! The objective is rigorous operational efficiency and compliance.",
        "incorrectExplanation": "Incorrect. The focus is establishing standardized, compliant, and efficient workflows."
      },
      {
        "question": "Why are standardized operating procedures (SOPs) critical for sustainable workplace execution?",
        "options": [
          "They ensure consistent quality, reduce operational errors, and establish verifiable audit trails across shifts",
          "They prevent employees from ever taking breaks",
          "They are only created for decorative office displays",
          "They make simple tasks impossible to finish"
        ],
        "correctAnswerIndex": 0,
        "explanation": "SOPs establish clear accountability, reliable execution, and measurable benchmarks across all operating shifts.",
        "correctExplanation": "Correct! SOPs provide operational consistency and audit trails.",
        "incorrectExplanation": "Incorrect. SOPs ensure consistent quality, safety, and verifiable compliance."
      },
      {
        "question": "How should unexpected technical exceptions or process deviations be handled on the job?",
        "options": [
          "Logged immediately in the tracking register and escalated according to the defined response protocol",
          "Ignored completely hoping no one notices",
          "Concealed from team supervisors",
          "Blamed on external vendors without investigation"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Immediate logging and formal escalation prevent minor deviations from escalating into major operational failures.",
        "correctExplanation": "Correct! Formal logging and escalation ensure rapid remediation.",
        "incorrectExplanation": "Incorrect. Process deviations must be logged and escalated promptly."
      },
      {
        "question": "What is the primary commercial benefit of implementing continuous resource efficiency measures?",
        "options": [
          "Lower utility and operating costs combined with enhanced regulatory compliance and brand value",
          "Guaranteed bankruptcy within 30 days",
          "Higher municipal landfill penalty taxes",
          "Increased employee turnover"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Resource efficiency directly reduces operating expenditure while mitigating compliance and transition risks.",
        "correctExplanation": "Correct! Resource efficiency lowers costs and strengthens enterprise resilience.",
        "incorrectExplanation": "Incorrect. Efficiency lowers operating expenses and strengthens compliance."
      },
      {
        "question": "What role does accurate data collection and baseline measurement play in workplace sustainability?",
        "options": [
          "It provides verifiable evidence to track progress, identify anomalies, and support executive decision-making",
          "It is purely an aesthetic exercise with zero business value",
          "It is only performed when an inspector is standing in the building",
          "It replaces the need for actual equipment maintenance"
        ],
        "correctAnswerIndex": 0,
        "explanation": "You cannot manage what you do not measure; reliable baselines are essential for verifying performance.",
        "correctExplanation": "Correct! Accurate data provides the factual foundation for continuous improvement.",
        "incorrectExplanation": "Incorrect. Reliable data measurement is vital for tracking progress and identifying waste."
      },
      {
        "question": "How should departmental teams coordinate when managing cross-functional sustainability initiatives?",
        "options": [
          "Establish regular alignment meetings, shared KPIs, and transparent responsibility matrices",
          "Refuse to communicate with any other department",
          "Compete destructively for the same resources without coordination",
          "Send anonymous complaint letters to the executive board"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Cross-functional success requires transparent communication and shared performance accountability.",
        "correctExplanation": "Correct! Shared KPIs and transparent alignment drive cross-functional success.",
        "incorrectExplanation": "Incorrect. Collaboration requires clear communication, shared KPIs, and defined accountability."
      },
      {
        "question": "What is the risk of implementing superficial environmental claims without operational verification?",
        "options": [
          "Severe legal penalties, reputational damage, and loss of customer and investor trust (greenwashing)",
          "Automatic award of international sustainability prizes",
          "Instant elimination of corporate taxes",
          "Zero consequences under all circumstances"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Unsubstantiated green claims constitute greenwashing, inviting regulatory enforcement and brand erosion.",
        "correctExplanation": "Correct! False claims trigger severe legal and reputational greenwashing penalties.",
        "incorrectExplanation": "Incorrect. Superficial claims lead to severe greenwashing penalties and loss of stakeholder trust."
      },
      {
        "question": "How does periodic management review support continuous improvement in workplace sustainability?",
        "options": [
          "It evaluates performance trends against targets, reallocates resources, and updates SOPs based on lessons learned",
          "It allows managers to cancel all future sustainability efforts",
          "It is a legal formality with no practical purpose",
          "It ensures that no process changes are ever permitted"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Structured management reviews ensure sustainability systems adapt dynamically to changing operational realities.",
        "correctExplanation": "Correct! Management reviews drive continuous optimization and resource allocation.",
        "incorrectExplanation": "Incorrect. Regular reviews ensure goals are met and processes are continually improved."
      }
    ]
  }
];

export async function ensureWave2Catalogue(): Promise<void> {
  console.log("Seeding Wave 2 Production Catalogue (20 Courses)...");

  for (const courseDef of WAVE_2_COURSES) {
    let category = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.name, courseDef.categoryName))
      .limit(1);

    let categoryId = category[0]?.id;
    if (!categoryId) {
      const [newCat] = await db
        .insert(categoriesTable)
        .values({
          name: courseDef.categoryName,
          slug: courseDef.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description: `Courses focused on ${courseDef.categoryName}`,
        })
        .returning();
      categoryId = newCat.id;
    }

    const existing = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseCode, courseDef.courseCode))
      .limit(1);

    let courseId: number;
    if (existing.length > 0) {
      courseId = existing[0].id;
      await db
        .update(coursesTable)
        .set({
          title: courseDef.title,
          description: courseDef.description,
          fullDescription: courseDef.fullDescription,
          categoryId,
          durationMinutes: courseDef.durationMinutes,
          priceUsd: courseDef.priceUsd,
          level: courseDef.level,
          isFeatured: courseDef.isFeatured,
          learningObjectives: courseDef.learningObjectives,
          intendedRoles: courseDef.intendedRoles,
          badgeName: courseDef.badgeName,
          badgeDescription: courseDef.badgeDescription,
          completionMessage: courseDef.completionMessage,
          isEssentialUniversal: courseDef.isEssentialUniversal,
          relevanceLayer: courseDef.relevanceLayer,
          primaryClassification: courseDef.primaryClassification,
          applicableSectors: courseDef.applicableSectors,
          applicableDepartments: courseDef.applicableDepartments,
          applicableJobFamilies: courseDef.applicableJobFamilies,
          applicableSeniorityTiers: courseDef.applicableSeniorityTiers,
          primaryCompetency: courseDef.primaryCompetency,
          status: "published",
        })
        .where(eq(coursesTable.id, courseId));
    } else {
      const [newCourse] = await db
        .insert(coursesTable)
        .values({
          courseCode: courseDef.courseCode,
          title: courseDef.title,
          description: courseDef.description,
          fullDescription: courseDef.fullDescription,
          categoryId,
          durationMinutes: courseDef.durationMinutes,
          priceUsd: courseDef.priceUsd,
          level: courseDef.level,
          isFeatured: courseDef.isFeatured,
          learningObjectives: courseDef.learningObjectives,
          intendedRoles: courseDef.intendedRoles,
          badgeName: courseDef.badgeName,
          badgeDescription: courseDef.badgeDescription,
          completionMessage: courseDef.completionMessage,
          isEssentialUniversal: courseDef.isEssentialUniversal,
          relevanceLayer: courseDef.relevanceLayer,
          primaryClassification: courseDef.primaryClassification,
          applicableSectors: courseDef.applicableSectors,
          applicableDepartments: courseDef.applicableDepartments,
          applicableJobFamilies: courseDef.applicableJobFamilies,
          applicableSeniorityTiers: courseDef.applicableSeniorityTiers,
          primaryCompetency: courseDef.primaryCompetency,
          status: "published",
        })
        .returning();
      courseId = newCourse.id;
    }

    // Insert Lessons
    const existingLessons = await db
      .select()
      .from(lessonsTable)
      .where(eq(lessonsTable.courseId, courseId));

    if (existingLessons.length === 0) {
      for (let i = 0; i < courseDef.lessons.length; i++) {
        const l = courseDef.lessons[i];
        await db.insert(lessonsTable).values({
          courseId,
          title: l.title,
          content: l.content,
          durationMinutes: l.durationMinutes,
          orderIndex: i + 1,
          isFree: i === 0,
        });
      }
    }

    // Insert Quiz Questions
    const existingQuizzes = await db
      .select()
      .from(quizQuestionsTable)
      .where(eq(quizQuestionsTable.courseId, courseId));

    if (existingQuizzes.length === 0) {
      for (let i = 0; i < courseDef.quizQuestions.length; i++) {
        const q = courseDef.quizQuestions[i];
        await db.insert(quizQuestionsTable).values({
          courseId,
          question: q.question,
          options: q.options,
          correctAnswerIndex: q.correctAnswerIndex,
          explanation: q.explanation,
          correctExplanation: q.correctExplanation,
          incorrectExplanation: q.incorrectExplanation,
          orderIndex: i + 1,
        });
      }
    }
  }

  console.log("Wave 2 Production Catalogue successfully verified and seeded.");
}
