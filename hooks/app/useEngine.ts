import { useQuery } from '@tanstack/react-query';

const fetchEngines = async (brandId: string, modelId: string) => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/engines/${brandId}/${modelId}?lang=en`);
  return res.json();
};

export const useEngines = (brandId: string, modelId: string) => {
  return useQuery({
    queryKey: ['engines', brandId, modelId],
    queryFn: () => fetchEngines(brandId, modelId),
    enabled: !!brandId && !!modelId,
  });
};
