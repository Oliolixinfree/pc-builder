import { auth } from '@/auth'
import { TypographyH3 } from '@/components/typography'
import { Description } from '@heroui/react'
import { redirect } from 'next/navigation'
import { deleteBuildAction, getUserBuilds } from './actions'
import { BuildCard } from './components/build-card'
import { Blocks } from 'lucide-react'
import { BuildCardActions } from './components/build-card-actions'

export default async function Page() {
	const session = await auth()

	if (!session?.user.id) redirect('/login')

	const builds = await getUserBuilds(session?.user.id)

	return (
		<>
			<div className="flex justify-between mb-6">
				<TypographyH3>My builds</TypographyH3>
			</div>

			{!builds.length ? (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
					<div className="bg-default rounded-full text-foreground w-fit p-4 text-center">
						<Blocks />
					</div>
					<Description className="text-lg lg:text-2xl">
						No Builds Yet
					</Description>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{builds.map(i => (
						<BuildCard
							key={i.id}
							name={i.name}
							totalPrice={i.totalPrice}
							createdAt={i.createdAt}
							components={i.components}
							user={i.user}
						>
							<BuildCardActions
								buildId={i.id}
								isPublic={i.isPublic}
								deleteAction={deleteBuildAction}
							/>
						</BuildCard>
					))}
				</div>
			)}
		</>
	)
}
