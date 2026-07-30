import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { mcn } from '#lib'

type FieldSetProps = ComponentProps<'fieldset'>

function FieldSet({ className, ...restProps }: FieldSetProps) {
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

const FIELD_LEGEND_VARIANTS = Object.freeze(['legend', 'label'] as const)

type FieldLegendVariant = (typeof FIELD_LEGEND_VARIANTS)[number]

type FieldLegendProps = ComponentProps<'legend'> & {
	variant?: FieldLegendVariant
}

function FieldLegend({
	className,
	variant = 'legend',
	...restProps
}: FieldLegendProps) {
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

type FieldGroupProps = ComponentProps<'div'>

function FieldGroup({ className, ...restProps }: FieldGroupProps) {
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

type FieldProps = ComponentProps<'div'> & VariantProps<typeof fieldVariants>

type FieldOrientation = NonNullable<FieldProps['orientation']>

const FIELD_ORIENTATIONS = Object.freeze([
	'vertical',
	'horizontal',
	'responsive',
] as const satisfies readonly FieldOrientation[])

function Field({
	className,
	orientation = 'vertical',
	...restProps
}: FieldProps) {
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

export {
	FIELD_LEGEND_VARIANTS,
	FIELD_ORIENTATIONS,
	Field,
	FieldGroup,
	type FieldGroupProps,
	FieldLegend,
	type FieldLegendProps,
	type FieldLegendVariant,
	type FieldOrientation,
	type FieldProps,
	FieldSet,
	type FieldSetProps,
}
