// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '.'

const meta = {
	component: Skeleton,
	decorators: [
		(Story) => {
			return (
				<div className={'flex w-sm justify-center'}>
					<Story />
				</div>
			)
		},
	],
	title: 'Core/Components/Skeleton',
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => {
		return <Skeleton className={'size-24'} />
	},
}

export const Avatar: Story = {
	render: () => {
		return (
			<div className={'flex w-fit items-center gap-4'}>
				<Skeleton className={'size-10 shrink-0 rounded-full'} />
				<div className={'grid gap-2'}>
					<Skeleton className={'h-4 w-37.5'} />
					<Skeleton className={'h-4 w-25'} />
				</div>
			</div>
		)
	},
}

export const Text: Story = {
	render: () => {
		return (
			<div className={'flex w-full max-w-xs flex-col gap-2'}>
				<Skeleton className={'h-4 w-full'} />
				<Skeleton className={'h-4 w-full'} />
				<Skeleton className={'h-4 w-3/4'} />
			</div>
		)
	},
}

export const Form: Story = {
	render: () => {
		return (
			<div className={'flex w-full max-w-xs flex-col gap-7'}>
				<div className={'flex flex-col gap-3'}>
					<Skeleton className={'h-4 w-20'} />
					<Skeleton className={'h-8 w-full'} />
				</div>
				<div className={'flex flex-col gap-3'}>
					<Skeleton className={'h-4 w-24'} />
					<Skeleton className={'h-8 w-full'} />
				</div>
				<Skeleton className={'h-8 w-24'} />
			</div>
		)
	},
}

export const Table: Story = {
	render: () => {
		return (
			<div className={'flex w-full max-w-sm flex-col gap-2'}>
				{Array.from({ length: 5 }).map((_, index) => {
					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: Static decorative rows never reorder
						<div className={'flex gap-4'} key={index}>
							<Skeleton className={'h-4 flex-1'} />
							<Skeleton className={'h-4 w-24'} />
							<Skeleton className={'h-4 w-20'} />
						</div>
					)
				})}
			</div>
		)
	},
}
