import { z } from "zod";
import { NextRequest } from "next/server";
import { foodService } from "@/server/foods/food.service";
import { ok, created, badRequest, serverError } from "@/lib/http";
import { FoodCreateSchema, FoodListSchema } from "@/shared/validators/food.schema";

export async function GET() {
  try {
    const items = await foodService.list();
    return ok(items);
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    // two modes: { items: FoodCreate[] } for bulk replace OR single FoodCreate
    if ("items" in json) {
      const { items } = FoodListSchema.parse(json);
      const saved = await foodService.bulkReplace(items);
      return created(saved);
    } else {
      const input = FoodCreateSchema.parse(json);
      const item = await foodService.create(input);
      return created(item);
    }
  } catch (e) {
    if (e instanceof z.ZodError) return badRequest(e.flatten());
    return serverError();
  }
}
