"use client"

import DashboardCard from "@/components/partials/card/dashboard-card";
import { MyBarChart } from "@/components/partials/chart/bar-chart";
import MyChart from "@/components/partials/chart/chart";
import { useAdminDashboard, useAdminDashboardChart, useAdminDashboardChart2 } from "@/hooks/useAdmin";

export default function DashboardPage() {

  const { data: dashboardCardData } = useAdminDashboard();
  const { data: dashboardChartData } = useAdminDashboardChart();
  const { data: dashboardChart2Data } = useAdminDashboardChart2();
  
  return <div className="flex flex-col gap-4">
    {/* Section 1 */}
    <div className="flex flex-col md:grid grid-cols-4 justify-between gap-4">
      <DashboardCard cardData={dashboardCardData}/>
    </div>

    {/* Section 2 */}
    <div className="flex flex-col md:grid grid-cols-2 justify-between gap-4">
        <div className="col-span-1">
          <MyChart chartData={dashboardChartData}/>
        </div>
        <div className="col-span-1">
          <MyBarChart chartData={dashboardChart2Data}/>
        </div>
    </div>
  </div>;
}
