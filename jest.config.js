module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native' +
        '|@react-native' +
        '|@react-navigation' +
        '|@react-native-async-storage' +
        '|react-native-reanimated' +
        '|expo(nent)?' +
        '|@expo(nent)?/.*' +
        '|react-native-svg)',
    ],
    moduleNameMapper: {
        '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.ts',
        '^.+\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
    },
    testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
    testEnvironment: 'node',
};