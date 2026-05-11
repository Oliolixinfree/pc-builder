export const PAGES = {
	HOME: '/',
	LOGIN: '/login',
	SIGNUP: '/signup',
	DASHBOARD: '/dashboard',
	BUILDS: '/builds',
	BUILD: (slug: string) => `/builds/${slug}/edit`,
	EXPLORE: '/builds/explore',
	USER: (slug: string) => `/users/${slug}`
} as const
