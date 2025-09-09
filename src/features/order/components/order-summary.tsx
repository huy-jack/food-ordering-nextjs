import { Selection } from "../models/selection.model";

interface OrderSummaryProps {
  selections: Selection[];
  total: number;
}

export function OrderSummary({ selections, total }: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Order Summary</h3>
        {selections.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No items selected yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {selections.map(({ food, qty }) => (
              <li
                key={food.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="text-foreground">
                  {food.name} × {qty}
                </div>
                <div className="text-muted-foreground">
                  {((food.price ?? 0) * qty).toString()} VND
                </div>
              </li>
            ))}
          </ul>
        )}
        {selections.length > 0 && (
          <div className="flex items-center justify-between border-t pt-3 mt-3">
            <div className="font-medium">Total</div>
            <div className="font-semibold">{total} VND</div>
          </div>
        )}
      </div>

      <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
        - Enter your name and select items to place an order.
        <br />- This demo shows a summary alert on submit. Hook up an order API
        later if needed.
      </div>
    </div>
  );
}
