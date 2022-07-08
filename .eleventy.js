module.exports = function (config) {
  config.addWatchTarget("./src/assets/stylesheets/*.scss");

  config.addPassthroughCopy({'node_modules/govuk-frontend/govuk/assets/fonts/*': 'assets/fonts/'});


  return {
    dir: {
      input: 'src',
      output: 'deploy/public'
    },
    passthroughFileCopy: true,
  };
};
