const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const mode = process.argv[2]; // "stills" or "video"
// CSS masks need http(s), so serve this folder locally instead of using file://
const http = require('http'), fs = require('fs');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const server = http.createServer((req, res) => {
  const f = path.join(__dirname, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); res.end(data);
  });
}).listen(0);
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGEERR', e.message));
  page.on('console', m => console.log('console:', m.text()));
  await page.goto(`http://127.0.0.1:${server.address().port}/reel.html`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const TOTAL = await page.evaluate(() => window.OUT_TOTAL);
  if (mode === 'events') {
    const ev = await page.evaluate(() => ({ events: window.SFX, total: window.OUT_TOTAL }));
    require('fs').writeFileSync('sfx.json', JSON.stringify(ev));
  } else if (mode === 'stills') {
    const ts = process.argv.slice(3).map(Number);
    for (const t of ts) {
      await page.evaluate(t => window.seek(window.animTime(t)), t);
      await page.screenshot({ path: `stills/t${t}.png` });
    }
  } else {
    const fps = 30, n = Math.round(TOTAL * fps);
    const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-pix_fmt', 'yuv420p', '-r', String(fps), 'video_noaudio.mp4'], { stdio: ['pipe', 'ignore', 'inherit'] });
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.seek(window.animTime(t)), i / fps);
      const buf = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 150 === 0) console.log('frame', i, '/', n);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
  server.close();
})();
