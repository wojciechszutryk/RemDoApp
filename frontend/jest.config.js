const { defaults } = require("jest-config");

module.exports = {
  testEnvironment: "jsdom",
  bail: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  roots: ["src"],
  testMatch: ["<rootDir>/src/**/?(*.)test.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleDirectories: ["node_modules", "src"],
};
