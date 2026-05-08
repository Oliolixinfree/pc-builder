import { auth } from '@/auth'
import { TypographyH3 } from '@/components/typography'
import { Separator } from '@heroui/react'
import { notFound, redirect } from 'next/navigation'
import { UserInfo } from './components/user-info'
import { getUser } from './actions'
import { Suspense } from 'react'
import { ProfileBuildsList } from './components/profile-builds-list'
import { BuildsSkeleton } from '@/components/builds-skeleton'
import { Metadata } from 'next'

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const user = await getUser(slug)

	if (!user) {
		return { title: 'User not found' }
	}

	return {
		title: `${user.name}'s profile`,
		description: `${user.name}'s builds and info`
	}
}

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

	return (
		<div className="flex flex-1 flex-col-reverse lg:grid grid-cols-[2fr_auto_1fr] gap-4 ">
			<section>
				<div className="mb-6">
					<TypographyH3>{user.name ?? 'User'}&apos;s builds</TypographyH3>
				</div>
				<Suspense
					fallback={
						<BuildsSkeleton
							quantity={4}
							className="grid grid-cols-1 md:grid-cols-2  gap-4"
						/>
					}
				>
					<ProfileBuildsList
						userId={slug}
						user={user}
					/>
				</Suspense>
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
				/>
			</aside>
		</div>
	)
}
