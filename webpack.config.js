const path = require('path');

const outputDir = path.resolve(__dirname, 'dist/js/');

module.exports = {

	entry: path.resolve(__dirname, 'src/js/script.js'),

	output: {
		path: outputDir,
		filename: 'script.js'
	},

	watch: true

};