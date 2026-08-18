/**
 * Redirects plugin
 *
 * Creates a _redirects file in the build directory which includes redirects for
 * any 'archived' pages (defined as those which use layout-archived.njk)
 *
 * The redirects file is tab-separated, and looks like:
 *
 * /archived/page   /archived/page    410!
 *
 * The ! on the status code makes it a forced-redirect, which is needed because
 * Netlify will otherwise ignore redirects where a file for the path exists.
 *
 * @see https://docs.netlify.com/manage/routing/redirects/overview/
 * @returns {import('metalsmith').Plugin} Metalsmith plugin
 */

module.exports = function redirects(files, metalsmith, done) {
  const archivedFiles = Object.values(files).filter(
    (file) => file?.layout === 'layout-archived.njk'
  )

  const archiveRedirects = archivedFiles
    .map((file) => `/${file.permalink}\t/${file.permalink}\t410!`)
    .join('\n')

  files._redirects = {
    contents: Buffer.from(archiveRedirects),
    mode: '0664'
  }

  done()
}
