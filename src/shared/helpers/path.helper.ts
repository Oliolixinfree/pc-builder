import { PUBLIC_PATHS } from '../constants/paths'

export function isPublicPath(pathname: string) {
	if (PUBLIC_PATHS.has(pathname)) return true

	if (pathname.startsWith('/api/')) return true

	return false
}
