const { dirname, join } = require('path')

const exporter = require('sass-export').exporter

function parseSCSS(filename) {
  const packagePath = dirname(require.resolve('govuk-frontend'))

  return exporter({
    inputFiles: [join(packagePath, `settings/${filename}`)],
    includePaths: [join(packagePath, 'settings')]
  }).getStructured()
}

function getColourFromSass(sass, variableName) {
  return sass.variables.find((variable) => variable.name === variableName)
    .compiledValue
}

/**
 * Get colour palette
 *
 * Extracts the colour palette from the $govuk-colours map defined in
 * settings/_colours-palette.scss in GOV.UK Frontend
 *
 * @return Object mapping colour names to their hexadecimal values
 */

const palette = function () {
  const { variables } = parseSCSS('_colours-palette.scss')

  const palette = variables.find(({ name }) => name === '$govuk-colours')

  // For variables with 'if()' conditional find the original map value such as
  // `$govuk-colours` to `$_govuk-colour-palette-modern` in govuk-frontend v4
  const paletteMap = !('paletteMap' in palette)
    ? variables.find(
        ({ compiledValue, mapValue }) =>
          compiledValue === palette.compiledValue && mapValue
      ).mapValue
    : palette.mapValue

  // Convert Sass map entries into a single object
  return Object.fromEntries(
    paletteMap.map(({ name, compiledValue }) => [name, compiledValue])
  )
}

/**
 * Get applied colours
 *
 * Adds colour definitions to the colours data defined in data/colours.json,
 * looking up the hexadecimal values from their definitions in
 * settings/_colours-applied.scss in GOV.UK Frontend
 *
 * Example output:
 *
 * ```
 * { Text: [
 *     { name: '$govuk-text-colour', colour: '#0b0c0c', 'notes': '' },
 *     { name: '$govuk-secondary-text-colour', colour: '#6f777b', 'notes': '' },
 *   ],
 *   ...
 * }
 * ```
 *
 * @return Object containing 'groups' of colours
 */

const applied = function () {
  const data = require('../data/colours.json')
  const sass = parseSCSS('_colours-applied.scss')

  for (const group in data) {
    data[group] = data[group].map((colour) => {
      colour.colour = getColourFromSass(sass, colour.name)

      return colour
    })
  }

  return data
}

module.exports = {
  applied: applied(),
  palette: palette()
}
