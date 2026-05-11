import { PackageCheck, PackagePlus, PackageSearch } from 'lucide-react'
import { PAGES } from './page-config'

export const navItems = [
	{
		id: 'dashboard',
		label: 'Create build',
		href: PAGES.DASHBOARD,
		icon: PackagePlus
	},
	{ id: 'builds', label: 'My builds', href: PAGES.BUILDS, icon: PackageCheck },
	{
		id: 'explore',
		label: 'Public builds',
		href: PAGES.EXPLORE,
		icon: PackageSearch
	}
] as const
