import type { ComponentProps } from 'react'
import { Label, type LabelProps } from '#core/components/label'
import { mcn } from '#lib'

type FieldContentProps = ComponentProps<'div'>

function FieldContent({ className, ...restProps }: FieldContentProps) {
	return (
		<div
			className={mcn(
				'group/field-content flex flex-1 flex-col gap-0.5 leading-snug',
				className,
			)}
			data-slot={'field-content'}
			{...restProps}
		/>
	)
}

type FieldLabelProps = LabelProps

function FieldLabel({ className, ...restProps }: FieldLabelProps) {
	return (
		<Label
			className={mcn(
				'group/field-label peer/field-label flex w-fit gap-2 leading-snug has-[>[data-slot=field]]:rounded-nui-lg has-[>[data-slot=field]]:border has-data-checked:border-nui-primary/30 has-data-checked:bg-nui-primary/5 *:data-[slot=field]:p-2.5 group-data-[disabled=true]/field:opacity-50 dark:has-data-checked:border-nui-primary/20 dark:has-data-checked:bg-nui-primary/10',
				'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
				className,
			)}
			data-slot={'field-label'}
			{...restProps}
		/>
	)
}

type FieldTitleProps = ComponentProps<'div'>

function FieldTitle({ className, ...restProps }: FieldTitleProps) {
	return (
		<div
			className={mcn(
				'flex w-fit items-center gap-2 font-medium text-sm group-data-[disabled=true]/field:opacity-50',
				className,
			)}
			data-slot={'field-label'}
			{...restProps}
		/>
	)
}

type FieldDescriptionProps = ComponentProps<'p'>

function FieldDescription({ className, ...restProps }: FieldDescriptionProps) {
	return (
		<p
			className={mcn(
				'text-start font-normal text-nui-muted-foreground text-sm leading-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
				'nth-last-2:-mt-1 last:mt-0',
				'[&>a:hover]:text-nui-primary [&>a]:underline [&>a]:underline-offset-4',
				className,
			)}
			data-slot={'field-description'}
			{...restProps}
		/>
	)
}

export {
	FieldContent,
	type FieldContentProps,
	FieldDescription,
	type FieldDescriptionProps,
	FieldLabel,
	type FieldLabelProps,
	FieldTitle,
	type FieldTitleProps,
}
