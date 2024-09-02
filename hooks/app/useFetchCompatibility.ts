import { useQuery } from '@tanstack/react-query';

// Function to fetch compatibility data
const fetchCompatibility = async ({ articleId, linkageType, lang }: {
    articleId: number,
    linkageType: string,
    lang: string,
}) => {
  const url = new URL(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/get-part-link-with-car/${articleId}`);
  url.searchParams.append('linkage_type', linkageType);
  url.searchParams.append('lang', lang);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const useFetchCompatibility = ({ 
    articleId= 0, 
    linkageType = 'P', 
    lang = 'en', 
  } = {}) => {
  return useQuery({
    queryKey: ['compatibility', articleId, linkageType, lang],
    queryFn: () => fetchCompatibility({ articleId, linkageType, lang }),
    enabled: !!articleId,
  });
};
