import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts", // <-- important for TS + JSX
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // adjust if you use path aliases
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // mocks CSS imports
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js", // optional: mock images
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
export default config;
