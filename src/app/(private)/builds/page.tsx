import { auth } from '@/auth'
import { TypographyH3 } from '@/components/typography'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { BuildsSkeleton } from '@/components/builds-skeleton'
import { UserBuildsList } from './components/user-builds-list'

export default async function Page() {
	const session = await auth()
	if (!session?.user.id) redirect('/login')

	return (
		<>
			<div className="flex justify-between mb-6">
				<TypographyH3>My builds</TypographyH3>
			</div>

			<Suspense
				fallback={
					<BuildsSkeleton
						quantity={6}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
					/>
				}
			>
				<UserBuildsList userId={session.user.id} />
			</Suspense>
		</>
	)
}
