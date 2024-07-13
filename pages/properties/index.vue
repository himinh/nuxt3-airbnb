<script setup lang="ts">
import { toast } from '~/components/ui/toast';
import { reservations, type SafeReservation } from '~/types/listing.type';

const { pending, data } = useAsyncData('properties', () => {
  const getListings = (): Promise<SafeReservation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(reservations), 1000);
    });
  };

  return getListings();
});

const isDeleting = ref(false);
const deleteId = ref('');
const deleteProperty = async (id: string) => {
  isDeleting.value = true;
  deleteId.value = id;

  const deleteReservation = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  await deleteReservation();

  data.value = reservations.filter((reservation) => reservation.id !== id);

  toast({
    description: 'Reservation canceled successfully',
  });

  isDeleting.value = false;
  deleteId.value = '';

  return true;
};
</script>

<template>
  <AppEmptyState
    v-if="!data?.length && !pending"
    title="No properties found"
    subtitle="Looks like you haven't created any properties yet"
  />

  <AppContainer v-else>
    <div
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <template v-if="pending"
        ><ListingLoader v-for="i in 10" :key="i"
      /></template>

      <template v-else>
        <ListingCardItem
          v-for="reservation in data"
          :key="reservation.id"
          :data="reservation.listing"
          action-label="Delete Property"
          :action-id="reservation.id"
          :disabled="isDeleting && deleteId === reservation.id"
          @on-action="deleteProperty"
        />
      </template>
    </div>
  </AppContainer>
</template>
