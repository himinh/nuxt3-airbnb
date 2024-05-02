<script setup lang="ts">
import VSelect from 'vue-select';
import type { Country } from '~/types/country.type';
import { Categories } from '~/utils/constants';

const { onClose, isOpen, countries, getCountryByValue } = useRentModal();

const STEPS = reactive({
	CATEGORY: 0,
	LOCATION: 1,
	INFO: 2,
	IMAGES: 3,
	DESCRIPTION: 4,
	PRICE: 5,
});
const isLoading = ref(false);
const step = ref(STEPS.CATEGORY);
const category = ref('');
const location = ref<null | Country>(null);

const actionLabel = computed(() => {
	if (step.value === STEPS.PRICE) {
		return 'Rent';
	}

	return 'Next';
});

const secondaryActionLabel = computed(() => {
	if (step.value === STEPS.CATEGORY) {
		return undefined;
	}

	return 'Back';
});

const onBack = () => {
	step.value = step.value - 1;
};

const onNext = () => {
	step.value = step.value + 1;
};

const onSubmit = () => {
	try {
		isLoading.value = true;
	} catch (error) {
		// TODO
	}

	isLoading.value = false;
};
</script>

<template>
	<AppModal
		v-if="isOpen"
		:is-open="isOpen"
		title="Airbnb your home"
		@close="onClose"
	>
		<!-- === Category === -->
		<div v-if="step === STEPS.CATEGORY">
			<AppHeading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>

			<div
				class="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2"
			>
				<div v-for="item in Categories" :key="item.icon" class="col-span-1">
					<RentCategoryInput
						:label="item.label"
						:icon="item.icon"
						:selected="category === item.label"
						@click="category = item.label"
					/>
				</div>
			</div>
		</div>

		<!-- === Location === -->
		<div v-if="step === STEPS.LOCATION">
			<AppHeading
				title="Where is your place located?"
				subtitle="help guests find you"
			/>

			<VSelect v-model="location" name="location" :options="countries">
				<template #option="country">
					<div class="flex items-center gap-3 text-lg">
						// @ts-ignore
						<div>{{ country.flag }}</div>
						<div>
							{{ country.label }}

							<span class="ml-1 text-neutral-500">{{ country.region }}</span>
						</div>
					</div>
				</template>
			</VSelect>
		</div>

		<!-- === Actions === -->
		<div class="flex flex-col gap-2 py-6">
			<div class="flex w-full items-center gap-4">
				<Button
					v-if="secondaryActionLabel"
					:disabled="isLoading"
					variant="outline"
					type="button"
					class="flex-1"
					@click="onBack"
				>
					{{ secondaryActionLabel }}
				</Button>

				<Button
					:disabled="isLoading"
					type="button"
					class="flex-1"
					@click="onNext"
				>
					{{ actionLabel }}
				</Button>
			</div>
		</div>
	</AppModal>
</template>
