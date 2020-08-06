const path = require('path')

module.exports = {

	entry: {

		index: './tmp/js/index.js',

		concept: './tmp/js/concept.js',
		
		useful: './tmp/js/useful.js'

	},

	output: {

		path: path.resolve(__dirname, './dist/js'),

		filename: '[name].js'

	},

	devtool: 'source-map',

	mode: 'development',

	watch: true

};
