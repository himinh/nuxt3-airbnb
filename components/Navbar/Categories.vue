<script setup lang="ts">
import { Categories } from '~/utils/constants';

const category = computed(() => useRoute().query.category);
</script>

<template>
	<AppContainer>
		<div class="flex items-center justify-between overflow-x-auto pt-4">
			<NavbarCategory
				v-for="item in Categories"
				:key="item.icon"
				:icon="item.icon"
				:label="item.label"
				:selected="item.label === category"
			/>
		</div>
	</AppContainer>
</template>
