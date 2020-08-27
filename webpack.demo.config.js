const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lappyPath = path.resolve(__dirname, './dist/');
const dev = process.env.NODE_ENV === "development";

module.exports = {

	mode: dev ? "development" : "production",

	resolve: { alias: { Lappy: lappyPath } },

	plugins: [ new MiniCssExtractPlugin({ filename: '[name].css' }) ],

	module: {

		rules: [{

			test: /\.js$/,

			exclude: /node_modules/,

			use: { loader: 'babel-loader' }

		}, {

        test: /\.s[ac]ss$/i,

        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']

      }]

	},

	entry: {

		home: './demo/src/es/home.js',

		concept: './demo/src/es/concept.js',

		useful: './demo/src/es/useful.js'

  },

	devtool: 'source-map',

	devServer: {

		contentBase: path.resolve(__dirname, 'demo'),

    watchContentBase: dev,

    publicPath: '/assets/',

    port: 3000

  },

	output: { filename: '[name].js' },

	watch: dev

};
