import { auth } from '@/auth'
import Link from 'next/link'
import { TypographyH3 } from './typography'
import { HeaderNav } from './header-nav'

export async function Header() {
	const session = await auth()

	const content = (
		<div className="flex items-center min-h-10">
			<div className="shrink-0">
				<TypographyH3>
					<Link href={session?.user ? '/dashboard' : '/'}>
						<span className="text-accent">PC</span> Builder
					</Link>
				</TypographyH3>
			</div>
			<nav className="min-w-0 flex-1 min-h-10">
				<HeaderNav session={session} />
			</nav>
		</div>
	)

	if (session) {
		return (
			<header className="border-b border-border bg-surface">
				<div className="max-w-7xl w-full mx-auto py-4 px-6 xl:px-0">
					{content}
				</div>
			</header>
		)
	}

	return (
		<header className="mt-4">
			<div className="max-w-7xl w-full mx-auto px-6 xl:px-0">
				<div className="py-3 px-6 bg-surface/60 backdrop-blur-lg shadow-md border border-border rounded-3xl">
					{content}
				</div>
			</div>
		</header>
	)
}
