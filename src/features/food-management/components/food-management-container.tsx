// src/features/food-management/components/food-management-container.tsx
"use client";

import { Food } from "@/shared/models";
import { useState } from "react";
import { FoodItemEdit } from "./";
import { FoodHeader } from "./food-header";
import { FoodInput } from "./food-input";
import { MenuPreview } from "./menu-preview";

export function FoodManagementContainer() {
  const [foodList, setFoodList] = useState("");
  const [menuItems, setMenuItems] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateToMenu = () => {
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

  const handleFoodListChange = (value: string) => {
    setFoodList(value);
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
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
    setMenuItems((prev) => [...prev, newItem]);
  };

  const handleSaveItem = (updatedItem: Food) => {
    setMenuItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  return (
    <>
      {selectedFood ? (
        <FoodItemEdit item={selectedFood} open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={handleSaveItem} />
      ) : null}

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <FoodHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FoodInput
              foodList={foodList}
              onFoodListChange={handleFoodListChange}
              onGenerate={handleGenerateToMenu}
              canAddItem={menuItems.length > 0}
              onAddItem={handleAddItem}
            />

            <MenuPreview
              items={menuItems}
              onClearAll={() => setMenuItems([])}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        </div>
      </div>
    </>
  );
}
