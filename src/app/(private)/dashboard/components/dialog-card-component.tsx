'use client'

import { Button, Card, Chip, Description, Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'
import { getComponentsByCategory } from '../actions'
import { Component, ComponentType } from '@prisma/generated/prisma/client'
import { DatabaseSearch, Plus } from 'lucide-react'

type Props = {
	componentType: ComponentType
	selectedItem: Component | null
	onSelect: (component: Component) => void
}

export function DialogCardComponent({
	componentType,
	selectedItem,
	onSelect
}: Props) {
	const [components, setComponents] = useState<Component[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getComponentsByCategory(componentType).then(data => {
			setComponents(data)
			setIsLoading(false)
		})
	}, [componentType])

	if (isLoading) {
		return (
			<Spinner
				size="xl"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
		)
	}

	if (!components.length) {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
				<div className="bg-default rounded-full text-foreground w-fit p-4 text-center">
					<DatabaseSearch />
				</div>
				<Description className="text-lg lg:text-2xl">
					Data not found
				</Description>
			</div>
		)
	}

	return (
		<>
			{components.map(i => (
				<Card
					key={i.id}
					variant="secondary"
				>
					<Card.Header>
						<Card.Title>{i.name}</Card.Title>
						<Card.Description>
							{new Intl.NumberFormat('en-EN').format(i.price)} $
						</Card.Description>
					</Card.Header>
					<Card.Footer className="flex items-center">
						{i.socket && (
							<Chip
								color="accent"
								variant="soft"
							>
								{i.socket}
							</Chip>
						)}
						<Button
							size="md"
							onPress={() => onSelect(i)}
							isDisabled={selectedItem?.id === i.id}
							className="ml-auto"
						>
							<Plus /> Add
						</Button>
					</Card.Footer>
				</Card>
			))}
		</>
	)
}
