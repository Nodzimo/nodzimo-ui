import type { ComponentProps } from 'react'
import { mcn } from '#lib'

const CARD_SIZES = Object.freeze(['default', 'sm'] as const)

type CardSize = (typeof CARD_SIZES)[number]

type CardProps = ComponentProps<'div'> & {
	size?: CardSize
}

function Card({ className, size = 'default', ...restProps }: CardProps) {
	return (
		<div
			className={mcn(
				'group/card flex flex-col overflow-hidden',
				'gap-(--nui-card-spacing) py-(--nui-card-spacing)',
				'text-nui-card-foreground text-sm',
				'rounded-nui-xl ring-1 ring-nui-foreground/10',
				'bg-nui-card',
				'[--nui-card-spacing:--spacing(4)]',
				'has-[>img:first-child]:pt-0',
				'has-data-[slot=card-footer]:pb-0',
				'data-[size=sm]:has-data-[slot=card-footer]:pb-0 data-[size=sm]:[--nui-card-spacing:--spacing(3)]',
				'*:[img:first-child]:rounded-t-nui-xl *:[img:last-child]:rounded-b-nui-xl',
				className,
			)}
			data-size={size}
			data-slot={'card'}
			{...restProps}
		/>
	)
}

type CardHeaderProps = ComponentProps<'div'>

function CardHeader({ className, ...restProps }: CardHeaderProps) {
	return (
		<div
			className={mcn(
				'group/card-header @container/card-header grid auto-rows-min items-start',
				'gap-1 px-(--nui-card-spacing)',
				'rounded-t-nui-xl',
				'has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
				'[.border-b]:pb-(--nui-card-spacing)',
				className,
			)}
			data-slot={'card-header'}
			{...restProps}
		/>
	)
}

type CardTitleProps = ComponentProps<'div'>

function CardTitle({ className, ...restProps }: CardTitleProps) {
	return (
		<div
			className={mcn(
				'font-medium font-nui-heading text-base leading-snug group-data-[size=sm]/card:text-sm',
				className,
			)}
			data-slot={'card-title'}
			{...restProps}
		/>
	)
}

type CardDescriptionProps = ComponentProps<'div'>

function CardDescription({ className, ...restProps }: CardDescriptionProps) {
	return (
		<div
			className={mcn('text-nui-muted-foreground text-sm', className)}
			data-slot={'card-description'}
			{...restProps}
		/>
	)
}

type CardActionProps = ComponentProps<'div'>

function CardAction({ className, ...restProps }: CardActionProps) {
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

type CardContentProps = ComponentProps<'div'>

function CardContent({ className, ...restProps }: CardContentProps) {
	return (
		<div
			className={mcn('px-(--nui-card-spacing)', className)}
			data-slot={'card-content'}
			{...restProps}
		/>
	)
}

type CardFooterProps = ComponentProps<'div'>

function CardFooter({ className, ...restProps }: CardFooterProps) {
	return (
		<div
			className={mcn(
				'flex items-center rounded-b-nui-xl border-t bg-nui-muted/50 p-(--nui-card-spacing)',
				className,
			)}
			data-slot={'card-footer'}
			{...restProps}
		/>
	)
}

export {
	CARD_SIZES,
	Card,
	CardAction,
	type CardActionProps,
	CardContent,
	type CardContentProps,
	CardDescription,
	type CardDescriptionProps,
	CardFooter,
	type CardFooterProps,
	CardHeader,
	type CardHeaderProps,
	type CardProps,
	type CardSize,
	CardTitle,
	type CardTitleProps,
}
