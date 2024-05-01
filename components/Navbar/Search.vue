<script setup lang="ts"></script>

<template>
	<div
		class="cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md md:mx-auto"
	>
		<div class="flex flex-row items-center">
			<div class="px-6 text-sm font-semibold">Anywhere</div>
			<div
				class="hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block"
			>
				Any Week
			</div>
			<div
				class="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600"
			>
				<div class="hidden sm:block">Add Guests</div>
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					<Icon name="lucide:search" size="18" />
				</div>
			</div>
		</div>
	</div>
</template>
