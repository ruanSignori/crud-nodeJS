
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./crud-node.cjs.production.min.js')
} else {
  module.exports = require('./crud-node.cjs.development.js')
}
