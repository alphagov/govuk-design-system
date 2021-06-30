module.exports = config => {
  return {
    dir: {
      input: 'src',
      includes: '../views/partials',
      layouts: '../views/layouts',
      output: 'deploy/public'
    }
  }
}
