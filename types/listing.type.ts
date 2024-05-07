export type SafeListing = {
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

export const listings = [
	{
		id: '1',
		title: 'Beautiful Apartment in City Center',
		description: 'A cozy apartment located in the heart of the city.',
		price: 100,
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1663133679087-bc5deb50ab00?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'Apartment',
		locationValue: 'AI',
		guestCount: 2,
		roomCount: 1,
		bathroomCount: 1,
	},
	{
		id: '2',
		title: 'Spacious House with Garden',
		description:
			'A lovely house with a beautiful garden, perfect for a family vacation.',
		price: 200,
		imageUrl:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'House',
		locationValue: 'AI',
		guestCount: 6,
		roomCount: 3,
		bathroomCount: 2,
	},
	{
		id: '3',
		title: 'Luxurious Villa by the Beach',
		description:
			'An elegant villa situated by the beach, offering stunning ocean views.',
		price: 500,
		imageUrl:
			'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'Villa',
		locationValue: 'AI',
		guestCount: 8,
		roomCount: 4,
		bathroomCount: 3,
	},
	{
		id: '4',
		title: 'Cozy Loft in Historic District',
		description:
			'A charming loft nestled in the historic district, close to all attractions.',
		price: 80,
		imageUrl:
			'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'Apartment',
		locationValue: 'AI',
		guestCount: 2,
		roomCount: 1,
		bathroomCount: 1,
	},
	{
		id: '5',
		title: 'Modern Condo with City View',
		description:
			'A modern condo with panoramic city views, perfect for urban living.',
		price: 150,
		imageUrl:
			'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'Apartment',
		locationValue: 'AI',
		guestCount: 4,
		roomCount: 2,
		bathroomCount: 2,
	},
	{
		id: '6',
		title: 'Secluded Cottage in the Woods',
		description:
			'A cozy cottage hidden in the woods, ideal for a peaceful getaway.',
		price: 180,
		imageUrl:
			'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'House',
		locationValue: 'AI',
		guestCount: 3,
		roomCount: 2,
		bathroomCount: 1,
	},
	{
		id: '7',
		title: 'Chic Apartment near Shopping Center',
		description:
			'A stylish apartment located near the shopping center, with modern amenities.',
		price: 120,
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1677561423213-f416ec0c3195?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'Apartment',
		locationValue: 'AI',
		guestCount: 3,
		roomCount: 1,
		bathroomCount: 1,
	},
	{
		id: '8',
		title: 'Rustic Cabin by the Lake',
		description:
			'A rustic cabin overlooking the lake, perfect for nature lovers.',
		price: 250,
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1692079868962-299ac7088306?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'Cabin',
		locationValue: 'AI',
		guestCount: 6,
		roomCount: 3,
		bathroomCount: 2,
	},
	{
		id: '8',
		title: 'Rustic Cabin by the Lake',
		description:
			'A rustic cabin overlooking the lake, perfect for nature lovers.',
		price: 250,
		imageUrl:
			'https://images.unsplash.com/photo-1486072889922-9aea1fc0a34d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		category: 'Cabin',
		locationValue: 'AI',
		guestCount: 6,
		roomCount: 3,
		bathroomCount: 2,
	},
];
