// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { mcn } from '#lib'
import {
	STRING_UNION_SUMMARY,
	UNION_SEPARATOR,
} from '../../../storybook/constants'
import { SEPARATOR_ORIENTATIONS, Separator } from '.'

const meta = {
	args: {
		orientation: SEPARATOR_ORIENTATIONS[0],
	},
	argTypes: {
		orientation: {
			control: 'inline-radio',
			options: SEPARATOR_ORIENTATIONS,
			table: {
				type: {
					detail: SEPARATOR_ORIENTATIONS.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
	},
	component: Separator,
	title: 'Client/Components/Separator',
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => {
		return (
			<div
				className={mcn(
					args.orientation === 'horizontal' ? 'flex-col' : 'flex-row',
					'flex gap-2',
				)}
			>
				<div>Item 1</div>
				<Separator {...args} />
				<div>Item 2</div>
			</div>
		)
	},
}

export const Vertical: Story = {
	render: () => {
		return (
			<div className={'flex h-5 items-center gap-4 text-sm'}>
				<div>Blog</div>
				<Separator orientation={'vertical'} />
				<div>Docs</div>
				<Separator orientation={'vertical'} />
				<div>Source</div>
			</div>
		)
	},
}

export const List: Story = {
	render: () => {
		return (
			<div className={'flex w-full max-w-sm flex-col gap-2 text-sm'}>
				<dl className={'flex items-center justify-between'}>
					<dt>Item 1</dt>
					<dd className={'text-nui-muted-foreground'}>Value 1</dd>
				</dl>
				<Separator />
				<dl className={'flex items-center justify-between'}>
					<dt>Item 2</dt>
					<dd className={'text-nui-muted-foreground'}>Value 2</dd>
				</dl>
				<Separator />
				<dl className={'flex items-center justify-between'}>
					<dt>Item 3</dt>
					<dd className={'text-nui-muted-foreground'}>Value 3</dd>
				</dl>
			</div>
		)
	},
}
