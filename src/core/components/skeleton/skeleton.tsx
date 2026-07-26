import type { ComponentProps } from 'react'
import { mcn } from '#lib'

type SkeletonProps = ComponentProps<'div'>

function Skeleton({ className, ...restProps }: SkeletonProps) {
	return (
		<div
			className={mcn('animate-pulse rounded-nui-md bg-nui-muted', className)}
			data-slot={'skeleton'}
			{...restProps}
		/>
	)
}

export { Skeleton, type SkeletonProps }
