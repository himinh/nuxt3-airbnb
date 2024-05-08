interface FavoriteProps {
	listingId: string;
}
export const favoriteIds = ['1', '3', '6', '7', '8'];
const isLoggedIn = true;

export const useFavorite = ({ listingId }: FavoriteProps) => {
	const { onOpen } = useLogin();

	const isFavorite = computed(() => favoriteIds.includes(listingId));

	const toggleFavorite = async (e: MouseEvent) => {
		e.stopPropagation();

		return new Promise((resolve, reject) => {
			if (!isLoggedIn) return onOpen('login');

			//TODO: Call api update favorite

			if (!favoriteIds.includes(listingId)) {
				favoriteIds.push(listingId);
			} else {
				favoriteIds.splice(favoriteIds.indexOf(listingId), 1);
			}

			refreshNuxtData('listings');
			console.log({ favoriteIds });
		});
	};

	return {
		isFavorite,
		toggleFavorite,
	};
};
