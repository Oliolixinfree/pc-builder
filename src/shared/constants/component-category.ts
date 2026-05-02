import { Component } from '@prisma/generated/prisma/client'

export const COMPONENT_CATEGORIES: (Pick<Component, 'type' | 'name'> & {
	icon: string
})[] = [
	{ type: 'cpu', name: 'CPU', icon: 'Cpu' },
	{ type: 'gpu', name: 'GPU', icon: 'Gpu' },
	{ type: 'motherboard', name: 'Motherboard', icon: 'CircuitBoard' },
	{ type: 'ram', name: 'RAM', icon: 'MemoryStick' },
	{ type: 'ssd', name: 'Storage', icon: 'HardDrive' },
	{ type: 'psu', name: 'Power supply', icon: 'Zap' },
	{ type: 'case', name: 'Case', icon: 'PcCase' },
	{ type: 'cooler', name: 'Cooling', icon: 'Fan' }
]
