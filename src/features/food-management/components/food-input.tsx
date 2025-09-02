// src/features/food-management/components/food-input.tsx
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Plus } from "lucide-react";

interface FoodInputProps {
  foodList: string;
  onFoodListChange: (value: string) => void;
  onGenerate: () => void;
  canAddItem: boolean;
  onAddItem: () => void;
}

export function FoodInput({ foodList, onFoodListChange, onGenerate, canAddItem, onAddItem }: FoodInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="foodList" className="text-sm font-medium">
          Food List (one item per line)
        </Label>
        <Textarea
          id="foodList"
          value={foodList}
          onChange={(e) => onFoodListChange(e.target.value)}
          placeholder="Enter your food items, one per line:&#10;Margherita Pizza - 30000&#10;"
          className="min-h-[200px] mt-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={(e) => {
            e.preventDefault();
            onGenerate();
          }}
          disabled={!foodList.trim()}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Generate Menu
        </Button>

        {canAddItem && (
          <Button variant="outline" onClick={onAddItem} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-medium text-sm mb-2">Format Examples:</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Simple: "Margherita Pizza"</li>
          <li>• With price: "Margherita Pizza - 30000"</li>
          <li>• One item per line</li>
        </ul>
      </div>
    </div>
  );
}
