import { useInfiniteQuery } from '@tanstack/react-query';

// Update fetchProducts to accept all parameters
const fetchProducts = async ({ pageParam , searchQuery , perPage , lang , includeAll, searchType, genericArticleId, assemblyGroupNodeId}: {
    searchQuery: string,
    pageParam: number,
    perPage: number,
    lang: string,
    includeAll: boolean,
    searchType: string,
    genericArticleId: number ,
    assemblyGroupNodeId: number,
}) => {
  const url = new URL(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/part-suggestion-deatils`);
  url.searchParams.append('search_query', searchQuery);
  url.searchParams.append('page', `${pageParam}`);
  url.searchParams.append('per_page', `${perPage}`);
  url.searchParams.append('lang', lang);
  url.searchParams.append('include_all', `${includeAll}`);
  url.searchParams.append('search_type', searchType);
  url.searchParams.append('generic_article_id', `${genericArticleId}`);
  url.searchParams.append('assembly_group_node_id', `${assemblyGroupNodeId}`);

  const res = await fetch(url);
  return res.json();
};

// Update useProducts to accept and pass all parameters
export const useProducts = ({ 
    pageParam = `${1}`, 
    searchQuery = '', 
    perPage = 10, 
    lang = 'en', 
    includeAll = false, 
    searchType = `${99}`, 
    genericArticleId = 0 ,
    assemblyGroupNodeId= 0
  } = {}) => {
  return useInfiniteQuery({
    queryKey: ['products', searchQuery, perPage, lang, includeAll, searchType],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, searchQuery, perPage, lang, includeAll, searchType, genericArticleId , assemblyGroupNodeId}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalArticles = allPages.flatMap(page => page.articles).length;
      return lastPage.totalMatchingArticles > totalArticles ? allPages.length + 1 : undefined;
    },
    // enabled: !!searchQuery,
  });
};
