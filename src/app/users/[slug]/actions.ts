'use server'

import { prisma } from '@/shared/lib/prisma/db'

export async function getUserWithBuilds(userId: string) {
	return await prisma.user.findFirst({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true,
			builds: {
				where: { isPublic: true },
				orderBy: { createdAt: 'desc' },
				select: {
					id: true,
					name: true,
					totalPrice: true,
					createdAt: true,
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
			}
		}
	})
}
