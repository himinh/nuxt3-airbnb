import { listingApi } from '~/apis/2-listing.api';
import type { Listing } from '~/types/2-listing';
import type { PageInfo } from '~/types/paginate-reponse.type';
import { handleError } from '~/utils/helpers/handle-error.helper';

export const useListingStore = defineStore('listings', () => {
  const listings = ref<Listing[]>([]);
  const pageInfo = ref<PageInfo>();
  const isLoadMoreLoading = ref<boolean>(false);

  const { filter } = useListingQuery();

  const filterWatch = computed(() =>
    new URLSearchParams(filter.value).toString(),
  );

  const {
    pending,
    data: listingPagination,
    error,
  } = useAsyncData(
    'listing-pagination',
    () => listingApi.paginate(filter.value),
    {
      watch: [filterWatch],
    },
  );

  onMounted(() => {
    if (!error.value) return;

    handleError(error.value);
  });

  watchEffect(() => {
    if (listingPagination.value) {
      listings.value = listingPagination.value.data;
      pageInfo.value = listingPagination.value.pageInfo;
    }
  });

  const loadMoreListings = async () => {
    if (!pageInfo.value?._nextPage) return;

    isLoadMoreLoading.value = true;

    const data = await listingApi.paginate({
      ...filter.value,
      _page: pageInfo.value._nextPage,
    });

    listings.value.push(...data.data);
    pageInfo.value = data.pageInfo;

    isLoadMoreLoading.value = false;

    return data;
  };

  return {
    loadMoreListings,
    pending,
    listings,
    pageInfo,
    isLoadMoreLoading,
  };
});
