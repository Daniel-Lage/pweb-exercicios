import { ESM_TS_TRANSFORM_PATTERN, TS_EXT_TO_TREAT_AS_ESM } from "ts-jest";

/** @type {import("jest").Config} */
export default {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [...TS_EXT_TO_TREAT_AS_ESM],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    [ESM_TS_TRANSFORM_PATTERN]: [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
