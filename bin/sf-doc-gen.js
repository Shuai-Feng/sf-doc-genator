#!/usr/bin/env node
'use strict';

const { install, list } = require('../index');

const USAGE = `
Usage: sf-doc-gen <command>

Commands:
  install   Copy skill files to .claude/commands/ in the current project
  list      List all available skills

Examples:
  sf-doc-gen install
  sf-doc-gen list
`;

const [, , command] = process.argv;

switch (command) {
  case 'install':
    install();
    break;
  case 'list':
    list();
    break;
  default:
    console.log(USAGE);
    process.exit(command ? 1 : 0);
}
