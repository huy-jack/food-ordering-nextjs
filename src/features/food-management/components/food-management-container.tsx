// src/features/food-management/components/food-management-container.tsx
"use client";

import { Food } from "@/shared/models";
import { useState } from "react";
import { FoodItemEdit } from "./";
import { FoodHeader } from "./food-header";
import { FoodInput } from "./food-input";
import { MenuPreview } from "./menu-preview";

export function FoodManagementContainer() {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foodEditVisible, setFoodEditVisible] = useState(false);

  const handleDeleteItem = (id: string) => {
    setFoodList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditItem = (item: Food) => {
    setSelectedFood(item);
    setFoodEditVisible(true);
  };

  const handleAddItem = () => {
    const newItem: Food = {
      id: `item-${Date.now()}`,
      name: "New Food Item",
      price: 0,
    };
    setFoodList((prev) => [...prev, newItem]);
  };

  const handleSaveItem = (updatedItem: Food) => {
    setFoodList((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  return (
    <>
      {selectedFood ? (
        <FoodItemEdit
          item={selectedFood}
          open={foodEditVisible}
          onOpenChange={setFoodEditVisible}
          onSave={handleSaveItem}
        />
      ) : null}

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <FoodHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FoodInput onGenerate={setFoodList} canAddItem={foodList.length > 0} onAddItem={handleAddItem} />

            <MenuPreview
              items={foodList}
              onClearAll={() => setFoodList([])}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        </div>
      </div>
    </>
  );
}
