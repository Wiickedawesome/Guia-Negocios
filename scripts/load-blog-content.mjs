#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const postsDataPath = resolve('scripts/blog-posts-data.json');
const posts = JSON.parse(readFileSync(postsDataPath, 'utf8'));

const contentDir = 'scripts/post-content';

posts[2].contentEs = readFileSync(`${contentDir}/post3-es.md`, 'utf8');
posts[2].contentEn = readFileSync(`${contentDir}/post3-en.md`, 'utf8');

posts[3].contentEs = readFileSync(`${contentDir}/post4-es.md`, 'utf8');
posts[3].contentEn = readFileSync(`${contentDir}/post4-en.md`, 'utf8');

posts[4].contentEs = readFileSync(`${contentDir}/post5-es.md`, 'utf8');
posts[4].contentEn = readFileSync(`${contentDir}/post5-en.md`, 'utf8');

writeFileSync(postsDataPath, JSON.stringify(posts, null, 2));

console.log('✓ All blog post content loaded into blog-posts-data.json');
