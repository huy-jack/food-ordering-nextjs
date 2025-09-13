import { Selection } from "../models/selection.model";
import { FoodItem } from "./selection-item";

interface FoodListProps {
  selections: Selection[];
  onItemChange: (selection: Selection) => void;
}

export function FoodList({ selections, onItemChange }: FoodListProps) {
  return selections.length > 0 ? (
    <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
      {selections.map((selection) => (
        <FoodItem
          key={selection.food.id}
          sel={selection}
          onItemChange={onItemChange}
        />
      ))}
    </div>
  ) : null;
}
