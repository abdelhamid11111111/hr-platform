"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../../../components/SideBar";
import { DptInEmpForm } from "@/app/types/type";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditEmployeePage() {
  const [departments, setDepartments] = useState<DptInEmpForm[]>([]);
  const [preview, setPreview] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [currentImg, setCurrentImg] = useState<null | string>(null);
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    profilePic: null as File | null,
    position: "",
    departmentId: 0,
    salary: 0,
  });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`/api/employees/${id}`);
        const data = await res.json();
        setForm({
          name: data.name,
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          phone: data.phone,
          position: data.position,
          departmentId: data.departmentId,
          salary: data.salary,
          profilePic: null,
        });
        setCurrentImg(data.profilePic);
      } catch (error) {
        console.error("can not fetch employee", error);
      }
    };
    fetchEmployees();
  }, [id]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/department");
        const data = await res.json();
        setDepartments(data);
      } catch (error) {
        console.error("can not fetch department", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, profilePic: file });

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault(); // Add this line
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("dateOfBirth", form.dateOfBirth);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("salary", form.salary.toString());
    formData.append("departmentId", form.departmentId.toString());
    formData.append("position", form.position);
    if (form.profilePic) {
      formData.append("profilePic", form.profilePic);
    } 

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/employees/profile/${id}`);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("error to edit employee", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Employee</h1>
            <p className="mt-2 text-gray-600">
              Fill in the details to edit employee to the system
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <form className="p-8" onSubmit={handleEdit}>
              {/* Personal Information Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.dateOfBirth}
                      onChange={(e) =>
                        setForm({ ...form, dateOfBirth: e.target.value })
                      }
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john.doe@company.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="mt-6">
                  <label
                    htmlFor="profilePicture"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {preview ? (
                      <span>Preview</span>
                    ) : currentImg ? (
                      <span>Current</span>
                    ) : null}{" "}
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {preview ? (
                        <div className="w-full h-full">
                          <img
                            src={preview}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : currentImg ? (
                        <div className="w-full h-full">
                          <img
                            src={currentImg}
                            alt="Current profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <svg
                          className="w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      onChange={handleImage}
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      className="flex-1 px-4 py-3 w-96 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Information Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Employment Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Position */}
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Position <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.position}
                      onChange={(e) =>
                        setForm({ ...form, position: e.target.value })
                      }
                      type="text"
                      id="position"
                      name="position"
                      placeholder="Software Engineer"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.departmentId}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          departmentId: Number(e.target.value),
                        })
                      }
                      id="department"
                      name="department"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                      required
                    >
                      <option value="">Select department</option>
                      {departments.map((dpt) => (
                        <option value={dpt.id} key={dpt.id}>
                          {dpt.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Salary */}
                  <div>
                    <label
                      htmlFor="salary"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Salary <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        value={form.salary}
                        onChange={(e) =>
                          setForm({ ...form, salary: Number(e.target.value) })
                        }
                        type="number"
                        id="salary"
                        name="salary"
                        placeholder="50000"
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <Link href={`/employees/profile/${id}`}>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
