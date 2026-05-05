'use client'

import { Button, Spinner, Tooltip } from '@heroui/react'
import { Forward, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
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
			<Tooltip delay={1}>
				<Button
					type="button"
					variant="outline"
					isIconOnly
				>
					<Link href={`/builds/${buildId}/edit`}>
						<Forward />
					</Link>
				</Button>
				<Tooltip.Content>
					<p>Add to my builds</p>
				</Tooltip.Content>
			</Tooltip>
			<Tooltip delay={1}>
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
				<Tooltip.Content>
					<p>{isLiked ? 'Dislike' : 'Like'}</p>
				</Tooltip.Content>
			</Tooltip>
		</>
	)
}
