// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '#client'
import {
	STRING_UNION_SUMMARY,
	UNION_SEPARATOR,
} from '../../../storybook/constants'
import {
	CARD_SIZES,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '.'

const meta = {
	args: {
		size: CARD_SIZES[0],
	},
	argTypes: {
		size: {
			control: 'inline-radio',
			options: CARD_SIZES,
			table: {
				type: {
					detail: CARD_SIZES.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
	},
	component: Card,
	render: (args) => {
		return (
			<Card {...args} className={'w-sm'}>
				<img
					alt={'Abstract document layers representing terms and agreement'}
					src={'assets/storybook/card-terms-cover.svg'}
				/>
				<CardHeader>
					<CardTitle>Terms of Service</CardTitle>
					<CardDescription>
						Review the terms before accepting the agreement.
					</CardDescription>
				</CardHeader>
				<CardContent className={'-mb-(--nui-card-spacing)'}>
					<div
						className={
							'-mx-(--nui-card-spacing) max-h-48 space-y-4 overflow-y-scroll border-t bg-nui-muted/50 px-(--nui-card-spacing) py-4 text-sm leading-relaxed'
						}
					>
						<p>
							These terms govern your use of the workspace, including access to
							shared documents, project files, and collaboration tools.
						</p>
						<p>
							You are responsible for the content you upload and for ensuring
							that your team has the appropriate permissions to view or edit it.
						</p>
						<p>
							We may update features or limits as the service evolves. When
							those changes materially affect your workflow, we will notify your
							workspace administrators.
						</p>
						<p>
							By continuing, you agree to keep your account credentials secure
							and to follow your organization&apos;s acceptable use policies.
						</p>
					</div>
				</CardContent>
				<CardFooter className={'justify-end gap-2'}>
					<Button variant={'outline'}>Decline</Button>
					<Button>Accept</Button>
				</CardFooter>
			</Card>
		)
	},
	title: 'Core/Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
