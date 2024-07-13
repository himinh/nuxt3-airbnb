<script setup lang="ts">
import { format } from 'date-fns';
import { ReloadIcon } from '@radix-icons/vue';
import type { SafeListing, SafeReservation } from '~/types/listing.type';
import type { Listing } from '~/types/2-listing';

interface ListingCardProps {
  data: Listing;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  reservation?: SafeReservation;
}

const { getCountryByValue } = useRentModal();

const location = toRef(
  computed(() => getCountryByValue(props.data.locationValue)),
);

const props = defineProps<ListingCardProps>();

const reservationDate = computed(() => {
  if (props.reservation) {
    const start = new Date(props.reservation.start);
    const end = new Date(props.reservation.end);

    return format(start, 'PP') + ' - ' + format(end, 'PP');
  }

  return null;
});

const emits = defineEmits(['onAction']);
const handleCancel = (e: MouseEvent) => {
  e.stopPropagation();

  if (props.disabled) return;

  emits('onAction', props.actionId);
};
</script>

<template>
  <Card
    class="group col-span-1 cursor-pointer rounded-xl border-0 shadow-none"
    @click="navigateTo(`/listings/${data._id}`)"
  >
    <CardContent class="grid gap-4 p-0">
      <div
        class="relative aspect-square h-[200px] w-full overflow-hidden rounded-xl"
      >
        <img
          :src="data.images[0]"
          :alt="data.title"
          class="h-full w-full object-cover transition group-hover:scale-110"
        />

        <div class="absolute right-3 top-3">
          <AppHeart :listing-id="data._id!" />
        </div>
      </div>

      <div class="text-lg font-semibold">
        {{ location?.region }}, {{ location?.label }}
      </div>

      <div class="line-clamp-1 font-light text-neutral-500">
        <template v-if="reservationDate">
          {{ reservationDate }}
        </template>

        <template v-for="category in data.categoryIds" :key="category._id!">
          {{ category.name }},
        </template>
      </div>

      <div class="flex flex-row items-center gap-1">
        <div class="font-semibold">${{ data.price }}</div>
      </div>
    </CardContent>

    <CardFooter
      v-if="actionLabel"
      :disabled="disabled"
      class="w-full justify-between border-0 p-0 pt-2"
    >
      <Button variant="destructive" class="w-full" @click="handleCancel">
        <ReloadIcon v-if="disabled" class="mr-2 h-4 w-4 animate-spin" />
        {{ actionLabel }}
      </Button>
    </CardFooter>
  </Card>
</template>
