'use client'

import { AlertDialog, Button, Spinner, Tooltip } from '@heroui/react'
import { Eye, EyeClosed, Pencil, Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toggleBuildPublicAction } from '../actions'

type Props = {
	buildId: string
	buildName: string
	isPublic: boolean
	deleteAction: (formData: FormData) => void
}

export function BuildCardActions({
	buildId,
	isPublic,
	buildName,
	deleteAction
}: Props) {
	const [isDeletePending, startDeleteTransition] = useTransition()
	const [isVisibilityPending, startVisibilityTransition] = useTransition()
	const [isEditPending, startEditTransition] = useTransition()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const handleDelete = () => {
		const fd = new FormData()
		fd.set('buildId', buildId)

		startDeleteTransition(() => deleteAction(fd))
		setIsDeleteDialogOpen(false)
	}

	const handleEdit = () => {
		// startEditTransition(() => void)
	}

	const handleToggleVisibility = () => {
		const fd = new FormData()
		fd.set('buildId', buildId)

		startVisibilityTransition(() => toggleBuildPublicAction(fd))
	}

	return (
		<>
			<Tooltip delay={1}>
				<Button
					isIconOnly
					type="button"
					variant="danger"
					isDisabled={isEditPending || isDeletePending || isVisibilityPending}
					onPress={() => setIsDeleteDialogOpen(true)}
				>
					{isDeletePending ? (
						<Spinner
							color="current"
							size="sm"
						/>
					) : (
						<Trash2 />
					)}
				</Button>
				<Tooltip.Content>
					<p>Delete build</p>
				</Tooltip.Content>
			</Tooltip>
			<AlertDialog.Backdrop
				isOpen={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				className="bg-linear-to-t from-danger/80 via-danger/40 to-transparent dark:from-danger/80 dark:via-danger/40"
				variant="blur"
			>
				<AlertDialog.Container>
					<AlertDialog.Dialog>
						<AlertDialog.CloseTrigger />
						<AlertDialog.Header>
							<AlertDialog.Icon status="danger" />
							<AlertDialog.Heading>
								Delete build permanently?
							</AlertDialog.Heading>
						</AlertDialog.Header>
						<AlertDialog.Body>
							<p>
								This will permanently delete <strong>{buildName}</strong> and
								all of its data. This action cannot be undone.
							</p>
						</AlertDialog.Body>
						<AlertDialog.Footer>
							<Button
								slot="close"
								variant="tertiary"
							>
								Cancel
							</Button>
							<Button
								variant="danger"
								onPress={() => handleDelete()}
							>
								Confirm
							</Button>
						</AlertDialog.Footer>
					</AlertDialog.Dialog>
				</AlertDialog.Container>
			</AlertDialog.Backdrop>
			<Tooltip delay={1}>
				<Button
					isIconOnly
					variant="outline"
					isDisabled={isEditPending || isDeletePending || isVisibilityPending}
					onPress={() => handleEdit()}
				>
					{isEditPending ? (
						<Spinner
							size="sm"
							color="current"
						/>
					) : (
						<Pencil />
					)}
				</Button>
				<Tooltip.Content>
					<p>Change build</p>
				</Tooltip.Content>
			</Tooltip>
			<Tooltip delay={1}>
				<Button
					isIconOnly
					variant="outline"
					isDisabled={isEditPending || isDeletePending || isVisibilityPending}
					onPress={() => handleToggleVisibility()}
				>
					{isVisibilityPending ? (
						<Spinner
							size="sm"
							color="current"
						/>
					) : isPublic ? (
						<Eye />
					) : (
						<EyeClosed />
					)}
				</Button>
				<Tooltip.Content>
					<p>{isPublic ? 'Make private' : 'Make public'}</p>
				</Tooltip.Content>
			</Tooltip>
		</>
	)
}
