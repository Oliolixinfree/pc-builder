import { BuildCard } from '@/components/ui/build-card'
import { auth } from '@/auth'
import { TypographyH3 } from '@/components/typography'
import { Chip, Separator } from '@heroui/react'
import { ThumbsUp } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import { UserInfo } from './components/user-info'
import { getUser, getUserPublicBuilds } from './actions'

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const session = await auth()
	if (!session?.user.id) redirect('/login')

	const { slug } = await params

	const user = await getUser(slug)
	if (!user) notFound()

	const builds = await getUserPublicBuilds(slug)

	return (
		<div className="flex flex-col-reverse lg:grid grid-cols-[2fr_auto_1fr] gap-4 ">
			<section>
				<div className="mb-6">
					<TypographyH3>User&apos;s builds</TypographyH3>
				</div>
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
			</section>

			<Separator
				className="col-span-0 hidden lg:block"
				orientation="vertical"
			/>
			<Separator
				className="lg:hidden"
				orientation="horizontal"
			/>

			<aside>
				<div className="mb-6">
					<TypographyH3>User</TypographyH3>
				</div>
				<UserInfo
					name={user.name}
					email={user.email}
					createdAt={user.createdAt}
					buildsCount={builds.length}
				/>
			</aside>
		</div>
	)
}
