'use client'

import { Component } from '@prisma/generated/prisma/client'
import { saveBuildAction, SaveBuildFromState } from '../actions'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useMemo, useRef } from 'react'
import {
	Button,
	Description,
	FieldError,
	Form,
	Input,
	Label,
	Modal,
	Spinner,
	TextField,
	toast
} from '@heroui/react'
import { Save } from 'lucide-react'
import { useFormStatus } from 'react-dom'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	selectedByCategory: Record<string, Component | null>
	defaultName?: string
	redirectPath?: string
}

const initialState: SaveBuildFromState = { status: 'idle' }

export function SaveBuildDialog({
	open,
	onOpenChange,
	selectedByCategory,
	defaultName,
	redirectPath
}: Props) {
	const router = useRouter()
	const formRef = useRef<HTMLFormElement>(null)
	const { pending } = useFormStatus()

	const [state, formAction, isPending] = useActionState(
		saveBuildAction,
		initialState
	)

	const componentsIds = useMemo(
		() =>
			Object.values(selectedByCategory)
				.filter((component): component is Component => component !== null)
				.map(component => component.id),
		[selectedByCategory]
	)

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			formRef.current?.reset()
		}

		onOpenChange(nextOpen)
	}

	useEffect(() => {
		if (state.status === 'success') {
			toast('Operation completed', {
				description: state.message ?? 'Build was saved successfully',
				variant: 'success'
			})

			formRef.current?.reset()
			onOpenChange(false)

			if (redirectPath) {
				router.push(redirectPath)
			} else {
				router.refresh()
			}
		}

		if (state.status === 'error') {
			toast('Something went wrong', {
				description: state.message ?? 'Failed to save build',
				variant: 'danger'
			})
		}
	}, [onOpenChange, redirectPath, router, state])

	return (
		<Modal.Backdrop
			isOpen={open}
			onOpenChange={handleOpenChange}
			variant="blur"
			className="bg-linear-to-t from-accent/80 via-accent/40 to-transparent dark:from-accent/80 dark:via-accent/40"
		>
			<Modal.Container
				placement="center"
				size="md"
			>
				<Modal.Dialog>
					<Modal.CloseTrigger />
					<Modal.Header>
						<Modal.Icon className="bg-default text-foreground">
							<Save />
						</Modal.Icon>
						<Modal.Heading>Save build</Modal.Heading>
					</Modal.Header>
					<Modal.Body data-slot="modal-body">
						<Form
							ref={formRef}
							action={formAction}
						>
							<div className="flex flex-col gap-2 p-1">
								<TextField
									isRequired
									id="build-name"
									minLength={1}
									name="build-name"
									type="text"
									defaultValue={defaultName}
									validate={value => {
										if (value.length < 1) {
											return 'Build name must be at least 1 characters'
										}

										return null
									}}
								>
									<Label>Build name</Label>
									<Input
										variant="secondary"
										placeholder="Enter build name"
									/>
									<Description>Must be at least 1 characters</Description>
									<FieldError />
								</TextField>
								<input
									type="hidden"
									id="component-ids"
									name="component-ids"
									value={componentsIds.join(', ')}
								/>

								<div className="space-x-2">
									<Button
										type="submit"
										isDisabled={componentsIds.length === 0}
										isPending={isPending}
									>
										{isPending && (
											<Spinner
												color="current"
												size="sm"
											/>
										)}
										{isPending || pending ? 'Processing...' : 'Save'}
									</Button>
									<Button
										type="reset"
										variant="secondary"
										isDisabled={isPending || pending}
									>
										Reset
									</Button>
								</div>
							</div>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							slot="close"
							variant="tertiary"
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	)
}
