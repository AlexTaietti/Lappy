const path = require('path')

module.exports = {

	entry: {

		index: './tmp/js/demos/index.js',

		concept: './tmp/js/demos/concept.js',

		useful: './tmp/js/demos/useful.js'

	},

	output: {

		path: path.resolve(__dirname, './dist/js'),

		filename: '[name].js'

	},

	devtool: 'source-map',

	mode: 'development',

	watch: true

};
