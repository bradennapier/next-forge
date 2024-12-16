// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  customTypes: {
    engines: {
      path: 'engines',
      strategy: 'versionsByName',
    },
    packageManager: {
      path: 'packageManager',
      strategy: 'name@version',
    },
  },
  versionGroups: [
    {
      label: 'Use workspace protocol when developing local packages',
      dependencies: ['@repo/*', '@your-repo/node-client', 'dashboard-ui'],
      dependencyTypes: ['dev', 'prod'],
      pinVersion: 'workspace:*',
    },
  ],
};

module.exports = config;
