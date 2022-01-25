const path = require('path')

const rawPaths = require('../config/paths.json')

for (const i in rawPaths) {
  if (typeof (rawPaths[i]) === 'string') {
    module.exports[i] = path.normalize(rawPaths[i])
  } else {
    module.exports[i] = rawPaths[i]
  }
}
