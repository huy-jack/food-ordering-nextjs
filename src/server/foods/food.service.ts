import { foodRepository } from "./food.repository";
import type { FoodCreate, FoodUpdate } from "@/shared/validators/food.schema";

export const foodService = {
  async list() {
    const items = await foodRepository.list();
    return items.map((f) => ({ id: f.id, name: f.name, price: f.price }));
  },
  async create(input: FoodCreate) {
    const f = await foodRepository.create(input);
    return { id: f.id, name: f.name, price: f.price };
  },
  async bulkReplace(items: FoodCreate[]) {
    const res = await foodRepository.bulkReplace(items);
    return res.map((f) => ({ id: f.id, name: f.name, price: f.price }));
  },
  async update(id: string, input: FoodUpdate) {
    const f = await foodRepository.update(id, input);
    return { id: f.id, name: f.name, price: f.price };
  },
  async remove(id: string) {
    await foodRepository.remove(id);
  },
};
