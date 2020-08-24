const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lappyPath = path.resolve(__dirname, './dist/');

module.exports = {

	mode: 'development',

	resolve: { alias: { Lappy: lappyPath } },

	plugins: [ new MiniCssExtractPlugin({ filename: '[name].css' }) ],

	module: {

		rules: [{

			test: /\.js$/,

			exclude: /node_modules/,

			use: {

				loader: 'babel-loader',

				options: { presets: ['@babel/preset-env'] },

			}

		}, {

        test: /\.s[ac]ss$/i,

        use: [{
					loader: MiniCssExtractPlugin.loader
				}, 'css-loader', 'sass-loader'],

				sideEffects: true

      }]

	},

	devtool: 'source-map',

	entry: {

		home: './demo/src/es/home.js',

		concept: './demo/src/es/concept.js',

		useful: './demo/src/es/useful.js'

  },

	devServer: {

		contentBase: path.resolve(__dirname, 'demo'),

    watchContentBase: true,

    publicPath: '/assets/',

    port: 3000

  },

	output: {

		filename: '[name].min.js',

		path: path.resolve(__dirname, './demo/dist/js')

	},

	watch: true

};
