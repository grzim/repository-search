const path = require(`path`);
const { pathsToModuleNameMapper } = require(`ts-jest`);
const { compilerOptions } = require(`./tsconfig.path.json`);

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, `src`),
      '@api': path.resolve(__dirname, `src/domains/api`),
      '@errors-api': path.resolve(
        __dirname,
        `src/domains/errors/api-error-module`,
      ),
      '@errors-ui': path.resolve(
        __dirname,
        `src/domains/errors/ui-error-module`,
      ),
      '@ui-factories': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/factories`,
      ),
      '@ui-adapters': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/adapters`,
      ),
      '@ui-components': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/components`,
      ),
      '@ui-async-models': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/models/async-models`,
      ),
      '@ui-constants': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/models/constants`,
      ),
      '@ui-entities': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/models/entities`,
      ),
      '@ui-transformations': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/models/transformations`,
      ),
      '@ui-value-objects': path.resolve(
        __dirname,
        `src/domains/repository-search-ui/models/value-objects`,
      ),
      '@ui': path.resolve(__dirname, `src/domains/repository-search-ui`),
      '@test': path.resolve(__dirname, `src/test-utils`),
      '@utils': path.resolve(__dirname, `src/utils`),
    },
  },
  jest: {
    configure: {
      preset: `ts-jest`,
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: `<rootDir>/`,
      }),
    },
  },
};
