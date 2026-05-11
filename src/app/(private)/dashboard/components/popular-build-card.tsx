import { PAGES } from '@/shared/constants/page-config'
import {
	Button,
	Card,
	Chip,
	Link as HeroLink,
	linkVariants,
	Tooltip
} from '@heroui/react'
import { Build, User } from '@prisma/generated/prisma/client'
import { Banknote, CalendarPlus, Forward, ThumbsUp } from 'lucide-react'
import Link from 'next/link'

type Props = Pick<
	Build,
	'id' | 'name' | 'totalPrice' | 'createdAt' | 'userId'
> & {
	user: Pick<User, 'email' | 'name'>
	likes: number
}

export function PopularBuildCard({
	id,
	name,
	totalPrice,
	createdAt,
	likes,
	userId,
	user
}: Props) {
	const slots = linkVariants()

	return (
		<Card variant="default">
			<Card.Header>
				<Card.Title>{name}</Card.Title>
				<Card.Description>
					Created by:{' '}
					<Link
						href={PAGES.USER(userId)}
						className={slots.base()}
					>
						{user.name?.trim() ?? user.email.trim()}
						<HeroLink.Icon className={slots.icon()} />
					</Link>
				</Card.Description>
			</Card.Header>
			<Card.Footer className="justify-between gap-2">
				<div className="space-x-2">
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
					<Chip
						color="accent"
						variant="secondary"
					>
						<ThumbsUp width={18} />
						<Chip.Label>{likes}</Chip.Label>
					</Chip>
				</div>
				<div className="mt-auto">
					<Tooltip delay={1}>
						<Button
							type="button"
							variant="outline"
							size="sm"
							isIconOnly
						>
							<Link
								href={PAGES.BUILD(id)}
								className="flex w-full h-full items-center justify-center"
							>
								<Forward />
							</Link>
						</Button>
						<Tooltip.Content>
							<p>Add to my builds</p>
						</Tooltip.Content>
					</Tooltip>
				</div>
			</Card.Footer>
		</Card>
	)
}
