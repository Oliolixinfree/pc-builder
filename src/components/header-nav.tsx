'use client'

import { getInitials } from '@/shared/lib/utils/name-fallback.util'
import { getTabValue } from '@/shared/lib/utils/nav.util'
import {
	Avatar,
	Button,
	Description,
	Dropdown,
	Label,
	Tabs,
	ToggleButton,
	ToggleButtonGroup
} from '@heroui/react'
import { LogOut, Monitor, Moon, Sun, UserRound } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
	session: Session | null
}

export function HeaderNav({ session }: Props) {
	const pathname = usePathname()
	const tabValue = getTabValue(pathname)
	const { theme, setTheme } = useTheme()

	const tabs = [
		{ id: 'dashboard', label: 'Create build', href: '/dashboard' },
		{ id: 'builds', label: 'My builds', href: '/builds' },
		{ id: 'explore', label: 'Public builds', href: '/builds/explore' }
	]

	if (!session?.user) {
		return (
			<div className="flex justify-end">
				<Button variant="secondary">
					<Link href={'/login'}>Login</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className="flex items-center gap-4 justify-between w-full">
			<div />
			<Tabs
				variant="secondary"
				className="text-nowrap"
				selectedKey={tabValue}
			>
				<Tabs.ListContainer>
					<Tabs.List aria-label="Options">
						{Array.from(tabs).map(tab => (
							<Tabs.Tab
								key={tab.id}
								id={tab.id}
							>
								<Link
									href={tab.href}
									prefetch={true}
									className="flex w-full h-full items-center"
								>
									{tab.label}
								</Link>
								<Tabs.Indicator />
							</Tabs.Tab>
						))}
					</Tabs.List>
				</Tabs.ListContainer>
			</Tabs>
			<div className="flex justify-end">
				<Dropdown>
					<Dropdown.Trigger className="rounded-full">
						<Avatar
							color="accent"
							variant="soft"
						>
							<Avatar.Image
								alt="User avatar"
								src="https://loremflickr.com/320/240?random=1"
							/>
							<Avatar.Fallback delayMs={600}>
								{getInitials(session.user.name) ?? <UserRound />}
							</Avatar.Fallback>
						</Avatar>
					</Dropdown.Trigger>
					<Dropdown.Popover
						placement="bottom end"
						className="p-2"
					>
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2">
								<Avatar
									size="sm"
									color="accent"
									variant="soft"
								>
									<Avatar.Image
										alt="User avatar"
										src="https://loremflickr.com/320/240?random=1"
									/>
									<Avatar.Fallback delayMs={600}>
										{getInitials(session.user.name) ?? <UserRound />}
									</Avatar.Fallback>
								</Avatar>
								<div className="flex flex-col ">
									<Label>{session.user.name ?? 'Unknown'}</Label>
									<Description>{session.user.name}</Description>
								</div>
							</div>
							<ToggleButtonGroup
								selectionMode="single"
								size="sm"
								fullWidth
								selectedKeys={theme ? [theme] : []}
								onSelectionChange={keys => {
									const selected = Array.from(keys)[0] as string
									if (selected) setTheme(selected)
								}}
							>
								<ToggleButton
									isIconOnly
									aria-label="Light theme"
									id="light"
								>
									<Sun />
								</ToggleButton>
								<ToggleButton
									isIconOnly
									aria-label="Dark theme"
									id="dark"
								>
									<Moon />
								</ToggleButton>
								<ToggleButton
									isIconOnly
									aria-label="System theme"
									id="system"
								>
									<Monitor />
								</ToggleButton>
							</ToggleButtonGroup>
						</div>
						<Dropdown.Menu className="p-0 mt-2">
							<Dropdown.Item
								id="logout"
								textValue="Logout"
								variant="danger"
								onPress={() => signOut({ redirectTo: '/' })}
							>
								<div className="flex w-full items-center justify-between gap-2">
									<Label>Log Out</Label>
									<LogOut className="size-4 text-danger" />
								</div>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown.Popover>
				</Dropdown>
			</div>
		</div>
	)
}
