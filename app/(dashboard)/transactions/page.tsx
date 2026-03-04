import { Suspense } from "react";
import { TransactionsClient } from "./transactions-client";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <TransactionsClient />
    </Suspense>
  );
}