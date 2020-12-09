const UglifyjsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.optimization = {
				minimizer: [new UglifyjsPlugin()],
			}
		} else {
			// 为开发环境修改配置...
			config.devServer = {
				port: '9001',
				proxy: {
					'/v1': {
						target: 'http://web-rd.com:2525',
						changeOrigin: true,
					},
					'/v2': {
						target: 'http://web-rd.com:2521',
						changeOrigin: true,
					}
				}
			}
		}
	}
}
