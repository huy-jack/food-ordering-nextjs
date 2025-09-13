import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OrderHeader() {
  return (
    <div className="border-b bg-card">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Place Your Order</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
