"use client";
import Sidebar from "../components/SideBar";
import { MdDeleteOutline } from "react-icons/md";
import DepartmentAdd from "@/app/components/DepartementAdd";
import DepartmentUpdate from "@/app/components/DepartementUpdate";
import { useEffect, useState } from "react";
import { Department } from "../types/type";

export default function DepartmentsPage() {
  const [department, setDepartment] = useState<Department[]>([]);

  // useEffect(() => {
  //   const fetchDepartment = async () => {
  //     try {
  //       const res = await fetch('/api/department')
  //       const data = await res.json()
  //       setDepartment(data)
  //     } catch (error) {
  //       console.error("can not fetch department", error);
  //     }
  //   };
  //   fetchDepartment();
  // }, []);

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar placeholder */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 ml-80 flex flex-col px-6 py-5">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Departments
              </p>
              <DepartmentAdd />
            </div>

            {/* Table */}
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-column-120 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Department Name
                      </th>
                      <th className="table-column-240 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Date of Creation
                      </th>
                      <th className="table-column-360 px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Location
                      </th>
                      <th className="table-column-480 px-4 py-3 text-left text-[#111418] w-60 text-[#617589] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.map((dept) => (
                      <tr key={dept.id} className="border-t border-t-[#dbe0e6]">
                        <td className="table-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                          {dept.name}
                        </td>
                        <td className="table-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm font-normal leading-normal">
                          {dept.createAt}
                        </td>
                        <td className="table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm font-normal leading-normal">
                          {dept.location}
                        </td>

                        <td className="px-4 py-2 text-[#617589] text-sm font-bold">
                          <div className="flex items-center gap-2">
                            <DepartmentUpdate />
                            <button className="inline-flex cursor-pointer items-center text-sm px-3 py-1.5 font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 outline-none  transition-all duration-150">
                              <MdDeleteOutline size={20} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Responsive hide columns */}
              <style jsx>{`
                @container (max-width: 120px) {
                  .table-column-120 {
                    display: none;
                  }
                }
                @container (max-width: 240px) {
                  .table-column-240 {
                    display: none;
                  }
                }
                @container (max-width: 360px) {
                  .table-column-360 {
                    display: none;
                  }
                }
                @container (max-width: 480px) {
                  .table-column-480 {
                    display: none;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
