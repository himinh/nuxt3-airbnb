<script setup lang="ts">
interface Props {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

defineProps<Props>();
</script>

<template>
	<div class="flex h-[60vh] flex-col items-center justify-center gap-2">
		<AppHeading
			center
			:title="title ? title : 'No exact matches'"
			:subtitle="
				subtitle ? subtitle : 'Try changing or clearing some of your filters'
			"
		/>

		<div v-if="showReset" class="mt-4 w-48">
			<Button outline @click="navigateTo('/')">Remove all filters</Button>
		</div>
	</div>
</template>
