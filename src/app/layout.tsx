import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/shared/providers/providers'

const sans = Inter({
	variable: '--font-sans',
	subsets: ['latin', 'cyrillic']
})

const mono = Geist_Mono({
	variable: '--font-mono',
	subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
	title: 'PC',
	description: 'PC builder'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${sans.variable} ${mono.variable} antialiased`}
		>
			<body className="flex flex-col min-h-svh w-full">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
