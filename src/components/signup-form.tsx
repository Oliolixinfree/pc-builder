'use client'

import {
	Button,
	Card,
	Description,
	FieldError,
	Form,
	Label,
	TextField,
	Link as HeroLink,
	Spinner,
	InputGroup
} from '@heroui/react'
import Link from 'next/link'
import { linkVariants } from '@heroui/styles'
import { useActionState, useState } from 'react'
import { signUpAction } from '@/app/signup/actions'
import { SignUpState } from '@/shared/types/auth.type'
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from '@/shared/constants/validation'
import { Eye, EyeClosed, KeyRound, Mail, UserRound } from 'lucide-react'

export function SignupForm() {
	const slots = linkVariants()

	const [state, formAction, isPending] = useActionState<
		SignUpState | null,
		FormData
	>(signUpAction, null)
	const [isVisible, setIsVisible] = useState(false)

	return (
		<Card className="w-full max-w-md">
			<Card.Header>
				<Card.Title>Create an account</Card.Title>
				<Card.Description>
					Enter your information below to create your account
				</Card.Description>
			</Card.Header>
			<Form
				action={formAction}
				validationErrors={state?.errors}
			>
				<Card.Content>
					<div className="flex flex-col gap-4">
						<TextField
							id="name"
							name="name"
							type="text"
						>
							<Label>Full Name</Label>
							<InputGroup>
								<InputGroup.Prefix>
									<UserRound className="size-4 text-muted" />
								</InputGroup.Prefix>
								<InputGroup.Input placeholder="John Doe" />
							</InputGroup>
							<FieldError />
						</TextField>

						<TextField
							isRequired
							id="email"
							name="email"
							type="email"
							validate={value => {
								if (!EMAIL_REGEX.test(value)) {
									return 'Please enter a valid email address'
								}

								return null
							}}
						>
							<Label>Email</Label>
							<InputGroup>
								<InputGroup.Prefix>
									<Mail className="size-4 text-muted" />
								</InputGroup.Prefix>
								<InputGroup.Input placeholder="email@example.com" />
							</InputGroup>
							<FieldError />
						</TextField>

						<TextField
							isRequired
							id="password"
							minLength={MIN_PASSWORD_LENGTH}
							name="password"
							type={isVisible ? 'text' : 'password'}
							validate={value => {
								if (value.length < MIN_PASSWORD_LENGTH) {
									return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
								}
								return null
							}}
						>
							<Label>Password</Label>
							<InputGroup>
								<InputGroup.Prefix>
									<KeyRound className="size-4 text-muted" />
								</InputGroup.Prefix>
								<InputGroup.Input placeholder="Enter your password" />
								<InputGroup.Suffix className="pr-0">
									<Button
										isIconOnly
										aria-label={isVisible ? 'Hide password' : 'Show password'}
										size="sm"
										variant="ghost"
										onPress={() => setIsVisible(!isVisible)}
									>
										{isVisible ? (
											<Eye className="size-4" />
										) : (
											<EyeClosed className="size-4" />
										)}
									</Button>
								</InputGroup.Suffix>
							</InputGroup>
							<Description>Must be at least 8 characters</Description>
							<FieldError />
						</TextField>
					</div>
					{state?.message && <p className="text-danger">{state?.message}</p>}
				</Card.Content>
				<Card.Footer className="mt-4 flex flex-col gap-2">
					<Button
						type="submit"
						variant="primary"
						className="w-full"
						isPending={isPending}
					>
						<>
							{isPending && (
								<Spinner
									color="current"
									size="sm"
								/>
							)}
							{isPending ? 'Processing...' : 'Create Account'}
						</>
					</Button>
					<Description className="text-sm">
						Already have an account?{' '}
						<Link
							href={'/login'}
							className={slots.base()}
						>
							Sign in
							<HeroLink.Icon className={slots.icon()} />
						</Link>
					</Description>
				</Card.Footer>
			</Form>
		</Card>
	)
}
