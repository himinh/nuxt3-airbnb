<script setup lang="ts">
interface CategoryViewProps {
  icon: string;
  label: string;
  description?: string;
}
defineProps<CategoryViewProps>();
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-row items-center gap-4">
      <img :src="icon" :alt="label" class="h-8 w-8 rounded-full" />
      <div class="flex flex-col">
        <div class="text-lg font-semibold">{{ label }}</div>
        <div class="font-light text-neutral-500">{{ description }}</div>
      </div>
    </div>
  </div>
</template>
