"use client";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AmountInput } from "@/components/ui/amount-input";
import { insertAccountSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { convertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertAccountSchema.omit({
  id: true,
})

type FormValues = z.infer<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string;}[];
  categoryOptions: { label: string; value: string;}[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues, 
  });

  const handleSubmit = (values: FormValues) => {
  const parsedAmount = Number(values.amount);

  if (!parsedAmount || isNaN(parsedAmount)) {
    return;
  }

  const amountInMiliunits = convertAmountToMiliunits(parsedAmount);

  onSubmit({
    ...values,
    categoryId: values.categoryId ?? null,
    amount: amountInMiliunits,
  });
};
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 px-2"
      >
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />  
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
  name="accountId"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Account</FormLabel>
      <FormControl>
        <Select
          value={field.value}
          onValueChange={(value) => field.onChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an account" />
          </SelectTrigger>
          <SelectContent>
            {accountOptions.map((account) => (
              <SelectItem
                key={account.value}
                value={account.value}
              >
                {account.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        <FormField
  name="categoryId"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <FormControl>
        <Select
          value={field.value ?? ""}
          onValueChange={(value) =>
            field.onChange(value || null)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((category) => (
              <SelectItem
                key={category.value}
                value={category.value}
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Add a payee"
                  {...field}
                />  
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                {...field}
                  disabled={disabled}
                  placeholder="0.00"
                />  
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Optional Notes"
                />  
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

            

        <Button type="submit" className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create transaction"}
        </Button>

        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete Transaction
          </Button>
        )}
      </form>
    </Form>
  );
};
