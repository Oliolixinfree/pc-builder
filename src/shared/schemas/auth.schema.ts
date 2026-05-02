import { z } from 'zod'
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from '../constants/validation'

export const SignUpSchema = z.object({
	name: z.string().optional(),
	email: z.email({
		pattern: EMAIL_REGEX,
		message: 'Please enter a valid email address'
	}),
	password: z
		.string()
		.min(
			MIN_PASSWORD_LENGTH,
			`Password must be at least ${MIN_PASSWORD_LENGTH} characters`
		)
})

export const LoginSchema = z.object({
	email: z
		.email({
			pattern: EMAIL_REGEX,
			message: 'Incorrect email format'
		})
		.trim(),
	password: z.string().min(1, 'Enter password').trim()
})

export type SignUpInput = z.infer<typeof SignUpSchema>
export type LoginInput = z.infer<typeof LoginSchema>
