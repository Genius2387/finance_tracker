"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

export const CategoriesClient = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled =
    categoriesQuery.isLoading ||
    deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-125 w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl">Categories</CardTitle>
          <Button
            onClick={newCategory.onOpen}
            size="sm"
            className="w-full lg:w-auto"
          >
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate({ json: { ids } });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};