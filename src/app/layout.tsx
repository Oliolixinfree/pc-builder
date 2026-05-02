import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Wrapper } from '@/components/wrapper'
import { Toast } from '@heroui/react'

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
			className={`${sans.variable} ${mono.variable} antialiased dark`}
			// className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
		>
			<body className="flex flex-col min-h-svh w-full">
				<Header />
				<main className="flex flex-col flex-1 py-6">
					<Wrapper>{children}</Wrapper>
				</main>
				<Toast.Provider />
			</body>
		</html>
	)
}
