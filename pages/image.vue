<script setup lang="ts">
import { Cropper, type CropperResult } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const cropperRef = ref<typeof Cropper>();
const image = ref<{
  src: string | null;
}>({
  src: null,
});

const reset = () => {
  image.value = {
    src: null,
  };
};

const loadImage = (event: any) => {
  // Reference to the DOM input element
  const { files } = event.target;
  const blob = URL.createObjectURL(files[0]);

  image.value.src = blob;
};
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

const { onOpen } = useAvatarUpload();
</script>

<template>
  <div id="app">
    <div class="flex justify-center">
      <Button variant="outline" @click="onOpen">Upload Avatar</Button>
    </div>
    <div class="hidden">
      <cropper
        v-if="image.src"
        ref="cropperRef"
        class="upload-example-cropper"
        :src="image.src"
        :stencil-size="{
          width: 300,
          height: 300,
        }"
        :stencil-props="{
          handlers: {},
          resizable: false,
          aspectRatio: 1,
        }"
      />
      <div class="button-wrapper">
        <button class="button">
          <input type="file" accept="image/*" @change="loadImage" />
          Load image
        </button>
      </div>
    </div>

    <hr class="hidden" />
    <Button class="hidden" @click="downloadFile">Download</Button>
  </div>
</template>

<style lang="scss" scoped></style>
