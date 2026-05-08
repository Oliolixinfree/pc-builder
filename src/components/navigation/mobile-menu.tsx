'use client'

import { navItems } from '@/shared/constants/nav-items'
import { getInitials } from '@/shared/lib/utils/name-fallback.util'
import {
	Avatar,
	Button,
	Description,
	Drawer,
	Dropdown,
	Label,
	useOverlayState
} from '@heroui/react'
import { ChevronsUpDown, LogOut, Menu, UserRound } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { ThemeSwitcher } from '../theme-switcher'

export function MobileMenu({ session }: { session: Session }) {
	const state = useOverlayState()

	useEffect(() => {
		const media = window.matchMedia('(min-width: 768px)')

		if (media.matches) {
			state.close()
		}

		const handleResize = (e: MediaQueryListEvent) => {
			if (e.matches) {
				state.close()
			}
		}

		media.addEventListener('change', handleResize)

		return () => {
			media.removeEventListener('change', handleResize)
		}
	}, [state])

	return (
		<>
			<Button
				isIconOnly
				variant="secondary"
				onPress={() => state.open()}
			>
				<Menu />
			</Button>
			<Drawer.Backdrop
				isOpen={state.isOpen}
				onOpenChange={state.setOpen}
				variant="blur"
				className="bg-linear-to-b from-accent/80 via-accent/40 to-transparent dark:from-accent/80 dark:via-accent/40"
			>
				<Drawer.Content placement="top">
					<Drawer.Dialog>
						<Drawer.CloseTrigger />
						<Drawer.Header>
							<Drawer.Heading>Menu</Drawer.Heading>
						</Drawer.Header>
						<Drawer.Body>
							<nav className="flex flex-col gap-1">
								{navItems.map(item => (
									<Link
										key={item.id}
										className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
										href={item.href}
										onClick={() => state.close()}
									>
										<item.icon className="size-5 text-muted" />
										{item.label}
									</Link>
								))}
							</nav>
							<Dropdown>
								<Dropdown.Trigger className="w-full">
									<div className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5  transition-colors hover:bg-default">
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
										<div className="flex flex-col items-start">
											<Label>{session.user.name ?? 'Unknown'}</Label>
											<Description>{session.user.name}</Description>
										</div>
										<ChevronsUpDown className="size-5 text-muted ml-auto" />
									</div>
								</Dropdown.Trigger>
								<Dropdown.Popover className="p-2 w-full">
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
										<ThemeSwitcher />
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
						</Drawer.Body>
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</>
	)
}
