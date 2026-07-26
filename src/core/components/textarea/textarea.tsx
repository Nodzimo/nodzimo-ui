import type { ComponentProps } from 'react'
import { mcn } from '#lib'

type TextareaProps = ComponentProps<'textarea'>

function Textarea({ className, ...restProps }: TextareaProps) {
	return (
		<textarea
			className={mcn(
				'field-sizing-content flex min-h-16 w-full rounded-nui-lg border border-nui-input bg-transparent px-2.5 py-2 text-base outline-none transition-colors',
				'placeholder:text-nui-muted-foreground',
				'focus-visible:border-nui-ring focus-visible:ring-3 focus-visible:ring-nui-ring/50',
				'disabled:cursor-not-allowed disabled:bg-nui-input/50 disabled:opacity-50',
				'aria-invalid:border-nui-destructive aria-invalid:ring-3 aria-invalid:ring-nui-destructive/20',
				'md:text-sm',
				'dark:bg-nui-input/30 dark:aria-invalid:border-nui-destructive/50 dark:aria-invalid:ring-nui-destructive/40 dark:disabled:bg-nui-input/80',
				className,
			)}
			data-slot={'textarea'}
			{...restProps}
		/>
	)
}

export { Textarea, type TextareaProps }
