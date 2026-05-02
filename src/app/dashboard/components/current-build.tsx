'use client'

import { TypographyH3 } from '@/components/typography'
import { SquarePen, BadgePlus } from 'lucide-react'
import { Button, Description, Modal, Table, Tooltip } from '@heroui/react'
import { Component } from '@prisma/generated/prisma/client'
import { useCallback, useState } from 'react'
import { DialogCardComponent } from './dialog-card-component'
import { SaveBuildDialog } from './save-build-dialog'
import { iconMap } from '@/shared/helpers/icon-map'

type Props = {
	components: (Pick<Component, 'type' | 'name'> & { icon: string })[]
}

export function CurrentBuild({ components }: Props) {
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

	const currentCategory = components.find(c => c.type === openCategoryId)
	const ModalIcon = currentCategory ? iconMap[currentCategory.type] : null

	return (
		<>
			<div className="flex justify-between mb-6">
				<TypographyH3>Create your own build</TypographyH3>
			</div>
			<div>
				<Table>
					<Table.ScrollContainer>
						<Table.Content aria-label="Build components">
							<Table.Header>
								<Table.Column
									isRowHeader
									className="w-10"
								>
									Component
								</Table.Column>
								<Table.Column>Type</Table.Column>
								<Table.Column>Model</Table.Column>
								<Table.Column>Price</Table.Column>
								<Table.Column className="w-12">Action</Table.Column>
							</Table.Header>
							<Table.Body>
								{components.map(category => {
									const Icon = iconMap[category.type]
									const selected = selectedByCategory[category.type]

									return (
										<Table.Row key={category.type}>
											<Table.Cell>
												<Icon />
											</Table.Cell>
											<Table.Cell>{category.name}</Table.Cell>
											<Table.Cell>{selected?.name ?? <>&mdash;</>}</Table.Cell>
											<Table.Cell>
												{selected?.price ? (
													<>
														{new Intl.NumberFormat('en-EN').format(
															selected?.price
														)}{' '}
														$
													</>
												) : (
													<>&mdash;</>
												)}
											</Table.Cell>
											<Table.Cell>
												<Tooltip delay={1}>
													<Button
														isIconOnly
														variant="secondary"
														onPress={() => setOpenCategoryId(category.type)}
													>
														{selected ? <SquarePen /> : <BadgePlus />}
													</Button>
													<Tooltip.Content>
														{selected ? 'Change component' : 'Add component'}
													</Tooltip.Content>
												</Tooltip>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>
						</Table.Content>
					</Table.ScrollContainer>
					<Table.Footer className="justify-between">
						<p>
							<Description className="text-sm">Total price:</Description>{' '}
							{new Intl.NumberFormat('en-EN').format(totalPrice)} $
						</p>

						<div className="space-x-4">
							<Button
								variant="danger-soft"
								onPress={() => {
									setSelectedByCategory(
										Object.fromEntries(components.map(c => [c.type, null]))
									)
									setOpenCategoryId(null)
								}}
							>
								Reset
							</Button>
							<Button onPress={() => setIsSaveDialogOpen(true)}>Collect</Button>
						</div>
					</Table.Footer>
				</Table>
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
