import { PropsWithChildren } from 'react'

export function Wrapper({ children }: PropsWithChildren) {
	return (
		<div className="max-w-7xl w-full mx-auto px-4 2xl:px-0">{children}</div>
	)
}
