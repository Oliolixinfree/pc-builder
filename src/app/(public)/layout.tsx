import { PropsWithChildren } from 'react'
import { Header } from '@/components/header'

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col min-h-svh w-full">
			<Header />
			<main className="flex flex-col flex-1 max-w-7xl w-full mx-auto py-4 px-6 xl:px-0">
				{children}
			</main>
		</div>
	)
}
