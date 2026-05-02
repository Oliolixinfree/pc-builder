import { auth } from '@/auth'
import Link from 'next/link'
import { TypographyH3 } from './typography'
import { HeaderNav } from './header-nav'
import { Wrapper } from './wrapper'

export async function Header() {
	const session = await auth()

	return (
		<header className="py-4">
			<Wrapper>
				<div className="flex items-center py-3 px-6 bg-surface/60 backdrop-blur-lg shadow-md border border-border rounded-3xl">
					<div className="shrink-0">
						<TypographyH3>
							<Link href={'/'}>
								<span className="text-accent">PC</span> Builder
							</Link>
						</TypographyH3>
					</div>
					<nav className="min-w-0 flex-1">
						<HeaderNav session={session} />
					</nav>
				</div>
			</Wrapper>
		</header>
	)
}
