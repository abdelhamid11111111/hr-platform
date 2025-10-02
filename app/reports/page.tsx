import Sidebar from "@/app/components/SideBar";

export default function DashboardPage() {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
           <div className="flex-1 ml-80 flex flex-col px-6 py-5">
            {/* Overview Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Overview
              </p>
            </div>

            {/* Overview Stats */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f2f4]">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Total Employees
                </p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  150
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f2f4]">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Average Salary
                </p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  $75,000
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f2f4]">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Highest Salary
                </p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  $150,000
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f2f4]">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Lowest Salary
                </p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  $30,000
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f2f4]">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Average Rating
                </p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">
                  4.5
                </p>
              </div>
            </div>

            {/* Performance Distribution */}
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Performance Distribution
            </h2>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  High Performers
                </p>
                <p className="text-[#111418] text-sm font-normal leading-normal">
                  75%
                </p>
              </div>
              <div className="rounded bg-[#dbe0e6]">
                <div
                  className="h-2 rounded bg-[#111418]"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-[#617589] text-sm font-normal leading-normal">
                Based on last quarter&apos;s reviews
              </p>
            </div>

            {/* Salary Distribution */}
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Salary Distribution
            </h2>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Salaries above $75,000
                </p>
                <p className="text-[#111418] text-sm font-normal leading-normal">
                  50%
                </p>
              </div>
              <div className="rounded bg-[#dbe0e6]">
                <div
                  className="h-2 rounded bg-[#111418]"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <p className="text-[#617589] text-sm font-normal leading-normal">
                As of current payroll
              </p>
            </div>

            {/* Employees by Department */}
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Employees by Department
            </h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#dbe0e6] p-6">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Department Distribution
                </p>
                <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight truncate">
                  150
                </p>
                <div className="flex gap-1">
                  <p className="text-[#617589] text-base font-normal leading-normal">
                    Total
                  </p>
                  <p className="text-[#078838] text-base font-medium leading-normal">
                    +10%
                  </p>
                </div>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  <div
                    className="border-[#617589] bg-[#f0f2f4] border-t-2 w-full"
                    style={{ height: "50%" }}
                  ></div>
                  <p className="text-[#617589] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Engineering
                  </p>
                  <div
                    className="border-[#617589] bg-[#f0f2f4] border-t-2 w-full"
                    style={{ height: "90%" }}
                  ></div>
                  <p className="text-[#617589] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Marketing
                  </p>
                  <div
                    className="border-[#617589] bg-[#f0f2f4] border-t-2 w-full"
                    style={{ height: "60%" }}
                  ></div>
                  <p className="text-[#617589] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Sales
                  </p>
                  <div
                    className="border-[#617589] bg-[#f0f2f4] border-t-2 w-full"
                    style={{ height: "30%" }}
                  ></div>
                  <p className="text-[#617589] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    HR
                  </p>
                  <div
                    className="border-[#617589] bg-[#f0f2f4] border-t-2 w-full"
                    style={{ height: "40%" }}
                  ></div>
                  <p className="text-[#617589] text-[13px] font-bold leading-normal tracking-[0.015em]">
                    Finance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
