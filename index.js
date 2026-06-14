'use strict';

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, 'skills');

function getSkillFiles() {
  return fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith('.md'));
}

function install(targetRoot = process.cwd()) {
  const targetDir = path.join(targetRoot, '.claude', 'commands');
  fs.mkdirSync(targetDir, { recursive: true });

  const files = getSkillFiles();
  if (files.length === 0) {
    console.log('No skills found.');
    return;
  }

  files.forEach((file) => {
    const src = path.join(SKILLS_DIR, file);
    const dest = path.join(targetDir, file);
    fs.copyFileSync(src, dest);
    console.log(`✅ Installed: .claude/commands/${file}`);
  });
}

function list() {
  const files = getSkillFiles();
  if (files.length === 0) {
    console.log('No skills available.');
    return;
  }
  console.log('Available skills:');
  files.forEach((f) => console.log(`  //${f.replace('.md', '')}`));
}

module.exports = { install, list, SKILLS_DIR };
