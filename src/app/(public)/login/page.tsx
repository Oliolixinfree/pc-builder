import { auth } from '@/auth'
import { LoginForm } from '@/components/login-form'
import { redirect } from 'next/navigation'

export default async function Page() {
	const session = await auth()

	if (session?.user) redirect('/dashboard')

	return (
		<div className="flex flex-1 justify-center items-center">
			<LoginForm />
		</div>
	)
}
