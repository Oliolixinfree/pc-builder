'use client'

import { navItems } from '@/shared/constants/nav-items'
import { getTabValue } from '@/shared/lib/utils/nav.util'
import { Tabs } from '@heroui/react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DesktopMenu() {
	const pathname = usePathname()
	const tabValue = getTabValue(pathname)

	return (
		<Tabs
			variant="secondary"
			className="text-nowrap"
			selectedKey={tabValue}
		>
			<Tabs.ListContainer>
				<Tabs.List aria-label="Options">
					{Array.from(navItems).map(item => (
						<Tabs.Tab
							key={item.id}
							id={item.id}
						>
							<Link
								href={item.href}
								prefetch={true}
								className="flex w-full h-full items-center"
							>
								{item.label}
							</Link>
							<Tabs.Indicator />
						</Tabs.Tab>
					))}
				</Tabs.List>
			</Tabs.ListContainer>
		</Tabs>
	)
}
