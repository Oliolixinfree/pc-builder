import { auth } from '@/auth'
import { LoginForm } from '@/components/login-form'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account'
}

export default async function Page() {
	const session = await auth()

	if (session?.user) redirect('/dashboard')

	return (
		<div className="flex flex-1 justify-center items-center">
			<LoginForm />
		</div>
	)
}
