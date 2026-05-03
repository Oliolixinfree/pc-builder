import { Skeleton } from '@heroui/react'

export function BuildsSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{Array.from({ length: 6 }).map((_, i) => (
				<Skeleton
					key={i}
					className="h-140 rounded-3xl"
				/>
			))}
		</div>
	)
}
