import { Suspense } from "react";
import { CategoriesClient } from "./categories-client";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <CategoriesClient />
    </Suspense>
  );
}