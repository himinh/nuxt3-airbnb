<script setup lang="ts">
import { useForm } from 'vee-validate';
import VSelect from 'vue-select';
import type { Country } from '~/types/country.type';
import { categoryData } from '~/utils/constants';
import { createDescriptionSchema } from '~/validations/rent.validation';

const { onClose, isOpen, countries } = useRentModal();

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
const guestCount = ref(1);
const roomCount = ref(1);
const bathroomCount = ref(1);
const imageFile = ref<File | undefined>();
const title = ref('');
const description = ref('');
const price = ref(10);

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

const fileInput = ref<HTMLInputElement | null>(null);
const imageBlogUrl = useObjectUrl(imageFile);
function onFileChange(event: Event) {
	const inputElement = event.target as HTMLInputElement;

	imageFile.value = inputElement.files?.[0];
}

const onSubmit = () => {
	if (step.value !== STEPS.PRICE) {
		return onNext();
	}

	try {
		isLoading.value = true;
		console.log({
			title: title.value,
			description: description.value,
			price: price.value,
			imageFile: imageFile.value,
			category: category.value,
			locationValue: location.value,
			guestCount: guestCount.value,
			roomCount: roomCount.value,
			bathroomCount: bathroomCount.value,
		});

		refreshNuxtData('listings');
		onClose();
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
		description=""
		@close="onClose"
	>
		<!-- === Category === -->
		<div v-if="step === STEPS.CATEGORY" class="flex flex-col gap-8">
			<AppHeading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>

			<div
				class="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2"
			>
				<div v-for="item in categoryData" :key="item.icon" class="col-span-1">
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
		<div v-if="step === STEPS.LOCATION" class="flex flex-col gap-8">
			<AppHeading
				title="Where is your place located?"
				subtitle="Help guests find you"
			/>

			<ClientOnly>
				<VSelect v-model="location" name="location" :options="countries">
					<template #option="country">
						<div class="flex items-center gap-3 text-lg">
							<div>{{ (country as any).flag }}</div>
							<div>
								{{ (country as any).label }}

								<span class="ml-1 text-neutral-500">{{
									(country as any).region
								}}</span>
							</div>
						</div>
					</template>
				</VSelect>
			</ClientOnly>
			<ClientOnly>
				<RentMap :center="location?.latlng" />
			</ClientOnly>
		</div>

		<!-- === Info === -->
		<div v-if="step === STEPS.INFO" class="flex flex-col gap-8">
			<AppHeading
				title="Share some basic info about your place"
				subtitle="What amenitis do you have?"
			/>

			<RentCounter
				title="Guests"
				subtitle="How many guests do you allow?"
				:value="guestCount"
				@change="
					(val) => {
						guestCount = val;
					}
				"
			/>
			<hr />

			<RentCounter
				title="Rooms"
				subtitle="How many room do you have?"
				:value="roomCount"
				@change="
					(val) => {
						roomCount = val;
					}
				"
			/>
			<hr />

			<RentCounter
				title="Bathrooms"
				subtitle="How many bathrooms do you have?"
				:value="bathroomCount"
				@change="
					(val) => {
						bathroomCount = val;
					}
				"
			/>
		</div>

		<!-- === Images === -->
		<div v-if="step === STEPS.IMAGES" class="flex flex-col gap-8">
			<AppHeading
				title="Add a photo of your place"
				subtitle="Show guests what your place looks like!"
			/>

			<div
				class="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
				@click="fileInput?.click"
			>
				<input
					ref="fileInput"
					type="file"
					class="hidden"
					accept="image/*"
					@change="onFileChange"
				/>

				<Icon v-if="!imageBlogUrl" name="lucide:image" size="50" />
				<div v-if="!imageBlogUrl" class="text-lg font-semibold">
					Click to upload
				</div>

				<div v-else class="absolute inset-0 h-full w-full">
					<img
						:src="imageBlogUrl"
						alt="House"
						class="text h-full w-full object-cover"
					/>
				</div>
			</div>
		</div>

		<!-- === Description === -->
		<div v-if="step === STEPS.DESCRIPTION" class="flex flex-col gap-8">
			<AppHeading
				title="How would you describe your place?"
				subtitle="Short and sweet works best!"
			/>

			<FormField v-slot="{ componentField }" name="title">
				<FormItem>
					<FormLabel>Title</FormLabel>
					<FormControl>
						<Input
							v-model="title"
							:disabled="isLoading"
							type="text"
							placeholder="Eg: My lovely apt"
							v-bind="componentField"
						/>
					</FormControl>
				</FormItem>
			</FormField>

			<hr />
			<FormField v-slot="{ componentField }" name="description">
				<FormItem>
					<FormLabel>Description</FormLabel>
					<FormControl>
						<Textarea
							v-model="description"
							:disabled="isLoading"
							placeholder="Enter your description"
							v-bind="componentField"
						/>
					</FormControl>
				</FormItem>
			</FormField>
		</div>

		<!-- === Price === -->
		<div v-if="step === STEPS.PRICE" class="flex flex-col gap-8">
			<AppHeading
				title="Now, set your pricce?"
				subtitle="How much do you charge per night?"
			/>

			<FormField v-slot="{ componentField }" name="price">
				<FormItem>
					<FormLabel>Price</FormLabel>
					<FormControl>
						<Input type="number" placeholder="Eg: 10" v-bind="componentField" />
					</FormControl>
				</FormItem>
			</FormField>
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
					@click="onSubmit"
				>
					{{ actionLabel }}
				</Button>
			</div>
		</div>
	</AppModal>
</template>
