"use client";
import { LiaEdit } from "react-icons/lia";
import React from "react";
import { useState, useEffect } from "react";
import type { DepartmentUpdate, Department } from "../types/type";

interface DepatmentProp {
  departmentId: number;
  updateDepartment: (id: number, updateDepartment: Department) => void
}

const DepartmentUpdate = ({ departmentId, updateDepartment }: DepatmentProp) => {
  const [error, setError] = useState<null | string>(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [department, setDepartment] = useState<DepartmentUpdate | null>(null);
  const [form, setForm] = useState<DepartmentUpdate>({
    name: "",
    location: "",
  });
  const id = departmentId;

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await fetch(`/api/department/${id}`);
        const data = await res.json();
        setForm({
          name: data?.name ?? "",
          location: data?.location ?? "",
        });
      } catch (error) {
        console.error("can not fetch department", error);
      }
    };
    if (isOpen) {
      fetchDepartment();
    }
  }, [id, isOpen]);

  const hanldeClose = () => {
    setIsOpen(false)
    setForm({
      name: '',
      location: ''
    })
  }

    const hanldeUpdate = async () => {
    try {
      const res = await fetch(`/api/department/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( form ),
      });
      const data = await res.json()
      if (res.ok) {
        hanldeClose()
        updateDepartment?.(id, data)
      } else{
        setError(data.error)
      }
    } catch (error) {
      console.error("error on update department", error);
      setError(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex cursor-pointer text-sm items-center px-3 py-1.5 font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 outline-none transition-all duration-150"
      >
        <LiaEdit size={20} />
        Edit
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)} // ADD THIS - Close when clicking backdrop
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Keep this - Prevent closing when clicking modal
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Update Department
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Edit the department information
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-in slide-in-from-top duration-300">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="px-6 py-6 space-y-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Department Name
                </label>
                <input
                  value={form.name ?? ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  type="text"
                  placeholder="e.g., Human Resources"
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none hover:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  value={form.location ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  type="text"
                  placeholder="e.g., New York Office"
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none hover:border-gray-300"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={hanldeClose}
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={hanldeUpdate}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200">
                Update Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentUpdate;
