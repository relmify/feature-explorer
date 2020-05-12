// const {defaults} = require('jest-config');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/src/test/integration/', '/node_modules/', '/out/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
