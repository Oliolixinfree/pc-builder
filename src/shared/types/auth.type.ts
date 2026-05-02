// export type SignUpState = {
// 	errors?: {
// 		name?: string[]
// 		email?: string[]
// 		password?: string[]
// 	}
// 	message?: string
// } | null

import { LoginInput, SignUpInput } from '../schemas/auth.schema'

export type SignUpState = {
	errors?: Partial<Record<keyof SignUpInput, string[]>>
	message?: string
} | null

export type LoginState = {
	errors?: Partial<Record<keyof LoginInput, string[]>>
	message?: string
} | null
