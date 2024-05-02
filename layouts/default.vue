<script setup lang="ts"></script>

<template>
	<div>
		<!-- === Navbar === -->
		<Navbar />

		<!-- === Main === -->
		<main class="pb-20 pt-[220px]">
			<slot />
		</main>

		<AuthLogin />
		<RentModal />
	</div>
</template>

<style>
@import 'vue-select/dist/vue-select.css';

:root {
	--vs-dropdown-option--active-bg: #ffe4e6;
	--vs-dropdown-option--active-color: #000;
}
/* .vs__selected {
	@apply text-lg;
} */

.vs__dropdown-menu {
	overflow-x: hidden;
}
</style>
