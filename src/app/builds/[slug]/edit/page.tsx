import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getBuildToEdit } from './actions'
import { EditBuildForm } from './components/edit-build-form'
import { COMPONENT_CATEGORIES } from '@/shared/constants/component-category'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
	const session = await auth()
	if (!session?.user.id) redirect('/login')

	const { slug } = await params

	const build = await getBuildToEdit(slug)
	if (!build) return

	const buildComponents = build.components.map(i => ({
		id: i.component.id,
		name: i.component.name,
		price: i.component.price,
		type: i.component.type,
		socket: i.component.socket
	}))

	return (
		<>
			<EditBuildForm
				componentCategories={COMPONENT_CATEGORIES}
				buildName={build.name}
				buildComponents={buildComponents}
			/>
		</>
	)
}
