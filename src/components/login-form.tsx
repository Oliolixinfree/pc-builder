'use client'

import {
	Button,
	Card,
	Description,
	Form,
	Label,
	Link as HeroLink,
	TextField,
	Spinner,
	FieldError,
	InputGroup
} from '@heroui/react'
import Link from 'next/link'
import { linkVariants } from '@heroui/styles'
import { useActionState, useState } from 'react'
import { LoginState } from '@/shared/types/auth.type'
import { loginAction } from '@/app/(public)/login/actions'
import { Eye, EyeClosed, KeyRound, Mail } from 'lucide-react'

export function LoginForm() {
	const slots = linkVariants()

	const [state, formAction, isPending] = useActionState<
		LoginState | null,
		FormData
	>(loginAction, null)
	const [isVisible, setIsVisible] = useState(false)

	return (
		<Card className="w-full max-w-md">
			<Card.Header>
				<Card.Title>Login</Card.Title>
				<Card.Description>
					Enter your credentials to access your account
				</Card.Description>
			</Card.Header>
			<Form
				action={formAction}
				validationErrors={state?.errors}
			>
				<Card.Content>
					<div className="flex flex-col gap-4">
						<TextField
							name="email"
							type="email"
						>
							<Label>Email</Label>
							<InputGroup variant="secondary">
								<InputGroup.Prefix>
									<Mail className="size-4 text-muted" />
								</InputGroup.Prefix>
								<InputGroup.Input placeholder="email@example.com" />
							</InputGroup>
							<FieldError />
						</TextField>
						<TextField
							name="password"
							type={isVisible ? 'text' : 'password'}
						>
							<Label>Password</Label>
							<InputGroup variant="secondary">
								<InputGroup.Prefix>
									<KeyRound className="size-4 text-muted" />
								</InputGroup.Prefix>
								<InputGroup.Input placeholder="••••••••" />
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
							{isPending ? 'Processing...' : 'Login'}
						</>
					</Button>
					<Description className="text-sm">
						Don&apos;t have an account?{' '}
						<Link
							href={'/signup'}
							className={slots.base()}
						>
							Sign Up
							<HeroLink.Icon className={slots.icon()} />
						</Link>
					</Description>
				</Card.Footer>
			</Form>
		</Card>
	)
}
