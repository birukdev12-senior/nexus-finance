import { Suspense } from "react";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 h-72 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="col-span-2 h-72 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
    </div>
  );
}
