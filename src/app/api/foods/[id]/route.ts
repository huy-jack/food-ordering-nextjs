import { z } from "zod";
import { NextRequest } from "next/server";
import { foodService } from "@/server/foods/food.service";
import { ok, badRequest, notFound, serverError } from "@/lib/http";
import { FoodUpdateSchema } from "@/shared/validators/food.schema";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const parsed = FoodUpdateSchema.parse(body);
    const item = await foodService.update(params.id, parsed);
    return ok(item);
  } catch (e: any) {
    if (e instanceof z.ZodError) return badRequest(e.flatten());
    if (e?.code === "P2025") return notFound("Food not found");
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await foodService.remove(params.id);
    return ok({ success: true });
  } catch (e: any) {
    if (e?.code === "P2025") return notFound("Food not found");
    return serverError();
  }
}
