import { notFound, redirect } from 'next/navigation'
import { getBuildToEdit } from './actions'
import { EditBuildForm } from './components/edit-build-form'
import { COMPONENT_CATEGORIES } from '@/shared/constants/component-category'
import { auth } from '@/auth'
import { Metadata } from 'next'
import { PAGES } from '@/shared/constants/page-config'

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const build = await getBuildToEdit(slug)

	if (!build) {
		return {
			title: 'Build not found'
		}
	}

	return {
		title: `Editing: ${build.name}`,
		description: `Edit components for build "${build.name}"`
	}
}

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const session = await auth()
	if (!session?.user.id) redirect(PAGES.LOGIN)

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
