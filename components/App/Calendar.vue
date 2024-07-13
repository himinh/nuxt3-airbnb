<script setup lang="ts">
import 'v-calendar/style.css';
import type { Range } from '~/types/listing.type';

interface CalendarProps {
  value: Range;
  disabledStates?: Date[];
}

const props = defineProps<CalendarProps>();
const emits = defineEmits<{
  (e: 'change', value: Range): void;
}>();
const dateRange = ref(props.value);

watch(dateRange, (newDate: Range) => {
  emits('change', newDate);
});
</script>

<template>
  <VDatePicker
    v-model.range="dateRange"
    color="gray"
    :disabled-dates="disabledStates"
    borderless
    expanded
  />
</template>
