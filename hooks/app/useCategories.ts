import { useQuery } from '@tanstack/react-query';

const fetchCategories = async () => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/get-sub-catogery?all_category=false&linked=false&lang=en`);
  return res.json();
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    initialData: []
  });
};
