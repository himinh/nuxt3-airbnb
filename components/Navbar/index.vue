<script setup lang="ts"></script>

<template>
	<div class="fixed z-10 w-full bg-white shadow-sm">
		<div class="border-b py-4">
			<AppContainer>
				<div class="flex items-center justify-between gap-3 md:gap-0">
					<!-- Logo -->
					<NavbarLogo />

					<!-- Search -->
					<NavbarSearch />

					<!-- User menu -->
					<NavbarUserMenu />
				</div>
			</AppContainer>
		</div>

		<NavbarCategories />
	</div>
</template>
