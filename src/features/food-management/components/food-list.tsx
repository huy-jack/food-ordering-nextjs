import { Button } from "@/components/ui/button";
import { Food } from "@/shared/models";
import { ArrowRight, Edit, Trash2 } from "lucide-react";

interface FoodListProps {
  menuItems: Food[];
  onEditItem: (item: Food) => void;
  onDeleteItem: (id: string) => void;
}

export function FoodList({ menuItems, onEditItem, onDeleteItem }: FoodListProps) {
  return menuItems.length === 0 ? (
    <div className="bg-muted/30 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <ArrowRight className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-foreground mb-2">No menu items yet</h3>
      <p className="text-sm text-muted-foreground">Enter your food list and click "Generate Menu" to get started</p>
    </div>
  ) : (
    <div className="space-y-3 max-h-[500px] overflow-y-auto">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-base">{item.name}</h3>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {item.price !== undefined && <span className="text-lg font-bold text-primary">{item.price} VND</span>}

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => onEditItem(item)} className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit {item.name}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteItem(item.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete {item.name}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
