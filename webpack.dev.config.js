const path = require('path')

module.exports = {

	mode: 'development',

	module: {

		rules: [{

			test: /\.js$/,

			use: {

				loader: 'babel-loader',

				options: { presets: ['@babel/preset-env'] },

			}

		}, {

        test: /\.s[ac]ss$/i,

        use: [ 'style-loader', 'css-loader', 'sass-loader']

      }]

	},

	devtool: 'source-map',

	entry: {

    Lappy: './dist/Lappy.min.js',

    home: './demos/src/es/home.js',

    concept: './demos/src/es/concept.js',

    useful: './demos/src/es/useful.js'

  },

	devServer: {

    contentBase: path.resolve(__dirname, './demos'),

    watchContentBase: true,

    publicPath: '/js/',

    port: 3000

  },

	output: {

		filename: '[name].min.js',

		path: path.resolve(__dirname, 'demos/dist/js')

	},

	watch: true

};
