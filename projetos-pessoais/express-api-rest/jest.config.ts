export default {
    bail: 1,
    clearMocks: true,
    roots: ["<rootDir>/src"],
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
};
