import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const { normalizeProject, projectPath, projectSummary } = await import('../src/lib/projects.ts');
assert.equal(projectPath({title: 'Le Maître du Sandwich'}), '/projects/le-maitre-du-sandwich');
const markdown = '## Restaurant project\n\n**A responsive website** ' + 'detail '.repeat(80);
assert(!projectSummary(markdown).includes('**'));
assert(projectSummary(markdown).split(' ').length <= 55);
const normalized = normalizeProject({ href: 'https://github.com/Skayologie', links: [{type: 'Source', href: 'https://example.com', icon_type: 'github'}, {type: 'Application', href: 'https://github.com/Skayologie', icon_type: 'github'}] });
assert.equal(normalized.href, '');
assert.equal(normalized.links.length, 1);
assert.equal(normalized.links[0].type, 'Live demo');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3010';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  const rss = await (await fetch(`${base}/blog/rss.xml`)).text();
  assert.equal((rss.match(/<item>/g) || []).length, 7, 'RSS includes all seven articles');
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert(sitemap.includes('https://www.jawadboulmal.com/projects/envault'));
  assert(!sitemap.includes('https://jawadboulmal.com'));
  for (const route of ['/', '/projects', '/projects/envault', '/blog/testing-react-apps']) {
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1, `${route} has one H1`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      assert.equal(canonical.replace(/\/$/, ''), `https://www.jawadboulmal.com${route === '/' ? '' : route}`);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Overflow: ${route} ${width}`);
      assert.equal(await page.getByText('Loading · Please wait', { exact: true }).count(), 0);
      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
      for (const schema of schemas) JSON.parse(schema);
      if (route !== '/') assert(!schemas.some(s => s.includes('ProfilePage') || s.includes('FAQPage')));
    }
  }
  await page.goto(`${base}/projects`);
  assert.equal(await page.locator('a[href="https://github.com/Jawadboulmal"]').count(), 0);
  const missing = await page.goto(`${base}/projects/no-such-project`);
  assert.equal(missing.status(), 404);
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const plain = await noJS.newPage();
  await plain.goto(base);
  assert(await plain.locator('h1').isVisible(), 'Hero remains visible without JavaScript');
  await noJS.close();
  console.log('PASS: RSS, sitemap, canonicals, schemas, project routes, 404, no-JS hero, and layout at 360/390/768/1440px.');
} finally { await browser.close(); }
