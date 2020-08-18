const path = require('path')

module.exports = {

	mode: 'production',

	module: {

		rules: [{

			test: /\.js$/,

			use: {

				loader: 'babel-loader',

				options: { presets: ['@babel/preset-env'] },

			}

		}]

	},

	devtool: 'source-map',

	entry: './src/index.js',

	output: {

		filename: 'Lappy.min.js',

		path: path.resolve(__dirname, 'dist'),

		library: "lappy",

		libraryTarget: "umd",

		publicPath: path.resolve(__dirname, 'dist')

	},

	watch: true

};
