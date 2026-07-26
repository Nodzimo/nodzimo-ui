// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Label } from '#core'
import { Checkbox } from '.'

const CHECKBOX_DEFAULTS = {
	ariaInvalid: false,
	disabled: false,
	indeterminate: false,
	readOnly: false,
	required: false,
} as const

const meta = {
	args: {
		'aria-invalid': CHECKBOX_DEFAULTS.ariaInvalid,
		disabled: CHECKBOX_DEFAULTS.disabled,
		indeterminate: CHECKBOX_DEFAULTS.indeterminate,
		onCheckedChange: fn(),
		readOnly: CHECKBOX_DEFAULTS.readOnly,
		required: CHECKBOX_DEFAULTS.required,
	},
	argTypes: {
		'aria-invalid': {
			control: 'boolean',
			table: {
				defaultValue: { summary: String(CHECKBOX_DEFAULTS.ariaInvalid) },
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				defaultValue: { summary: String(CHECKBOX_DEFAULTS.disabled) },
			},
		},
		indeterminate: {
			control: 'boolean',
			description: 'Shows the mixed selection state',
			table: {
				defaultValue: { summary: String(CHECKBOX_DEFAULTS.indeterminate) },
			},
		},
		readOnly: {
			control: 'boolean',
			table: {
				defaultValue: { summary: String(CHECKBOX_DEFAULTS.readOnly) },
			},
		},
		required: {
			control: 'boolean',
			table: {
				defaultValue: { summary: String(CHECKBOX_DEFAULTS.required) },
			},
		},
	},
	component: Checkbox,
	render: (args) => {
		return (
			<Label>
				<Checkbox {...args} />
				Accept terms and conditions
			</Label>
		)
	},
	title: 'Client/Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
