import { Skeleton } from '@heroui/react'

type Props = {
	quantity: number
	className: string
}

export function BuildsSkeleton({ quantity, className }: Props) {
	return (
		<div className={`${className}`}>
			{Array.from({ length: quantity }).map((_, i) => (
				<Skeleton
					key={i}
					className="h-139 rounded-3xl"
				/>
			))}
		</div>
	)
}
