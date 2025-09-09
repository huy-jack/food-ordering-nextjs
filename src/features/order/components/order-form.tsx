import React, { useMemo } from "react";
import { Selection } from "../models/selection.model";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FoodList } from "./selection-list";
import { Button } from "@/components/ui/button";

interface OrderFormProps {
  selections: Selection[];
  total: number;
  isLoading: boolean;
  customerName: string;
  error: any;
  onSelectionChange: (selection: Selection) => void;
  onCustomerNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function OrderForm({
  total,
  selections,
  isLoading,
  customerName,
  error,
  onSubmit,
  onCustomerNameChange,
  onSelectionChange,
}: OrderFormProps) {
  const selectedItems = useMemo(() => {
    return selections.filter((s) => s.selected);
  }, [selections]);

  const canSubmit = customerName.trim().length > 0 && selectedItems.length > 0;
  // alert(`check ${selections}`);
  return (
    <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="customerName">Your Name</Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Select Foods</h2>

        {isLoading && (
          <div className="text-muted-foreground">Loading menu...</div>
        )}
        {error && <div className="text-red-500">Failed to load menu</div>}

        {!isLoading && !error && selections.length === 0 && (
          <div className="bg-muted/30 rounded-lg p-6 text-center text-muted-foreground">
            No foods available. Please add items in the management page.
          </div>
        )}

        <FoodList selections={selections} onItemChange={onSelectionChange} />
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          {selectedItems.length} item(s) selected
        </div>
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">{total} VND</div>
          <Button type="submit" disabled={!canSubmit}>
            Place Order
          </Button>
        </div>
      </div>
    </form>
  );
}
