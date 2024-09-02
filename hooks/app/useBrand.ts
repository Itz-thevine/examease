import { useQuery } from '@tanstack/react-query';

const fetchBrands = async () => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/brands?lang=en`);
  return res.json();
};

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    initialData: []
  });
};
