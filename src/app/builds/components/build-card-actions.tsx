'use client'

import { Button, Spinner, Tooltip } from '@heroui/react'
import { Eye, EyeClosed, Pencil, Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { toggleBuildPublicAction } from '../actions'

type Props = {
	buildId: string
	isPublic: boolean
	deleteAction: (formData: FormData) => void
}

export function BuildCardActions({ buildId, isPublic, deleteAction }: Props) {
	const [isDeletePending, startDeleteTransition] = useTransition()
	const [isVisibilityPending, startVisibilityTransition] = useTransition()
	const [isEditPending, startEditTransition] = useTransition()

	const handleDelete = () => {
		if (!confirm('Remove build?')) {
			return
		}

		const fd = new FormData()
		fd.set('buildId', buildId)

		startDeleteTransition(() => deleteAction(fd))
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
					onPress={() => handleDelete()}
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
					<p>Remove build</p>
				</Tooltip.Content>
			</Tooltip>
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
					<p>Toggle visibility</p>
				</Tooltip.Content>
			</Tooltip>
		</>
	)
}
