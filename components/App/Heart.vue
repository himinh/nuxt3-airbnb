<script setup lang="ts">
interface HearButtonProps {
  listingId: string;
}

const props = defineProps<HearButtonProps>();
const { toggleFavorite, isFavorite } = useFavorite({
  listingId: props.listingId,
});

const handleFavorite = async (e: MouseEvent) => {
  await toggleFavorite(e);
};
</script>

<template>
  <div
    class="relative cursor-pointer transition hover:opacity-80"
    @click="handleFavorite"
  >
    <Icon
      name="prime:heart"
      size="28"
      class="absolute -right-[2px] -top-[2px] text-white"
    />
    <Icon
      name="prime:heart-fill"
      size="24"
      :class="[isFavorite ? 'text-rose-500' : 'text-neutral-500/70']"
    />
  </div>
</template>
