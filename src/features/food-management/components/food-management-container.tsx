// src/features/food-management/components/food-management-container.tsx
"use client";

import { Food } from "@/shared/models";
import { useEffect, useState } from "react";
import { FoodItemEdit } from "./";
import { FoodHeader } from "./food-header";
import { FoodInput } from "./food-input";
import { MenuPreview } from "./menu-preview";
import { useFoods } from "@/features/food-management/hooks/use-foods";

export function FoodManagementContainer() {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foodEditVisible, setFoodEditVisible] = useState(false);
  const { foods, mutate } = useFoods();

  useEffect(() => {
    if (foods.length) setFoodList(foods);
  }, [foods]);

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

  const handleSaveItem = async (updatedItem: Food) => {
    setFoodList((prev) => prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    await fetch(`/api/foods/${updatedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedItem.name, price: updatedItem.price }),
    });
    mutate();
  };

  const handleDeleteItem = async (id: string) => {
    setFoodList((prev) => prev.filter((i) => i.id !== id));
    await fetch(`/api/foods/${id}`, { method: "DELETE" });
    mutate();
  };

  const handleGenerateFood = async (list: Food[]) => {
    setFoodList(list);
    await fetch(`/api/foods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: list.map(({ name, price }) => ({ name, price })),
      }),
    });
    mutate();
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
            <FoodInput onGenerate={handleGenerateFood} canAddItem={foodList.length > 0} onAddItem={handleAddItem} />

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
