"use client";
import Sidebar from "../components/SideBar";
import { MdDeleteOutline } from "react-icons/md";
import DepartmentAdd from "@/app/components/DepartementAdd";
import DepartmentUpdate from "@/app/components/DepartementUpdate";
import { useEffect, useState } from "react";
import { Department } from "../types/type";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/department");
        const data = await res.json();
        setDepartments(data);
      } catch (error) {
        console.error("can not fetch department", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const updateDepartment = async (id: number, updateDepartment: Department) => {
    setDepartments((prev) =>
      prev.map((department) =>
        department.id === id ? { ...prev, ...updateDepartment } : department
      )
    );
  };

  const handleDelete = async (id: number) => {
    try{
      await fetch(`/api/department/${id}`,{
        method: 'DELETE',
      })
      setDepartments(departments.filter((department) => department.id !== id))
    } catch(error){
      console.error('can not delete department', error);
    }
  }

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />

          <div className="flex-1 ml-80 flex flex-col px-6 py-5">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Departments
              </p>
              <DepartmentAdd
                onAddDepartment={(newDpt) =>
                  setDepartments((prev) => [newDpt, ...prev])
                }
              />
            </div>

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
                    {loading ? (
                      // Loading skeleton rows
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="border-t border-t-[#dbe0e6] animate-pulse">
                          <td className="table-column-120 h-[72px] px-4 py-2 w-[400px]">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </td>
                          <td className="table-column-240 h-[72px] px-4 py-2 w-[400px]">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="table-column-360 h-[72px] px-4 py-2 w-[400px]">
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                          </td>
                          <td className="table-column-480 px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 bg-gray-200 rounded w-16"></div>
                              <div className="h-8 bg-gray-200 rounded w-20"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : departments.length === 0 ? (
                      // Empty state
                      <tr>
                        <td colSpan={4} className="h-[200px] text-center text-[#617589]">
                          <div className="flex flex-col items-center justify-center">
                            <p className="text-lg font-medium">No departments found</p>
                            <p className="text-sm mt-1">Add a new department to get started</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      // Actual data
                      departments.map((dept) => (
                        <tr key={dept.id} className="border-t border-t-[#dbe0e6]">
                          <td className="table-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                            {dept.name}
                          </td>
                          <td className="table-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm font-normal leading-normal">
                            {new Date(dept.createdAt).toLocaleDateString()}
                          </td>
                          <td className="table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm font-normal leading-normal">
                            {dept.location}
                          </td>
                          <td className="px-4 py-2 text-[#617589] text-sm font-bold">
                            <div className="flex items-center gap-2">
                              <DepartmentUpdate 
                                departmentId={dept.id} 
                                updateDepartment={updateDepartment}
                              />
                              <button 
                                onClick={() => handleDelete(dept.id)}
                                className="inline-flex cursor-pointer items-center text-sm px-3 py-1.5 font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 outline-none transition-all duration-150">
                                <MdDeleteOutline size={20} />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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