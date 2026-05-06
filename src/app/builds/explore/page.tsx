import { TypographyH3 } from '@/components/typography'
import { Suspense } from 'react'
import { PublicBuildsList } from './components/public-builds-list'
import { BuildsSkeleton } from '@/components/builds-skeleton'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function Page() {
	const session = await auth()
	if (!session?.user.id) redirect('/login')

	return (
		<>
			<div className="flex justify-between mb-6">
				<TypographyH3>Public builds</TypographyH3>
			</div>

			<Suspense fallback={<BuildsSkeleton />}>
				<PublicBuildsList userId={session.user.id} />
			</Suspense>
		</>
	)
}
