import { iconMap } from '@/shared/helpers/icon-map'
import { Button, Description, Table, Tooltip } from '@heroui/react'
import { Component } from '@prisma/generated/prisma/client'
import { BadgePlus, SquarePen } from 'lucide-react'

type Props = {
	components: Pick<Component, 'type' | 'name'>[]
	selectedByCategory: Record<string, Component | null>
	totalPrice: number
	onOpenCategory: (type: string) => void
	onReset: () => void
	onCollect: () => void
}

export function BuildTable({
	components,
	selectedByCategory,
	totalPrice,
	onOpenCategory,
	onReset,
	onCollect
}: Props) {
	return (
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
												{new Intl.NumberFormat('en-EN').format(selected?.price)}{' '}
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
												onPress={() => onOpenCategory(category.type)}
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
			<Table.Footer className="flex-wrap justify-between gap-2">
				<p>
					<Description className="text-sm">Total price:</Description>{' '}
					{new Intl.NumberFormat('en-EN').format(totalPrice)} $
				</p>
				<div className="space-x-2">
					<Button
						variant="danger-soft"
						onPress={onReset}
					>
						Reset
					</Button>
					<Button onPress={onCollect}>Collect</Button>
				</div>
			</Table.Footer>
		</Table>
	)
}
