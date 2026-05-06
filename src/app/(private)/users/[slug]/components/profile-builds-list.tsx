import { Blocks, ThumbsUp } from 'lucide-react'
import { Chip, Description } from '@heroui/react'
import { BuildCard } from '@/components/build-card'
import { getUserPublicBuilds } from '../actions'
import { User } from '@prisma/generated/prisma/client'

export async function ProfileBuildsList({
	userId,
	user
}: {
	user: Pick<User, 'name' | 'email' | 'createdAt'>
	userId: string
}) {
	const builds = await getUserPublicBuilds(userId)

	if (!builds.length) {
		return (
			<div className="flex flex-col items-center">
				<div className="bg-default rounded-full text-foreground w-fit p-4 text-center">
					<Blocks />
				</div>
				<Description className="text-lg lg:text-2xl">No Builds Yet</Description>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{builds.map(i => (
				<BuildCard
					key={i.id}
					name={i.name}
					totalPrice={i.totalPrice}
					createdAt={i.createdAt}
					components={i.components}
					userId={i.userId}
					user={user}
				>
					<Chip
						color="accent"
						variant="secondary"
						size="lg"
					>
						<ThumbsUp width={18} />
						<Chip.Label>{i._count.likes}</Chip.Label>
					</Chip>
				</BuildCard>
			))}
		</div>
	)
}
