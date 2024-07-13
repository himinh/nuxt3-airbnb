<script setup lang="ts">
interface Props {
  center?: number[];
}
defineProps<Props>();

const width = ref(50);
const height = ref(50);

const icon = ref('/map-marker.svg');

const size = computed(() => [width.value, height.value]);
</script>

<template>
  <div class="h-[35vh] w-full rounded-lg">
    <LMap ref="map" :zoom="6" :center="center ? center : [47.21322, -1.559482]">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />

      <LMarker v-if="center" :lat-lng="center">
        <LIcon :icon-url="icon" :icon-size="size" />
      </LMarker>
    </LMap>
  </div>
</template>
