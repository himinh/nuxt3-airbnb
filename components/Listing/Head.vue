<script setup lang="ts">
interface ListingHeadProps {
  title: string;
  imageUrl: string;
  locationValue: string;
  id: string;
}
const props = defineProps<ListingHeadProps>();
const { getCountryByValue } = useRentModal();

const location = computed(() => getCountryByValue(props.locationValue));
</script>

<template>
  <div>
    <AppHeading
      :title="title"
      :subtitle="`${location?.region}, ${location?.label}`"
    />

    <div class="relative h-[40vh] w-full overflow-hidden rounded-xl">
      <img
        :src="imageUrl"
        :alt="title"
        fit="fill"
        class="w-full object-cover"
      />
      <div class="absolute right-5 top-5">
        <AppHeart :listing-id="id" />
      </div>
    </div>
  </div>
</template>
