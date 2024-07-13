<script setup lang="ts">
interface CategoryProps {
  image: string;
  name: string;
  selected?: boolean;
}

defineProps<CategoryProps>();

const emits = defineEmits<{
  (e: 'on-select', name: string): void;
}>();

const onSelect = (name: string) => {
  emits('on-select', name);
};
</script>

<template>
  <div
    class="flex cursor-pointer flex-col items-center gap-2 border-b p-3 transition duration-500 hover:border-b-neutral-500 hover:text-neutral-800 hover:opacity-100"
    :class="{
      'border-b-neutral-500 text-neutral-800 opacity-100': selected,
      'border-transparent text-neutral-500 opacity-80': !selected,
    }"
    @click="onSelect(name)"
  >
    <img :src="image" height="24" width="24" />
    <span class="d-block whitespace-nowrap text-sm font-normal">{{
      name
    }}</span>
  </div>
</template>
