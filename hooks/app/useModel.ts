import { useQuery } from '@tanstack/react-query';

const fetchModels = async (brandId: string) => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/models/${brandId}?lang=en`);
  return res.json();
};

export const useModels = (brandId: string) => {
  return useQuery({
    queryKey: ['models', brandId],
    queryFn: () => fetchModels(brandId),
    enabled: !!brandId,
  });
};
