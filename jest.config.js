module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./scripts/setup.js'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/projects'],
  transform: {
    '^.+\\.[tj]s$': 'babel-jest',
    '^.+\\.html$': './scripts/jest-html-transformer.js',
  },
};
