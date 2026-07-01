import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { PROJECTS } from '../src/data/portfolio.js';
import { SITE_META } from '../src/data/siteMeta.js';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

assert.ok(SITE_META.title.includes('Cesar Delmondes'), 'site title should include the owner name');
assert.ok(SITE_META.description.length >= 120, 'site description should be detailed enough for SEO previews');
assert.ok(SITE_META.ogImage.endsWith('.png'), 'Open Graph image should be a PNG preview');
assert.equal(SITE_META.url, '', 'site URL should stay empty until a real deploy URL is available');
assert.ok(!html.includes('cesardelmondes.dev'), 'HTML should not publish a placeholder domain');

for (const project of PROJECTS) {
  assert.notEqual(project.githubUrl, '#', `${project.title} should not use a placeholder GitHub URL`);
  assert.ok(project.problem?.length > 30, `${project.title} should describe the problem`);
  assert.ok(project.solution?.length > 30, `${project.title} should describe the solution`);
  assert.ok(project.impact?.length > 30, `${project.title} should describe the impact`);
}
