<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core';

const listingStore = useListingStore();

const listEl = ref<HTMLElement | null>(null);

const { listings, pending, isLoadMoreLoading, pageInfo } =
  storeToRefs(listingStore);

useInfiniteScroll(
  listEl,
  async () => {
    await listingStore.loadMoreListings();
  },
  { distance: 2 },
);
</script>

<template>
  <AppContainer>
    <AppEmptyState v-if="!listings?.length && !pending" :show-reset="true" />

    <div
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <template v-if="!pending">
        <ListingCardItem
          v-for="listing in listings"
          :key="listing._id"
          :data="listing"
        />

        <!-- Load more -->
        <span
          v-show="pageInfo?._hasNextPage && !isLoadMoreLoading"
          ref="listEl"
        ></span>

        <!-- Loader -->
        <template v-if="isLoadMoreLoading">
          <ListingLoader v-for="i in 5" :key="i" />
        </template>
      </template>

      <template v-else>
        <ListingLoader v-for="i in 10" :key="i" />
      </template>
    </div>
  </AppContainer>
</template>
