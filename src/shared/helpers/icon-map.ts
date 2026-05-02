import { ComponentType } from '@prisma/generated/prisma/client'
import {
	Cpu,
	Gpu,
	CircuitBoard,
	MemoryStick,
	HardDrive,
	Zap,
	PcCase,
	Fan
} from 'lucide-react'

export const iconMap: Record<ComponentType, React.ElementType> = {
	cpu: Cpu,
	gpu: Gpu,
	motherboard: CircuitBoard,
	ram: MemoryStick,
	ssd: HardDrive,
	psu: Zap,
	case: PcCase,
	cooler: Fan
}
