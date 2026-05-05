import { BuildCard } from '@/components/ui/build-card'
import { auth } from '@/auth'
import { TypographyH3 } from '@/components/typography'
import { Button, Separator } from '@heroui/react'
import { ThumbsUp } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import { getUserWithBuilds } from './actions'
import { UserInfo } from './components/user-info'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
	const session = await auth()
	if (!session?.user.id) redirect('/login')

	const { slug } = await params

	const user = await getUserWithBuilds(slug)
	if (!user) notFound()

	return (
		<div className="flex flex-col-reverse lg:grid grid-cols-[2fr_auto_1fr] gap-4 ">
			<section>
				<div className="mb-6">
					<TypographyH3>User&apos;s builds</TypographyH3>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{user.builds.map(i => (
						<BuildCard
							key={i.id}
							name={i.name}
							totalPrice={i.totalPrice}
							createdAt={i.createdAt}
							components={i.components}
							user={user}
						>
							<Button
								type="button"
								variant="outline"
								isDisabled={true}
							>
								<ThumbsUp />
								{i._count.likes}
							</Button>
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
					buildsCount={user.builds.length}
				/>
			</aside>
		</div>
	)
}
