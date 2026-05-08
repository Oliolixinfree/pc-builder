import { PackageCheck, PackagePlus, PackageSearch } from 'lucide-react'

export const navItems = [
	{
		id: 'dashboard',
		label: 'Create build',
		href: '/dashboard',
		icon: PackagePlus
	},
	{ id: 'builds', label: 'My builds', href: '/builds', icon: PackageCheck },
	{
		id: 'explore',
		label: 'Public builds',
		href: '/builds/explore',
		icon: PackageSearch
	}
] as const
