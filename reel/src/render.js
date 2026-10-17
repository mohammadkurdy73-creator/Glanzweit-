const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const mode = process.argv[2]; // "stills" or "video"
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGEERR', e.message));
  page.on('console', m => console.log('console:', m.text()));
  await page.goto('file://' + path.resolve('reel.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const TOTAL = await page.evaluate(() => window.TOTAL);
  if (mode === 'stills') {
    const ts = process.argv.slice(3).map(Number);
    for (const t of ts) {
      await page.evaluate(t => window.seek(t), t);
      await page.screenshot({ path: `stills/t${t}.png` });
    }
  } else {
    const fps = 30, n = Math.round(TOTAL * fps);
    const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-pix_fmt', 'yuv420p', '-r', String(fps), 'video_noaudio.mp4'], { stdio: ['pipe', 'ignore', 'inherit'] });
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.seek(t), i / fps);
      const buf = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 150 === 0) console.log('frame', i, '/', n);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
