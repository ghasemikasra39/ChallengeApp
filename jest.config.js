const {defaults} = require('jest-config');

const config = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest/setup.js'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileTransformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation)',
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  verbose: true,
  testEnvironment: 'jsdom',
};

module.exports = config;
