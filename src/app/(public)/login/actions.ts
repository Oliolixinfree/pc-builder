'use server'

import { signIn } from '@/auth'
import { LoginSchema } from '@/shared/schemas/auth.schema'
import { LoginState } from '@/shared/types/auth.type'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import z from 'zod'

export async function loginAction(
	_prevState: LoginState | null,
	formData: FormData
): Promise<LoginState> {
	const validatedFields = LoginSchema.safeParse(
		Object.fromEntries(formData.entries())
	)

	if (!validatedFields.success) {
		const flattened = z.flattenError(validatedFields.error)

		return {
			errors: flattened.fieldErrors
		}
	}

	const { email, password } = validatedFields.data

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: '/dashboard'
		})

		redirect('dashboard')
	} catch (e) {
		console.error(e)
		if (e instanceof AuthError) {
			if (e.type === 'CredentialsSignin') {
				return { message: 'Invalid email or password' }
			}

			return { message: 'Authorization error' }
		}

		throw e
	}
}
