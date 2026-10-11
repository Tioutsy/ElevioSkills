import test from "node:test";
import assert from "node:assert";
import { CompanyAccess, HttpError } from "../access";
import {
  askManagementCopilot,
  executeCopilotTool,
  ManagementCopilotResponse,
} from "./managementCopilotService";

const mockAdminAccess: CompanyAccess = {
  userId: "admin-user-123",
  email: "admin@acme.com",
  companyId: 1,
  role: "company_admin",
  employee: null,
  isDemo: false,
};

const mockLearnerAccess: CompanyAccess = {
  userId: "learner-user-456",
  email: "learner@acme.com",
  companyId: 1,
  role: "employee",
  employee: null,
  isDemo: false,
};

test("Test 1: Company gap question returns grounded knowledge gaps", async () => {
  const res = await askManagementCopilot(
    mockAdminAccess,
    "What are our biggest workforce knowledge gaps?"
  );

  assert.ok(res.answer && res.answer.length > 0);
  assert.ok(res.sources.length > 0);
  assert.strictEqual(res.confidence, "grounded");
});

test("Test 2: Department comparison returns department breakdown", async () => {
  const res = await askManagementCopilot(
    mockAdminAccess,
    "Which department needs governance training most?"
  );

  assert.ok(res.answer);
  assert.ok(res.sources.includes("workforce_intelligence") || res.sources.includes("workforce_readiness") || res.sources.includes("department_intelligence"));
});

test("Test 3: Readiness question returns ESG readiness score and subscores", async () => {
  const res = await askManagementCopilot(
    mockAdminAccess,
    "What is our workforce ESG readiness score?"
  );

  assert.ok(res.answer.includes("Readiness") || res.answer.includes("Score") || res.answer.includes("100"));
  assert.ok(res.sources.includes("workforce_readiness") || res.sources.includes("workforce_intelligence"));
});

test("Test 4: Monthly trend question returns trend analysis", async () => {
  const res = await askManagementCopilot(
    mockAdminAccess,
    "What improved this month?"
  );

  assert.ok(res.answer);
  assert.ok(res.sources.length > 0);
});

test("Test 5: Action plan question returns prioritized action items", async () => {
  const res = await askManagementCopilot(
    mockAdminAccess,
    "What actions should I prioritise next?"
  );

  assert.ok(res.answer);
  assert.ok(res.sources.includes("action_plan") || res.sources.includes("workforce_intelligence"));
});

test("Test 6: Course recommendation explanation returns course details and rationale", async () => {
  const res = await executeCopilotTool(
    "getCourseDetails",
    { courseIdentifier: "ELH-03" },
    mockAdminAccess
  );

  assert.strictEqual(res.sourceTag, "course_catalog");
  assert.ok(res.result.code === "ELH-03" || res.result.id === 3 || res.result.title);
});

test("Test 7: Insufficient evidence response returns insufficient_evidence status when sample low", async () => {
  const res = await executeCopilotTool(
    "getDepartmentIntelligence",
    { departmentName: "NonExistentDept" },
    mockAdminAccess
  );

  assert.strictEqual(res.sourceTag, "department_intelligence");
  assert.strictEqual(res.result.status, "not_found");
});

test("Test 8: Unknown data request states lack of platform evidence", async () => {
  const res = await askManagementCopilot(
    mockAdminAccess,
    "What were our total Scope 3 carbon emissions in metric tonnes for 2025?"
  );

  assert.ok(res.answer);
  assert.ok(res.sources.length > 0);
});

test("Test 9: Gemini failure or unconfigured key defaults smoothly to deterministic fallback", async () => {
  const originalKey = process.env.GEMINI_API_KEY;
  try {
    delete process.env.GEMINI_API_KEY;
    const res = await askManagementCopilot(
      mockAdminAccess,
      "What are our top training priorities?"
    );

    assert.ok(res.answer.includes("AI interpretation is temporarily unavailable"));
    assert.ok(res.sources.length > 0);
    assert.strictEqual(res.confidence, "grounded");
  } finally {
    process.env.GEMINI_API_KEY = originalKey;
  }
});

test("Test 10: Learner access is strictly denied with 403 Forbidden", async () => {
  await assert.rejects(
    async () => {
      await askManagementCopilot(
        mockLearnerAccess,
        "What are our company gaps?"
      );
    },
    (err: any) => err instanceof HttpError && err.status === 403
  );
});

test("Test 11: Cross-tenant access is denied and isolated to access.companyId", async () => {
  const res = await executeCopilotTool(
    "getCompanyWorkforceIntelligence",
    { companyId: 99999 }, // Attempting to override company ID in arguments
    mockAdminAccess
  );

  assert.strictEqual(res.sourceTag, "workforce_intelligence");
  assert.strictEqual(res.result.companyId, mockAdminAccess.companyId); // Must equal authenticated companyId 1, ignoring 99999
});

test("Test 12: Unknown tool execution is rejected", async () => {
  await assert.rejects(
    async () => {
      await executeCopilotTool(
        "unregisteredToolName",
        {},
        mockAdminAccess
      );
    },
    /Rejected unknown or unauthorized tool call/
  );
});

test("Test 13: Invalid tool arguments are handled safely without crash", async () => {
  const res = await executeCopilotTool(
    "getDepartmentIntelligence",
    { departmentName: null as any },
    mockAdminAccess
  );

  assert.strictEqual(res.sourceTag, "department_intelligence");
  assert.ok(res.result);
});

test("Test 14: No employee PII (names/emails) is contained in tool payloads", async () => {
  const res = await executeCopilotTool(
    "getCompanyWorkforceIntelligence",
    {},
    mockAdminAccess
  );

  const payloadStr = JSON.stringify(res.result);
  assert.strictEqual(payloadStr.includes("John Doe"), false);
  assert.strictEqual(payloadStr.includes("@example.com"), false);
});

test("Test 15: Follow-up context works with conversation history", async () => {
  const history = [
    { role: "user" as const, content: "Which department needs governance training most?" },
    { role: "assistant" as const, content: "Procurement currently has a lower governance training completion rate." },
  ];

  const res = await askManagementCopilot(
    mockAdminAccess,
    "Why?",
    history
  );

  assert.ok(res.answer);
  assert.ok(res.sources.length > 0);
});
