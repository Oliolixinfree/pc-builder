import { COMPONENT_CATEGORIES } from '@/shared/constants/component-category'
import { CurrentBuild } from './components/current-build'

import { TypographyH3 } from '@/components/typography'

export default function Page() {
	return (
		<div className="grid grid-cols-3 gap-4">
			<section className="col-span-2">
				<CurrentBuild components={COMPONENT_CATEGORIES} />
			</section>

			<aside>
				<TypographyH3>Popular builds</TypographyH3>
			</aside>
		</div>
	)
}
