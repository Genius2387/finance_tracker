"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAccounts } from "../api/use-get-accounts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const useSelectAccount = (
  title: string,
  message: string
): [() => React.ReactElement, () => Promise<string | undefined>] => {
  const accountQuery = useGetAccounts();

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const confirm = () =>
    new Promise<string | undefined>((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setSelectedAccount(undefined);
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectedAccount);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <Select
          value={selectedAccount}
          onValueChange={(value) => setSelectedAccount(value)}
          disabled={accountQuery.isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an account" />
          </SelectTrigger>

          <SelectContent>
            {accountOptions.map((account) => (
              <SelectItem key={account.value} value={account.value}>
                {account.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter className="pt-4">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={!selectedAccount}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};