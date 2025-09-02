import useSWR from "swr";
import type { Food } from "@/shared/models";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useFoods() {
  const { data, error, isLoading, mutate } = useSWR<Food[]>("/api/foods", fetcher);
  return { foods: data ?? [], error, isLoading, mutate };
}
