import { NextRequest, NextResponse } from 'next/server'
import { isPublicPath } from './shared/helpers/path.helper'
import { PAGES } from './shared/constants/page-config'

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	const sessionCookie =
		request.cookies.get('authjs.session-token') ??
		request.cookies.get('__Secure-authjs.session-token')

	const isLoggedIn = !!sessionCookie?.value

	if (isPublicPath(pathname)) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(PAGES.DASHBOARD, request.url))
		}
		return NextResponse.next()
	}

	if (!isLoggedIn) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		// Exclude API routes, static files, image optimizations, and .png files
		'/((?!api|_next/static|_next/image|.*\\.png$).*)'
	]
}
