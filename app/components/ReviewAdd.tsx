"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { EmpReviewForm, Review } from "../types/type";


interface onAddReview{
  onAddReview?: (NewRvw: Review) => void
}

const AddReviewForm = ({onAddReview}: onAddReview) => {
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState<
    { value: number; label: string }[]
  >([]);
  const [error, setError] = useState<null | string>(null)
  const [form, setForm] = useState({
    employeeId: 0,
    notes: "",
    rating: "" as string | number,
  });

  useEffect(() => {
    const fetchemps = async () => {
      const res = await fetch("/api/employees");
      const data: EmpReviewForm[] = await res.json();
      const options = data.map((emp) => ({
        value: emp.id,
        label: emp.name,
      }));
      setEmployees(options);
    };
    if (isOpen) {
      fetchemps();
    }
  }, [isOpen]);

  const hanldeClose = () => {
    setForm({
    employeeId: 0,
    notes: "",
    rating: 0
  })
    setError(null)
    setIsOpen(false)
  }

  const hanldeAdd = async () => {
    const ratingValue = Number(form.rating)
    if(ratingValue < 0 || ratingValue > 5){
      return setError('rating should be between 1 to 5')
    }
    try {
      const res = await fetch("api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( form ),
      });
      const data = await res.json()
      if (res.ok) {
        hanldeClose()
        onAddReview?.(data)
      } else{
        setError(data.error)
      }
    } catch (error) {
      console.error("error on add review", error);
      setError(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1172d4] text-white text-sm font-bold leading-normal tracking-[0.015em]"
      >
        <span className="truncate">Add Review</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-auto"
          onClick={() => setIsOpen(false)} // Close modal when clicking backdrop
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Submit Review
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Provide your feedback for an employee
              </p>
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

            {/* Employee Select (react-select) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Employee
              </label>
              <Select
                value={
                  employees.find((emp) => emp.value === form.employeeId) || null
                }
                onChange={(selectedOption) =>
                  setForm({
                    ...form,
                    employeeId: selectedOption ? Number(selectedOption.value) : 0,
                  })
                }
                options={employees}
                placeholder="Select Employee"
                className="text-sm"
                classNamePrefix="react-select"
              />
            </div>

            {/* Note Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Note
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Write your note here..."
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none hover:border-gray-300 resize-none"
                rows={4}
              />
            </div>

            {/* Rating Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Rating
              </label>
              <input
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: Number(e.target.value) })
                }
                type="number"
                placeholder="Rate 1-5"
                min={1}
                max={5}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none hover:border-gray-300"
              />
            </div>

            {/* Footer */}
            <div className="flex gap-3">
              <button
                onClick={hanldeClose}
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={hanldeAdd}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:bg-blue-700 active:scale-95">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReviewForm;
