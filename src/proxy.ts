import { NextRequest, NextResponse } from 'next/server'
import { isPublicPath } from './shared/helpers/path.helper'

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (isPublicPath(pathname)) {
		return NextResponse.next()
	}

	const sessionCookie =
		request.cookies.get('authjs.session-token') ??
		request.cookies.get('__Secure-authjs.session-token')

	if (!sessionCookie?.value) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		// Exclude API routes, static files, image optimizations, and .png files
		'/((?!api|_next/static|_next/image|.*\\.png$).*)'
	]
}
