"use client";

import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { insertTransactionSchema } from "@/db/schema";

import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({ id: true }).extend({
  amount: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  // ✅ FIXED NAME
  const createTransactionMutation = useCreateTransaction();
  const createCategoryMutation = useCreateCategory();
  const createAccountMutation = useCreateAccount();

  const categoriesQuery = useGetCategories();
  const accountsQuery = useGetAccounts();

  const onCreateCategory = (name: string) => {
    createCategoryMutation.mutate({ json: { name } });
  };

  const onCreateAccount = (name: string) => {
    createAccountMutation.mutate({ json: {name} });
  };

  const categoryOptions =
    categoriesQuery.data?.map((category) => ({
      label: category.name,
      value: category.id,
    })) ?? [];

  const accountOptions =
    accountsQuery.data?.map((account) => ({
      label: account.name,
      value: account.id,
    })) ?? [];

  const isPending =
    createTransactionMutation.isPending ||
    createCategoryMutation.isPending ||
    createAccountMutation.isPending;

  const isLoading =
    categoriesQuery.isLoading ||
    accountsQuery.isLoading;

  const onSubmit = (values: FormValues) => {
  createTransactionMutation.mutate(
    { json: { ...values, amount: parseFloat(values.amount) } },
    {
      onSuccess: () => {
        onClose();
      },
    }
  );
};

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent>
        <div className="space-y-6 p-4 relative">
          <SheetHeader>
            <SheetTitle>New Transaction</SheetTitle>
            <SheetDescription>
              Add a new transaction.
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateCategory={onCreateCategory}
              onCreateAccount={onCreateAccount}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};