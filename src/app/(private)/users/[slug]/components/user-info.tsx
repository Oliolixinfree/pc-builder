import { getInitials } from '@/shared/lib/utils/name-fallback.util'
import {
	Avatar,
	Card,
	Description,
	Header,
	Label,
	ListBox
} from '@heroui/react'
import { User } from '@prisma/generated/prisma/client'
import { CalendarCheck2, CircleUserRound, Mail, UserRound } from 'lucide-react'

export function UserInfo({
	name,
	email,
	createdAt
}: Pick<User, 'name' | 'email' | 'createdAt'>) {
	return (
		<Card className="w-full flex-row lg:flex-col lg:items-baseline xl:flex-row">
			<Avatar
				color="accent"
				variant="soft"
				className="size-40 rounded-3xl my-auto lg:size-40 xl:size-30 2xl:size-40"
			>
				<Avatar.Image
					alt="User avatar"
					src="https://loremflickr.com/320/240?random=1"
				/>
				<Avatar.Fallback delayMs={600}>
					{getInitials(name) ?? <UserRound />}
				</Avatar.Fallback>
			</Avatar>

			<Card.Content className="shrink-0">
				<ListBox
					aria-label="User info"
					selectionMode="none"
					className="shrink-0"
				>
					<ListBox.Section>
						<Header>Info</Header>
						<ListBox.Item
							id="name"
							textValue={name?.trim() ?? 'Unknown'}
						>
							<div className="flex h-8  items-start justify-center pt-px">
								<CircleUserRound className="size-5 shrink-0 text-muted" />
							</div>
							<div className="flex flex-col">
								<Label>Name</Label>
								<Description>{name?.trim() ?? 'Unknown'}</Description>
							</div>
						</ListBox.Item>
						<ListBox.Item
							id="email"
							textValue={email.trim()}
						>
							<div className="flex h-8  items-start justify-center pt-px">
								<Mail className="size-5 shrink-0 text-muted" />
							</div>
							<div className="flex flex-col">
								<Label>Email</Label>
								<Description>{email.trim()}</Description>
							</div>
						</ListBox.Item>
						<ListBox.Item
							id="registered"
							textValue={new Date(createdAt).toLocaleDateString()}
						>
							<div className="flex h-8  items-start justify-center pt-px">
								<CalendarCheck2 className="size-5 shrink-0 text-muted" />
							</div>
							<div className="flex flex-col">
								<Label>Registered</Label>
								<Description>
									{new Date(createdAt).toLocaleDateString()}
								</Description>
							</div>
						</ListBox.Item>
					</ListBox.Section>
				</ListBox>
			</Card.Content>
		</Card>
	)
}
