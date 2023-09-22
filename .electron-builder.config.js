/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
  return {
    directories: {
      output: "dist",
      buildResources: "buildResources",
    },
    files: [
      "build/**",
      "models/**",
      "mogrations/**",
      "config/**",
      "assets/**",
      "./index.html",
    ],
    msi: {
      oneClick: true,
    },
    asar: false,

    // Specify linux target just for disabling snap compilation
    linux: {
      target: "deb",
    },
  };
};
