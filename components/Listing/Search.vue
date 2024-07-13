<script setup lang="ts">
import VSelect from 'vue-select';
import type { Country } from '~/types/country.type';
import type { Range } from '~/types/listing.type';

const STEPS = reactive({
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
});

const route = useRoute();
const router = useRouter();
const { countries } = useRentModal();
const { onClose, isOpen } = useSearch();

const step = ref(STEPS.LOCATION);
const location = ref<null | Country>(null);
const guestCount = ref(1);
const roomCount = ref(1);
const bathroomCount = ref(1);

const actionLabel = computed(() => {
  if (step.value === STEPS.INFO) return 'Search';

  return 'Next';
});

const secondaryActionLabel = computed(() => {
  if (step.value === STEPS.LOCATION) return undefined;

  return 'Back';
});

const onBack = () => {
  step.value = step.value - 1;
};

const onNext = () => {
  step.value = step.value + 1;
};

const initialDateRange = reactive<Range>({
  start: new Date(),
  end: new Date(),
});
const dateRange = ref<Range>(initialDateRange);

const setDates = (date: Range) => {
  dateRange.value.start = date.start;
  dateRange.value.end = date.end;
};

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

const onSubmit = () => {
  console.log({ step });
  if (step.value !== STEPS.INFO) {
    return onNext();
  }

  let currentQuery = {};
  if (queryString.value) {
    currentQuery = queryStringToObject(queryString.value);
  }

  const updatedQuery: any = {
    ...currentQuery,
    locationValue: location?.value?.value,
    guestCount: guestCount.value,
    roomCount: roomCount.value,
    bathroomCount: bathroomCount.value,
  };

  if (dateRange.value.start) {
    updatedQuery.startDate = dateRange.value.start.toISOString();
  }

  if (dateRange.value.end) {
    updatedQuery.endDate = dateRange.value.end.toISOString();
  }

  router.push({ query: updatedQuery });

  step.value = 0;
  onClose();
};
</script>

<template>
  <AppModal v-if="isOpen" :is-open="isOpen" title="Filters" @close="onClose">
    <!-- === Location === -->
    <div v-if="step === STEPS.LOCATION" class="flex flex-col gap-8">
      <AppHeading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />

      <ClientOnly>
        <VSelect v-model="location" name="location" :options="countries">
          <template #option="country">
            <div class="flex items-center gap-3 text-lg">
              <div>{{ (country as any).flag }}</div>
              <div>
                {{ (country as any).label }}

                <span class="ml-1 text-neutral-500">{{
                  (country as any).region
                }}</span>
              </div>
            </div>
          </template>
        </VSelect>
      </ClientOnly>

      <hr />

      <ClientOnly>
        <RentMap :center="location?.latlng" />
      </ClientOnly>
    </div>

    <!-- === Dates === -->
    <div v-if="step === STEPS.DATE" class="flex flex-col gap-8">
      <AppHeading
        title="Where do you plan to go?"
        subtitle="Make sure everyone is free!"
      />

      <AppCalendar :value="dateRange" @change="setDates" />
    </div>

    <!-- === Info === -->
    <div v-if="step === STEPS.INFO" class="flex flex-col gap-8">
      <AppHeading
        title="Share some basic info about your place"
        subtitle="What amenitis do you have?"
      />

      <RentCounter
        title="Guests"
        subtitle="How many guests do you allow?"
        :value="guestCount"
        @change="
          (val) => {
            guestCount = val;
          }
        "
      />
      <hr />

      <RentCounter
        title="Rooms"
        subtitle="How many room do you have?"
        :value="roomCount"
        @change="
          (val) => {
            roomCount = val;
          }
        "
      />
      <hr />

      <RentCounter
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        :value="bathroomCount"
        @change="
          (val) => {
            bathroomCount = val;
          }
        "
      />
    </div>

    <!-- === Actions === -->
    <div class="flex flex-col gap-2 py-6">
      <div class="flex w-full items-center gap-4">
        <Button
          v-if="secondaryActionLabel"
          variant="outline"
          type="button"
          class="flex-1"
          @click="onBack"
        >
          {{ secondaryActionLabel }}
        </Button>

        <Button type="button" class="flex-1" @click="onSubmit">
          {{ actionLabel }}
        </Button>
      </div>
    </div>
  </AppModal>
</template>
