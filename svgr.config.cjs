const template = ({ componentName, jsx }, { tpl }) => tpl`
import type { JSX } from 'react'

const ${componentName} = (props: JSX.IntrinsicElements['svg']) => ${jsx}

export default ${componentName}
`

module.exports = {
	filenameCase: 'kebab',
	jsxRuntime: 'automatic',
	prettier: false,
	template,
	typescript: true,
}
