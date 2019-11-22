const baseConfig = {
}

module.exports = {
  productionSourceMap: false,
  parallel: false,
  css: {
    // extract: false,
  },
  configureWebpack: () => {
    let extraConfig = {}
    if (process.env.NODE_ENV === 'production') {
      extraConfig = {
      }
    } else {
      extraConfig = {
        entry: './examples/main.js',
      }
    }
    return Object.assign(baseConfig, extraConfig)
  },
  chainWebpack: (config) => {
    // config.module.rule('ts').uses.delete('thread-loader')
    // config.module.rule('tsx').uses.delete('thread-loader')
    config.module.rule('ts').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
    config.module
    .rule('ts')
      .use('ts-loader')
        .loader('ts-loader')
          .tap(opts => {
            opts.transpileOnly = false
            opts.happyPackMode = false
            return opts
          })
    config.module
    .rule('tsx')
      .use('ts-loader')
        .loader('ts-loader')
          .tap(opts => {
            opts.transpileOnly = false
            opts.happyPackMode = false
            return opts
          })
  },
}
