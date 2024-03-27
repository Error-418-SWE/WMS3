/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
	coverageReporters: [
		'lcov',
		['text', { file: 'coverage.txt', path: './' }]
	],
};
