'use client'

import { getInitials } from '@/shared/lib/utils/name-fallback.util'
import { Avatar, Description, Dropdown, Label } from '@heroui/react'
import { LogOut, UserRound } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { ThemeSwitcher } from '../theme-switcher'
import { PAGES } from '@/shared/constants/page-config'

export function HeaderProfile({ session }: { session: Session }) {
	return (
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

					<ThemeSwitcher />
				</div>
				<Dropdown.Menu className="p-0 mt-2">
					<Dropdown.Item
						id="logout"
						textValue="Logout"
						variant="danger"
						onPress={() => signOut({ redirectTo: PAGES.HOME })}
					>
						<div className="flex w-full items-center justify-between gap-2">
							<Label>Log Out</Label>
							<LogOut className="size-4 text-danger" />
						</div>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	)
}
