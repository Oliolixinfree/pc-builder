'use server'

import { auth } from '@/auth'
import { PAGES } from '@/shared/constants/page-config'
import { prisma } from '@/shared/lib/prisma/db'
import { revalidatePath } from 'next/cache'

export async function getPublicBuilds(userId: string) {
	const builds = await prisma.build.findMany({
		where: { isPublic: true },
		orderBy: { createdAt: 'desc' },
		include: {
			user: { select: { email: true, name: true, id: true } },
			components: {
				include: {
					component: {
						select: {
							id: true,
							name: true,
							type: true,
							price: true,
							socket: true
						}
					}
				}
			},
			_count: { select: { likes: true } },
			likes: { where: { userId }, select: { id: true } }
		}
	})

	return builds
}

export async function toggleReaction(formData: FormData) {
	try {
		const session = await auth()
		if (!session?.user.id) return

		const buildId = String(formData.get('buildId')) as string
		if (!buildId) return

		const build = await prisma.build.findUnique({
			where: { id: buildId },
			select: { isPublic: true }
		})
		if (!build?.isPublic) return

		const existing = await prisma.like.findUnique({
			where: {
				userId_buildId: { userId: session.user.id, buildId }
			}
		})

		if (existing) {
			await prisma.like.delete({
				where: {
					id: existing.id
				}
			})
		} else {
			await prisma.like.create({
				data: {
					userId: session.user.id,
					buildId
				}
			})
		}

		revalidatePath(PAGES.BUILDS)
		revalidatePath(PAGES.EXPLORE)
		revalidatePath(PAGES.DASHBOARD)
	} catch (error) {
		console.error(error)
		throw new Error('Failed to toggle reaction')
	}
}
