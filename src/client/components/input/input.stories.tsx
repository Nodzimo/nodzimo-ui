// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	STRING_UNION_SUMMARY,
	UNION_SEPARATOR,
} from '../../../storybook/constants'
import { INPUT_SUPPORTED_TYPES, Input } from '.'

const INPUT_DEFAULTS = {
	ariaInvalid: false,
	disabled: false,
	required: false,
	type: 'text',
} as const

const meta = {
	args: {
		'aria-invalid': INPUT_DEFAULTS.ariaInvalid,
		'aria-label': '',
		disabled: INPUT_DEFAULTS.disabled,
		placeholder: 'Enter text',
		required: INPUT_DEFAULTS.required,
		type: INPUT_DEFAULTS.type,
	},
	argTypes: {
		'aria-invalid': {
			table: {
				defaultValue: { summary: String(INPUT_DEFAULTS.ariaInvalid) },
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
				defaultValue: { summary: String(INPUT_DEFAULTS.disabled) },
			},
		},
		placeholder: {
			table: {
				defaultValue: { summary: 'undefined' },
			},
		},
		required: {
			table: {
				defaultValue: { summary: String(INPUT_DEFAULTS.required) },
			},
		},
		type: {
			control: 'inline-radio',
			description:
				'NUI-styled input types (other native types remain accepted)',
			options: INPUT_SUPPORTED_TYPES,
			table: {
				defaultValue: { summary: `'${INPUT_DEFAULTS.type}'` },
				type: {
					detail: INPUT_SUPPORTED_TYPES.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
	},
	component: Input,
	title: 'Client/Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
