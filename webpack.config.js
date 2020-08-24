const path = require('path');
const dev = process.env.NODE_ENV === "development";

module.exports = {

	mode: dev ? "development" : "production",

	module: {

		rules: [{

			test: /\.js$/,

			exclude: /node_modules/,

			use: {

				loader: 'babel-loader',

				options: { presets: ['@babel/preset-env'] }

			}

		}]

	},

	devtool: 'source-map',

	entry: './src/index.js',

	output: {

		filename: 'Lappy.min.js',

		path: path.resolve(__dirname, 'dist'),

		library: "Lappy",

		libraryTarget: "umd",

		publicPath: '/js/'

	},

	watch: dev

};
