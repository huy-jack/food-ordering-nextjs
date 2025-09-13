import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Selection } from "../models/selection.model";
import { Attributes } from "react";

interface FoodItemProps extends Attributes {
  sel: Selection;
  onItemChange: (selection: Selection) => void;
}

export function FoodItem({ sel, onItemChange, ...rest }: FoodItemProps) {
  const food = sel.food;
  return (
    <div
      {...rest}
      className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
    >
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={sel?.selected}
          onChange={(e) =>
            onItemChange({ ...sel, selected: e.target.checked || false })
          }
          className="h-4 w-4"
        />
        <span className="font-medium text-foreground">{`${food.name} + ${food.id}`}</span>
        {food.price !== undefined && (
          <span className="text-sm text-muted-foreground">
            {food.price} VND
          </span>
        )}
      </label>

      <div className="flex items-center gap-2">
        <Label
          htmlFor={`qty-${food.id}`}
          className="text-sm text-muted-foreground"
        >
          Qty
        </Label>
        <Input
          id={`qty-${food.id}`}
          type="number"
          min={1}
          value={sel?.qty || 1}
          disabled={!sel?.selected}
          onChange={(e) => {
            const val = Math.max(1, Number(e.target.value) || 1);
            onItemChange({ ...sel, qty: val });
            // updateSelection(food.id, (prev) => ({ ...prev, qty: val }));
          }}
          className="w-20"
        />
      </div>
    </div>
  );
}
