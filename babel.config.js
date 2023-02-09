module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
    [
      '@vue/app',
      {
        'useBuiltIns': false
      }
    ]
  ]
}
