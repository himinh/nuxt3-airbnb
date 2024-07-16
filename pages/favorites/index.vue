<script setup lang="ts">
const wishlistStore = useWishlistStore();
const { pending, listings } = storeToRefs(wishlistStore);
</script>

<template>
  <AppEmptyState
    v-if="!listings?.length && !pending"
    title="No favorites found"
    subtitle="Looks like you haven't created any favorites yet"
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
          v-for="listing in listings"
          :key="listing._id"
          :data="listing"
        />
      </template>
    </div>
  </AppContainer>
</template>
