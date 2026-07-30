import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ReactNode, useMemo } from 'react'
import { Separator } from '#client/components/separator'
import { Label } from '#core/components/label'
import { mcn } from '#lib'

function FieldSet({ className, ...restProps }: ComponentProps<'fieldset'>) {
	return (
		<fieldset
			className={mcn(
				'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
				className,
			)}
			data-slot={'field-set'}
			{...restProps}
		/>
	)
}

function FieldLegend({
	className,
	variant = 'legend',
	...restProps
}: ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
	return (
		<legend
			className={mcn(
				'mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
				className,
			)}
			data-slot={'field-legend'}
			data-variant={variant}
			{...restProps}
		/>
	)
}

function FieldGroup({ className, ...restProps }: ComponentProps<'div'>) {
	return (
		<div
			className={mcn(
				'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
				className,
			)}
			data-slot={'field-group'}
			{...restProps}
		/>
	)
}

const fieldVariants = cva(
	'group/field flex w-full gap-2 data-[invalid=true]:text-nui-destructive',
	{
		defaultVariants: {
			orientation: 'vertical',
		},
		variants: {
			orientation: {
				horizontal:
					'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
				responsive:
					'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
				vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
			},
		},
	},
)

function Field({
	className,
	orientation = 'vertical',
	...restProps
}: ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: Field groups one control while FieldSet provides the semantic fieldset for related controls
		<div
			className={mcn(fieldVariants({ orientation }), className)}
			data-orientation={orientation}
			data-slot={'field'}
			role={'group'}
			{...restProps}
		/>
	)
}

function FieldContent({ className, ...restProps }: ComponentProps<'div'>) {
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

function FieldLabel({ className, ...restProps }: ComponentProps<typeof Label>) {
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

function FieldTitle({ className, ...restProps }: ComponentProps<'div'>) {
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

function FieldDescription({ className, ...restProps }: ComponentProps<'p'>) {
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

function FieldSeparator({
	children,
	className,
	...restProps
}: ComponentProps<'div'> & {
	children?: ReactNode
}) {
	return (
		<div
			className={mcn(
				'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
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

function FieldError({
	className,
	children,
	errors,
	...restProps
}: ComponentProps<'div'> & {
	errors?: Array<{ message?: string } | undefined>
}) {
	const content = useMemo(() => {
		if (children) {
			return children
		}

		if (!errors?.length) {
			return null
		}

		const uniqueErrors = [
			...new Map(errors.map((error) => [error?.message, error])).values(),
		]

		if (uniqueErrors?.length === 1) {
			return uniqueErrors[0]?.message
		}

		return (
			<ul className={'ms-4 flex list-disc flex-col gap-1'}>
				{uniqueErrors.map(
					(error, index) =>
						// biome-ignore lint/suspicious/noArrayIndexKey: Error items are stateless and never reordered
						error?.message && <li key={index}>{error.message}</li>,
				)}
			</ul>
		)
	}, [children, errors])

	if (!content) {
		return null
	}

	return (
		<div
			className={mcn('font-normal text-nui-destructive text-sm', className)}
			data-slot={'field-error'}
			role={'alert'}
			{...restProps}
		>
			{content}
		</div>
	)
}

export {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
}
