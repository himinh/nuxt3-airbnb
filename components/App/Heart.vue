<script setup lang="ts"></script>

<template>
	<div class="relative cursor-pointer transition hover:opacity-80">
		<Icon
			name="prime:heart"
			size="28"
			class="absolute -right-[2px] -top-[2px] text-white"
		/>
		<Icon
			name="prime:heart-fill"
			size="24"
			:class="[false ? 'text-rose-500' : 'text-neutral-500/70']"
		/>
	</div>
</template>
