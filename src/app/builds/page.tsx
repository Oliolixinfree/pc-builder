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

			<Suspense fallback={<BuildsSkeleton />}>
				<UserBuildsList userId={session.user.id} />
			</Suspense>
		</>
	)
}
