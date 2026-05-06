import { notFound, redirect } from 'next/navigation'
import { getBuildToEdit } from './actions'
import { EditBuildForm } from './components/edit-build-form'
import { COMPONENT_CATEGORIES } from '@/shared/constants/component-category'
import { auth } from '@/auth'

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const session = await auth()
	if (!session?.user.id) redirect('/login')

	const { slug } = await params

	const build = await getBuildToEdit(slug)
	if (!build) notFound()

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
