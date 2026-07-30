import type { ComponentProps, ReactNode } from 'react'
import { Separator } from '#client/components/separator'
import { mcn } from '#lib'

type FieldSeparatorProps = ComponentProps<'div'> & {
	children?: ReactNode
}

function FieldSeparator({
	children,
	className,
	...restProps
}: FieldSeparatorProps) {
	return (
		<div
			className={mcn(
				'relative -my-2 h-5 text-sm',
				'group-data-[variant=outline]/field-group:-mb-2',
				className,
			)}
			data-content={!!children}
			data-slot={'field-separator'}
			{...restProps}
		>
			<Separator className={'absolute inset-0 top-1/2'} />
			{children && (
				<span
					className={
						'relative mx-auto block w-fit bg-nui-background px-2 text-nui-muted-foreground'
					}
					data-slot={'field-separator-content'}
				>
					{children}
				</span>
			)}
		</div>
	)
}

export { FieldSeparator, type FieldSeparatorProps }
