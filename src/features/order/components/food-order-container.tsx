import { useState, useMemo, useEffect } from "react";
import { useFoods } from "@/features/food-management/hooks/use-foods";
import { Selection } from "@/features/order/models/selection.model";
import { OrderSummary } from "@/features/order/components/order-summary";
import { OrderHeader } from "@/features/order/components/order-header";
import { OrderForm } from "@/features/order/components/order-form";

export function FoodOrderContainer() {
  const { foods, isLoading, error } = useFoods();
  const [customerName, setCustomerName] = useState("");
  const [selections, setSelections] = useState<Record<string, Selection>>({});

  const allSelections = useMemo(() => {
    return foods.map(
      (f) => selections[f.id] ?? { food: f, selected: false, qty: 1 }
    );
  }, [foods, selections]);

  const selectedItems = useMemo(() => {
    return allSelections.filter((s) => s.selected);
  }, [allSelections]);

  const total = useMemo(() => {
    return selectedItems.reduce(
      (sum, { food, qty }) => sum + (food.price ?? 0) * qty,
      0
    );
  }, [selectedItems]);

  const onSelectionChange = (selection: Selection) => {
    setSelections((prev) => {
      return { ...prev, [selection.food.id]: selection };
    });
  };

  const canSubmit = customerName.trim().length > 0 && selectedItems.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // For now, just show a summary. Could POST to an order API if added later.
    const summary = {
      customerName: customerName.trim(),
      items: selectedItems.map(({ food, qty }) => ({
        id: food.id,
        name: food.name,
        price: food.price ?? 0,
        qty,
      })),
      total,
    };
    localStorage.setItem("user_name", customerName);
    alert(`Order placed!\n\n${JSON.stringify(summary, null, 2)}`);
    // Reset
    setCustomerName("");
    setSelections({});
  };

  useEffect(() => {
    const userName = localStorage.getItem("user_name");
    if (userName) {
      setCustomerName(userName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <OrderHeader />
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <OrderForm
          total={total}
          selections={allSelections}
          isLoading={isLoading}
          customerName={customerName}
          error={error}
          onSubmit={handleSubmit}
          onCustomerNameChange={setCustomerName}
          onSelectionChange={onSelectionChange}
        />

        <OrderSummary selections={selectedItems} total={total} />
      </div>
    </div>
  );
}
