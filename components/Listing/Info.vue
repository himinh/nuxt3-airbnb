<script setup lang="ts">
import type { Category } from '~/types/1-category';
import type { User } from '~/types/pre-built/2-user';

interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  categories?: Category[];
  locationValue: string;
}
const props = defineProps<ListingInfoProps>();
const { getCountryByValue } = useRentModal();
const coordinates = computed(
  () => getCountryByValue(props.locationValue)?.latlng,
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

    <template v-for="category in categories" :key="category._id!">
      <ListingCategory :icon="category.image" :label="category.name" />
    </template>

    <hr />
    <div class="text-lg font-light text-neutral-500">{{ description }}</div>

    <RentMap :center="coordinates" />
  </div>
</template>
