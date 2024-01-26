module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
