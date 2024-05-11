import { categoryData } from '~/utils/constants';
import { GenderEnum, RoleEnum } from '~/utils/enums';
import type { User } from './user.type';

export type SafeListing = {
	user: User;
	id: string;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	locationValue: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
};

export type Range = {
	start: Date;
	end: Date;
};

export const listings: SafeListing[] = [
	{
		user: {
			_id: '1',
			fullName: 'Alice Smith',
			gender: GenderEnum.Male,
			dateOfBirth: 631152000000,
			avatar: '',
			deviceID: 'device_id_1',
			fcmTokens: ['fcm_token_1'],
			enableFcm: true,
			role: RoleEnum.Admin,
			deleted: false,
		},
		id: '1',
		title: 'Beautiful Apartment in City Center',
		description: 'A cozy apartment located in the heart of the city.',
		price: 100,
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1663133679087-bc5deb50ab00?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 2,
		roomCount: 1,
		bathroomCount: 1,
	},
	{
		user: {
			_id: '2',
			fullName: 'Bob',
			gender: GenderEnum.Female,
			dateOfBirth: 662688000000,
			avatar: '',
			deviceID: 'device_id_2',
			fcmTokens: ['fcm_token_2'],
			enableFcm: true,
			role: RoleEnum.User,
			deleted: false,
		},
		id: '2',
		title: 'Spacious House with Garden',
		description:
			'A lovely house with a beautiful garden, perfect for a family vacation.',
		price: 200,
		imageUrl:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 6,
		roomCount: 3,
		bathroomCount: 2,
	},
	{
		user: {
			_id: '3',
			fullName: 'Charlie Brown',
			gender: GenderEnum.Female,
			dateOfBirth: 604800000000,
			avatar: '',
			deviceID: 'device_id_3',
			fcmTokens: ['fcm_token_3'],
			enableFcm: true,
			role: RoleEnum.User,
			deleted: false,
		},
		id: '3',
		title: 'Luxurious Villa by the Beach',
		description:
			'An elegant villa situated by the beach, offering stunning ocean views.',
		price: 500,
		imageUrl:
			'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 8,
		roomCount: 4,
		bathroomCount: 3,
	},
	{
		user: {
			_id: '4',
			fullName: 'Diana',
			gender: GenderEnum.Male,
			dateOfBirth: 590112000000,
			avatar: '',
			deviceID: 'device_id_4',
			fcmTokens: ['fcm_token_4'],
			enableFcm: true,
			role: RoleEnum.User,
			deleted: false,
		},
		id: '4',
		title: 'Cozy Loft in Historic District',
		description:
			'A charming loft nestled in the historic district, close to all attractions.',
		price: 80,
		imageUrl:
			'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 2,
		roomCount: 1,
		bathroomCount: 1,
	},
	{
		user: {
			_id: '5',
			fullName: 'Eva',
			gender: GenderEnum.Male,
			dateOfBirth: 734976000000,
			avatar: '',
			deviceID: 'device_id_5',
			fcmTokens: ['fcm_token_5'],
			enableFcm: true,
			role: RoleEnum.User,
			deleted: false,
		},
		id: '5',
		title: 'Modern Condo with City View',
		description:
			'A modern condo with panoramic city views, perfect for urban living.',
		price: 150,
		imageUrl:
			'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 4,
		roomCount: 2,
		bathroomCount: 2,
	},
	{
		user: {
			_id: '6',
			fullName: 'Frank',
			gender: GenderEnum.Female,
			dateOfBirth: 648691200000,
			avatar: '',
			deviceID: 'device_id_6',
			fcmTokens: ['fcm_token_6'],
			enableFcm: true,
			role: RoleEnum.User,
			deleted: false,
		},
		id: '6',
		title: 'Secluded Cottage in the Woods',
		description:
			'A cozy cottage hidden in the woods, ideal for a peaceful getaway.',
		price: 180,
		imageUrl:
			'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 3,
		roomCount: 2,
		bathroomCount: 1,
	},
	{
		user: {
			_id: '7',
			fullName: 'Grace',
			gender: GenderEnum.Male,
			dateOfBirth: 576288000000,
			avatar: '',
			deviceID: 'device_id_7',
			fcmTokens: ['fcm_token_7'],
			enableFcm: true,
			role: RoleEnum.User,
			deleted: false,
		},
		id: '7',
		title: 'Chic Apartment near Shopping Center',
		description:
			'A stylish apartment located near the shopping center, with modern amenities.',
		price: 120,
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1677561423213-f416ec0c3195?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 3,
		roomCount: 1,
		bathroomCount: 1,
	},
	{
		user: {
			_id: '8',
			fullName: 'Harry',
			gender: GenderEnum.Female,
			dateOfBirth: 694224000000,
			avatar: '',
			deviceID: 'device_id_8',
			fcmTokens: ['fcm_token_8'],
			enableFcm: true,
			role: RoleEnum.User,
			deleted: false,
		},
		id: '8',
		title: 'Rustic Cabin by the Lake',
		description:
			'A rustic cabin overlooking the lake, perfect for nature lovers.',
		price: 250,
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1692079868962-299ac7088306?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 6,
		roomCount: 3,
		bathroomCount: 2,
	},
	{
		user: {
			_id: '1',
			fullName: 'Alice Smith',
			gender: GenderEnum.Male,
			dateOfBirth: 631152000000,
			avatar: '',
			deviceID: 'device_id_1',
			fcmTokens: ['fcm_token_1'],
			enableFcm: true,
			role: RoleEnum.Admin,
			deleted: false,
		},
		id: '8',
		title: 'Rustic Cabin by the Lake',
		description:
			'A rustic cabin overlooking the lake, perfect for nature lovers.',
		price: 250,
		imageUrl:
			'https://images.unsplash.com/photo-1486072889922-9aea1fc0a34d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category:
			categoryData[Math.floor(Math.random() * categoryData.length)].label,
		locationValue: 'AI',
		guestCount: 6,
		roomCount: 3,
		bathroomCount: 2,
	},
];
