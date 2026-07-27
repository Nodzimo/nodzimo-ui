import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { mcn } from '#lib'

const SWITCH_SIZES = Object.freeze(['default', 'sm'] as const)

type SwitchSize = (typeof SWITCH_SIZES)[number]

type SwitchProps = SwitchPrimitive.Root.Props & {
	size?: SwitchSize
}

function Switch({ className, size = 'default', ...restProps }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			className={mcn(
				'peer group/switch relative inline-flex shrink-0 items-center',
				'rounded-full border border-transparent outline-none',
				'transition-all',
				'after:absolute after:-inset-x-3 after:-inset-y-2',
				'focus-visible:border-nui-ring focus-visible:ring-3 focus-visible:ring-nui-ring/50',
				'aria-invalid:border-nui-destructive aria-invalid:ring-3 aria-invalid:ring-nui-destructive/20',
				'data-[size=default]:h-[18.4px] data-[size=sm]:h-3.5 data-[size=default]:w-8 data-[size=sm]:w-6',
				'data-checked:bg-nui-primary data-unchecked:bg-nui-input',
				'data-disabled:cursor-not-allowed data-disabled:opacity-50',
				'dark:data-unchecked:bg-nui-input/80 dark:aria-invalid:border-nui-destructive/50 dark:aria-invalid:ring-nui-destructive/40',
				className,
			)}
			data-size={size}
			data-slot={'switch'}
			{...restProps}
		>
			<SwitchPrimitive.Thumb
				className={mcn(
					'pointer-events-none block rounded-full bg-nui-background ring-0 transition-transform',
					'dark:data-checked:bg-nui-primary-foreground dark:data-unchecked:bg-nui-foreground',
					'rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)]',
					'group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3',
					'group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0',
					'group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-unchecked:translate-x-0',
				)}
				data-slot={'switch-thumb'}
			/>
		</SwitchPrimitive.Root>
	)
}

export { SWITCH_SIZES, Switch, type SwitchProps, type SwitchSize }
