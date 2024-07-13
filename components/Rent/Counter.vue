<script setup lang="ts">
interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
}

const props = defineProps<CounterProps>();
const emits = defineEmits<{
  (e: 'change', value: number): void;
}>();

const onAdd = () => {
  emits('change', props.value + 1);
};

const onReduce = () => {
  if (props.value === 1) {
    return;
  }

  emits('change', props.value - 1);
};
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col">
      <div class="font-medium">{{ title }}</div>
      <div class="font-light text-gray-600">{{ subtitle }}</div>
    </div>

    <div class="flex flex-row items-center gap-4">
      <div
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80"
        @click="onReduce"
      >
        <Icon name="lucide:minus" />
      </div>
      <div class="text-xl font-light text-neutral-600">{{ value }}</div>
      <div
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-400 text-neutral-600 transition hover:opacity-80"
        @click="onAdd"
      >
        <Icon name="lucide:plus" />
      </div>
    </div>
  </div>
</template>
