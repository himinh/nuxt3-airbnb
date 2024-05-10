<script setup lang="ts">
import { categoryData } from '~/utils/constants';
import { listings, type SafeListing } from '~/types/listing.type';

const route = useRoute();

const { id } = route.params as {
	id: string;
};

const { data } = useAsyncData(`listing-${id}`, () => {
	const getListings = (): Promise<SafeListing> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const res = listings.find((item) => item.id === id);
				if (!res) return;

				resolve(res);
			}, 1000);
		});
	};

	return getListings();
});

const category = computed(() =>
	categoryData.find((item) => item.label === data.value?.category)
);
</script>

<template>
	<AppContainer v-if="data">
		<div class="max-screen-lg mx-auto">
			<div class="flex flex-col gap-6">
				<ListingHead
					:id="data.id"
					:title="data.title"
					:location-value="data.locationValue"
					:image-url="data.imageUrl"
				/>

				<div class="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
					<ListingInfo
						:user="data.user"
						:category="category"
						:description="data.description"
						:room-count="data.roomCount"
						:bathroom-count="data.bathroomCount"
						:guest-count="data.guestCount"
						:location-value="data.locationValue"
					/>
				</div>
			</div>
		</div>
	</AppContainer>
</template>
