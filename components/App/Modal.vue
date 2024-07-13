<script setup lang="ts">
interface Props {
  isOpen?: boolean;
  title?: string;
  description?: string;
}

const props = defineProps<Props>();
const emits = defineEmits(['close']);

const isModalOpen = computed({
  get() {
    return props.isOpen;
  },

  set() {
    emits('close');
  },
});
</script>

<template>
  <Dialog :open="isModalOpen" @update:open="emits('close')">
    <DialogContent>
      <DialogHeader class="flex flex-col items-center justify-center">
        <DialogTitle v-if="title" class="text-xl">{{ title }}</DialogTitle>
        <DialogDescription>
          <template v-if="description">
            {{ description }}
          </template>
        </DialogDescription>
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
