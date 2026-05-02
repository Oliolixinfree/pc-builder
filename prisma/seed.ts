import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { ComponentType, PrismaClient } from './generated/prisma/client'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
	console.log('We are starting to fill the database...')

	console.log('Clearing old data...')
	await prisma.like.deleteMany()
	await prisma.buildComponent.deleteMany()
	await prisma.build.deleteMany()
	await prisma.component.deleteMany()
	await prisma.user.deleteMany()

	console.log('Adding components...')

	// ========== (CPU) ==========
	await prisma.component.createMany({
		data: [
			// Intel
			{
				type: ComponentType.cpu,
				name: 'Intel Core i5-13600K',
				price: 346,
				socket: 'LGA1700'
			},
			{
				type: ComponentType.cpu,
				name: 'Intel Core i7-13700K',
				price: 519,
				socket: 'LGA1700'
			},
			{
				type: ComponentType.cpu,
				name: 'Intel Core i9-13900K',
				price: 798,
				socket: 'LGA1700'
			},
			{
				type: ComponentType.cpu,
				name: 'Intel Core i5-12400F',
				price: 212,
				socket: 'LGA1700'
			},
			{
				type: ComponentType.cpu,
				name: 'Intel Core i3-12100F',
				price: 119,
				socket: 'LGA1700'
			},

			// AMD
			{
				type: ComponentType.cpu,
				name: 'AMD Ryzen 5 7600X',
				price: 312,
				socket: 'AM5'
			},
			{
				type: ComponentType.cpu,
				name: 'AMD Ryzen 7 7800X3D',
				price: 532,
				socket: 'AM5'
			},
			{
				type: ComponentType.cpu,
				name: 'AMD Ryzen 9 7950X',
				price: 732,
				socket: 'AM5'
			},
			{
				type: ComponentType.cpu,
				name: 'AMD Ryzen 5 5600X',
				price: 212,
				socket: 'AM4'
			},
			{
				type: ComponentType.cpu,
				name: 'AMD Ryzen 7 5800X3D',
				price: 399,
				socket: 'AM4'
			}
		]
	})

	// ========== (GPU) ==========
	await prisma.component.createMany({
		data: [
			{
				type: ComponentType.gpu,
				name: 'NVIDIA RTX 4070 Ti',
				price: 1144,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'NVIDIA RTX 4080',
				price: 1597,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'NVIDIA RTX 4090',
				price: 2263,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'NVIDIA RTX 4060 Ti',
				price: 612,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'NVIDIA RTX 3060',
				price: 439,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'AMD RX 7900 XTX',
				price: 1331,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'AMD RX 7800 XT',
				price: 798,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'AMD RX 7700 XT',
				price: 612,
				socket: null
			},
			{
				type: ComponentType.gpu,
				name: 'AMD RX 6800',
				price: 532,
				socket: null
			}
		]
	})

	// ========== (MOTHERBOARDS) ==========
	await prisma.component.createMany({
		data: [
			{
				type: ComponentType.motherboard,
				name: 'ASUS PRIME Z790-P',
				price: 306,
				socket: 'LGA1700'
			},
			{
				type: ComponentType.motherboard,
				name: 'MSI B760 GAMING PLUS',
				price: 239,
				socket: 'LGA1700'
			},
			{
				type: ComponentType.motherboard,
				name: 'GIGABYTE B760 DS3H',
				price: 199,
				socket: 'LGA1700'
			},
			{
				type: ComponentType.motherboard,
				name: 'ASUS TUF GAMING B650-PLUS',
				price: 266,
				socket: 'AM5'
			},
			{
				type: ComponentType.motherboard,
				name: 'MSI B650 GAMING PLUS',
				price: 252,
				socket: 'AM5'
			},
			{
				type: ComponentType.motherboard,
				name: 'MSI B550 GAMING GEN3',
				price: 159,
				socket: 'AM4'
			},
			{
				type: ComponentType.motherboard,
				name: 'ASUS PRIME B450-PLUS',
				price: 119,
				socket: 'AM4'
			}
		]
	})

	// ========== (RAM) ==========
	await prisma.component.createMany({
		data: [
			{
				type: ComponentType.ram,
				name: 'Kingston Fury 16GB DDR4',
				price: 79,
				socket: null
			},
			{
				type: ComponentType.ram,
				name: 'Kingston Fury 32GB DDR4',
				price: 146,
				socket: null
			},
			{
				type: ComponentType.ram,
				name: 'Corsair Vengeance 16GB DDR5',
				price: 119,
				socket: null
			},
			{
				type: ComponentType.ram,
				name: 'Corsair Vengeance 32GB DDR5',
				price: 212,
				socket: null
			},
			{
				type: ComponentType.ram,
				name: 'Samsung 16GB DDR4',
				price: 66,
				socket: null
			},
			{
				type: ComponentType.ram,
				name: 'G.Skill Trident Z5 32GB DDR5',
				price: 252,
				socket: null
			}
		]
	})

	// ========== (SSD) ==========
	await prisma.component.createMany({
		data: [
			{
				type: ComponentType.ssd,
				name: 'Samsung 980 500GB NVMe',
				price: 79,
				socket: null
			},
			{
				type: ComponentType.ssd,
				name: 'Samsung 980 1TB NVMe',
				price: 119,
				socket: null
			},
			{
				type: ComponentType.ssd,
				name: 'Samsung 980 Pro 1TB NVMe',
				price: 159,
				socket: null
			},
			{
				type: ComponentType.ssd,
				name: 'WD Blue 1TB SATA SSD',
				price: 93,
				socket: null
			},
			{
				type: ComponentType.ssd,
				name: 'Kingston NV2 1TB NVMe',
				price: 79,
				socket: null
			},
			{
				type: ComponentType.ssd,
				name: 'Kingston NV2 2TB NVMe',
				price: 146,
				socket: null
			},
			{
				type: ComponentType.ssd,
				name: 'Seagate BarraCuda 1TB HDD',
				price: 53,
				socket: null
			},
			{
				type: ComponentType.ssd,
				name: 'WD Blue 2TB HDD',
				price: 79,
				socket: null
			}
		]
	})

	// ========== (PSU) ==========
	await prisma.component.createMany({
		data: [
			{
				type: ComponentType.psu,
				name: 'be quiet! 550W Bronze',
				price: 79,
				socket: null
			},
			{
				type: ComponentType.psu,
				name: 'be quiet! 650W Gold',
				price: 119,
				socket: null
			},
			{
				type: ComponentType.psu,
				name: 'be quiet! 750W Gold',
				price: 146,
				socket: null
			},
			{
				type: ComponentType.psu,
				name: 'Corsair 650W Bronze',
				price: 93,
				socket: null
			},
			{
				type: ComponentType.psu,
				name: 'Corsair 850W Gold',
				price: 172,
				socket: null
			},
			{
				type: ComponentType.psu,
				name: 'DeepCool 500W',
				price: 53,
				socket: null
			},
			{
				type: ComponentType.psu,
				name: 'DeepCool 750W Gold',
				price: 119,
				socket: null
			}
		]
	})

	// ========== (CASE) ==========
	await prisma.component.createMany({
		data: [
			{
				type: ComponentType.case,
				name: 'DeepCool CC560',
				price: 53,
				socket: null
			},
			{
				type: ComponentType.case,
				name: 'DeepCool CH370',
				price: 66,
				socket: null
			},
			{
				type: ComponentType.case,
				name: 'Zalman S2',
				price: 43,
				socket: null
			},
			{
				type: ComponentType.case,
				name: 'Corsair 4000D Airflow',
				price: 119,
				socket: null
			},
			{
				type: ComponentType.case,
				name: 'NZXT H5 Flow',
				price: 119,
				socket: null
			},
			{
				type: ComponentType.case,
				name: 'Lian Li Lancool 216',
				price: 133,
				socket: null
			},
			{
				type: ComponentType.case,
				name: 'be quiet! Pure Base 500DX',
				price: 146,
				socket: null
			}
		]
	})

	// ========== (COOLER) ==========
	await prisma.component.createMany({
		data: [
			{
				type: ComponentType.cooler,
				name: 'DeepCool AK400',
				price: 39,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'DeepCool AK620',
				price: 79,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'be quiet! Pure Rock 2',
				price: 53,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'Noctua NH-D15',
				price: 133,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'DeepCool LS520 SE 240мм',
				price: 93,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'DeepCool LS720 360мм',
				price: 146,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'Arctic Liquid Freezer II 240',
				price: 106,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'Arctic Liquid Freezer II 360',
				price: 159,
				socket: null
			},
			{
				type: ComponentType.cooler,
				name: 'MSI MAG CoreLiquid 240R',
				price: 119,
				socket: null
			}
		]
	})

	console.log('Adding a test user...')
	await prisma.user.create({
		data: {
			email: 'test@test.com',
			name: 'Test User',
			password: await bcrypt.hash('123456789', 10)
		}
	})

	const componentsCount = await prisma.component.count()
	const usersCount = await prisma.user.count()

	console.log(`The records have been successfully added to the database.:`)
	console.log(`   - ${componentsCount} components`)
	console.log(`   - ${usersCount} users`)
}

main()
	.catch(e => {
		console.error('Error:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
