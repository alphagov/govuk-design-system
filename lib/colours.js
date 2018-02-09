const assert = require('assert')
const scssToJson = require('scss-to-json')

const coloursAppliedSCSS = scssToJson('./node_modules/@govuk-frontend/globals/settings/_colours-applied.scss', {
  dependencies: [{path: './node_modules/@govuk-frontend/globals/settings/_colours-palette.scss'}]
})

const coloursPaletteSCSS = scssToJson('./node_modules/@govuk-frontend/globals/settings/_colours-palette.scss')

// combine both SCSS data objects - some Main colours are only in Palette
const coloursSCSS = Object.assign(coloursAppliedSCSS, coloursPaletteSCSS)

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
