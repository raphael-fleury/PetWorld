import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    moduleFileExtensions: ['ts', 'js'],
    testMatch: [ '<rootDir>/tests/**' ],
    testPathIgnorePatterns: [
        "/node_modules/", "/dist/"
    ],
    globals: {
        "NODE_ENV": "test"
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: ["./src/**"],
    coverageDirectory: "tests/_coverage"
}

export default config;