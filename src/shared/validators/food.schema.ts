import { z } from "zod";

export const FoodCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().int().nonnegative(),
});

export const FoodUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().int().nonnegative().optional(),
});

export const FoodDTO = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().int(),
});

export const FoodListSchema = z.object({
  items: z.array(FoodCreateSchema),
});

export type FoodCreate = z.infer<typeof FoodCreateSchema>;
export type FoodUpdate = z.infer<typeof FoodUpdateSchema>;
export type FoodDto = z.infer<typeof FoodDTO>;
