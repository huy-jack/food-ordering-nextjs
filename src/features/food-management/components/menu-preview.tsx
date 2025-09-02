// src/features/food-management/components/menu-preview.tsx
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Food } from "@/shared/models";
import { FoodList } from "./food-list";

interface MenuPreviewProps {
  items: Food[];
  onClearAll: () => void;
  onEditItem: (item: Food) => void;
  onDeleteItem: (id: string) => void;
}

export function MenuPreview({ items, onClearAll, onEditItem, onDeleteItem }: MenuPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Generated Menu ({items.length} items)</Label>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll} className="text-destructive hover:text-destructive">
            Clear All
          </Button>
        )}
      </div>

      <FoodList menuItems={items} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
    </div>
  );
}
