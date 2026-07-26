import type { ComponentProps } from 'react'
import { mcn } from '#lib'

function Label({ className, ...restProps }: ComponentProps<'label'>) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: Consumers associate the reusable label through children or htmlFor
		<label
			className={mcn(
				'flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
				className,
			)}
			data-slot={'label'}
			{...restProps}
		/>
	)
}

export { Label }
