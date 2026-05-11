import { Button } from '@heroui/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import { MobileMenu } from './mobile-menu'
import { DesktopMenu } from './desktop-menu'
import { HeaderProfile } from './header-profile'
import { PAGES } from '@/shared/constants/page-config'

export function HeaderNav({ session }: { session: Session | null }) {
	if (!session?.user) {
		return (
			<div className="flex justify-end">
				<Button
					variant="secondary"
					className="p-0"
				>
					<Link
						href={PAGES.LOGIN}
						className="flex w-full h-full items-center justify-center px-4"
					>
						Login
					</Link>
				</Button>
			</div>
		)
	}

	return (
		<>
			<div className="flex justify-end md:hidden">
				<MobileMenu session={session} />
			</div>

			<div className="hidden md:flex items-center gap-4 justify-between w-full">
				<div />
				<nav>
					<DesktopMenu />
				</nav>
				<div className="flex justify-end">
					<HeaderProfile session={session} />
				</div>
			</div>
		</>
	)
}
