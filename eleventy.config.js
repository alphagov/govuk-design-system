module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: 'src-11ty',

      layouts: '../views/layouts',
      includes: '../views/partials',

      output: 'build-11ty'
    }
  }
}
