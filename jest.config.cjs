module.exports = {
    roots: ['<rootDir>/tests'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: {
                    module: 'ESNext',
                    target: 'ESNext'
                }
            }
        ]
    },
    extensionsToTreatAsEsm: ['.ts']
};
