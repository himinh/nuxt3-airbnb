<script setup lang="ts">
import { categoryData } from '~/utils/constants';

const category = computed(() => useRoute().query.category);
</script>

<template>
	<AppContainer>
		<div class="flex items-center justify-between overflow-x-auto pt-4">
			<NavbarCategory
				v-for="item in categoryData"
				:key="item.icon"
				:icon="item.icon"
				:label="item.label"
				:selected="item.label === category"
			/>
		</div>
	</AppContainer>
</template>
