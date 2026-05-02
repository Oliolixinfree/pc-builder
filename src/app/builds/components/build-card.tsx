import { iconMap } from '@/shared/helpers/icon-map'
import { Card, Chip, Description, Header, Label, ListBox } from '@heroui/react'
import { Build, Component, User } from '@prisma/generated/prisma/client'
import { Banknote, CalendarPlus } from 'lucide-react'

type Props = Pick<Build, 'name' | 'totalPrice' | 'createdAt'> & {
	user: Pick<User, 'email' | 'name'>
	components: { component: Pick<Component, 'id' | 'name' | 'type' | 'price'> }[]
	children?: React.ReactNode
}

export function BuildCard({
	name,
	totalPrice,
	createdAt,
	user,
	components,
	children
}: Props) {
	return (
		<Card variant="default">
			<Card.Header>
				<Card.Title>{name}</Card.Title>
				<Card.Description>
					Created by: {user.name?.trim() ?? user.email.trim()}
				</Card.Description>
			</Card.Header>
			<Card.Content>
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
											{component.type} &middot;{' '}
											{new Intl.NumberFormat('en-EN').format(component.price)} $
										</Description>
									</div>

									<ListBox.ItemIndicator />
								</ListBox.Item>
							)
						})}
					</ListBox.Section>
				</ListBox>
			</Card.Content>
			<Card.Footer className="justify-between">
				<div className="space-x-2">
					<Chip
						color="default"
						variant="secondary"
					>
						<Banknote
							// color="current"
							width={18}
						/>
						<Chip.Label>
							<Description className="text-sm">
								{new Intl.NumberFormat('en-EN').format(totalPrice)} $
							</Description>
						</Chip.Label>
					</Chip>
					<Chip
						color="default"
						variant="secondary"
					>
						<CalendarPlus width={16} />
						<Chip.Label>
							<Description className="text-sm">
								{new Date(createdAt).toLocaleDateString()}
							</Description>
						</Chip.Label>
					</Chip>
				</div>
				<div className="space-x-2">{children}</div>
			</Card.Footer>
		</Card>
	)
}
