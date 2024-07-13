<script setup lang="ts">
const { onClose, isOpen } = useAvatarUpload();
const fileInput = ref<HTMLInputElement | null>(null);
const avatarFile = ref<File | undefined>();
const filesAllowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const avatar = ref<string>('');

function onFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  avatarFile.value = inputElement.files?.[0];
}

const dropZoneRef = ref<HTMLDivElement>();
const { files } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: filesAllowed,
});

function onDrop() {
  if (avatar.value) {
    URL.revokeObjectURL(avatar.value);
  }

  console.log({ files });
  if (files.value && files.value[0]) {
    avatar.value = URL.createObjectURL(files.value[0]);

    console.log(avatar.value);
  }
}
</script>

<template>
  <AppModal
    v-if="isOpen"
    :is-open="isOpen"
    title="Update Avatar"
    description=""
    @close="onClose"
  >
    <div
      ref="dropZoneRef"
      class="relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 text-neutral-600 transition hover:opacity-80"
      :class="{ 'p-20': !avatar, 'p-0': avatar }"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/jpeg, image/jpg, image/png, image/webp, image/gif"
        @change="onFileChange"
      />

      <template v-if="!avatar">
        <Icon name="lucide:image-up" size="50" class="text-primary" />
        <p class="text-lg">Drop or click to upload</p>
        <p class="text-xs">Only JPEG, JPG, PNG and WebP format allowed</p>
      </template>
    </div>
  </AppModal>
</template>
