// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { PropsWithChildren } from 'react'
import { mcn } from '#lib'
import {
	STRING_UNION_SUMMARY,
	UNION_SEPARATOR,
} from '../../../storybook/constants'
import { SEPARATOR_ORIENTATIONS, Separator } from '.'

function DescriptionList(props: PropsWithChildren) {
	return <dl {...props} className={'flex justify-between'} />
}

function DescriptionDetails(props: PropsWithChildren) {
	return <dd {...props} className={'text-nui-muted-foreground'} />
}

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
					'flex items-center gap-2',
				)}
			>
				<div>First</div>
				<Separator {...args} />
				<div>Second</div>
			</div>
		)
	},
}

export const Vertical: Story = {
	render: () => {
		return (
			<div className={'flex gap-4'}>
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
			<div className={'flex w-xs flex-col gap-2'}>
				<DescriptionList>
					<dt>Item 1</dt>
					<DescriptionDetails>Value 1</DescriptionDetails>
				</DescriptionList>
				<Separator />
				<DescriptionList>
					<dt>Item 2</dt>
					<DescriptionDetails>Value 2</DescriptionDetails>
				</DescriptionList>
				<Separator />
				<DescriptionList>
					<dt>Item 3</dt>
					<DescriptionDetails>Value 3</DescriptionDetails>
				</DescriptionList>
			</div>
		)
	},
}
