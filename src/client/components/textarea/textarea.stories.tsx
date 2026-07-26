// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '.'

const TEXTAREA_DEFAULTS = {
	ariaInvalid: false,
	disabled: false,
	required: false,
} as const

const meta = {
	args: {
		'aria-invalid': TEXTAREA_DEFAULTS.ariaInvalid,
		'aria-label': '',
		disabled: TEXTAREA_DEFAULTS.disabled,
		placeholder: 'Type your message here',
		required: TEXTAREA_DEFAULTS.required,
	},
	argTypes: {
		'aria-invalid': {
			table: {
				defaultValue: { summary: String(TEXTAREA_DEFAULTS.ariaInvalid) },
			},
		},
		'aria-label': {
			description:
				'Accessible name for assistive technology (not rendered visually)',
			table: {
				defaultValue: { summary: 'undefined' },
			},
		},
		disabled: {
			table: {
				defaultValue: { summary: String(TEXTAREA_DEFAULTS.disabled) },
			},
		},
		placeholder: {
			table: {
				defaultValue: { summary: 'undefined' },
			},
		},
		required: {
			table: {
				defaultValue: { summary: String(TEXTAREA_DEFAULTS.required) },
			},
		},
	},
	component: Textarea,
	title: 'Client/Components/Textarea',
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
