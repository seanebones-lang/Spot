module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: { 'ts-jest': { useESM: true } },
  transformIgnorePatterns: ['node_modules/(?!(lucide-react|@playwright)/)'],
};
