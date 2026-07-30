// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '#client/components/input'
import {
	STRING_UNION_SUMMARY,
	UNION_SEPARATOR,
} from '../../../storybook/constants'
import {
	FIELD_LEGEND_VARIANTS,
	FIELD_ORIENTATIONS,
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	type FieldLegendVariant,
	type FieldProps,
	FieldSet,
} from '.'

const FIELD_DEFAULTS = {
	dataDisabled: false,
	dataInvalid: false,
	legendVariant: FIELD_LEGEND_VARIANTS[0],
} as const

type FieldStoryArgs = FieldProps & {
	legendVariant: FieldLegendVariant
}

const meta = {
	args: {
		'data-disabled': FIELD_DEFAULTS.dataDisabled,
		'data-invalid': FIELD_DEFAULTS.dataInvalid,
		legendVariant: FIELD_DEFAULTS.legendVariant,
		orientation: FIELD_ORIENTATIONS[0],
	},
	argTypes: {
		'data-disabled': {
			table: {
				defaultValue: { summary: String(FIELD_DEFAULTS.dataDisabled) },
			},
		},
		'data-invalid': {
			table: {
				defaultValue: { summary: String(FIELD_DEFAULTS.dataInvalid) },
			},
		},
		legendVariant: {
			control: 'inline-radio',
			options: FIELD_LEGEND_VARIANTS,
			table: {
				defaultValue: { summary: `'${FIELD_DEFAULTS.legendVariant}'` },
				type: {
					detail: FIELD_LEGEND_VARIANTS.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
		orientation: {
			control: 'inline-radio',
			options: FIELD_ORIENTATIONS,
			table: {
				type: {
					detail: FIELD_ORIENTATIONS.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
	},
	component: Field,
	render: ({ legendVariant, ...restArgs }) => {
		const dataDisabled = restArgs['data-disabled']
		const dataInvalid = restArgs['data-invalid']

		return (
			<FieldSet className={'w-md'}>
				<FieldLegend variant={legendVariant}>Profile</FieldLegend>
				<FieldDescription>Fill in your profile information.</FieldDescription>
				<FieldGroup>
					<Field {...restArgs}>
						<FieldContent>
							<FieldLabel htmlFor={'field-story-name'}>Name</FieldLabel>
							<FieldDescription>
								Provide your full name for identification
							</FieldDescription>
							{dataInvalid && (
								<FieldError
									errors={[
										{
											message: 'Name must be at least 2 characters',
										},
										{
											message:
												'Use only letters, spaces, hyphens, and apostrophes',
										},
									]}
								/>
							)}
						</FieldContent>
						<Input
							aria-invalid={dataInvalid}
							autoComplete={'name'}
							className={'w-auto'}
							disabled={dataDisabled}
							id={'field-story-name'}
							placeholder={'Sefo Nodzimo'}
						/>
					</Field>
				</FieldGroup>
			</FieldSet>
		)
	},
	title: 'Client/Components/Field',
} satisfies Meta<FieldStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
