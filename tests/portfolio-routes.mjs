import http from "node:http";
import assert from 'node:assert/strict';
import { normalizeProject, projectPath, projectSummary } from '../src/lib/projects.ts';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3010';
assert.equal(projectPath({title: 'Le Maître du Sandwich'}), '/projects/le-maitre-du-sandwich');
assert(projectSummary('## Heading\n\n**Text** ' + 'detail '.repeat(80)).split(' ').length <= 55);
assert(!projectSummary('## Heading\n\n**Text**').includes('*'));
const project = normalizeProject({ href: 'https://github.com/Skayologie', links: [{type: 'Source', href: 'https://example.com', icon_type: 'github'}, {type: 'Application', href: 'https://github.com/Skayologie', icon_type: 'github'}] });
assert.equal(project.href, '');
assert.equal(project.links.length, 1);
assert.equal(project.links[0].type, 'Live demo');
const rss = await (await fetch(`${base}/blog/rss.xml`)).text();
assert.equal((rss.match(/<item>/g) || []).length, 7);
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert(sitemap.includes('https://www.jawadboulmal.com/projects/envault'));
assert(!sitemap.includes('https://jawadboulmal.com'));
for (const route of ['/', '/projects', '/projects/envault', '/blog/testing-react-apps']) {
 const response = await fetch(`${base}${route}`);
 assert.equal(response.status, 200, route);
 const html = await response.text();
 assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one H1`);
 const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
 assert.equal(canonical.replace(/\/$/, ''), `https://www.jawadboulmal.com${route === '/' ? '' : route}`);
 const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
 assert(schemas.length > 0 || route === '/projects');
 if (route !== '/') assert(!JSON.stringify(schemas).includes('ProfilePage'));
 assert(!html.includes('Loading · Please wait'));
 assert(!html.includes('href="https://github.com/Jawadboulmal"'));
}
assert.equal((await fetch(`${base}/projects/no-such-project`)).status, 404);
const redirect = await new Promise((resolve, reject) => {
  http.get(base + '/projects?test=1', { headers: { host: 'jawadboulmal.com' } }, response => { response.resume(); resolve(response); }).on('error', reject);
});
assert.equal(redirect.statusCode, 308);
assert.equal(redirect.headers.location, 'https://www.jawadboulmal.com/projects?test=1');
console.log('PASS: summaries, links, RSS (7 posts), sitemap, www redirects, canonical URLs, schema scope, single H1, project routes and 404.');
