<script setup lang="ts">
const { getCountryByValue } = useRentModal();
import type { SafeListing } from '~/types/listing.type';

interface ListingCardProps {
	data: SafeListing;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
}

const location = toRef(
	computed(() => getCountryByValue(props.data.locationValue))
);

const props = defineProps<ListingCardProps>();
</script>

<template>
	<Card class="group col-span-1 cursor-pointer rounded-xl border-0 shadow-none">
		<CardContent class="grid gap-4 p-0">
			<div
				class="relative aspect-square h-[200px] w-full overflow-hidden rounded-xl"
			>
				<img
					:src="data.imageUrl"
					:alt="data.title"
					class="h-full w-full object-cover transition group-hover:scale-110"
				/>

				<div class="absolute right-3 top-3">
					<AppHeart :listing-id="data.id" />
				</div>
			</div>

			<div class="text-lg font-semibold">
				{{ location?.region }}, {{ location?.label }}
			</div>

			<div class="line-clamp-1 font-light text-neutral-500">
				{{ data.category }}
			</div>

			<div class="flex flex-row items-center gap-1">
				<div class="font-semibold">${{ data.price }}</div>
			</div>
		</CardContent>
	</Card>
</template>
