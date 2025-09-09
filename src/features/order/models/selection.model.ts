import { Food } from "@/shared/models";

export interface Selection {
    food: Food;
    selected: boolean;
    qty: number;
};