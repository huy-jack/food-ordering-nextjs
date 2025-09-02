// src/features/food-management/components/food-input.tsx
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Food } from "@/shared/models";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";

interface FoodInputProps {
  canAddItem: boolean;
  onGenerate: (value: Food[]) => void;
  onAddItem: () => void;
}

export function FoodInput({ canAddItem, onAddItem, onGenerate }: FoodInputProps) {
  const [foodList, setFoodList] = useState("");

  const handleGenerate = () => {
    const lines = foodList
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");

    const parsedItems: Food[] = lines.map((line, index) => {
      const [name, price] = line.split(/\s*-\s*/);
      const menuItem: Food = {
        id: `item-${index + 1}`,
        name,
        price: price ? parseInt(price) : 0,
      };
      return menuItem;
    });
    onGenerate(parsedItems);
  };

  const handleFoodListChange = (value: string) => {
    setFoodList(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="foodList" className="text-sm font-medium">
          Food List (one item per line)
        </Label>
        <Textarea
          id="foodList"
          value={foodList}
          onChange={(e) => handleFoodListChange(e.target.value)}
          placeholder="Enter your food items, one per line:&#10;Margherita Pizza - 30000&#10;"
          className="min-h-[200px] mt-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleGenerate} disabled={!foodList.trim()} className="flex items-center gap-2" type="button">
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
