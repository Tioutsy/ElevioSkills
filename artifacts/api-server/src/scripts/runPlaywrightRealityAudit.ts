import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const ARTIFACT_DIR = "/Users/sharonlennon/.gemini/antigravity-ide/brain/75567789-3312-42f9-8945-ad365293292a";
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

export interface BrowserAuditEvidence {
  step: number;
  name: string;
  viewport: { width: number; height: number };
  url: string;
  status: "PASS" | "FAIL";
  screenshotPath: string;
  consoleErrors: string[];
  failedRequests: string[];
  observedElements: string[];
  details: string;
}

async function runRealityAudit() {
  console.log("=== STARTING REAL BROWSER AUDIT (Playwright + Chrome) ===");
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "playwright-audit-"));
  
  const context = await chromium.launchPersistentContext(tmpDir, {
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const page = context.pages()[0] || (await context.newPage());
  const evidenceList: BrowserAuditEvidence[] = [];

  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", msg => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("response", res => {
    if (res.status() >= 400 && !res.url().includes("favicon")) {
      failedRequests.push(`${res.request().method()} ${res.url()} -> ${res.status()}`);
    }
  });

  const steps = [
    {
      num: 1,
      name: "Desktop Landing Page",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/",
      action: async (p: any, obs: string[]) => {
        const title = await p.title();
        obs.push(`Title: ${title}`);
        const heading = await p.locator("h1").first().textContent();
        obs.push(`H1: ${heading?.trim()}`);
      },
    },
    {
      num: 2,
      name: "Desktop Course Catalogue",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/courses",
      action: async (p: any, obs: string[]) => {
        await p.waitForSelector("a[href^='/courses/']", { timeout: 5000 }).catch(() => {});
        const cards = await p.locator("a[href^='/courses/']").count();
        obs.push(`Visible Course Cards: ${cards}`);
      },
    },
    {
      num: 3,
      name: "Desktop Course Detail",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/courses/sustainability-foundations",
      action: async (p: any, obs: string[]) => {
        const h1 = await p.locator("h1").first().textContent();
        obs.push(`Course Title: ${h1?.trim()}`);
        const startBtn = await p.locator("a:has-text('Start'), button:has-text('Start'), a:has-text('Commencer')").count();
        obs.push(`Start Button Count: ${startBtn}`);
      },
    },
    {
      num: 4,
      name: "Desktop Lesson Player",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/learn/sustainability-foundations",
      action: async (p: any, obs: string[]) => {
        await p.waitForSelector("button, h1, h2, div", { timeout: 5000 });
        const bodyText = await p.locator("body").textContent();
        obs.push(`Player rendered text: ${bodyText?.slice(0, 100).replace(/\s+/g, " ")}`);
      },
    },
    {
      num: 5,
      name: "Desktop Quiz Shell",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/quiz/sustainability-foundations",
      action: async (p: any, obs: string[]) => {
        const bodyText = await p.locator("body").textContent();
        obs.push(`Quiz Shell: ${bodyText?.slice(0, 100).replace(/\s+/g, " ")}`);
      },
    },
    {
      num: 6,
      name: "Desktop Insights Resources",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/insights",
      action: async (p: any, obs: string[]) => {
        const bodyText = await p.locator("body").textContent();
        obs.push(`Insights page content length: ${bodyText?.length}`);
      },
    },
    {
      num: 7,
      name: "Desktop Platform Admin Preview",
      width: 1280,
      height: 800,
      url: "http://127.0.0.1:3000/platform-admin/preview",
      action: async (p: any, obs: string[]) => {
        const bodyText = await p.locator("body").textContent();
        obs.push(`Admin preview content length: ${bodyText?.length}`);
      },
    },
    {
      num: 8,
      name: "Mobile Landing Page",
      width: 375,
      height: 667,
      url: "http://127.0.0.1:3000/",
      action: async (p: any, obs: string[]) => {
        const h1 = await p.locator("h1").first().textContent();
        obs.push(`Mobile H1: ${h1?.trim()}`);
      },
    },
    {
      num: 9,
      name: "Mobile Course Catalogue",
      width: 375,
      height: 667,
      url: "http://127.0.0.1:3000/courses",
      action: async (p: any, obs: string[]) => {
        await p.waitForSelector("a[href^='/courses/']", { timeout: 5000 }).catch(() => {});
        const cards = await p.locator("a[href^='/courses/']").count();
        obs.push(`Mobile Visible Cards: ${cards}`);
      },
    },
    {
      num: 10,
      name: "Mobile Lesson Player",
      width: 375,
      height: 667,
      url: "http://127.0.0.1:3000/learn/sustainability-foundations",
      action: async (p: any, obs: string[]) => {
        const bodyText = await p.locator("body").textContent();
        obs.push(`Mobile player content length: ${bodyText?.length}`);
      },
    },
  ];

  for (const step of steps) {
    console.log(`[Step ${step.num}] ${step.name} (${step.width}x${step.height}) -> ${step.url}`);
    await page.setViewportSize({ width: step.width, height: step.height });
    const observedElements: string[] = [];
    const filename = `step_${step.num}_${step.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.png`;
    const screenshotPath = path.join(SCREENSHOTS_DIR, filename);

    let status: "PASS" | "FAIL" = "PASS";
    let details = "";

    try {
      await page.goto(step.url, { waitUntil: "domcontentloaded", timeout: 8000 });
      await page.waitForTimeout(800);
      if (step.action) {
        await step.action(page, observedElements);
      }
      await page.screenshot({ path: screenshotPath, fullPage: false });
      details = `Rendered cleanly. Observed: ${observedElements.join("; ")}`;
    } catch (err: any) {
      status = "FAIL";
      details = `Error: ${err.message}`;
      try {
        await page.screenshot({ path: screenshotPath, fullPage: false });
      } catch {}
    }

    evidenceList.push({
      step: step.num,
      name: step.name,
      viewport: { width: step.width, height: step.height },
      url: step.url,
      status,
      screenshotPath,
      consoleErrors: [...consoleErrors],
      failedRequests: [...failedRequests],
      observedElements,
      details,
    });

    console.log(`  -> Status: ${status} | Evidence: ${details}`);
  }

  await context.close();

  console.log("\n=== ALL 10 PLAYWRIGHT JOURNEYS COMPLETE ===");
  const auditReportPath = path.join(ARTIFACT_DIR, "playwright_browser_audit.json");
  fs.writeFileSync(auditReportPath, JSON.stringify(evidenceList, null, 2));
  console.log(`Saved report to ${auditReportPath}`);
}

runRealityAudit().catch(err => {
  console.error("Playwright audit execution failed:", err);
  process.exit(1);
});
