/**
 * Config
 */
const browsersync = require('./dev-server')
const navigation = require('./navigation')
const paths = require('./paths')
const ports = require('./ports')

module.exports = {
  browsersync,
  navigation,
  paths,
  ports
}
