module.exports = {
   preset: "ts-jest",
  testEnvironment: "node",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "components/**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!templates/**"
  ],
  "modulePathIgnorePatterns": [
    "<rootDir>/templates/"
  ],
  "coverageDirectory": "coverage",
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  "testMatch": [
    "**/tests/unit/**/*.spec.[jt]s?(x)",
    "**/__tests__/**/*.spec.[jt]s?(x)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!(flickity)/)"
  ]
}