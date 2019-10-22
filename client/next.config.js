const withOffline = require('next-offline')
const webpackDevMiddleware = require('webpack-dev-middleware')

// module.exports = withOffline({
// 	target: process.env.NEXT_TARGET || 'serverless',
// 	workboxOpts: {
// 		swDest: 'static/service-worker.js',
// 		runtimeCaching: [
// 			{
// 				urlPattern: /[.](png|jpg|ico|css)/,
// 				handler: 'CacheFirst',
// 				options: {
// 					cacheName: 'assets-cache',
// 					cacheableResponse: {
// 						statuses: [0, 200]
// 					}
// 				}
// 			},
// 			{
// 				urlPattern: /^https:\/\/code\.getmdl\.io.*/,
// 				handler: 'CacheFirst',
// 				options: {
// 					cacheName: 'lib-cache'
// 				}
// 			},
// 			{
// 				urlPattern: /^http.*/,
// 				handler: 'NetworkFirst',
// 				options: {
// 					cacheName: 'http-cache'
// 				}
// 			}
// 		]
// 	}
// })

module.exports = {
	webpackDevMiddleware: config => {
		// Solve compiling problem via vagrant
		config.watchOptions = {
			poll: 1000, // Check for changes every second
			aggregateTimeout: 300 // delay before rebuilding
		}
		return config
	}
}
