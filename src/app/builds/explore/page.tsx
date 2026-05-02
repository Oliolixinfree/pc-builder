import { auth } from '@/auth'
import { TypographyH3 } from '@/components/typography'
import { redirect } from 'next/navigation'
import { getPublicBuilds, toggleReaction } from './actions'
import { Blocks } from 'lucide-react'
import { Description } from '@heroui/react'
import { BuildCard } from '../components/build-card'
import { ExploreCardActions } from './components/explore-card-actions'

export default async function Page() {
	const session = await auth()

	if (!session?.user.id) redirect('/login')

	const publicBuilds = await getPublicBuilds(session.user.id)

	return (
		<>
			<div className="flex justify-between mb-6">
				<TypographyH3>Public builds</TypographyH3>
			</div>

			{!publicBuilds.length ? (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
					<div className="bg-default rounded-full text-foreground w-fit p-4 text-center">
						<Blocks />
					</div>
					<Description className="text-lg lg:text-2xl">
						No Public Builds Yet
					</Description>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{publicBuilds.map(i => {
						const isLiked = i.likes.length > 0

						return (
							<BuildCard
								key={i.id}
								name={i.name}
								totalPrice={i.totalPrice}
								createdAt={i.createdAt}
								components={i.components}
								user={i.user}
							>
								<ExploreCardActions
									buildId={i.id}
									isLiked={isLiked}
									likesCount={i._count.likes}
									onToggleReaction={toggleReaction}
								/>
							</BuildCard>
						)
					})}
				</div>
			)}
		</>
	)
}
