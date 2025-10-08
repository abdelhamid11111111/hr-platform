"use client";
import Sidebar from "@/app/components/SideBar";
import { MdDeleteOutline } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import Link from "next/link";
import { EmpTable } from "../types/type";
import React, { useEffect, useState } from "react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmpTable[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmps = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/employees");
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error("can not fetch employee", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmps();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleResultsSearch = employees.filter(emp => 
    (emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.name.toLowerCase().includes(search.toLowerCase()) )
  )

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />

          <div className="flex-1 ml-80 flex flex-col px-6 py-5">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Employees
              </p>
              <Link href="/employees/create">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-medium leading-normal">
                  <span className="truncate">Add Employee</span>
                </button>
              </Link>
            </div>

            {/* Search Input */}
            <div className="px-4 pb-2 mt-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search employees or employees per department..."
                disabled={loading}
                className="w-full max-w-[520px] rounded-lg border border-[#dbe0e6] bg-white px-4 py-2 text-sm text-[#111418] placeholder-[#617589] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Employees Table */}
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">
                        Profile Picture
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">
                        Full Name
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">
                        Position
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left text-[#617589] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      // Loading skeleton rows
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="border-t border-t-[#dbe0e6] animate-pulse">
                          <td className="h-[72px] px-4 py-2">
                            <div className="bg-gray-200 rounded-full w-10 h-10"></div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="h-4 bg-gray-200 rounded w-28"></div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 bg-gray-200 rounded w-16"></div>
                              <div className="h-8 bg-gray-200 rounded w-20"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : handleResultsSearch.length === 0 ? (
                      // Empty state
                      <tr>
                        <td colSpan={5} className="h-[200px] text-center text-[#617589]">
                          <div className="flex flex-col items-center justify-center">
                            <p className="text-lg font-medium">
                              {search ? 'No employees found' : 'No employees yet'}
                            </p>
                            <p className="text-sm mt-1">
                              {search ? 'Try adjusting your search' : 'Add a new employee to get started'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      // Actual data
                      handleResultsSearch.map((emp) => (
                        <tr key={emp.id} className="border-t border-t-[#dbe0e6] hover:bg-gray-50 transition-colors cursor-pointer">
                          <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                            <Link href={`/employees/profile/${emp.id}`}>
                              <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                                style={{
                                  backgroundImage: `url(${emp.profilePic})`,
                                }}
                              ></div>
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-[#111418] text-sm">
                            <Link href={`/employees/profile/${emp.id}`} className="hover:text-blue-600">
                              {emp.name}
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-[#617589] text-sm">
                            <Link href={`/employees/profile/${emp.id}`}>
                              {emp.position}
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-[#617589] text-sm">
                            <Link href={`/employees/profile/${emp.id}`}>
                              {emp.department?.name}
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-[#617589] text-sm font-bold">
                            <div className="flex items-center gap-2">
                              <Link href={`/employees/${emp.id}`}>
                                <button className="inline-flex cursor-pointer text-sm items-center px-3 py-1.5 font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 outline-none transition-all duration-150">
                                  <LiaEdit size={20} />
                                  Edit
                                </button>
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(emp.id);
                                }}
                                className="inline-flex cursor-pointer items-center text-sm px-3 py-1.5 font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 outline-none transition-all duration-150"
                              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}