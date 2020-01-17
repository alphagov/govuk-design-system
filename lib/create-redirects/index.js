const path = require('path')

const plugin = () => {
  return function (files, metalsmith, done) { 
    const pagesToRedirect = (
      Object.keys(files)
        .filter(filename => files[filename].redirect)
        .map(filename => {
          const file = files[filename]
          const extension = filename.substring(filename.indexOf('.'))

          // remove the trailing /index and extensions for a pretty url
          // example/path/index.md -> /example/path/
          // example.md -> /example
          const prettyPath = filename.replace(path.sep + 'index' + extension, path.sep).replace(extension, path.sep)

          return {
            from: file.redirect,
            to: path.sep + prettyPath
          }
        })
    )

    pagesToRedirect.forEach(redirect => {
      // Check that the path used is valid
      if (!redirect.from.startsWith('/') || !redirect.from.endsWith('/')) {
        return done(new Error(`Redirect '${redirect.from}' to '${redirect.to}' needs to start and end with '${path.sep}'`))
      }
      let filename
      // If the path is not within a folder then create a single file
      const parsedPath = path.parse(redirect.from)
      if (parsedPath.root === parsedPath.dir) {
        filename = parsedPath.name + '.md.njk'
      } else {
        // Need to remove the first separator from the filename
        filename = redirect.from.replace(path.sep, '') + 'index.md.njk'
      }
      // Check the path used doesnt already exist as another file
      const fileAlreadyExists = typeof files[filename] !== 'undefined'
      if (fileAlreadyExists) {
        return done(new Error(`Cannot create redirect from '${redirect.from}' to '${redirect.to}' as the page already exists`))
      }

      const pageTitle = `Page has moved`
      const contents = Buffer.from(`
# ${pageTitle}

The web address has moved to [${redirect.to}](${redirect.to}).
`)
      files[filename] = {
        title: pageTitle,
        description: `This page has moved to ${redirect.to}`,
        layout: 'layout-single-page-prose.njk',
        // Ensure the redirect file is not indexed by search engines
        ignore_in_sitemap: true,
        // Used to filter redirect pages out in other plugins
        isRedirect: true,
        contents
      }
    })
    done()
  }
}
module.exports = plugin
