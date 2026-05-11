'use server'

import bcrypt from 'bcryptjs'
import z from 'zod'
import { redirect } from 'next/navigation'
import { prisma } from '@/shared/lib/prisma/db'
import { SignUpState } from '@/shared/types/auth.type'
import { SignUpSchema } from '@/shared/schemas/auth.schema'
import { PAGES } from '@/shared/constants/page-config'

export async function signUpAction(
	_prevState: SignUpState | null,
	formData: FormData
): Promise<SignUpState> {
	const validatedFields = SignUpSchema.safeParse(
		Object.fromEntries(formData.entries())
	)

	if (!validatedFields.success) {
		const flattened = z.flattenError(validatedFields.error)

		return {
			errors: flattened.fieldErrors
		}
	}

	const { email, password, name } = validatedFields.data

	try {
		const existingUser = await prisma.user.findUnique({
			where: { email }
		})

		if (existingUser) {
			return { message: `User with that email already exists` }
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword
			}
		})
	} catch (e) {
		console.error(e)
		return { message: 'Something went wrong during registration.' }
	}

	redirect(PAGES.LOGIN)
}
