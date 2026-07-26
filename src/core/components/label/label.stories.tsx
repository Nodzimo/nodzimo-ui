// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '#client'
import { Label } from '.'

const meta = {
	args: {
		children: 'Email address',
		htmlFor: 'email',
	},
	argTypes: {
		children: {
			table: {
				defaultValue: { summary: 'undefined' },
				type: { summary: 'ReactNode' },
			},
		},
		htmlFor: {
			description: 'ID of the form control this label identifies',
			table: {
				defaultValue: { summary: 'undefined' },
			},
		},
	},
	component: Label,
	render: ({ htmlFor, ...restArgs }) => {
		return (
			<div className={'grid gap-2'}>
				<Label {...restArgs} htmlFor={htmlFor} />
				<Input id={htmlFor} placeholder={'mail@example.com'} type={'email'} />
			</div>
		)
	},
	title: 'Core/Components/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
