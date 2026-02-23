"use client";

import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { insertCategorySchema } from "@/db/schema";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }, 
    })
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent>
        <div className="space-y-6 p-4">
          <SheetHeader>
            <SheetTitle>New Category</SheetTitle>
            <SheetDescription>
              Create a new category to organize your transactions.
            </SheetDescription>
          </SheetHeader>

          <CategoryForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{ name: "" }}   
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
