'use client'

import { Button, Spinner } from '@heroui/react'
import { ThumbsUp } from 'lucide-react'
import { useTransition } from 'react'

type Props = {
	buildId: string
	isLiked: boolean
	likesCount: number
	onToggleReaction: (formData: FormData) => Promise<void>
}

export function ExploreCardActions({
	buildId,
	isLiked,
	likesCount,
	onToggleReaction
}: Props) {
	const [isPending, startTransition] = useTransition()

	const handleToggleLike = () => {
		const fd = new FormData()
		fd.set('buildId', buildId)

		startTransition(() => onToggleReaction(fd))
	}

	return (
		<>
			<Button
				type="button"
				variant={isLiked ? 'secondary' : 'outline'}
				isDisabled={isPending}
				onPress={() => handleToggleLike()}
			>
				{isPending ? (
					<Spinner
						color="current"
						size="sm"
					/>
				) : (
					<>
						<ThumbsUp />
						{likesCount}
					</>
				)}
			</Button>
		</>
	)
}
