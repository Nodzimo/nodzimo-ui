import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'
import { mcn } from '#lib'

type SeparatorProps = SeparatorPrimitive.Props

const SEPARATOR_ORIENTATIONS = Object.freeze([
	'horizontal',
	'vertical',
] as const satisfies readonly NonNullable<SeparatorProps['orientation']>[])

type SeparatorOrientation = (typeof SEPARATOR_ORIENTATIONS)[number]

function Separator({
	className,
	orientation = 'horizontal',
	...restProps
}: SeparatorProps) {
	return (
		<SeparatorPrimitive
			className={mcn(
				'shrink-0 bg-nui-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
				className,
			)}
			data-slot={'separator'}
			orientation={orientation}
			{...restProps}
		/>
	)
}

export {
	SEPARATOR_ORIENTATIONS,
	Separator,
	type SeparatorOrientation,
	type SeparatorProps,
}
