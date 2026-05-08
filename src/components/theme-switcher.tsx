'use client'

import { ToggleButton, ToggleButtonGroup } from '@heroui/react'
import { Monitor, Moon, Sun } from 'lucide-react'

import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()
	return (
		<ToggleButtonGroup
			selectionMode="single"
			size="sm"
			fullWidth
			selectedKeys={theme ? [theme] : []}
			onSelectionChange={keys => {
				const selected = Array.from(keys)[0] as string
				if (selected) setTheme(selected)
			}}
		>
			<ToggleButton
				isIconOnly
				aria-label="Light theme"
				id="light"
			>
				<Sun />
			</ToggleButton>
			<ToggleButton
				isIconOnly
				aria-label="Dark theme"
				id="dark"
			>
				<Moon />
			</ToggleButton>
			<ToggleButton
				isIconOnly
				aria-label="System theme"
				id="system"
			>
				<Monitor />
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
