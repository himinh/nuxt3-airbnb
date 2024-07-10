<script setup lang="ts">
const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

const { onOpen: openLoginModal } = useLogin();
const { onOpen: openRentModal } = useRentModal();
const onLogout = () => {
	useRouter().push({ query: { ...useRoute().query, auth: 'login' } });
	authStore.logout();
};
</script>

<template>
	<div class="relative">
		<div class="flex flex-row items-center gap-3">
			<div
				class="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
				@click="openRentModal"
			>
				Airbnb your home
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger as-child>
					<Button
						variant="ghost"
						size="sm"
						class="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:bg-transparent hover:shadow-md md:px-2"
					>
						<Icon name="lucide:menu" />

						<div class="hidden md:block">
							<!-- <img
								src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/351107048_800348251667886_7191364234500072800_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF0h6CZPTXqJENN1Qu_b6z_TyPs7B2-w_1PI-zsHb7D_fvb9oK4MH0S3VtY-jQNK2uNLe2HXN32d-_volmRLJXj&_nc_ohc=zpQwpFM6bYcQ7kNvgGgNL99&_nc_oc=AdgwRS5AuZAYpGKOzkrEAeLlf5r8MzpX9jdcSvWnpSLz1oHTuTeUauZDa3yE2a5NPZHsfgoPuv97Aw7do0YXpFYk&_nc_ht=scontent.fhan20-1.fna&cb_e2o_trans=t&oh=00_AfD25WN_QJwDsBEXeb2Sz1e7iqhV3TZXkMRBWKnOJMwWqA&oe=663862B7"
								alt="Avatar"
								class="rounded-full object-cover"
								width="24px"
								height="24px"
							/> -->

							<Icon name="lucide:user-round" size="24" class="rounded-full" />
						</div>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent class="w-56" align="end">
					<template v-if="authUser">
						<DropdownMenuItem @click="navigateTo('/trips')">
							My trips
						</DropdownMenuItem>
						<DropdownMenuItem @click="navigateTo('/reservations')">
							Reservations
						</DropdownMenuItem>
						<DropdownMenuItem @click="navigateTo('/favorites')">
							My Favorites
						</DropdownMenuItem>
						<DropdownMenuItem @click="navigateTo('/properties')">
							My Properties
						</DropdownMenuItem>
						<DropdownMenuItem @click="openRentModal">
							Airbnb your home
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem @click="onLogout">
							<Icon name="lucide:log-out" class="mr-2" size="16" />
							Logout
						</DropdownMenuItem>
					</template>

					<template v-else>
						<DropdownMenuItem @click="openLoginModal('register')">
							Register
						</DropdownMenuItem>
						<DropdownMenuItem @click="openLoginModal('login')">
							Login
						</DropdownMenuItem>
					</template>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
</template>
