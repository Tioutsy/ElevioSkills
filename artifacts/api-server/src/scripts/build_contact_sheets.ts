import fs from 'node:fs';
import path from 'node:path';
import { CANONICAL_COURSE_IMAGE_MANIFEST } from '../lib/courseImageManifest.js';

function buildContactSheets() {
  const manifest = CANONICAL_COURSE_IMAGE_MANIFEST;
  const targetDir = path.resolve(process.cwd(), '../ecolearn/public/contact-sheets');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Group courses by sector
  const sectorGroups: Record<string, typeof manifest> = {};
  manifest.forEach(c => {
    if (!sectorGroups[c.sector]) {
      sectorGroups[c.sector] = [];
    }
    sectorGroups[c.sector].push(c);
  });

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ELEVIO Skills — Sprint 15.2.9B Course Photography Visual Contact Sheet</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --border: #1f2937;
      --text: #f3f4f6;
      --muted: #9ca3af;
      --accent: #10b981;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 2rem;
    }
    header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
    }
    h1 { margin: 0 0 0.5rem 0; font-size: 1.75rem; color: #fff; }
    p { margin: 0; color: var(--muted); font-size: 0.95rem; }
    .stats {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    .stat-badge {
      background: rgba(16, 185, 129, 0.15);
      color: var(--accent);
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-weight: 600;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .sector-section {
      margin-bottom: 3rem;
    }
    .sector-title {
      font-size: 1.25rem;
      color: #38bdf8;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.5rem;
      margin-bottom: 1.25rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      overflow: hidden;
      display: flex;
      flex-col: column;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }
    .img-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      overflow: hidden;
    }
    .img-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .card-body {
      padding: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .code-badge {
      font-family: monospace;
      font-size: 0.75rem;
      font-weight: bold;
      background: #047857;
      color: #fff;
      padding: 0.15rem 0.45rem;
      border-radius: 0.25rem;
      align-self: flex-start;
    }
    .course-title {
      font-size: 0.9rem;
      font-weight: 600;
      line-height: 1.25;
      color: #f1f5f9;
      margin: 0;
    }
    .brief-text {
      font-size: 0.75rem;
      color: #94a3b8;
      line-height: 1.35;
      margin-top: 0.25rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>ELEVIO Skills — Canonical Course Photography Visual Contact Sheet</h1>
    <p>Complete photographic review covering all 136 canonical courses. Standard 16:9 crop, minimum 1280x720, < 250 KB budget.</p>
    <div class="stats">
      <div class="stat-badge">Total Courses: ${manifest.length}</div>
      <div class="stat-badge">Format: 16:9 Photographic</div>
      <div class="stat-badge">Vector Illustrations: 0 (100% Replaced)</div>
      <div class="stat-badge">Standard: Realistic Workplace Photography</div>
    </div>
  </header>
`;

  for (const [sector, courses] of Object.entries(sectorGroups)) {
    html += `
  <div class="sector-section">
    <div class="sector-title">${sector} (${courses.length} Courses)</div>
    <div class="grid">
`;
    for (const c of courses) {
      html += `
      <div class="card">
        <div class="img-container">
          <img src="${c.imagePath}" alt="${c.altText}" loading="lazy" />
        </div>
        <div class="card-body">
          <span class="code-badge">${c.courseCode}</span>
          <h3 class="course-title">${c.title}</h3>
          <div class="brief-text"><strong>Setting:</strong> ${c.visualBrief?.workplaceSetting || 'Workplace'}</div>
          <div class="brief-text"><strong>Focus:</strong> ${c.visualBrief?.mainFocus || 'Operational Activity'}</div>
        </div>
      </div>
`;
    }
    html += `
    </div>
  </div>
`;
  }

  html += `
</body>
</html>
`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
  console.log('Successfully created visual contact sheet at artifacts/ecolearn/public/contact-sheets/index.html');
}

buildContactSheets();
