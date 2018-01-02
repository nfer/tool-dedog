var webpack = require('webpack');

module.exports = {
	entry:'./src/index.js',
	plugins:[new webpack.optimize.UglifyJsPlugin({
		compress:{
			drop_console:true
		}
	})],
	output:{
		filename:'./dist/index.min.js'
	}
};
