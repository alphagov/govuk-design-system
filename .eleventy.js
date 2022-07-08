module.exports = function (config) {
  config.addWatchTarget("./src/assets/stylesheets/*.scss");

  return {
    dir: {
      input: 'src',
      output: 'deploy/public'
    },
    passthroughFileCopy: true,
  };
};
