"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts()
  const accounts = accountsQuery.data || [];

  const isDisabled = 
    accountsQuery.isLoading ||
    deleteAccounts.isPending;
      
  if (accountsQuery.isLoading) {
    return (
        <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
                <div className="h-125 w-full flex items-center justify-center">
                  <Loader2 className="size-6 text-slate-300 animate-spin"/>
                </div>
            </CardContent>
          </Card>
        </div>
    )  
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Title */}
          <CardTitle className="text-xl">
            Accounts page
          </CardTitle>

          {/* Button */}
          <Button
            onClick={newAccount.onOpen}
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
              data={accounts} 
              filterKey="name" 
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                deleteAccounts.mutate({ json: { ids } });
              }} 
              disabled={isDisabled} />
        </CardContent>
      </Card>
    </div>
  );
}; 

export default AccountsPage;