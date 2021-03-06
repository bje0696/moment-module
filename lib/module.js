const { resolve } = require('path')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const defaults = {
  locales: [],
  defaultLocale: false,
  plugin: true
}

function momentModule(moduleOptions) {
  if (Array.isArray(moduleOptions)) {
    moduleOptions = { locales: moduleOptions }
  }

  const options = {
    ...defaults,
    ...this.options.moment,
    ...moduleOptions
  }

  this.extendBuild((config) => {
    config.plugins.push(new MomentLocalesPlugin({
      localesToKeep: options.locales
    }))
  })

  if (!options.plugin) {
    return
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'moment.js',
    options
  })
}

module.exports = momentModule
module.exports.meta = require('../package.json')
