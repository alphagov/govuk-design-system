const assert = require('assert')
const exporter = require('sass-export').exporter

function parseSCSS (filename) {
  return exporter({
    inputFiles: ['node_modules/govuk-frontend/settings/' + filename],
    includePaths: ['node_modules/govuk-frontend/settings/']
  }).getStructured()
}

const parsedColoursApplied = parseSCSS('_colours-applied.scss')
let coloursApplied = {}
parsedColoursApplied.variables.forEach(colour => {
  coloursApplied[colour.name] = colour.compiledValue
})

// Since the palette is a map, we need to get them out differently
const parsedColoursPalette = parseSCSS('_colours-palette.scss')
let coloursPalette = {}
parsedColoursPalette.variables[0].mapValue.forEach(colour => {
  coloursPalette[`govuk-colour("${colour.name}")`] = colour.compiledValue
})

// combine both SCSS data objects - some Main colours are only in Palette
const coloursSCSS = Object.assign(coloursApplied, coloursPalette)

// process colours data
let colours = require('../data/colours.json')

assert.notStrictEqual(colours.main, undefined, 'colours.main is not defined')

for (var groupName in colours.main) {
  var group = colours.main[groupName]
  for (let colour of group) {
    colour.colour = coloursSCSS[colour.name]
  }
}

for (let colour of colours.greyscale) {
  colour.colour = coloursSCSS[colour.name]
}

for (let colour of colours.extended) {
  colour.colour = coloursSCSS[colour.name]
}

module.exports = colours
