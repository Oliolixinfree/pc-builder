'use server'

import { prisma } from '@/shared/lib/prisma/db'

export async function getUser(userId: string) {
	return prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true
		}
	})
}

export async function getUserPublicBuilds(userId: string) {
	return prisma.build.findMany({
		where: {
			userId,
			isPublic: true
		},
		orderBy: { createdAt: 'desc' },
		select: {
			id: true,
			name: true,
			totalPrice: true,
			createdAt: true,
			userId: true,
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
			_count: { select: { likes: true } }
		}
	})
}
