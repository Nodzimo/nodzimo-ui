import type { ComponentProps } from 'react'
import { mcn } from '#lib'

function Skeleton({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn('animate-pulse rounded-md bg-muted', className)}
			data-slot={'skeleton'}
			{...restProps}
		/>
	)
}

export { Skeleton }
