import { type ComponentProps, useMemo } from 'react'
import { mcn } from '#lib'

type FieldErrorProps = ComponentProps<'div'> & {
	errors?: Array<{ message?: string } | undefined>
}

function FieldError({
	className,
	children,
	errors,
	...restProps
}: FieldErrorProps) {
	const content = useMemo(() => {
		if (children) {
			return children
		}

		if (!errors?.length) {
			return null
		}

		const uniqueErrors = [
			...new Map(errors.map((error) => [error?.message, error])).values(),
		]

		if (uniqueErrors?.length === 1) {
			return uniqueErrors[0]?.message
		}

		return (
			<ul className={'ms-4 flex list-disc flex-col gap-1'}>
				{uniqueErrors.map(
					(error, index) =>
						// biome-ignore lint/suspicious/noArrayIndexKey: Error items are stateless and never reordered
						error?.message && <li key={index}>{error.message}</li>,
				)}
			</ul>
		)
	}, [children, errors])

	if (!content) {
		return null
	}

	return (
		<div
			className={mcn('font-normal text-nui-destructive text-sm', className)}
			data-slot={'field-error'}
			role={'alert'}
			{...restProps}
		>
			{content}
		</div>
	)
}

export { FieldError, type FieldErrorProps }
