const extractGOVUKFrontendUsage = () => {
  // https://metalsmith.io/docs/writing-plugins/#asynchronous-manipulations
  return async (files) => {
    // Unfortunately, unified, rehype and associated helpers
    // are a ESM only packages, which means we need to asynchronously
    // import them.
    const { processor, javascript, css } = await import(
      './unified-processor.mjs'
    )
    processor.use(javascript.gatherUsage)
    processor.use(css.gatherUsage)

    // Cleans up the gathered usage during watch
    // Needs investigation to check if actually necessary
    javascript.resetUsage()
    css.resetUsage()

    const processingPromises = Object.entries(files).map(
      async ([path, file]) => {
        if (path.endsWith('.html') && !isExample(file)) {
          // We don't want to write output, so we can limit
          // the processing to parsing the file and running the plugins
          await processor.run(processor.parse(file.contents))
        }
      }
    )

    await Promise.all(processingPromises)

    console.log(
      'Modules used by pages (excluding examples)',
      Array.from(javascript.usage).sort()
    )
    console.log(
      'BEM Blocks used by pages (excluding examples)',
      Array.from(css.usage).sort()
    )
  }
}

function isExample(file) {
  return typeof file.layout === 'string' && file.layout.includes('example')
}

module.exports = extractGOVUKFrontendUsage
