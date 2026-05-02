'use server'

import { auth } from '@/auth'
import { prisma } from '@/shared/lib/prisma/db'
import { Component, ComponentType } from '@prisma/generated/prisma/client'
import { revalidatePath } from 'next/cache'

export type SaveBuildFromState = {
	status: 'idle' | 'success' | 'error'
	message?: string
}

export async function saveBuildAction(
	_prevState: SaveBuildFromState,
	formData: FormData
): Promise<SaveBuildFromState> {
	try {
		const name = String(formData.get('build-name') ?? '').trim()
		const componentsIds = String(formData.get('component-ids'))
			.split(',')
			.map(id => id.trim())
			.filter(Boolean)

		const result = await saveBuild(name, componentsIds)

		if (!result.success) {
			return {
				status: 'error',
				message: result.error
			}
		}

		return {
			status: 'success',
			message: 'Build was saved successfully'
		}
	} catch (error) {
		console.error('Save build action error:', error)
		return {
			status: 'error',
			message: error instanceof Error ? error.message : 'Failed to save build'
		}
	}
}

export async function saveBuild(
	name: string,
	componentIds: string[]
): Promise<
	{ success: true; buildId: string } | { success: false; error: string }
> {
	try {
		const session = await auth()

		if (!session?.user.id) {
			return { success: false, error: 'You must login' }
		}

		const trimmedName = name.trim()

		if (!trimmedName) {
			return { success: false, error: 'The name cannot be empty' }
		}

		if (componentIds.length <= 0) {
			return { success: false, error: 'Add at least 1 component' }
		}

		const components = await prisma.component.findMany({
			where: { id: { in: componentIds } }
		})

		if (components.length !== componentIds.length) {
			return { success: false, error: 'Some components were not found' }
		}

		const totalPrice = components.reduce((acc, c) => acc + c.price, 0)

		const build = await prisma.$transaction(async tx => {
			const newBuild = await tx.build.create({
				data: {
					name: trimmedName,
					totalPrice,
					userId: session.user.id
				}
			})

			await tx.buildComponent.createMany({
				data: componentIds.map(componentId => ({
					buildId: newBuild.id,
					componentId
				}))
			})

			return newBuild
		})

		revalidatePath('/dashboard')
		revalidatePath('/builds')

		return { success: true, buildId: build.id }
	} catch (error) {
		console.error(error)
		return { success: false, error: 'Failed to save build' }
	}
}

export async function getComponentsByCategory(
	componentType: ComponentType
): Promise<Component[]> {
	if (!componentType) return []

	try {
		const components = await prisma.component.findMany({
			where: {
				type: componentType
			},
			orderBy: { price: 'asc' }
		})
		return components.map(i => ({
			id: i.id,
			type: i.type,
			name: i.name,
			price: i.price,
			socket: i.socket,
			createdAt: i.createdAt,
			updatedAt: i.updatedAt
		}))
	} catch (error) {
		console.error(
			`Failed to fetch components for category ${componentType}:`,
			error
		)
		return []
	}
}
