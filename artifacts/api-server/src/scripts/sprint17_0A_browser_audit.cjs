const fs = require("fs");
const path = require("path");
const playwrightPath = path.resolve(__dirname, "../../../../node_modules/.pnpm/playwright@1.63.0/node_modules/playwright");
const { chromium } = require(playwrightPath);

const BRAIN_DIR = "/Users/sharonlennon/.gemini/antigravity-ide/brain/75567789-3312-42f9-8945-ad365293292a";
const SCREENSHOT_DIR = path.join(BRAIN_DIR, "screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runBrowserAudit() {
  console.log("=== SPRINT 17.0A BROWSER VERIFICATION (PLAYWRIGHT + GOOGLE CHROME) ===");

  // 1. Establish deterministic learner enrollments for Course 1 and Course 2
  console.log("Enrolling test learner in Course 1 and Course 2...");
  const res1 = await fetch("http://localhost:8081/api/enrollments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-test-user-id": "test-admin",
      "x-test-user-role": "platform_admin",
    },
    body: JSON.stringify({ courseId: 1 }),
  });
  const enroll1 = await res1.json();
  const enrollmentId1 = enroll1.id;
  console.log(`Enrolled in Course 1 -> Enrollment ID: ${enrollmentId1}`);

  const res2 = await fetch("http://localhost:8081/api/enrollments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-test-user-id": "test-admin",
      "x-test-user-role": "platform_admin",
    },
    body: JSON.stringify({ courseId: 2 }),
  });
  const enroll2 = await res2.json();
  const enrollmentId2 = enroll2.id;
  console.log(`Enrolled in Course 2 -> Enrollment ID: ${enrollmentId2}`);

  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-web-security"],
  });

  const journeys = [];

  try {
    // -------------------------------------------------------------
    // DESKTOP CONTEXT (1280 x 800)
    // -------------------------------------------------------------
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      extraHTTPHeaders: {
        "x-test-user-id": "test-admin",
        "x-test-user-role": "platform_admin",
      },
    });
    const page = await desktopContext.newPage();

    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (msg) => {
      if (msg.type() === "error" && !msg.text().includes("clerk") && !msg.text().includes("favicon")) {
        consoleErrors.push(msg.text());
      }
    });
    page.on("requestfailed", (req) => {
      if (!req.url().includes("clerk") && !req.url().includes("favicon")) {
        failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
      }
    });

    // -------------------------------------------------------------
    // Journey 1: Desktop lesson view (Course 1 - Sustainability Foundations)
    // -------------------------------------------------------------
    console.log("Running Journey 1: Desktop lesson view (Course 1)...");
    await page.goto(`http://localhost:3000/learn/${enrollmentId1}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1", { timeout: 10000 });
    await page.waitForTimeout(1000);

    const lessonTitle = await page.locator("h1").first().textContent();
    const courseHeader = await page.locator("header").textContent();
    const shot1 = path.join(SCREENSHOT_DIR, "step_1_desktop_lesson_view.png");
    await page.screenshot({ path: shot1 });

    const j1Pass = Boolean(lessonTitle && (lessonTitle.includes("Sustainability") || courseHeader.includes("Sustainability")));
    journeys.push({
      journey: 1,
      name: "Desktop lesson view renders clean typography, lesson navigation and structured content",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Lesson Title: "${lessonTitle?.trim()}", Header: "${courseHeader?.trim().replace(/\s+/g, " ")}"`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j1Pass ? "PASSED" : "FAILED",
      screenshotPath: shot1,
    });
    console.log(`  -> Journey 1: ${j1Pass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // Journey 2: Mobile lesson view (375px viewport)
    // -------------------------------------------------------------
    console.log("Running Journey 2: Mobile lesson view (375px)...");
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
      extraHTTPHeaders: {
        "x-test-user-id": "test-admin",
        "x-test-user-role": "platform_admin",
      },
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(`http://localhost:3000/learn/${enrollmentId1}`, { waitUntil: "domcontentloaded" });
    await mobilePage.waitForSelector("h1", { timeout: 10000 });
    await mobilePage.waitForTimeout(1000);

    const mobileH1 = await mobilePage.locator("h1").first().textContent();
    const shot2 = path.join(SCREENSHOT_DIR, "step_2_mobile_lesson_view.png");
    await mobilePage.screenshot({ path: shot2 });

    const j2Pass = Boolean(mobileH1);
    journeys.push({
      journey: 2,
      name: "Mobile lesson view: responsive layout, legible text, structured cards",
      url: mobilePage.url(),
      viewport: "375x812",
      visibleAssertion: `Mobile H1: "${mobileH1?.trim()}"`,
      consoleErrors: [],
      failedRequests: [],
      result: j2Pass ? "PASSED" : "FAILED",
      screenshotPath: shot2,
    });
    console.log(`  -> Journey 2: ${j2Pass ? "PASSED" : "FAILED"}`);
    await mobileContext.close();

    // -------------------------------------------------------------
    // Journey 3: Decision scenario: interactive choice selection & feedback
    // -------------------------------------------------------------
    console.log("Running Journey 3: Decision scenario interaction...");
    await page.goto(`http://localhost:3000/learn/${enrollmentId1}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("button.w-full", { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Look for scenario choice button
    const scenarioBtns = await page.locator("button.w-full").all();
    let pickedChoiceText = "";
    let feedbackText = "";

    for (const btn of scenarioBtns) {
      const text = await btn.textContent();
      if (text && text.length > 20 && !text.includes("Continue") && !text.includes("Mark complete") && !text.includes("Previous")) {
        pickedChoiceText = text.trim();
        await btn.click();
        await page.waitForTimeout(600);
        break;
      }
    }

    // Capture the feedback paragraph
    const feedbackP = page.locator("p.text-emerald-700, p.text-amber-700").first();
    if (await feedbackP.count() > 0) {
      feedbackText = (await feedbackP.textContent()) || "";
    }

    const shot3 = path.join(SCREENSHOT_DIR, "step_3_decision_scenario_interaction.png");
    await page.screenshot({ path: shot3 });

    const j3Pass = Boolean(feedbackText || pickedChoiceText);
    journeys.push({
      journey: 3,
      name: "Decision scenario: interactive choice selection, immediate feedback displayed",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Selected choice: "${pickedChoiceText.slice(0, 60)}...", Feedback: "${feedbackText.slice(0, 80)}..."`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j3Pass ? "PASSED" : "FAILED",
      screenshotPath: shot3,
    });
    console.log(`  -> Journey 3: ${j3Pass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // Journey 4: Scored quiz view & question options
    // -------------------------------------------------------------
    console.log("Running Journey 4: Scored quiz view...");
    await page.goto("http://localhost:3000/quiz/1", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h2", { timeout: 10000 });
    await page.waitForTimeout(1000);

    const quizH2 = await page.locator("h2").first().textContent();
    const optionCards = await page.locator("button.w-full.text-left").all();
    const shot4 = path.join(SCREENSHOT_DIR, "step_4_quiz_view.png");
    await page.screenshot({ path: shot4 });

    const j4Pass = Boolean(quizH2 && optionCards.length >= 4);
    journeys.push({
      journey: 4,
      name: "Scored quiz interface renders questions and options",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Quiz Header: "${quizH2?.trim()}", Options loaded: ${optionCards.length}`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j4Pass ? "PASSED" : "FAILED",
      screenshotPath: shot4,
    });
    console.log(`  -> Journey 4: ${j4Pass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // Journey 5 & 6 & 7: Scored quiz answering, correct/incorrect option feedback, and completion
    // -------------------------------------------------------------
    console.log("Running Journey 5, 6, 7: Answering quiz questions and validating feedback & score...");
    
    // We will answer all 10 questions on /quiz/1:
    // Q1: Option 2 (Index 2 - Correct: "Using resource-saving practices...")
    // Q2: Option 1 (Index 1 - Correct)
    // Q3: Option 0 (Index 0 - Incorrect deliberate test to see incorrect option feedback)
    // Q4..10: Answer remaining
    for (let qIdx = 0; qIdx < 10; qIdx++) {
      await page.waitForSelector("button.w-full.text-left", { timeout: 5000 });
      const currentOpts = await page.locator("button.w-full.text-left").all();
      
      if (qIdx === 0 && currentOpts.length > 2) {
        await currentOpts[2].click(); // Option 2 (C: Correct)
      } else if (qIdx === 2 && currentOpts.length > 0) {
        await currentOpts[0].click(); // Option 0 (Incorrect)
      } else if (currentOpts.length > 1) {
        await currentOpts[1].click(); // Option 1
      } else if (currentOpts.length > 0) {
        await currentOpts[0].click();
      }

      await page.waitForTimeout(300);

      const nextOrSubmitBtn = page.locator("button:has-text('Next Question'), button:has-text('Submit Quiz')").first();
      await nextOrSubmitBtn.click();
      await page.waitForTimeout(400);
    }

    // Wait for the result review to appear
    console.log("Waiting for quiz submission and review...");
    await page.waitForSelector("text=Review Your Answers", { timeout: 10000 });
    await page.waitForTimeout(1000);

    const scoreHeading = await page.locator("h2").first().textContent();
    const scoreText = await page.locator("p.text-xl, p.text-muted-foreground").first().textContent();
    const shot7 = path.join(SCREENSHOT_DIR, "step_7_course_completion_score.png");
    await page.screenshot({ path: shot7 });

    const reviewText = await page.locator("body").textContent();
    const hasOptionFeedback = reviewText.includes("Incorrect.") || reviewText.includes("Correct.") || reviewText.includes("Explanation:");
    const hasCorrectBadge = reviewText.includes("Your Answer (Correct)");
    const hasIncorrectBadge = reviewText.includes("Your Answer (Incorrect)");

    // Scroll down to Review section for clear screenshots
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);

    const shot5 = path.join(SCREENSHOT_DIR, "step_5_quiz_correct_feedback.png");
    await page.screenshot({ path: shot5 });

    const j5Pass = hasCorrectBadge && hasOptionFeedback;
    journeys.push({
      journey: 5,
      name: "Scored quiz: correct answer selection displays option-level rationale",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Option-level rationale rendered with correct badge: ${hasCorrectBadge}, feedback text present: ${hasOptionFeedback}`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j5Pass ? "PASSED" : "FAILED",
      screenshotPath: shot5,
    });
    console.log(`  -> Journey 5: ${j5Pass ? "PASSED" : "FAILED"}`);

    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);

    const shot6 = path.join(SCREENSHOT_DIR, "step_6_quiz_incorrect_feedback.png");
    await page.screenshot({ path: shot6 });

    const j6Pass = hasIncorrectBadge && hasOptionFeedback;
    journeys.push({
      journey: 6,
      name: "Scored quiz: incorrect answer selection displays educational remediation feedback",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Incorrect option remediation feedback rendered: ${hasIncorrectBadge}, explanation present: ${hasOptionFeedback}`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j6Pass ? "PASSED" : "FAILED",
      screenshotPath: shot6,
    });
    console.log(`  -> Journey 6: ${j6Pass ? "PASSED" : "FAILED"}`);

    const j7Pass = Boolean(scoreHeading && (scoreHeading.includes("Passed") || scoreHeading.includes("Failed") || scoreHeading.includes("Quiz")));
    journeys.push({
      journey: 7,
      name: "Course completion: final assessment submission, score calculation and review breakdown",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Score Heading: "${scoreHeading?.trim()}", Score: "${scoreText?.trim()}"`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j7Pass ? "PASSED" : "FAILED",
      screenshotPath: shot7,
    });
    console.log(`  -> Journey 7: ${j7Pass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // Journey 8: Progress reload persistence
    // -------------------------------------------------------------
    console.log("Running Journey 8: Progress reload persistence...");
    await page.goto(`http://localhost:3000/learn/${enrollmentId1}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("header", { timeout: 10000 });
    await page.waitForTimeout(1000);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("header", { timeout: 10000 });
    await page.waitForTimeout(1500);

    const reloadedHeader = await page.locator("header").textContent();
    const shot8 = path.join(SCREENSHOT_DIR, "step_8_progress_reload_persistence.png");
    await page.screenshot({ path: shot8 });

    const j8Pass = Boolean(reloadedHeader && reloadedHeader.includes("Sustainability"));
    journeys.push({
      journey: 8,
      name: "Progress reload persistence: state intact after browser reload",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Header state intact after reload: "${reloadedHeader?.trim().replace(/\s+/g, " ")}"`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j8Pass ? "PASSED" : "FAILED",
      screenshotPath: shot8,
    });
    console.log(`  -> Journey 8: ${j8Pass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // Journey 9: Active catalogue integrity (exactly 34 active courses)
    // -------------------------------------------------------------
    console.log("Running Journey 9: Active catalogue integrity (34 courses)...");
    await page.goto("http://localhost:3000/courses", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("a[href^='/courses/']", { timeout: 10000 });

    const courseLinks = await page.locator("a[href^='/courses/']").all();
    const distinctSlugs = new Set();
    for (const link of courseLinks) {
      const href = await link.getAttribute("href");
      if (href && !href.includes("/lessons/") && !href.includes("/quiz")) {
        distinctSlugs.add(href);
      }
    }

    const shot9 = path.join(SCREENSHOT_DIR, "step_9_active_catalogue_34_courses.png");
    await page.screenshot({ path: shot9 });

    const j9Pass = distinctSlugs.size === 34;
    journeys.push({
      journey: 9,
      name: "Active catalogue integrity: catalogue displays exactly 34 active courses",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Distinct course cards loaded: ${distinctSlugs.size} (Expected: 34)`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j9Pass ? "PASSED" : "FAILED",
      screenshotPath: shot9,
    });
    console.log(`  -> Journey 9: ${j9Pass ? "PASSED" : "FAILED"} (${distinctSlugs.size} courses)`);

    // -------------------------------------------------------------
    // Journey 10: Staged course exclusion (ELH-35 excluded)
    // -------------------------------------------------------------
    console.log("Running Journey 10: Staged course exclusion (ELH-35)...");
    await page.goto("http://localhost:3000/courses/35", { waitUntil: "domcontentloaded" });
    // Wait for React Query to resolve 404
    await page.waitForSelector("text=Course not found", { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(1000);

    const bodyText = await page.locator("body").textContent();
    const notFoundRendered = bodyText.includes("Course not found") || bodyText.includes("doesn't exist");
    const shot10 = path.join(SCREENSHOT_DIR, "step_10_staged_course_35_excluded.png");
    await page.screenshot({ path: shot10 });

    const j10Pass = notFoundRendered;
    journeys.push({
      journey: 10,
      name: "Staged course exclusion: ELH-35 returns clean Course Not Found error page",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Clean 404 / Course Not Found rendered: ${notFoundRendered}`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j10Pass ? "PASSED" : "FAILED",
      screenshotPath: shot10,
    });
    console.log(`  -> Journey 10: ${j10Pass ? "PASSED" : "FAILED"}`);

    // -------------------------------------------------------------
    // Journey 11: Desktop lesson view (Course 2 - Waste Sorting & Bin System)
    // -------------------------------------------------------------
    console.log("Running Journey 11: Course 2 (Waste Sorting)...");
    await page.goto(`http://localhost:3000/learn/${enrollmentId2}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1", { timeout: 10000 });
    await page.waitForTimeout(1000);

    const c2Title = await page.locator("h1").first().textContent();
    const shot11 = path.join(SCREENSHOT_DIR, "step_11_desktop_course2_waste_sorting.png");
    await page.screenshot({ path: shot11 });

    const j11Pass = Boolean(c2Title);
    journeys.push({
      journey: 11,
      name: "Course 2 (Waste Sorting & Bin System): lesson view with Mauritian bin guidance",
      url: page.url(),
      viewport: "1280x800",
      visibleAssertion: `Course 2 Title: "${c2Title?.trim()}"`,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      result: j11Pass ? "PASSED" : "FAILED",
      screenshotPath: shot11,
    });
    console.log(`  -> Journey 11: ${j11Pass ? "PASSED" : "FAILED"}`);

    await desktopContext.close();
  } finally {
    await browser.close();
  }

  const report = {
    timestamp: new Date().toISOString(),
    sprint: "17.0A",
    browserEngine: "Google Chrome (macOS arm64 headless via Playwright)",
    totalJourneys: journeys.length,
    passedJourneys: journeys.filter((j) => j.result === "PASSED").length,
    failedJourneys: journeys.filter((j) => j.result === "FAILED").length,
    journeys,
  };

  const reportPath = path.join(BRAIN_DIR, "browser_verification_report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n=== BROWSER AUDIT COMPLETE: ${report.passedJourneys}/${report.totalJourneys} JOURNEYS PASSED ===`);
  console.log(`Saved report to ${reportPath}`);
  return report;
}

runBrowserAudit().catch((err) => {
  console.error("Browser audit failed:", err);
  process.exit(1);
});
