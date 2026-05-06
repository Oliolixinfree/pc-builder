'use server'

import { prisma } from '@/shared/lib/prisma/db'

export async function getBuildToEdit(buildId: string) {
	return await prisma.build.findFirst({
		where: { id: buildId },
		include: {
			components: {
				include: {
					component: true
				}
			}
		}
	})
}
