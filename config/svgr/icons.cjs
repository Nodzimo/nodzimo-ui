const baseConfig = require('../../svgr.config.cjs')

module.exports = {
	...baseConfig,
	icon: true,
	outDir: 'src/core/icons/generated',
}
