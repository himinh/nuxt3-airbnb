<script setup lang="ts">
const router = useRouter();
const categoryStore = userCategoryStore();

categoryStore.loadCategories();

const { categories, isLoading } = storeToRefs(categoryStore);

const category = computed(() => useRoute().query.category as string);

const onSelect = (name: string) => {
	router.push({ query: { category: name } });
};
</script>

<template>
	<AppContainer>
		<div
			class="flex items-center justify-between gap-x-2 overflow-x-hidden pt-4"
		>
			<template v-if="isLoading">
				<CategoryLoader v-for="i in 10" :key="i" />
			</template>
			<template v-if="categories?.length">
				<CategoryItem
					v-for="item in categories"
					:key="item._id"
					:image="item.image"
					:name="item.name"
					:selected="
						item.name?.toLocaleLowerCase() === category?.toLocaleLowerCase()
					"
					@on-select="onSelect(item.name)"
				/>
			</template>
		</div>
	</AppContainer>
</template>
