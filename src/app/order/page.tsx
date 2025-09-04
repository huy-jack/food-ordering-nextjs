"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useFoods } from "@/features/food-management/hooks/use-foods";
import type { Food } from "@/shared/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Selection = {
  selected: boolean;
  qty: number;
};

export default function Order() {
  const { foods, isLoading, error } = useFoods();
  const [customerName, setCustomerName] = useState("");
  const [selections, setSelections] = useState<Record<string, Selection>>({});

  const allSelections = useMemo(() => {
    const map: Record<string, Selection> = {};
    for (const f of foods) {
      map[f.id] = selections[f.id] ?? { selected: false, qty: 1 };
    }
    return map;
  }, [foods, selections]);

  const selectedItems = useMemo(() => {
    return foods
      .filter((f) => allSelections[f.id]?.selected)
      .map((f) => ({ food: f, qty: allSelections[f.id].qty || 1 }));
  }, [foods, allSelections]);

  const total = useMemo(() => {
    return selectedItems.reduce((sum, { food, qty }) => sum + (food.price ?? 0) * qty, 0);
  }, [selectedItems]);

  const updateSelection = (id: string, updater: (prev: Selection) => Selection) => {
    setSelections((prev) => {
      const current = prev[id] ?? { selected: false, qty: 1 };
      return { ...prev, [id]: updater(current) };
    });
  };

  const canSubmit = customerName.trim().length > 0 && selectedItems.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // For now, just show a summary. Could POST to an order API if added later.
    const summary = {
      customerName: customerName.trim(),
      items: selectedItems.map(({ food, qty }) => ({ id: food.id, name: food.name, price: food.price ?? 0, qty })),
      total,
    };
    alert(`Order placed!\n\n${JSON.stringify(summary, null, 2)}`);
    // Reset
    setCustomerName("");
    setSelections({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Place Your Order</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Your Name</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Select Foods</h2>

            {isLoading && <div className="text-muted-foreground">Loading menu...</div>}
            {error && <div className="text-red-500">Failed to load menu</div>}

            {!isLoading && !error && foods.length === 0 && (
              <div className="bg-muted/30 rounded-lg p-6 text-center text-muted-foreground">
                No foods available. Please add items in the management page.
              </div>
            )}

            {foods.length > 0 && (
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {foods.map((food: Food) => {
                  const sel = allSelections[food.id];
                  return (
                    <div
                      key={food.id}
                      className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
                    >
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={sel.selected}
                          onChange={(e) =>
                            updateSelection(food.id, (prev) => ({
                              ...prev,
                              selected: e.target.checked,
                              qty: prev.qty || 1,
                            }))
                          }
                          className="h-4 w-4"
                        />
                        <span className="font-medium text-foreground">{food.name}</span>
                        {food.price !== undefined && (
                          <span className="text-sm text-muted-foreground">{food.price} VND</span>
                        )}
                      </label>

                      <div className="flex items-center gap-2">
                        <Label htmlFor={`qty-${food.id}`} className="text-sm text-muted-foreground">
                          Qty
                        </Label>
                        <Input
                          id={`qty-${food.id}`}
                          type="number"
                          min={1}
                          value={sel.qty}
                          disabled={!sel.selected}
                          onChange={(e) => {
                            const val = Math.max(1, Number(e.target.value) || 1);
                            updateSelection(food.id, (prev) => ({ ...prev, qty: val }));
                          }}
                          className="w-20"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">{selectedItems.length} item(s) selected</div>
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold">{total} VND</div>
              <Button type="submit" disabled={!canSubmit}>
                Place Order
              </Button>
            </div>
          </div>
        </form>

        <div className="lg:col-span-1 space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            {selectedItems.length === 0 ? (
              <div className="text-sm text-muted-foreground">No items selected yet.</div>
            ) : (
              <ul className="space-y-2">
                {selectedItems.map(({ food, qty }) => (
                  <li key={food.id} className="flex items-center justify-between text-sm">
                    <div className="text-foreground">
                      {food.name} × {qty}
                    </div>
                    <div className="text-muted-foreground">{((food.price ?? 0) * qty).toString()} VND</div>
                  </li>
                ))}
              </ul>
            )}
            {selectedItems.length > 0 && (
              <div className="flex items-center justify-between border-t pt-3 mt-3">
                <div className="font-medium">Total</div>
                <div className="font-semibold">{total} VND</div>
              </div>
            )}
          </div>

          <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
            - Enter your name and select items to place an order.
            <br />- This demo shows a summary alert on submit. Hook up an order API later if needed.
          </div>
        </div>
      </div>
    </div>
  );
}
