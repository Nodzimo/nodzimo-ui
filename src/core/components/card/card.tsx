import type { ComponentProps } from 'react'
import { mcn } from '#lib'

function Card({
	className,
	size = 'default',
	...restProps
}: ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
	return (
		<div
			className={mcn(
				'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-card-foreground text-sm ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-[>img:first-child]:pt-0 has-data-[slot=card-footer]:pb-0 data-[size=sm]:has-data-[slot=card-footer]:pb-0 data-[size=sm]:[--card-spacing:--spacing(3)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
				className,
			)}
			data-size={size}
			data-slot={'card'}
			{...restProps}
		/>
	)
}

function CardHeader({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn(
				'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
				className,
			)}
			data-slot={'card-header'}
			{...restProps}
		/>
	)
}

function CardTitle({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn(
				'cn-font-heading font-medium text-base leading-snug group-data-[size=sm]/card:text-sm',
				className,
			)}
			data-slot={'card-title'}
			{...restProps}
		/>
	)
}

function CardDescription({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn('text-muted-foreground text-sm', className)}
			data-slot={'card-description'}
			{...restProps}
		/>
	)
}

function CardAction({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn(
				'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
				className,
			)}
			data-slot={'card-action'}
			{...restProps}
		/>
	)
}

function CardContent({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn('px-(--card-spacing)', className)}
			data-slot={'card-content'}
			{...restProps}
		/>
	)
}

function CardFooter({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn(
				'flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)',
				className,
			)}
			data-slot={'card-footer'}
			{...restProps}
		/>
	)
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
}
