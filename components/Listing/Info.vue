<script setup lang="ts">
import type { User } from '~/types/user.type';

interface ListingInfoProps {
	user: User;
	description: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	category?: { icon: string; label: string; description: string };
	locationValue: string;
}
const props = defineProps<ListingInfoProps>();
const { getCountryByValue } = useRentModal();
const coordinates = computed(
	() => getCountryByValue(props.locationValue)?.latlng
);
</script>

<template>
	<div class="col-span-4 flex flex-col gap-8">
		<div class="flex items-center gap-4">
			<img
				v-if="user.avatar"
				:src="user.avatar"
				alt=""
				class="h-8 w-8 rounded-full"
			/>

			<Icon v-else name="lucide:user" class="h-8 w-8 rounded-full" />

			<div class="flex flex-col gap-2">
				<div class="flex flex-row items-center gap-2 text-xl font-semibold">
					<p>Hosted by {{ user?.fullName }}</p>
				</div>

				<div
					class="flex flex-row items-center gap-4 font-light text-neutral-500"
				>
					<div>{{ guestCount }} guest</div>
					<div>{{ roomCount }} rooms</div>
					<div>{{ bathroomCount }} bathrooms</div>
				</div>
			</div>
		</div>

		<hr />

		<ListingCategory
			v-if="category"
			:icon="category.icon"
			:label="category.label"
			:description="category.description"
		/>

		<hr />
		<div class="text-lg font-light text-neutral-500">{{ description }}</div>

		<RentMap :center="coordinates" />
	</div>
</template>
