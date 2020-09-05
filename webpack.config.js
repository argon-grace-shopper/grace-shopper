const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader', // translates CSS into CommonJS
      //     },
      //     {
      //       loader: 'less-loader', // compiles Less to CSS
      //       options: {
      //         lessOptions: {
      //           // If you are using less-loader@5 please spread the lessOptions to options directly
      //           modifyVars: {
      //             'primary-color': '#1DA57A',
      //             'link-color': '#1DA57A',
      //             'border-radius-base': '2px',
      //           },
      //           javascriptEnabled: true,
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
}
