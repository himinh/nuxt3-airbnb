<script setup lang="ts">
import { listings, type SafeListing } from '~/types/listing.type';

const route = useRoute();

// @ts-ignore
const query = computed(() => new URLSearchParams(route.query).toString());

const { pending, data } = useAsyncData('listings', () => {
	console.log({ query: query.value });
	const getListings = (): Promise<SafeListing[]> => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(listings), 1000);
		});
	};

	return getListings();
});

watch(
	() => route.query,
	async () => {
		await refreshNuxtData('listings');
	}
);
</script>

<template>
	<AppContainer>
		<AppEmptyState v-if="!data?.length && !pending" :show-reset="true" />
		<div
			class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
		>
			<template v-if="!pending">
				<ListingCardItem
					v-for="listing in data"
					:key="listing.id"
					:data="listing"
				/>
			</template>

			<template v-else>
				<ListingLoader v-for="i in 10" :key="i" />
			</template>
		</div>
	</AppContainer>
</template>
