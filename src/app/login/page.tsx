import { auth } from '@/auth'
import { LoginForm } from '@/components/login-form'
import { redirect } from 'next/navigation'

export default async function Page() {
	const session = await auth()

	if (session?.user) redirect('/dashboard')

	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:min-w-md">
			<LoginForm />
		</div>
	)
}
