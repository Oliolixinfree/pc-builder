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
import { Blocks, CalendarCheck2, Mail, UserRound } from 'lucide-react'

export function UserInfo({
	name,
	email,
	createdAt,
	buildsCount
}: Pick<User, 'name' | 'email' | 'createdAt'> & { buildsCount: number }) {
	return (
		<Card className="w-full items-stretch md:flex-row">
			<Avatar
				size="lg"
				color="accent"
				variant="soft"
			>
				<Avatar.Image
					alt="User avatar"
					src="https://loremflickr.com/320/240?random=1"
				/>
				<Avatar.Fallback delayMs={600}>
					{getInitials(name) ?? <UserRound />}
				</Avatar.Fallback>
			</Avatar>
			<div className="flex flex-1 flex-col gap-3">
				<Card.Header className="gap-1">
					<Card.Title>{name?.trim() ?? 'Unknown'}</Card.Title>
				</Card.Header>
				<Card.Content>
					<ListBox
						aria-label="User info"
						selectionMode="none"
					>
						<ListBox.Section>
							<Header>Info</Header>
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
								<ListBox.ItemIndicator />
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
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item
								id="public-build"
								textValue={String(buildsCount)}
							>
								<div className="flex h-8  items-start justify-center pt-px">
									<Blocks className="size-5 shrink-0 text-muted" />
								</div>
								<div className="flex flex-col">
									<Label>Public builds</Label>
									<Description>{buildsCount}</Description>
								</div>
								<ListBox.ItemIndicator />
							</ListBox.Item>
						</ListBox.Section>
					</ListBox>
				</Card.Content>
			</div>
		</Card>
	)
}
