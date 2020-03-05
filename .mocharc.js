'use strict';

module.exports = {
  spec: '"src/**/*.test.ts"',
  exclude: '"src/test/integration/**/*.test.ts"',
  require: 'src/test/mocha_env.js, ts-node/register',
  extension: 'ts',
  diff: true,
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  ui: 'bdd',
  color: true,
  watchFiles: '"src/**/*.ts"',
  watchIgnore: '"src/test/integration/**/*.test.ts"',
  checkLeaks: true
};
