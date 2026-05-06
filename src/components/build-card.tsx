import { iconMap } from '@/shared/helpers/icon-map'
import {
	Card,
	Chip,
	Description,
	Header,
	Label,
	ListBox,
	Link as HeroLink
} from '@heroui/react'
import { linkVariants } from '@heroui/styles'
import { Build, Component, User } from '@prisma/generated/prisma/client'
import { Banknote, CalendarPlus } from 'lucide-react'
import Link from 'next/link'

type Props = Pick<Build, 'name' | 'totalPrice' | 'createdAt' | 'userId'> & {
	user: Pick<User, 'email' | 'name'>
	components: { component: Omit<Component, 'createdAt' | 'updatedAt'> }[]
	userLink?: boolean
	children?: React.ReactNode
}

export function BuildCard({
	name,
	totalPrice,
	createdAt,
	userId,
	user,
	components,
	userLink,
	children
}: Props) {
	const slots = linkVariants()

	return (
		<Card variant="default">
			<Card.Header>
				<Card.Title>{name}</Card.Title>
				<Card.Description>
					Created by:{' '}
					{userLink ? (
						<Link
							href={`/users/${userId}`}
							className={slots.base()}
						>
							{user.name?.trim() ?? user.email.trim()}
							<HeroLink.Icon className={slots.icon()} />
						</Link>
					) : (
						(user.name?.trim() ?? user.email.trim())
					)}
				</Card.Description>
			</Card.Header>
			<Card.Content className="min-h-105">
				<ListBox
					aria-label="Components"
					selectionMode="none"
				>
					<ListBox.Section>
						<Header>Components</Header>
						{components.map(({ component }) => {
							const Icon = iconMap[component.type]

							return (
								<ListBox.Item
									key={component.id}
									id={component.id}
									textValue={component.name}
								>
									<div className="flex h-8 items-start justify-center pt-px">
										<Icon className="shrink-0 text-muted" />
									</div>
									<div className="flex flex-col">
										<Label>{component.name}</Label>
										<Description>
											{component.type} ·{' '}
											{component.socket ? `${component.socket} · ` : ''}
											{new Intl.NumberFormat('en-EN').format(component.price)} $
										</Description>
									</div>
								</ListBox.Item>
							)
						})}
					</ListBox.Section>
				</ListBox>
			</Card.Content>
			<Card.Footer className="justify-between gap-2">
				<div className="flex flex-wrap items-center gap-2">
					<Chip
						color="default"
						variant="secondary"
					>
						<Banknote width={18} />
						<Chip.Label>
							{new Intl.NumberFormat('en-EN').format(totalPrice)} $
						</Chip.Label>
					</Chip>
					<Chip
						color="default"
						variant="secondary"
					>
						<CalendarPlus width={16} />
						<Chip.Label>{new Date(createdAt).toLocaleDateString()}</Chip.Label>
					</Chip>
				</div>
				<div className="flex items-center gap-2 mt-auto">{children}</div>
			</Card.Footer>
		</Card>
	)
}
