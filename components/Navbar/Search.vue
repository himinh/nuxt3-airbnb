<script setup lang="ts">
import { differenceInDays } from 'date-fns';

const route = useRoute();
const { getCountryByValue } = useRentModal();

const queryString = computed(() => {
  // @ts-ignore
  return new URLSearchParams(route.query).toString();
});

const queryStringToObject = (query: string) =>
  [...new URLSearchParams(query)].reduce(
    // @ts-ignore
    (a, [k, v]) => ((a[k] = v), a),
    {},
  );

const locationValue = computed(
  // @ts-ignore
  () => queryStringToObject(queryString.value).locationValue,
);

const startDate = computed(
  // @ts-ignore
  () => queryStringToObject(queryString.value).startDate,
);

const endDate = computed(
  // @ts-ignore
  () => queryStringToObject(queryString.value).endDate,
);

const guestCount = computed(
  // @ts-ignore
  () => queryStringToObject(queryString.value).guestCount,
);

const locationLabel = computed(() => {
  if (locationValue.value) return getCountryByValue(locationValue.value)?.label;

  return 'Anywhere';
});

const durationLabel = computed(() => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    const diff = differenceInDays(end, start);

    if (diff === 0) return '1 day';

    return `${diff} days`;
  }

  return 'Any week';
});

const guestLabel = computed(() => {
  if (guestCount.value) return `${guestCount.value} guests`;

  return 'Add guests';
});
</script>

<template>
  <div
    class="cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md md:mx-auto"
  >
    <div class="flex flex-row items-center">
      <div class="px-6 text-sm font-semibold">{{ locationLabel }}</div>
      <div
        class="hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block"
      >
        {{ durationLabel }}
      </div>
      <div
        class="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600"
      >
        <div class="hidden sm:block">{{ guestLabel }}</div>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Icon name="lucide:search" size="18" />
        </div>
      </div>
    </div>
  </div>
</template>
