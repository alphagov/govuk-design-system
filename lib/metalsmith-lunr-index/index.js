const lunr = require('lunr')
const navigationConfig = require('../../config/navigation.json')

module.exports = function lunrPlugin () {
  return (files, metalsmith, done) => {
    const outputPath = 'search-index.json'

    const includedSections = navigationConfig
      .filter(section => section.includeInSearch)
      .map(section => section.label)

    const documents =
      Object.keys(files)
        // Filter out any non html files
        .filter(path => path.endsWith('.html'))
        // Filter out anything not in an included section
        .filter(path => {
          const section = files[path].section
          return includedSections.includes(section)
        })
        .map(path => {
          const file = files[path]
          const permalink = file.permalink || path
          return {
            permalink,
            title: file.title,
            section: file.section,
            aliases: file.aliases === null ? undefined : file.aliases
          }
        })

    const pageHeadingDocuments =
      Object.keys(files)
        // Filter out any non html files
        .filter(path => path.endsWith('.html'))
        // Only include pages in the with show_page_nav: true
        .filter(path => {
          return files[path].show_page_nav
        })
        // Filter out files that don't have extracted headings
        .filter(path => files[path].headings)
        .map(path => {
          const file = files[path]
          const permalink = file.permalink || path
          const headings = file.headings
          // only use <h2>s
            .filter(heading => heading.depth === 2)
            .map(heading => {
              return {
                permalink: `${permalink}/#${heading.url}`,
                title: heading.text,
                page: file.title,
                section: file.section,
                aliases: heading.aliases === null ? undefined : heading.aliases
              }
            })
          return headings
        })
        // we need a flat array
        .reduce((arr, curr) => {
          return arr.concat(curr)
        }, [])

    // The search index only contains what's needed to match and identify a
    // document, but won't give us back anything other than the document's
    // identifier (`ref`).
    //
    // This store then allows us to lookup the information about the document
    // that we can use to present the result.
    const store = {}

    const index = lunr(function () {
      this.ref('permalink')
      this.field('title', { boost: 100 })
      this.field('aliases', { boost: 10 })

      // Stemming (reducing words to their stem e.g. fishing to fish) is not
      // useful in an 'autocomplete' scenario, where we search using a prefix
      // and users get instant feedback. It can also cause confusion as
      // partially completed words will not be stemmed, e.g. 'fishi' – which can
      // cause search results to disappear and re-appear again.

      // Disable stemming of documents when generating the index
      this.pipeline.remove(lunr.stemmer)
      // Disable stemming of search terms run against this index
      this.searchPipeline.remove(lunr.stemmer)
      documents.forEach(doc => {
        store[doc.permalink] = {
          permalink: doc.permalink,
          title: doc.title,
          section: doc.section,
          aliases: doc.aliases
        }
        this.add(doc)
      })
      // store all headings into the Lunr store
      pageHeadingDocuments.forEach(doc => {
        const separator = '<span class="app-site-search__separator" aria-hidden="true">›</span>'
        store[doc.permalink] = {
          permalink: doc.permalink,
          title: doc.title,
          section: `${doc.section}${separator}${doc.page}`,
          aliases: doc.aliases
        }
        this.add(doc)
      })
    })

    // Add search index to metalsmith's file object, so that it will write
    // the file out as part of its build
    files[outputPath] = {
      contents: JSON.stringify({
        index,
        store
      })
    }

    done()
  }
}
