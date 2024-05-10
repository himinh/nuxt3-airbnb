<script setup lang="ts">
interface CategoryViewProps {
	icon: string;
	label: string;
	description: string;
}
const props = defineProps<CategoryViewProps>();
</script>

<template>
	<div class="flex flex-col gap-8">
		<div class="flex flex-row items-center gap-4">
			<Icon :name="icon" size="40" class="text-neutral-600" />
			<div class="flex flex-col">
				<div class="text-lg font-semibold">{{ label }}</div>
				<div class="font-light text-neutral-500">{{ description }}</div>
			</div>
		</div>
	</div>
</template>
