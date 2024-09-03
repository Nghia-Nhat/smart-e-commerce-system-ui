"use client"

import DashboardCard from "@/components/partials/card/dashboard-card";
import MyChart from "@/components/partials/chart/chart";
import { useAdminDashboard, useAdminDashboardChart } from "@/hooks/useAdmin";

export default function DashboardPage() {

  const { data: dashboardCardData } = useAdminDashboard();
  const { data: dashboardChartData } = useAdminDashboardChart();
  
  return <div className="flex flex-col gap-4">
    {/* Section 1 */}
    <div className="flex flex-col md:grid grid-cols-4 justify-between gap-4">
      <DashboardCard cardData={dashboardCardData}/>
    </div>

    {/* Section 2 */}
    <div className="flex flex-col md:grid grid-cols-3 justify-between gap-4">
        <div className="col-span-2">
          <MyChart chartData={dashboardChartData}/>
        </div>
        <div className="col-span-1 h-full w-full bg-slate-400 rounded-md"></div>
    </div>
  </div>;
}
