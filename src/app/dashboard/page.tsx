import { COMPONENT_CATEGORIES } from '@/shared/constants/component-category'
import { CurrentBuild } from './components/current-build'
import { TypographyH3 } from '@/components/typography'
import { PopularBuildsList } from './components/popular-builds-list'
import { Separator } from '@heroui/react'

export default function Page() {
	return (
		<div className="grid lg:grid-cols-[2fr_auto_1fr] gap-4">
			<section>
				<CurrentBuild componentCategories={COMPONENT_CATEGORIES} />
			</section>
			<Separator
				className="hidden lg:block"
				orientation="vertical"
			/>
			<Separator
				className="lg:hidden"
				orientation="horizontal"
			/>
			<aside className="relative">
				<div className="mb-6">
					<TypographyH3>Popular builds</TypographyH3>
				</div>
				<PopularBuildsList />
			</aside>
		</div>
	)
}
