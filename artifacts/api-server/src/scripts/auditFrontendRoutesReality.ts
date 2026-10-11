import * as http from "http";
import * as fs from "fs";

interface RouteCheckResult {
  route: string;
  statusCode: number;
  contentType: string | null;
  sizeBytes: number;
  durationMs: number;
  containsExpectedMarkupOrData: boolean;
  notes: string;
}

async function fetchRoute(url: string): Promise<{ statusCode: number; contentType: string | null; sizeBytes: number; body: string; durationMs: number }> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode || 0,
          contentType: res.headers["content-type"] || null,
          sizeBytes: Buffer.byteLength(data),
          body: data,
          durationMs: Date.now() - start
        });
      });
    }).on("error", reject);
  });
}

async function runRouteRealityAudit() {
  const baseUrl = "http://localhost:3000";
  const routesToTest = [
    { path: "/", expected: "Elevio" },
    { path: "/courses", expected: "Workplace Sustainability" },
    { path: "/courses/sustainability-foundations", expected: "Sustainability Foundations" },
    { path: "/learn/sustainability-foundations", expected: "html" },
    { path: "/quiz/sustainability-foundations", expected: "html" },
    { path: "/learning-paths", expected: "html" },
    { path: "/insights", expected: "html" },
    { path: "/platform-admin/preview", expected: "html" },
    { path: "/api/courses", expected: "sustainability-foundations" },
    { path: "/api/courses/1", expected: "Sustainability Foundations" },
    { path: "/api/learning-paths", expected: "paths" },
    { path: "/api/insights/articles", expected: "articles" },
    { path: "/api/insights/resources", expected: "resources" },
    { path: "/api/sectors", expected: "sectors" },
  ];

  const results: RouteCheckResult[] = [];

  for (const r of routesToTest) {
    try {
      const res = await fetchRoute(`${baseUrl}${r.path}`);
      const matched = res.body.includes(r.expected);
      results.push({
        route: r.path,
        statusCode: res.statusCode,
        contentType: res.contentType,
        sizeBytes: res.sizeBytes,
        durationMs: res.durationMs,
        containsExpectedMarkupOrData: matched,
        notes: res.statusCode === 200 && matched ? "OK (Clean HTTP 200)" : `Issue: status ${res.statusCode}, expected content '${r.expected}'`
      });
    } catch (err: any) {
      results.push({
        route: r.path,
        statusCode: 0,
        contentType: null,
        sizeBytes: 0,
        durationMs: 0,
        containsExpectedMarkupOrData: false,
        notes: `Network error: ${err.message}`
      });
    }
  }

  console.log("=== FRONTEND & API ROUTE REALITY AUDIT ===");
  console.log(JSON.stringify(results, null, 2));
}

runRouteRealityAudit().catch(console.error);
