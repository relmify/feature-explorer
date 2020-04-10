/**
 * Wires in Jest as the test runner for vscode tests in place of the default Mocha.
 */
import { runCLI } from 'jest';
import { AggregatedResult, TestResult } from '@jest/test-result';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '../../');

const fromRoot = (...subPaths: readonly string[]): string => path.resolve(rootDir, ...subPaths);
// const srcRoot = fromRoot('src');

const jestConfig = {
  rootDir: rootDir,
  roots: ['<rootDir>/src'],
  verbose: true,
  colors: true,
  transform: JSON.stringify({ '^.+\\.ts$': 'ts-jest' }),
  runInBand: true, // Required due to the way the "vscode" module is injected.
  testRegex: '\\.(test|spec)\\.ts$',
  testEnvironment: fromRoot('out/test/jest/jestVscodeEnvironment.js'),
  setupTestFrameworkScriptFile: fromRoot('out/test/jest/jestVscodeFrameworkSetup.js'),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: JSON.stringify({
    'ts-jest': {
      skipBabel: true,
      tsConfigFile: fromRoot('tsconfig.json'),
    },
  }),
};

/**
 * Forward writes to process.stdout and process.stderr to console.log.
 *
 * For some reason this seems to be required for the Jest output to be streamed
 * to the Debug Console.
 */
function forwardStdoutStderrStreams(): void {
  const logger = (line: string): boolean => {
    console.log(line);
    return true;
  };

  process.stdout.write = logger;
  process.stderr.write = logger;
}

/**
 * Collect failure messages from Jest test results.
 *
 * @param results Jest test results.
 */
function collectTestFailureMessages(results: AggregatedResult): readonly string[] {
  const failures = results.testResults.reduce<readonly string[]>((acc: any, testResult: TestResult) => {
    if (testResult.failureMessage) {
      acc.push(testResult.failureMessage);
    }
    return acc;
  }, []);

  return failures;
}

/**
 *
 */
export async function run(_testRoot: string, callback: TestRunnerCallback): Promise<void> {
  // Forward logging from Jest to the Debug Console.
  forwardStdoutStderrStreams();

  try {
    const { results } = await (runCLI as any)(jestConfig, [rootDir]);
    const failures = collectTestFailureMessages(results);

    if (failures.length > 0) {
      callback(null, failures);
      return;
    }

    callback(null);
  } catch (e) {
    callback(e);
  }
}

export type TestRunnerCallback = (error: Error | null, failures?: any) => void;
