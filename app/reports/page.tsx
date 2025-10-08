"use client";
import Sidebar from "@/app/components/SideBar";
import { useState, useEffect } from "react";
import { Employee } from "../types/type";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

type DepartmentData = { name: string; value: number };
type DeptRatingData = { department: string; avgRating: number };

export default function ReportsPage() {
  const [employee, setEmployee] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmpData = async () => {
      try {
        const res = await fetch("/api/reports");
        const data: Employee[] = await res.json();
        setEmployee(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchEmpData();
  }, []);

  // ------------------- Stats -------------------
  const totalEmp = employee.length;
  const totalSalary = employee.reduce((acc, emp) => acc + (emp.salary || 0), 0);
  const avgSalary = totalEmp > 0 ? totalSalary / totalEmp : 0;
  const totalRatingValue = employee.reduce(
    (acc, emp) => acc + (emp.review?.rating || 0),
    0
  );
  const avgRating = totalEmp > 0 ? totalRatingValue / totalEmp : 0;
  const maxSalary =
    totalEmp > 0 ? Math.max(...employee.map((emp) => emp.salary || 0)) : 0;
  const minSalary =
    totalEmp > 0 ? Math.min(...employee.map((emp) => emp.salary || 0)) : 0;

  // ------------------- Charts -------------------
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE"];

  // Employees by Department (Pie chart)
  const departmentData: DepartmentData[] = Object.values(
    employee.reduce<Record<string, DepartmentData>>((acc, emp) => {
      const dept = emp.department?.name || "Unknown";
      acc[dept] = acc[dept] || { name: dept, value: 0 };
      acc[dept].value += 1;
      return acc;
    }, {})
  );

  // Average Rating by Department (Bar chart)
  const deptRatingsMap: Record<string, { total: number; count: number }> = {};
  employee.forEach((emp) => {
    const dept = emp.department?.name || "Unknown";
    const rating = emp.review?.rating || 0;
    if (!deptRatingsMap[dept]) deptRatingsMap[dept] = { total: 0, count: 0 };
    deptRatingsMap[dept].total += rating;
    deptRatingsMap[dept].count += 1;
  });

  const deptRatingData: DeptRatingData[] = Object.keys(deptRatingsMap).map(
    (dept) => ({
      department: dept,
      avgRating:
        deptRatingsMap[dept].count > 0
          ? deptRatingsMap[dept].total / deptRatingsMap[dept].count
          : 0,
    })
  );

  // ------------------- Render -------------------
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />

          <div className="flex-1 ml-80 flex flex-col px-6 py-5">
            {/* Overview Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Overview
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 p-4">
              <StatCard title="Total Employees" value={totalEmp} />
              <StatCard
                title="Average Salary"
                value={`$${avgSalary.toFixed(2)}`}
              />
              <StatCard title="Highest Salary" value={`$${maxSalary}`} />
              <StatCard title="Lowest Salary" value={`$${minSalary}`} />
              <StatCard title="Average Rating" value={avgRating.toFixed(1)} />
            </div>

            {/* Charts */}
            <div className="flex flex-wrap gap-8 mt-8 p-4">
              {/* Employees by Department */}
              <ChartCard title="Employees by Department">
                {departmentData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {departmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      {/* <Tooltip /> */}
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex justify-center items-center h-[300px] text-gray-500">
                    No data available
                  </div>
                )}
              </ChartCard>

              {/* Average Rating by Department */}
              <ChartCard title="Average Rating by Department">
                {deptRatingData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical"
                      data={deptRatingData}
                      margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
                    >
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis type="category" dataKey="department" />
                      {/* <Tooltip /> */}
                      <Bar dataKey="avgRating" fill="#82ca9d">
                        <LabelList
                          dataKey="avgRating"
                          position="right"
                          formatter={(val) => {
                            const num =
                              typeof val === "number" ? val : Number(val);
                            return num.toFixed(1);
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex justify-center items-center h-[300px] text-gray-500">
                    No data available
                  </div>
                )}
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------- Reusable Components -------------------
const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f2f4]">
    <p>{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex-1 p-4 bg-[#f0f2f4] rounded-lg">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);
