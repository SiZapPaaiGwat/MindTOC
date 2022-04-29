module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: './src/index.tsx',
          content: './src/content.tsx'
        },
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js'
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false
        }
      }
    }
  }
}
