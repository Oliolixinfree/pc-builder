import { TypographyH1 } from '@/components/typography'
import { Button } from '@heroui/react'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<div className="absolute inset-0 -z-1 overflow-hidden animate-gradient bg-linear-to-t from-accent/80 via-accent/40 to-transparent bg-size-[200%_200%]" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
				<div className="flex flex-col items-center gap-6">
					<TypographyH1>Build your dream build</TypographyH1>
					<br />
					<Button
						size="lg"
						variant="primary"
					>
						<Link href={'/dashboard'}>Get started</Link>
					</Button>
				</div>
			</div>
		</>
	)
}
