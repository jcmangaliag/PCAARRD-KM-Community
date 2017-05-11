'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpackConfig = {
	devtool: 'inline-source-map',
	entry: ['webpack-dev-server/client?http://127.0.0.1:8080/', 'webpack/hot/only-dev-server', 'bootstrap-loader', './modules/core/client/core.client.run'],
	output: {
		path: _path2.default.join(__dirname, '../../../../public'),
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'modules'],
		extension: ['', '.js'],
		alias: {
			angular: "angular/angular.min.js"
		}
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		}, {
			test: /\.html$/,
			loader: 'raw'
		}, {
			test: /(\.scss|\.css)$/,
			loaders: ['style', 'css', 'autoprefixer?browsers=last 3 versions', 'sass?outputStyle=expanded']
		}, {
			test: /bootstrap-sass\/assets\/javascripts\//,
			loader: 'imports?jQuery=jquery'
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.(ttf|eot|svg|jpe?g|png|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file-loader"
		}, {
			test: /angular\.min\.js$/,
			loader: 'exports?angular'
		}]
	},
	plugins: [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin()],
	devServer: {
		hot: true,
		proxy: {
			'*': 'http://localhost:3000'
		}
	}
};

exports.default = webpackConfig;