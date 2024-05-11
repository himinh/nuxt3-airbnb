<script setup lang="ts">
import type { Range } from '~/types/listing.type';

interface Props {
	price: number;
	dateRange: Range;
	totalPrice?: number;
	disabled?: boolean;
	disabledDates: Date[];
}

defineProps<Props>();
const emits = defineEmits<{
	(e: 'change', newDate: Range): void;
	(e: 'submitReservation'): void;
}>();

const changeDate = (newDate: Range) => {
	emits('change', newDate);
};

const submitReservation = () => {
	emits('submitReservation');
};
</script>

<template>
	<div class="overflow-hidden rounded-xl border border-neutral-200 bg-white">
		<div
			class="flex flex-row items-center justify-between p-4 text-lg font-semibold"
		>
			<div class="text-2xl font-semibold">$ {{ price }}</div>
			<div class="font-light text-neutral-600">$ night</div>
		</div>

		<!-- === Calendar === -->
		<div class="py-2">
			<AppCalendar
				:value="dateRange"
				:disabled-dates="disabledDates"
				@change="changeDate"
			/>
		</div>

		<hr />
		<div class="p-4">
			<Button :disabled="disabled" class="w-full" @click="submitReservation"
				>Reserve</Button
			>

			<hr />
			<div
				class="flex flex-row items-center justify-between p-4 text-lg font-semibold"
			>
				<div>Total</div>
				<div>$ {{ totalPrice }}</div>
			</div>
		</div>
	</div>
</template>
