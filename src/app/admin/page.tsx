"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardCard from "@/components/partials/card/dashboard-card";
import { MyBarChart } from "@/components/partials/chart/bar-chart";
import MyChart from "@/components/partials/chart/chart";
import {
  useAdminDashboard,
  useAdminDashboardChart,
  useAdminDashboardChart2,
} from "@/hooks/useAdmin";
import { useState } from "react";

export default function DashboardPage() {
  const [duration, setDuration] = useState("timeRange=P1M");
  const { data: dashboardCardData } = useAdminDashboard(duration);
  const { data: dashboardChartData } = useAdminDashboardChart();
  const { data: dashboardChart2Data } = useAdminDashboardChart2();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="text-sm">Choose a duration: </div>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="timeRange=P1D">Day</SelectItem>
              <SelectItem value="timeRange=P7D">Week</SelectItem>
              <SelectItem value="timeRange=P1M">Month</SelectItem>
              <SelectItem value="timeRange=P1Y">Year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Section 1 */}
      <div className="flex flex-col md:grid grid-cols-4 justify-between gap-4">
        <DashboardCard cardData={dashboardCardData} duration={duration}/>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:grid grid-cols-2 justify-between gap-4">
        <div className="col-span-1">
          <MyChart chartData={dashboardChartData} />
        </div>
        <div className="col-span-1">
          <MyBarChart chartData={dashboardChart2Data} />
        </div>
      </div>
    </div>
  );
}
