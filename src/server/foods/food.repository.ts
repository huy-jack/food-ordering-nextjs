import { prisma } from "@/server/db/client";
import type { FoodCreate, FoodUpdate } from "@/shared/validators/food.schema";

export const foodRepository = {
  async list() {
    return prisma.food.findMany({ orderBy: { name: "asc" } });
  },
  async get(id: string) {
    return prisma.food.findUnique({ where: { id } });
  },
  async create(data: FoodCreate) {
    return prisma.food.create({ data });
  },
  async bulkReplace(items: FoodCreate[]) {
    // replace all with provided list
    await prisma.$transaction([prisma.food.deleteMany(), prisma.food.createMany({ data: items })]);
    return prisma.food.findMany({ orderBy: { name: "asc" } });
  },
  async update(id: string, data: FoodUpdate) {
    return prisma.food.update({ where: { id }, data });
  },
  async remove(id: string) {
    await prisma.food.delete({ where: { id } });
  },
};
