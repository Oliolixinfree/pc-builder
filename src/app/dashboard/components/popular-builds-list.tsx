import { Description, Surface } from '@heroui/react'
import { Blocks } from 'lucide-react'
import { getPopularBuild } from '../actions'
import { PopularBuildCard } from './popular-build-card'

export async function PopularBuildsList() {
	const build = await getPopularBuild()

	if (!build.length) {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
				<div className="bg-default rounded-full text-foreground w-fit p-4 text-center">
					<Blocks />
				</div>
				<Description className="text-lg text-center">
					No Popular Public Builds Yet
				</Description>
			</div>
		)
	}

	return (
		// <Surface
		// 	className="grid gap-4 p-4 rounded-3xl"
		// 	variant="secondary"
		// >
		<div className="grid gap-4">
			{build.map(i => (
				<PopularBuildCard
					key={i.id}
					id={i.id}
					name={i.name}
					totalPrice={i.totalPrice}
					createdAt={i.createdAt}
					likes={i._count.likes}
					userId={i.userId}
					user={i.user}
				/>
			))}
		</div>

		// </Surface>
	)
}
