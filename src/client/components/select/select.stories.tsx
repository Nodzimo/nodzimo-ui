// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps, ComponentType } from 'react'
import {
	ArabLeagueFlagIcon,
	BelarusFlagIcon,
	ChinaFlagIcon,
	FranceFlagIcon,
	GermanyFlagIcon,
	ItalyFlagIcon,
	JapanFlagIcon,
	RussiaFlagIcon,
	SpainFlagIcon,
	UkraineFlagIcon,
	UnitedStatesFlagIcon,
} from '#core'
import {
	STRING_UNION_SUMMARY,
	UNION_SEPARATOR,
} from '../../../storybook/constants'
import {
	SELECT_CONTENT_ALIGNS,
	SELECT_CONTENT_SIDES,
	SELECT_TRIGGER_SIZES,
	Select,
	SelectContent,
	type SelectContentProps,
	SelectGroup,
	SelectItem,
	SelectLabel,
	type SelectOption,
	type SelectOptions,
	type SelectProps,
	SelectSeparator,
	SelectTrigger,
	type SelectTriggerProps,
	SelectValue,
} from '.'

const LANGUAGE_PLACEHOLDER = 'Select a language'

type LanguageOption = SelectOption<string> & {
	FlagIcon: ComponentType<ComponentProps<'svg'>>
}

type LanguageOptions = readonly LanguageOption[]

const EUROPEAN_LANGUAGES = [
	{ FlagIcon: UnitedStatesFlagIcon, label: 'English', value: 'en' },
	{ FlagIcon: GermanyFlagIcon, label: 'German', value: 'de' },
	{ FlagIcon: SpainFlagIcon, label: 'Spanish', value: 'es' },
	{ FlagIcon: FranceFlagIcon, label: 'French', value: 'fr' },
	{ FlagIcon: ItalyFlagIcon, label: 'Italian', value: 'it' },
] as const satisfies LanguageOptions

const SLAVIC_LANGUAGES = [
	{ FlagIcon: RussiaFlagIcon, label: 'Russian', value: 'ru' },
	{ FlagIcon: BelarusFlagIcon, label: 'Belarusian', value: 'be' },
	{ FlagIcon: UkraineFlagIcon, label: 'Ukrainian', value: 'uk' },
] as const satisfies LanguageOptions

const ASIAN_LANGUAGES = [
	{ FlagIcon: ChinaFlagIcon, label: 'Chinese', value: 'zh' },
	{ FlagIcon: JapanFlagIcon, label: 'Japanese', value: 'ja' },
] as const satisfies LanguageOptions

const ARABIC_LANGUAGE = {
	FlagIcon: ArabLeagueFlagIcon,
	label: 'Arabic',
	value: 'ar',
} as const satisfies LanguageOption

const LANGUAGES = [
	...EUROPEAN_LANGUAGES,
	...SLAVIC_LANGUAGES,
	...ASIAN_LANGUAGES,
	ARABIC_LANGUAGE,
] as const satisfies LanguageOptions

const LANGUAGE_ITEMS = [
	{ label: LANGUAGE_PLACEHOLDER, value: null },
	...LANGUAGES,
] as const satisfies SelectOptions<string | null>

const SELECT_DEFAULTS = {
	contentAlign: SELECT_CONTENT_ALIGNS[1],
	contentAlignItemWithTrigger: true,
	contentAlignOffset: 0,
	contentSide: SELECT_CONTENT_SIDES[1],
	contentSideOffset: 4,
	disabled: false,
	triggerAriaInvalid: false,
	triggerSize: SELECT_TRIGGER_SIZES[0],
} as const

type SelectStoryArgs = SelectProps & {
	contentAlign?: SelectContentProps['align']
	contentAlignItemWithTrigger?: SelectContentProps['alignItemWithTrigger']
	contentAlignOffset?: SelectContentProps['alignOffset']
	contentSide?: SelectContentProps['side']
	contentSideOffset?: SelectContentProps['sideOffset']
	triggerSize?: SelectTriggerProps['size']
	triggerAriaInvalid: SelectTriggerProps['aria-invalid']
}

const meta = {
	args: {
		contentAlign: SELECT_DEFAULTS.contentAlign,
		contentAlignItemWithTrigger: SELECT_DEFAULTS.contentAlignItemWithTrigger,
		contentAlignOffset: SELECT_DEFAULTS.contentAlignOffset,
		contentSide: SELECT_DEFAULTS.contentSide,
		contentSideOffset: SELECT_DEFAULTS.contentSideOffset,
		disabled: SELECT_DEFAULTS.disabled,
		triggerAriaInvalid: SELECT_DEFAULTS.triggerAriaInvalid,
		triggerSize: SELECT_DEFAULTS.triggerSize,
	},
	argTypes: {
		contentAlign: {
			control: 'select',
			options: SELECT_CONTENT_ALIGNS,
			table: {
				defaultValue: { summary: `'${SELECT_DEFAULTS.contentAlign}'` },
				type: {
					detail: SELECT_CONTENT_ALIGNS.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
		contentAlignItemWithTrigger: {
			control: 'boolean',
			table: {
				defaultValue: {
					summary: String(SELECT_DEFAULTS.contentAlignItemWithTrigger),
				},
			},
		},
		contentAlignOffset: {
			control: 'number',
			table: {
				defaultValue: { summary: String(SELECT_DEFAULTS.contentAlignOffset) },
			},
		},
		contentSide: {
			control: 'select',
			options: SELECT_CONTENT_SIDES,
			table: {
				defaultValue: { summary: `'${SELECT_DEFAULTS.contentSide}'` },
				type: {
					detail: SELECT_CONTENT_SIDES.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
		contentSideOffset: {
			control: 'number',
			table: {
				defaultValue: { summary: String(SELECT_DEFAULTS.contentSideOffset) },
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				defaultValue: { summary: String(SELECT_DEFAULTS.disabled) },
			},
		},
		triggerAriaInvalid: {
			table: {
				defaultValue: { summary: String(SELECT_DEFAULTS.triggerAriaInvalid) },
			},
		},
		triggerSize: {
			control: 'select',
			options: SELECT_TRIGGER_SIZES,
			table: {
				defaultValue: { summary: `'${SELECT_DEFAULTS.triggerSize}'` },
				type: {
					detail: SELECT_TRIGGER_SIZES.join(UNION_SEPARATOR),
					summary: STRING_UNION_SUMMARY,
				},
			},
		},
	},
	component: Select,
	render: ({
		contentAlign,
		contentAlignItemWithTrigger,
		contentAlignOffset,
		contentSide,
		contentSideOffset,
		triggerSize,
		triggerAriaInvalid,
		...restArgs
	}) => {
		return (
			<Select items={LANGUAGE_ITEMS} {...restArgs}>
				<SelectTrigger
					aria-invalid={triggerAriaInvalid}
					aria-label={'Language'}
					className={'w-40'}
					size={triggerSize}
				>
					<SelectValue>
						{(value: string) => {
							const language = LANGUAGES.find((language) => {
								return language.value === value
							})

							if (!language) {
								return LANGUAGE_PLACEHOLDER
							}

							const { FlagIcon, label } = language

							return (
								<span className={'flex items-center gap-2'}>
									<FlagIcon />
									{label}
								</span>
							)
						}}
					</SelectValue>
				</SelectTrigger>
				<SelectContent
					align={contentAlign}
					alignItemWithTrigger={contentAlignItemWithTrigger}
					alignOffset={contentAlignOffset}
					side={contentSide}
					sideOffset={contentSideOffset}
				>
					<SelectGroup>
						<SelectLabel>Western European</SelectLabel>
						{EUROPEAN_LANGUAGES.map(({ FlagIcon, value, label }) => (
							<SelectItem
								className={'*:items-center'}
								key={value}
								value={value}
							>
								<FlagIcon />
								{label}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>East Slavic</SelectLabel>
						{SLAVIC_LANGUAGES.map(({ FlagIcon, value, label }) => (
							<SelectItem
								className={'*:items-center'}
								key={value}
								value={value}
							>
								<FlagIcon />
								{label}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>East Asian</SelectLabel>
						{ASIAN_LANGUAGES.map(({ FlagIcon, value, label }) => (
							<SelectItem
								className={'*:items-center'}
								key={value}
								value={value}
							>
								<FlagIcon />
								{label}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>Middle Eastern</SelectLabel>
						<SelectItem
							className={'*:items-center'}
							value={ARABIC_LANGUAGE.value}
						>
							<ARABIC_LANGUAGE.FlagIcon />
							{ARABIC_LANGUAGE.label}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		)
	},
	title: 'Client/Components/Select',
} satisfies Meta<SelectStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
