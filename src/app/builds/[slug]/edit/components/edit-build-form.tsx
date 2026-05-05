'use client'

import { DialogCardComponent } from '@/app/dashboard/components/dialog-card-component'
import { SaveBuildDialog } from '@/app/dashboard/components/save-build-dialog'
import { TypographyH3 } from '@/components/typography'
import { BuildTable } from '@/components/ui/build-table'
import { iconMap } from '@/shared/helpers/icon-map'
import { Button, Modal } from '@heroui/react'
import { Component } from '@prisma/generated/prisma/client'
import { useCallback, useState } from 'react'

type Props = {
	buildName: string
	buildComponents: Omit<Component, 'createdAt' | 'updatedAt'>[]
	componentCategories: Pick<Component, 'type' | 'name'>[]
}

export function EditBuildForm({
	buildName,
	componentCategories,
	buildComponents
}: Props) {
	const [selectedByCategory, setSelectedByCategory] = useState<
		Record<string, Component | null>
	>(() =>
		Object.fromEntries(
			componentCategories.map(c => [
				c.type,
				(buildComponents.find(b => b.type === c.type) as Component) ?? null
			])
		)
	)
	const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)
	const [saveDialogOpen, setSaveDialogOpen] = useState(false)

	const totalPrice = Object.values(selectedByCategory).reduce(
		(sum, c) => sum + (c?.price ?? 0),
		0
	)

	const onSelectComponent = useCallback(
		(categoryId: string, component: Component | null) => {
			setSelectedByCategory(prev => ({ ...prev, [categoryId]: component }))
		},
		[]
	)

	const handleReset = () => {
		setSelectedByCategory(
			Object.fromEntries(componentCategories.map(c => [c.type, null]))
		)
		setOpenCategoryId(null)
	}

	const currentCategory = componentCategories.find(
		c => c.type === openCategoryId
	)
	const ModalIcon = currentCategory ? iconMap[currentCategory.type] : null

	return (
		<>
			<div className="mb-6">
				<TypographyH3>Editing user build &mdash; {buildName}</TypographyH3>
			</div>
			<BuildTable
				components={componentCategories}
				selectedByCategory={selectedByCategory}
				totalPrice={totalPrice}
				onOpenCategory={setOpenCategoryId}
				onReset={handleReset}
				onCollect={() => setSaveDialogOpen(true)}
			/>
			<SaveBuildDialog
				open={saveDialogOpen}
				onOpenChange={setSaveDialogOpen}
				selectedByCategory={selectedByCategory}
				defaultName={buildName}
				redirectPath="/builds"
			/>

			{currentCategory && (
				<Modal.Backdrop
					isOpen={!!openCategoryId}
					onOpenChange={open =>
						setOpenCategoryId(open ? currentCategory.type : null)
					}
					variant="blur"
					className="bg-linear-to-t from-accent/80 via-accent/40 to-transparent dark:from-accent/80 dark:via-accent/40"
				>
					<Modal.Container
						placement="center"
						size="cover"
					>
						<Modal.Dialog>
							<Modal.CloseTrigger />
							<Modal.Header>
								<Modal.Icon className="bg-default text-foreground">
									{ModalIcon && <ModalIcon />}
								</Modal.Icon>
								<Modal.Heading>
									Add component &mdash; {currentCategory.name}
								</Modal.Heading>
							</Modal.Header>
							<Modal.Body data-slot="modal-body">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									<DialogCardComponent
										componentType={currentCategory.type}
										onSelect={c => {
											onSelectComponent(currentCategory.type, c)
											setOpenCategoryId(null)
										}}
										selectedItem={selectedByCategory[currentCategory.type]}
									/>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button
									slot="close"
									variant="tertiary"
									onPress={() => setOpenCategoryId(null)}
								>
									Close
								</Button>
							</Modal.Footer>
						</Modal.Dialog>
					</Modal.Container>
				</Modal.Backdrop>
			)}
		</>
	)
}
