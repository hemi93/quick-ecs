module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: ['./src/**/*.ts', '!**/*/index.ts', '!**/*/*.fake.ts'],
  testMatch: ['**/__tests__/**/*.test.ts']
}
