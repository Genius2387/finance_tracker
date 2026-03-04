import { Suspense } from "react";
import { AccountsClient } from "./accounts-client";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <AccountsClient />
    </Suspense>
  );
}