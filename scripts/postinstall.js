'use strict';

// Only run when installed as a dependency (inside node_modules), not during own development.
const isInstalledAsDep = __dirname.includes('node_modules');
if (!isInstalledAsDep) process.exit(0);

const { install } = require('../index');

try {
  // INIT_CWD is set by npm/yarn to the directory where install was invoked.
  const projectRoot = process.env.INIT_CWD || process.cwd();
  install(projectRoot);
} catch (err) {
  // Never break npm install — just warn.
  console.warn(`[sf-doc-gen] postinstall skipped: ${err.message}`);
}
