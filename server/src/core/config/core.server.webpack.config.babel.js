import webpack from 'webpack';
import path from 'path';

const webpackConfig = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080/',
		'webpack/hot/only-dev-server',
		'bootstrap-loader',
		'./client/core/core.client.run'
	],
	output: {
		path: path.join(__dirname, '../../../../public'),
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'client'],
		extension: ['', '.js', '.scss'],
		alias: {
			angular: "angular/angular.min.js"
		}
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
				test: /(\.scss|\.css)$/,
				loaders: [
					'style',
					'css',
					'autoprefixer?browsers=last 3 versions',
					'sass?outputStyle=expanded'
				]
			},
			{
				test: /bootstrap-sass\/assets\/javascripts\//,
				loader: 'imports?jQuery=jquery'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},
      		{
      			test: /\.(ttf|eot|svg|jpe?g|png|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      			loader: "file-loader"
      		},
      		{
	            test: /angular\.min\.js$/,
	            loader: 'exports?angular'
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
