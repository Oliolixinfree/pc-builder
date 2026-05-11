import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { SignupForm } from '@/components/signup-form'
import { Metadata } from 'next'
import { PAGES } from '@/shared/constants/page-config'

export const metadata: Metadata = {
	title: 'Sign updatedAt',
	description: 'Create an account'
}

export default async function Page() {
	const session = await auth()

	if (session?.user) redirect(PAGES.DASHBOARD)
	return (
		<div className="flex flex-1 justify-center items-center">
			<SignupForm />
		</div>
	)
}
