export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec).ts?(x)'],
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  snapshotSerializers: [],
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  coverageReporters: ['json', 'html'],
  transformIgnorePatterns: ['node_modules/(?!agegate/.*)'],
};
