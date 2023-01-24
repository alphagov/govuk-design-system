const metalsmith = require('metalsmith')

const { hashAssets } = require('./index.js')

describe('Hash fingerprints plugin', () => {
  const source = './fixtures/src'
  const destination = './fixtures/build'

  let output
  let metadata

  beforeAll((done) => {
    metalsmith(__dirname)

      // Use test fixtures
      .source(source)
      .destination(destination)

      // Hash fingerprints example
      .use(hashAssets({
        pattern: [
          '**/*.{css,jpg,js,json}'
        ]
      }))

      // Check metadata
      .use((files, metalsmith, done) => {
        metadata = metalsmith.metadata()
        done()
      })

      // Build
      .build((err, files) => {
        if (err) {
          return done(err)
        }

        output = files
        done()
      })
  })

  it('adds fingerprints to metadata', () => {
    const fingerprint = {
      hash: expect.any(String),
      path: expect.any(String)
    }

    expect(metadata.fingerprints).toMatchObject({
      'example-source-map.css': fingerprint,
      'example-source-map.js': fingerprint,
      'example.jpg': fingerprint,
      'example.js': fingerprint,
      'example.json': fingerprint
    })

    expect(Object.entries(metadata.fingerprints))
      .toHaveLength(5)
  })

  it('renames assets with hash fingerprints', () => {
    const file = {
      contents: expect.any(Buffer)
    }

    const fingerprint1 = metadata.fingerprints['example-source-map.css']
    const fingerprint2 = metadata.fingerprints['example-source-map.js']
    const fingerprint3 = metadata.fingerprints['example.jpg']
    const fingerprint4 = metadata.fingerprints['example.js']
    const fingerprint5 = metadata.fingerprints['example.json']

    expect(output).toMatchObject({
      [fingerprint1.path]: file,
      [fingerprint2.path]: file,
      [fingerprint3.path]: file,
      [fingerprint4.path]: file,
      [fingerprint5.path]: file
    })
  })

  it('deletes old assets', () => {
    expect(output['example-source-map.css']).toBeUndefined()
    expect(output['example-source-map.js']).toBeUndefined()
    expect(output['example.jpg']).toBeUndefined()
    expect(output['example.js']).toBeUndefined()
    expect(output['example.json']).toBeUndefined()
  })
})
