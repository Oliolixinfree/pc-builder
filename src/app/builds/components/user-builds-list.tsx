import { getUserBuilds, deleteBuildAction } from '../actions'
import { BuildCard } from '../../../components/ui/build-card'
import { BuildCardActions } from './build-card-actions'
import { Blocks } from 'lucide-react'
import { Description } from '@heroui/react'

export async function UserBuildsList({ userId }: { userId: string }) {
	const builds = await getUserBuilds(userId)

	if (!builds.length) {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
				<div className="bg-default rounded-full text-foreground w-fit p-4 text-center">
					<Blocks />
				</div>
				<Description className="text-lg lg:text-2xl">No Builds Yet</Description>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{builds.map(i => (
				<BuildCard
					key={i.id}
					name={i.name}
					totalPrice={i.totalPrice}
					createdAt={i.createdAt}
					components={i.components}
					userId={i.userId}
					user={i.user}
				>
					<BuildCardActions
						buildId={i.id}
						isPublic={i.isPublic}
						buildName={i.name}
						deleteAction={deleteBuildAction}
					/>
				</BuildCard>
			))}
		</div>
	)
}
