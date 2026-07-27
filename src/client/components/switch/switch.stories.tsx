// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Label } from '#core'
import {
	STRING_UNION_SUMMARY,
	UNION_SEPARATOR,
} from '../../../storybook/constants'
import { SWITCH_SIZES, Switch } from '.'

const SWITCH_DEFAULTS = {
	ariaInvalid: false,
	disabled: false,
	readOnly: false,
	required: false,
} as const

const meta = {
	args: {
		'aria-invalid': SWITCH_DEFAULTS.ariaInvalid,
		disabled: SWITCH_DEFAULTS.disabled,
		onCheckedChange: fn(),
		readOnly: SWITCH_DEFAULTS.readOnly,
		required: SWITCH_DEFAULTS.required,
		size: SWITCH_SIZES[0],
	},
	argTypes: {
		'aria-invalid': {
			table: {
				defaultValue: { summary: String(SWITCH_DEFAULTS.ariaInvalid) },
			},
		},
		disabled: {
			table: {
				defaultValue: { summary: String(SWITCH_DEFAULTS.disabled) },
			},
		},
		readOnly: {
			table: {
				defaultValue: { summary: String(SWITCH_DEFAULTS.readOnly) },
			},
		},
		required: {
			table: {
				defaultValue: { summary: String(SWITCH_DEFAULTS.required) },
			},
		},
		size: {
			options: SWITCH_SIZES,
			table: {
				type: {
					detail: SWITCH_SIZES.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
	},
	component: Switch,
	render: (args) => {
		return (
			<Label>
				<Switch {...args} />
				Notifications
			</Label>
		)
	},
	title: 'Client/Components/Switch',
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
	render: ({ size: _size, ...restArgs }) => {
		return (
			<div className={'flex flex-col gap-5'}>
				<Label>
					<Switch {...restArgs} size={'sm'} />
					Small
				</Label>
				<Label>
					<Switch {...restArgs} size={'default'} />
					Default
				</Label>
			</div>
		)
	},
}
