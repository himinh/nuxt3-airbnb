<script setup lang="ts">
interface HearButtonProps {
  listingId: string;
  isWishlist?: boolean;
}
const props = defineProps<HearButtonProps>();
const { toggleFavorite } = useFavorite({
  listingId: props.listingId!,
});

const isHearted = ref(props.isWishlist);
const loading = ref(false);

watch(
  () => props.isWishlist,
  () => {
    isHearted.value = props.isWishlist;
  },
);

const onFavorite = async (e: MouseEvent) => {
  e.stopImmediatePropagation();

  loading.value = true;

  const res = await toggleFavorite(!isHearted.value);

  if (typeof res === 'boolean') isHearted.value = !isHearted.value;

  loading.value = false;
};
</script>

<template>
  <Icon
    v-if="loading"
    name="lucide:loader-circle"
    size="24"
    class="animate-spin text-rose-500"
  />

  <div
    v-else
    class="relative cursor-pointer transition hover:opacity-80"
    @click="onFavorite"
  >
    <Icon name="prime:heart" size="28" class="absolute text-white" />
    <Icon
      name="prime:heart-fill"
      size="26"
      :class="[isHearted ? 'text-rose-500' : 'text-neutral-500/70']"
    />
  </div>
</template>
