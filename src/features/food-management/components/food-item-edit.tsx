import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Food } from "@/shared/models";
import { useState, useEffect } from "react";

interface FoodItemEditProps {
  item: Food;
  open: boolean;
  onOpenChange: ((open: boolean) => void) | undefined;
  onSave?: (updatedItem: Food) => void;
}

interface FormErrors {
  name?: string;
  price?: string;
}

export function FoodItemEdit({ item, open, onOpenChange, onSave }: FoodItemEditProps) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset form when item changes
  useEffect(() => {
    if (open) {
      setName(item.name);
      setPrice(item.price.toString());
      setErrors({});
    }
  }, [item, open]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else {
      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue <= 0) {
        newErrors.price = "Price must be a positive number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    const updatedItem: Food = {
      ...item,
      name: name.trim(),
      price: parseFloat(price),
    };

    onSave?.(updatedItem);

    // Close dialog on successful save
    onOpenChange?.(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const isFormValid = name.trim() && price.trim() && parseFloat(price) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Food Item</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the details of your food item. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Food Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter food name"
              className={errors.name ? "border-red-500 focus:border-red-500" : ""}
              autoFocus
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price (VND) *
            </Label>
            <div className="relative">
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) {
                    setErrors((prev) => ({ ...prev, price: undefined }));
                  }
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="min-w-[80px]">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!isFormValid} className="min-w-[80px]">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
