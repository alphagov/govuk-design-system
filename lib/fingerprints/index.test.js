const Metalsmith = require('metalsmith')

const { hashAssets } = require('./index.js')

describe('Hash fingerprints plugin', () => {
  const source = './fixtures/src'
  const destination = './fixtures/build'

  let output
  let metadata

  beforeAll((done) => {
    Metalsmith(__dirname)
      // Use test fixtures
      .source(source)
      .destination(destination)

      // Hash fingerprints example
      .use(
        hashAssets({
          pattern: ['**/*.{css,map,jpg,js,json}']
        })
      )

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
      'example-source-map.css.map': fingerprint,
      'example-source-map.js': fingerprint,
      'example-source-map.js.map': fingerprint,
      'example-xxx-123.js': fingerprint,
      'example-xxx-456.map': fingerprint,
      'example.jpg': fingerprint,
      'example.js': fingerprint,
      'example.json': fingerprint
    })

    expect(Object.entries(metadata.fingerprints)).toHaveLength(9)
  })

  it('syncs fingerprints for source map metadata', () => {
    expect(metadata.fingerprints['example-source-map.css'].hash).toEqual(
      metadata.fingerprints['example-source-map.css.map'].hash
    )

    expect(metadata.fingerprints['example-source-map.js'].hash).toEqual(
      metadata.fingerprints['example-source-map.js.map'].hash
    )

    expect(metadata.fingerprints['example-xxx-123.js'].hash).toEqual(
      metadata.fingerprints['example-xxx-456.map'].hash
    )
  })

  it('renames assets with hash fingerprints', () => {
    const file = {
      contents: expect.any(Buffer)
    }

    const fingerprint1 = metadata.fingerprints['example-source-map.css']
    const fingerprint2 = metadata.fingerprints['example-source-map.css.map']
    const fingerprint3 = metadata.fingerprints['example-source-map.js']
    const fingerprint4 = metadata.fingerprints['example-source-map.js.map']
    const fingerprint5 = metadata.fingerprints['example-xxx-123.js']
    const fingerprint6 = metadata.fingerprints['example-xxx-456.map']
    const fingerprint7 = metadata.fingerprints['example.jpg']
    const fingerprint8 = metadata.fingerprints['example.js']
    const fingerprint9 = metadata.fingerprints['example.json']

    expect(output).toMatchObject({
      [fingerprint1.path]: file,
      [fingerprint2.path]: file,
      [fingerprint3.path]: file,
      [fingerprint4.path]: file,
      [fingerprint5.path]: file,
      [fingerprint6.path]: file,
      [fingerprint7.path]: file,
      [fingerprint8.path]: file,
      [fingerprint9.path]: file
    })
  })

  it('updates asset source map URLs with hash fingerprints', () => {
    expect(
      output[
        metadata.fingerprints['example-source-map.css'].path
      ].contents.toString()
    ).toContain(metadata.fingerprints['example-source-map.css.map'].path)

    expect(
      output[
        metadata.fingerprints['example-source-map.js'].path
      ].contents.toString()
    ).toContain(metadata.fingerprints['example-source-map.js.map'].path)

    expect(
      output[
        metadata.fingerprints['example-xxx-123.js'].path
      ].contents.toString()
    ).toContain(metadata.fingerprints['example-xxx-456.map'].path)
  })

  it('deletes old assets', () => {
    expect(output['example-source-map.css']).toBeUndefined()
    expect(output['example-source-map.css.map']).toBeUndefined()
    expect(output['example-source-map.js']).toBeUndefined()
    expect(output['example-source-map.js.map']).toBeUndefined()
    expect(output['example-xxx-123.js']).toBeUndefined()
    expect(output['example-xxx-456.map']).toBeUndefined()
    expect(output['example.jpg']).toBeUndefined()
    expect(output['example.js']).toBeUndefined()
    expect(output['example.json']).toBeUndefined()
  })
})
