import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'
import { mcn } from '#lib'

type SeparatorProps = SeparatorPrimitive.Props

function Separator({
	className,
	orientation = 'horizontal',
	...restProps
}: SeparatorProps) {
	return (
		<SeparatorPrimitive
			className={mcn(
				'shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
				className,
			)}
			data-slot={'separator'}
			orientation={orientation}
			{...restProps}
		/>
	)
}

export { Separator, type SeparatorProps }
