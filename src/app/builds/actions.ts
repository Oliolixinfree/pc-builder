'use server'

import { auth } from '@/auth'
import { prisma } from '@/shared/lib/prisma/db'
import { revalidatePath } from 'next/cache'

export async function toggleBuildPublicAction(formData: FormData) {
	try {
		const session = await auth()
		if (!session?.user.id) return

		const buildId = formData.get('buildId') as string
		if (!buildId) return

		const build = await prisma.build.findFirst({
			where: {
				id: buildId,
				userId: session.user.id
			},
			select: { isPublic: true }
		})

		if (!build) return

		await prisma.build.update({
			where: { id: buildId },
			data: { isPublic: !build.isPublic }
		})

		revalidatePath('/builds')
		revalidatePath('/builds/explore')
	} catch (error) {
		console.error(error)
		throw new Error('Failed to toggle build visibility')
	}
}

export async function deleteBuildAction(formData: FormData) {
	try {
		const session = await auth()
		if (!session?.user.id) return

		const buildId = formData.get('buildId') as string
		if (!buildId) return

		const result = await prisma.build.deleteMany({
			where: {
				id: buildId,
				userId: session.user.id
			}
		})

		if (result.count === 0) {
			console.warn('Delete failed: build not found or no permission', {
				buildId,
				userId: session.user.id
			})
			throw new Error('Delete failed: build not found or no permission')
		}

		revalidatePath('/builds')
		revalidatePath('/builds/explore')
	} catch (error) {
		console.error(error)
		throw new Error('Failed to delete build')
	}
}

export async function getUserBuilds(userId: string) {
	const builds = await prisma.build.findMany({
		where: { userId: userId },
		orderBy: { createdAt: 'desc' },
		include: {
			user: { select: { email: true, name: true } },
			components: {
				include: {
					component: {
						select: {
							id: true,
							name: true,
							type: true,
							price: true
						}
					}
				}
			}
		}
	})

	return builds
}
