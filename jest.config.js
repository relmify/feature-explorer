module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/application/test/integration/', '/node_modules/', '/out/'],
  coverageDirectory: './out/coverage',
  coveragePathIgnorePatterns: ['/application/test/integration/', '/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  watchPlugins: [
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    ['jest-watch-toggle-config', { setting: 'bail' }],
  ],
};
