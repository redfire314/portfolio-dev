/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    bail: true,
    clearMocks: true,
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    testEnvironment: 'node'
};
