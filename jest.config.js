module.exports = {
  setupFilesAfterEnv: ['./scripts/setup.js'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/projects'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': './scripts/jest-html-transformer.js',
  },
};
