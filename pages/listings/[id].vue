<script setup lang="ts">
import { categoryData } from '~/utils/constants';
import { listings, type Range, type SafeListing } from '~/types/listing.type';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { toast } from '~/components/ui/toast';
import { listingApi } from '~/apis/2-listing.api';

const route = useRoute();

const { id } = route.params as {
  id: string;
};

const { data } = useAsyncData(`listing-${id}`, () => {
  return listingApi.getById(id, {
    _populate: 'categoryIds,hostId',
  });
});

const initialDateRange = reactive<Range>({
  start: new Date(),
  end: new Date(),
});
const isLoading = ref(false);
const totalPrice = ref(data.value?.price);
const dateRange = ref<Range>(initialDateRange);
const reservations = ref<Range[]>([
  {
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 4)),
  },
]);
const disabledDates = computed(() => {
  let dates: Date[] = [];
  reservations.value.forEach((reservation) => {
    const range = eachDayOfInterval({
      start: new Date(reservation.start),
      end: new Date(reservation.end),
    });

    dates = [...dates, ...range];
  });

  return dates;
});

const createReservation = async () => {
  console.log({
    body: {
      totalPrice: totalPrice.value,
      startDate: dateRange.value.start.toISOString(),
      endDate: dateRange.value.end.toISOString(),
      listingId: id,
    },
  });
  console.log('createReservation');

  isLoading.value = true;
  await useAsyncData(() => {
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

  isLoading.value = false;

  toast({
    description: 'Reservation created successfully',
  });
};

watchEffect(() => {
  if (dateRange.value.start && dateRange.value.end) {
    const dayCount = differenceInDays(
      dateRange.value.end,
      dateRange.value.start,
    );
    if (dayCount && data.value?.price) {
      totalPrice.value = data.value.price * dayCount;
    } else {
      totalPrice.value = data.value?.price || 0;
    }
  }
});

const setDates = (date: Range) => {
  dateRange.value.start = date.start;
  dateRange.value.end = date.end;
};
</script>

<template>
  <AppContainer v-if="data">
    <div class="max-screen-lg mx-auto">
      <div class="flex flex-col gap-6">
        <ListingHead
          :id="data._id!"
          :title="data.title"
          :location-value="data.locationValue"
          :image-url="data.images[0]"
        />

        <div class="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            :user="data.hostId"
            :categories="data.categoryIds"
            :description="data.description"
            :room-count="data.roomCount"
            :bathroom-count="data.bathroomCount"
            :guest-count="data.guestCount"
            :location-value="data.locationValue"
          />

          <div class="order-first mb-10 md:order-last md:col-span-3">
            <ListingLoader v-if="isLoading" />

            <ListingReservation
              v-else
              :price="data.price"
              :date-range="dateRange"
              :total-price="totalPrice"
              :disabled-dates="disabledDates"
              @change="setDates"
              @submit-reservation="createReservation"
            />
          </div>
        </div>
      </div>
    </div>
  </AppContainer>
</template>
