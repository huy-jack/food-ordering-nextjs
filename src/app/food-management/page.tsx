"use client";

import { FoodItemEdit, FoodList } from "@/features/food-management/components";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Food } from "@/shared/models";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";

export default function FoodManagement() {
  const [foodList, setFoodList] = useState("");
  const [menuItems, setMenuItems] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateToMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Parse the food list string into structured menu items
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
    setMenuItems(parsedItems);
  };

  const handleFoodListChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFoodList(event.target.value);
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (item: Food) => {
    setSelectedFood(item);
    setIsDialogOpen(true);
  };

  const handleAddItem = () => {
    const newItem: Food = {
      id: `item-${Date.now()}`,
      name: "New Food Item",
      price: 0,
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleSaveItem = (updatedItem: Food) => {
    setMenuItems((menuItems) => {
      return menuItems.map((item) => {
        return item.id === updatedItem.id ? updatedItem : item;
      });
    });
    debugger;
  };

  return (
    <>
      {selectedFood ? (
        <FoodItemEdit item={selectedFood} open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={handleSaveItem} />
      ) : (
        <></>
      )}
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Food Management</h1>
            <p className="text-muted-foreground">Convert your food list to a structured menu</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="foodList" className="text-sm font-medium">
                  Food List (one item per line)
                </Label>
                <Textarea
                  id="foodList"
                  value={foodList}
                  onChange={handleFoodListChange}
                  placeholder="Enter your food items, one per line:&#10;Margherita Pizza - 30000&#10;"
                  className="min-h-[200px] mt-2"
                />
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={handleGenerateToMenu} disabled={!foodList.trim()} className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Generate Menu
                </Button>

                {menuItems.length > 0 && (
                  <Button variant="outline" onClick={handleAddItem} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-sm mb-2">Format Examples:</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Simple: "Margherita Pizza"</li>
                  <li>• With price: "Margherita Pizza - 30000"</li>
                  <li>• One item per line</li>
                </ul>
              </div>
            </div>

            {/* Menu Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Generated Menu ({menuItems.length} items)</Label>
                {menuItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMenuItems([])}
                    className="text-destructive hover:text-destructive"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <FoodList menuItems={menuItems} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
