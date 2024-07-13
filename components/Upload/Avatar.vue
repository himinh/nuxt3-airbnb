<script setup lang="ts">
import {
  Cropper,
  CircleStencil,
  type CropperResult,
} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const imageFile = ref<File | undefined>();
const fileInput = ref<HTMLInputElement | null>(null);
const imageBlogUrl = useObjectUrl(imageFile);

function onFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;

  imageFile.value = inputElement.files?.[0];
}

const cropperRef = ref<typeof Cropper>();

const downloadFile = async () => {
  if (cropperRef.value) {
    const { getResult } = cropperRef.value;

    const { canvas }: CropperResult = getResult();

    canvas!.toBlob(async function (blob) {
      // Gửi đối tượng blob lên server hoặc thực hiện các thao tác khác
      // Ví dụ: Gửi qua XMLHttpRequest hoặc fetch
      // fetch('url', { method: 'POST', body: blob });

      // In ra console để kiểm tra
      console.log(blob);

      // const formData = new FormData();
      // formData.append('file', blob);

      if (!blob) return;

      const formData = new FormData();
      formData.append('file', blob, 'image.png'); // 'image.png' is the filename

      const headers = {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE5Mzg0OWZiNzBhZDllNTI1ODQxMjYiLCJyb2xlcyI6WyJTVVBFUl9BRE1JTiJdLCJ1c2VyR3JvdXBJZHMiOltdLCJmdWxsTmFtZSI6InN1cGVyIGFkbWluIiwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6Iis4NDc3NzYyNDMiLCJzb2NpYWxJRCI6bnVsbCwiYWNjb3VudFR5cGUiOiJMT0NBTCIsImlhdCI6MTcxNDg4NDU1OCwiZXhwIjoxNzE1NDg5MzU4fQ.Bg3EUmMFzUNwHH3JnZQItLM30VumZoILW3gfHjGXD6I',
      };

      const response = await fetch('http://localhost:8888/api/uploads/file', {
        method: 'POST',
        body: formData,
        headers,
      });
      const res = await response.json();
      console.log(res);
    });
  }
};

const zoom = (factor: number) => {
  cropperRef.value?.zoom(factor);
};
</script>

<template>
  <div
    class="relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 text-neutral-600 transition hover:opacity-80"
    :class="{ 'p-20': !imageBlogUrl, 'p-0': imageBlogUrl }"
  >
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/*"
      @change="onFileChange"
    />

    <Icon v-if="!imageBlogUrl" name="lucide:image" size="50" />
    <div v-if="!imageBlogUrl" class="text-lg font-semibold">
      Click to upload
    </div>

    <cropper
      v-if="imageBlogUrl"
      ref="cropperRef"
      :src="imageBlogUrl"
      :stencil-size="{ width: 300, height: 300 }"
      :stencil-props="{
        handlers: {},
        resizable: false,
        aspectRatio: 1,
      }"
      :stencil-component="CircleStencil"
      class="h-full bg-white object-fill"
      image-class="bg-white"
    />

    <!-- <img v-else :src="imageBlogUrl" alt="House" class="h-full" /> -->
    <button @click="fileInput?.click">Edit</button>
    <hr />
    <Button @click="downloadFile">Download</Button>

    <hr />
  </div>
</template>

<style>
.vue-circle-stencil__preview {
  background-color: white;
}
</style>
