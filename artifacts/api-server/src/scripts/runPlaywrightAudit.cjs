const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ARTIFACT_DIR = "/Users/sharonlennon/.gemini/antigravity-ide/brain/75567789-3312-42f9-8945-ad365293292a";
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log("=== LAUNCHING PLAYWRIGHT (CHROME BINARY) ===");
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
  });

  const evidenceList = [];

  const steps = [
    {
      step: 1,
      name: "Desktop Landing Page",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/",
      check: async (page) => {
        const title = await page.title();
        const bodyText = await page.locator("body").innerText();
        return [`Title: ${title}`, `Text length: ${bodyText.length}`];
      }
    },
    {
      step: 2,
      name: "Desktop Course Catalogue",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/courses",
      check: async (page) => {
        const count = await page.locator("a[href*='/courses/']").count();
        return [`Catalogue Course Cards: ${count}`];
      }
    },
    {
      step: 3,
      name: "Desktop Course Detail",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/courses/sustainability-foundations",
      check: async (page) => {
        const bodyText = await page.locator("body").innerText();
        return [`Detail page text length: ${bodyText.length}`];
      }
    },
    {
      step: 4,
      name: "Desktop Lesson Player",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/learn/sustainability-foundations",
      check: async (page) => {
        const bodyText = await page.locator("body").innerText();
        return [`Lesson text length: ${bodyText.length}`];
      }
    },
    {
      step: 5,
      name: "Desktop Quiz Shell",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/quiz/sustainability-foundations",
      check: async (page) => {
        const bodyText = await page.locator("body").innerText();
        return [`Quiz text: ${bodyText.slice(0, 100).replace(/\s+/g, " ")}`];
      }
    },
    {
      step: 6,
      name: "Desktop Insights Resources",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/mauritius-rules-resources",
      check: async (page) => {
        const bodyText = await page.locator("body").innerText();
        return [`Insights text length: ${bodyText.length}`];
      }
    },
    {
      step: 7,
      name: "Desktop Platform Admin Preview",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/platform-admin/preview/1",
      check: async (page) => {
        const bodyText = await page.locator("body").innerText();
        return [`Admin preview text length: ${bodyText.length}`];
      }
    },
    {
      step: 8,
      name: "Mobile Landing Page",
      width: 375,
      height: 667,
      url: "http://127.0.0.1:3000/",
      check: async (page) => {
        const bodyText = await page.locator("body").innerText();
        return [`Mobile text length: ${bodyText.length}`];
      }
    },
    {
      step: 9,
      name: "Mobile Course Catalogue",
      width: 375,
      height: 667,
      url: "http://127.0.0.1:3000/courses",
      check: async (page) => {
        const count = await page.locator("a[href*='/courses/']").count();
        return [`Mobile cards: ${count}`];
      }
    },
    {
      step: 10,
      name: "Mobile Lesson Player",
      width: 375,
      height: 667,
      url: "http://127.0.0.1:3000/learn/sustainability-foundations",
      check: async (page) => {
        const bodyText = await page.locator("body").innerText();
        return [`Mobile lesson text length: ${bodyText.length}`];
      }
    },
  ];

  for (const s of steps) {
    console.log(`[Step ${s.step}/10] ${s.name} (${s.width}x${s.height}) -> ${s.url}`);
    const context = await browser.newContext({ viewport: { width: s.width, height: s.height } });
    const page = await context.newPage();

    const filename = `step_${s.step}_${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.png`;
    const screenshotPath = path.join(SCREENSHOTS_DIR, filename);
    let status = "PASS";
    let details = "";
    let observedElements = [];

    try {
      await page.goto(s.url, { timeout: 10000 });
      await page.waitForTimeout(1000);
      if (s.check) {
        observedElements = await s.check(page);
      }
      await page.screenshot({ path: screenshotPath });
      details = `Rendered successfully. Observations: ${observedElements.join("; ")}`;
    } catch (err) {
      status = "FAIL";
      details = `Error: ${err.message}`;
      try {
        await page.screenshot({ path: screenshotPath });
      } catch {}
    } finally {
      await context.close();
    }

    evidenceList.push({
      step: s.step,
      name: s.name,
      viewport: { width: s.width, height: s.height },
      url: s.url,
      status,
      screenshotPath,
      observedElements,
      details,
    });
    console.log(`  -> ${status}: ${details}`);
  }

  await browser.close();

  const auditReportPath = path.join(ARTIFACT_DIR, "playwright_browser_audit.json");
  fs.writeFileSync(auditReportPath, JSON.stringify(evidenceList, null, 2));
  console.log(`=== ALL 10 STEPS COMPLETED. Saved report to ${auditReportPath} ===`);
}

run().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
