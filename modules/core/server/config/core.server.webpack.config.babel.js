import webpack from 'webpack';
import path from 'path';

const webpackConfig = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080/',
		'webpack/hot/only-dev-server',
		'bootstrap-loader',
		'./modules/core/client/core.client.run'
	],
	output: {
		path: path.join(__dirname, '../../../../public'),
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'modules'],
		extension: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.html$/,
				loader: 'raw'
			},
			{
				test: /\.scss$/,
				loaders: [
					'style',
					'css',
					'autoprefixer?browsers=last 3 versions',
					'sass?outputStyle=expanded'
				]
			}, 
			{
				test: /\.(woff2?|ttf|eot|svg)$/,
				loader: 'url?limit=10000'
			}, 
			{
				test: /bootstrap-sass\/assets\/javascripts\//,
				loader: 'imports?jQuery=jquery'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	devServer: {
		hot: true,
		proxy: {
			'*': 'http://localhost:3000'
		}
	}
};

export default webpackConfig;