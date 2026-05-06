'use client'

import { TypographyH3 } from '@/components/typography'
import { Button, Modal } from '@heroui/react'
import { Component } from '@prisma/generated/prisma/client'
import { useCallback, useState } from 'react'
import { DialogCardComponent } from './dialog-card-component'
import { SaveBuildDialog } from './save-build-dialog'
import { iconMap } from '@/shared/helpers/icon-map'
import { BuildTable } from '@/components/build-table'

type Props = {
	componentCategories: Pick<Component, 'type' | 'name'>[]
}

export function CurrentBuild({ componentCategories }: Props) {
	const [selectedByCategory, setSelectedByCategory] = useState<
		Record<string, Component | null>
	>({})
	const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)
	const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)

	const totalPrice = Object.values(selectedByCategory).reduce(
		(sum, cat) => sum + (cat?.price ?? 0),
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
				<TypographyH3>Create your own build</TypographyH3>
			</div>
			<div>
				<BuildTable
					components={componentCategories}
					selectedByCategory={selectedByCategory}
					totalPrice={totalPrice}
					onOpenCategory={setOpenCategoryId}
					onReset={handleReset}
					onCollect={() => setIsSaveDialogOpen(true)}
				/>

				<SaveBuildDialog
					open={isSaveDialogOpen}
					onOpenChange={setIsSaveDialogOpen}
					selectedByCategory={selectedByCategory}
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
			</div>
		</>
	)
}
