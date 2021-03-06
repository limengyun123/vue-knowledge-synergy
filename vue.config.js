module.exports = {
	devServer: {
		open: true, //是否自动弹出浏览器页面
		host: "localhost", 
		port: '8080', 
		https: false,   //是否使用https协议
		hotOnly: false, //是否开启热更新
		proxy: {
			'/api': {
				target: 'http://81.68.71.40:8080', //API服务器的地址
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/download': {
				target: 'http://81.68.71.40:8080', //API服务器的地址
				changeOrigin: true,
				pathRewrite: {
					'^/download': ''
				}
			},
		},
	}
}
