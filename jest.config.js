module.exports = {
  setupFilesAfterEnv: ['./scripts/setup.js'],
  // roots: ['<rootDir>/projects', '<rootDir>/projects/yandex/index.html'],
  roots: ['<rootDir>/projects'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': './scripts/jest-html-transformer.js',
    // '^.+\\.html$': './projects/yandex/index.html',
    // '^.+\\.js$': './projects/yandex/index.js',
    // '^.+\\.js$': './projects/yandex/templates.js',
  },
};
