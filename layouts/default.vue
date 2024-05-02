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
	</div>
</template>
