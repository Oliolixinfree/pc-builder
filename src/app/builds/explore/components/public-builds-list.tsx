import { getPublicBuilds, toggleReaction } from '../actions'
import { BuildCard } from '../../../../components/ui/build-card'
import { ExploreCardActions } from './explore-card-actions'
import { Blocks } from 'lucide-react'
import { Description } from '@heroui/react'

export async function PublicBuildsList({ userId }: { userId: string }) {
	const publicBuilds = await getPublicBuilds(userId)

	if (!publicBuilds.length) {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
				<div className="bg-default rounded-full text-foreground w-fit p-4 text-center">
					<Blocks />
				</div>
				<Description className="text-lg lg:text-2xl">
					No Public Builds Yet
				</Description>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{publicBuilds.map(i => (
				<BuildCard
					key={i.id}
					name={i.name}
					totalPrice={i.totalPrice}
					createdAt={i.createdAt}
					components={i.components}
					userId={i.userId}
					user={i.user}
					userLink={true}
				>
					<ExploreCardActions
						buildId={i.id}
						isLiked={i.likes.length > 0}
						likesCount={i._count.likes}
						onToggleReaction={toggleReaction}
					/>
				</BuildCard>
			))}
		</div>
	)
}
