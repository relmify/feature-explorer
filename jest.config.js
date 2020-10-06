module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/src/test/integration/', '/node_modules/', '/out/'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/src/test/integration/', '/node_modules/'],
  setupFilesAfterEnv: ['@relmify/jest-fp-ts', 'jest-extended'],
  watchPlugins: [
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    ['jest-watch-toggle-config', { setting: 'bail' }],
  ],
};
