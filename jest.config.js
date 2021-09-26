module.exports = {
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/src',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(text-mask-core)/)',
  ],
};
