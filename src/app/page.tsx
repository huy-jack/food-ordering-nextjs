import Link from "next/link";
import { Utensils, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Utensils className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Food Order System</h1>
          </div>
          <p className="text-muted-foreground">Manage your food items and pricing</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Utensils className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Welcome to Your Food Management System</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Streamline your restaurant operations with our comprehensive food management platform. Add, edit, and
              organize your menu items with ease.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/food-management">
                <Button size="lg" className="gap-2 text-base px-8 py-3">
                  <Utensils className="w-5 h-5" />
                  Manage Food Items
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/order">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-3">
                  Start Ordering
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Menu Management</h3>
                <p className="text-sm text-muted-foreground">
                  Add and organize your food items with categories and descriptions
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold mb-2">Pricing Control</h3>
                <p className="text-sm text-muted-foreground">
                  Set and update prices with precision and track total menu value
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold mb-2">Easy Interface</h3>
                <p className="text-sm text-muted-foreground">
                  Intuitive design that works seamlessly across all devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
