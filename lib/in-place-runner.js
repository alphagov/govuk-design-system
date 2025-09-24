const inPlace = require('@metalsmith/in-place')

function inPlaceRunner(patterns, options) {
  const transform = options.transform
  const engineOptions = options.engineOptions

  return function (files, metalsmith, done) {
    // Compose plugins for each pattern
    const plugins = patterns.map((pattern) =>
      inPlace({
        pattern: Array.isArray(pattern) ? pattern : [pattern],
        transform,
        engineOptions
      })
    )

    // Run each plugin in series
    let i = 0
    function next(err) {
      if (err || i === plugins.length) return done(err)
      plugins[i++](files, metalsmith, next)
    }
    next()
  }
}

module.exports = inPlaceRunner
