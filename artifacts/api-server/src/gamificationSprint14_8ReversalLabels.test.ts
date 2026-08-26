/**
 * Sprint 14.8 — Reversal Label Regression Tests
 *
 * Explicit regression suite for formatScoreEventDisplay() reversal description accuracy.
 * Spec:
 *   - Unknown non-empty reversalReason  → description: "Score entry corrected"
 *   - Empty or missing reversalReason   → description: "Score adjustment"
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatScoreEventDisplay } from "./lib/scoringService.js";

describe("Sprint 14.8 — Reversal Label Regression: formatScoreEventDisplay()", () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP A: Unknown non-empty reasons → "Score entry corrected"
  // ─────────────────────────────────────────────────────────────────────────────
  describe("A. Unknown non-empty reversalReason → 'Score entry corrected'", () => {
    it("A.1 arbitrary alphanumeric unknown reason maps to 'Score entry corrected'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "Custom unknown non-empty reason X9428",
      });
      assert.equal(
        display.description,
        "Score entry corrected",
        `Expected 'Score entry corrected' but got '${display.description}'`
      );
      assert.equal(display.title, "Score Entry Corrected");
      assert.equal(display.pointsDisplay, "-100 pts");
    });

    it("A.2 single-word unrecognized reason maps to 'Score entry corrected'", () => {
      const display = formatScoreEventDisplay({
        eventType: "QUIZ_PASSED",
        points: 50,
        isReversed: true,
        reversalReason: "UNRECOGNIZED",
      });
      assert.equal(display.description, "Score entry corrected");
      assert.equal(display.title, "Score Entry Corrected");
    });

    it("A.3 reason with numeric content only maps to 'Score entry corrected'", () => {
      const display = formatScoreEventDisplay({
        eventType: "WORKPLACE_ACTION_COMPLETED",
        points: 50,
        isReversed: true,
        reversalReason: "12345",
      });
      assert.equal(display.description, "Score entry corrected");
    });

    it("A.4 reason with no known keywords maps to 'Score entry corrected' without leaking raw text", () => {
      const display = formatScoreEventDisplay({
        eventType: "CHALLENGE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "Retroactive policy change affecting Q3 batch",
      });
      assert.equal(display.description, "Score entry corrected");
      assert.ok(!display.description.includes("Retroactive"));
      assert.ok(!display.description.includes("Q3"));
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP B: Empty or missing reversalReason → "Score adjustment"
  // ─────────────────────────────────────────────────────────────────────────────
  describe("B. Empty or missing reversalReason → 'Score adjustment'", () => {
    it("B.1 null reversalReason maps to 'Score adjustment'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: null,
      });
      assert.equal(
        display.description,
        "Score adjustment",
        `Expected 'Score adjustment' but got '${display.description}'`
      );
      assert.equal(display.title, "Score Adjustment");
      assert.equal(display.pointsDisplay, "-100 pts");
    });

    it("B.2 empty string reversalReason maps to 'Score adjustment'", () => {
      const display = formatScoreEventDisplay({
        eventType: "QUIZ_PASSED",
        points: 50,
        isReversed: true,
        reversalReason: "",
      });
      assert.equal(display.description, "Score adjustment");
      assert.equal(display.title, "Score Adjustment");
    });

    it("B.3 undefined reversalReason (omitted field) maps to 'Score adjustment'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
      });
      assert.equal(display.description, "Score adjustment");
      assert.equal(display.title, "Score Adjustment");
    });

    it("B.4 whitespace-only reversalReason maps to 'Score adjustment'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "   ",
      });
      assert.equal(display.description, "Score adjustment");
      assert.equal(display.title, "Score Adjustment");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP C: Known reasons remain correctly mapped (regression guard)
  // ─────────────────────────────────────────────────────────────────────────────
  describe("C. Known reversal reasons remain correctly mapped (regression guard)", () => {
    it("C.1 'duplicate' reason → 'Duplicate award reversed'", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "Accidental duplicate submission",
      });
      assert.equal(display.description, "Duplicate award reversed");
      assert.equal(display.title, "Score Entry Corrected");
    });

    it("C.2 'challenge' reason → 'Challenge award corrected'", () => {
      const display = formatScoreEventDisplay({
        eventType: "CHALLENGE_COMPLETED",
        points: 75,
        isReversed: true,
        reversalReason: "Challenge deadline expired prior to criteria completion",
      });
      assert.equal(display.description, "Challenge award corrected");
    });

    it("C.3 'ledger/cache/reconcil' reason → 'Score cache reconciled'", () => {
      const display = formatScoreEventDisplay({
        eventType: "QUIZ_PASSED",
        points: 50,
        isReversed: true,
        reversalReason: "Ledger cache discrepancy repair",
      });
      assert.equal(display.description, "Score cache reconciled");
    });

    it("C.4 'admin/manual/correction' reason → 'Administrative score correction'", () => {
      const display = formatScoreEventDisplay({
        eventType: "WORKPLACE_ACTION_COMPLETED",
        points: 50,
        isReversed: true,
        reversalReason: "Manual operator review adjustment",
      });
      assert.equal(display.description, "Administrative score correction");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // GROUP D: Zero information leakage guarantee
  // ─────────────────────────────────────────────────────────────────────────────
  describe("D. Zero private note leakage in display output", () => {
    it("D.1 internal investigation notes are never exposed in description", () => {
      const display = formatScoreEventDisplay({
        eventType: "INTERNAL_EVT_XYZ",
        points: 25,
        isReversed: true,
        reversalReason: "Internal investigation: User triggered anomaly sensor ref#4892",
      });
      assert.ok(!display.description.includes("investigation"));
      assert.ok(!display.description.includes("sensor"));
      assert.ok(!display.description.includes("ref#4892"));
      assert.ok(!display.description.includes("INTERNAL_EVT_XYZ"));
    });

    it("D.2 operator PII or internal user IDs are never exposed in description", () => {
      const display = formatScoreEventDisplay({
        eventType: "COURSE_COMPLETED",
        points: 100,
        isReversed: true,
        reversalReason: "Flagged by admin user@internal.elevio.com employee_id=99912",
      });
      assert.ok(!display.description.includes("@internal"));
      assert.ok(!display.description.includes("employee_id"));
      assert.ok(!display.description.includes("99912"));
    });
  });
});
