import { Input as InputPrimitive } from '@base-ui/react/input'
import type { ComponentProps } from 'react'
import { mcn } from '#lib'

type InputProps = ComponentProps<'input'>

const INPUT_SUPPORTED_TYPES = Object.freeze([
	'text',
	'email',
	'tel',
	'search',
	'file',
] as const satisfies readonly NonNullable<InputProps['type']>[])

type InputSupportedType = (typeof INPUT_SUPPORTED_TYPES)[number]

function Input({ className, type, ...restProps }: InputProps) {
	return (
		<InputPrimitive
			className={mcn(
				'h-8 w-full min-w-0 rounded-nui-lg border border-nui-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:font-medium file:text-nui-foreground file:text-sm placeholder:text-nui-muted-foreground focus-visible:border-nui-ring focus-visible:ring-3 focus-visible:ring-nui-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-nui-input/50 disabled:opacity-50 aria-invalid:border-nui-destructive aria-invalid:ring-3 aria-invalid:ring-nui-destructive/20 md:text-sm dark:bg-nui-input/30 dark:aria-invalid:border-nui-destructive/50 dark:aria-invalid:ring-nui-destructive/40 dark:disabled:bg-nui-input/80',
				className,
			)}
			data-slot={'input'}
			type={type}
			{...restProps}
		/>
	)
}

export {
	INPUT_SUPPORTED_TYPES,
	Input,
	type InputProps,
	type InputSupportedType,
}
