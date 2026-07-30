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
				<FieldLegend variant={legendVariant}>Account settings</FieldLegend>
				<FieldDescription>
					Manage your public profile and notification preferences
				</FieldDescription>
				<FieldGroup>
					<Field {...restArgs}>
						<FieldLabel htmlFor={'field-story-username'}>Username</FieldLabel>
						<FieldContent className={'min-w-64'}>
							<Input
								aria-invalid={dataInvalid}
								autoComplete={'username'}
								disabled={dataDisabled}
								id={'field-story-username'}
								placeholder={'ExampleUser123'}
							/>
							<FieldDescription>
								Choose a unique name for your public profile
							</FieldDescription>
							{dataInvalid && (
								<FieldError
									errors={[
										{
											message: 'Username must be at least 3 characters',
										},
										{
											message: 'Use only letters, numbers, and underscores',
										},
									]}
								/>
							)}
						</FieldContent>
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
