export function getInitials(
	name: string | null | undefined,
	maxLength: number = 2
): string {
	if (!name?.trim()) return ''

	return name
		.trim()
		.split(' ')
		.map(part => part[0])
		.join('')
		.toUpperCase()
		.slice(0, maxLength)
}
