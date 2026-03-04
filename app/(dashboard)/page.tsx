import { Suspense } from "react";
import { DataGrid } from "@/components/ui/data-grid";
import { DataCharts } from "@/components/ui/data-charts";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div />}>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <DataGrid />
        <DataCharts />
      </div>
    </Suspense>
  );
}