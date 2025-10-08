"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar";
import EditReviewForm from "../../../components/ReviewUpdate";
import { useParams } from "next/navigation";
import { Employee, Review } from "../../../types/type";
import Link from "next/link";
import AddReviewForm from "@/app/components/ReviewAdd";

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmpData = async () => {
      try {
        const res = await fetch(`/api/profile/${id}`);
        const data = await res.json();
        setEmployee(data);
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };
    fetchEmpData();
  }, [id]);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />

          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 ml-80">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
                  Employee Profile
                </p>
                <p className="text-[#617589] text-sm font-normal leading-normal">
                  View detailed information about the employee
                </p>
              </div>
              <Link href={`/employees/profile/edit/${id}`}>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1172d4] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Edit Profile</span>
                </button>
              </Link>
            </div>

            {/* Profile Header */}
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4">
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{
                      backgroundImage: `url("${employee?.profilePic ?? ""}")`,
                    }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                      {employee?.name ?? " "}
                    </p>
                    <p className="text-[#617589] text-base font-normal leading-normal">
                      {employee?.position ?? " "}
                    </p>
                    <p className="text-[#617589] text-sm font-normal leading-normal mt-1">
                      {employee?.department?.name ?? " "} Department
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]">
                <p className="text-[#617589] text-sm font-medium leading-normal">
                  Email Address
                </p>
                <p className="text-[#111418] text-base font-normal leading-normal">
                  {employee?.email ?? " "}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]">
                <p className="text-[#617589] text-sm font-medium leading-normal">
                  Phone Number
                </p>
                <p className="text-[#111418] text-base font-normal leading-normal">
                  {employee?.phone ?? " "}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]">
                <p className="text-[#617589] text-sm font-medium leading-normal">
                  Date of Birth
                </p>
                <p className="text-[#111418] text-base font-normal leading-normal">
                  {employee?.dateOfBirth
                    ? new Date(employee.dateOfBirth).toDateString()
                    : " "}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]">
                <p className="text-[#617589] text-sm font-medium leading-normal">
                  Hire Date
                </p>
                <p className="text-[#111418] text-base font-normal leading-normal">
                  {employee?.createdAt
                    ? new Date(employee.createdAt).toDateString()
                    : " "}
                </p>
              </div>
            </div>

            {/* Employment Details */}
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Employment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]">
                <p className="text-[#617589] text-sm font-medium leading-normal">
                  Position
                </p>
                <p className="text-[#111418] text-base font-normal leading-normal">
                  {employee?.position ?? " "}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]">
                <p className="text-[#617589] text-sm font-medium leading-normal">
                  Department
                </p>
                <p className="text-[#111418] text-base font-normal leading-normal">
                  {employee?.department?.name ?? " "}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6] md:col-span-2">
                <p className="text-[#617589] text-sm font-medium leading-normal">
                  Annual Salary
                </p>
                <p className="text-[#111418] text-base font-normal leading-normal">
                  ${employee?.salary?.toLocaleString() ?? " "}
                </p>
              </div>
            </div>

            {/* Performance Review */}
            {employee?.review ? (
              <div className="flex flex-col gap-4 px-4 pt-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    Latest Performance Review
                  </h2>
                  <EditReviewForm
                    reviewId={employee.review.id}
                    updateReview={(id: number, updatedReview: Review) => {
                      setEmployee((prev) =>
                        prev
                          ? {
                              ...prev,
                              review: { ...prev.review, ...updatedReview },
                            }
                          : prev
                      );
                    }}
                  />
                </div>

                <div className="rounded-lg border border-[#dbe0e6] bg-white p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#111418] text-lg font-bold leading-normal">
                          Rating: {employee.review?.rating ?? " "}/5.0
                        </p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill={
                                star <= Math.floor(employee.review?.rating ?? 0)
                                  ? "#FFC107"
                                  : "#E0E0E0"
                              }
                              viewBox="0 0 256 256"
                            >
                              <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-[#617589] text-sm font-normal leading-normal">
                        Reviewed on{" "}
                        {new Date(employee.review.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-[#617589] text-sm font-medium leading-normal mb-2">
                      Review Notes:
                    </p>
                    <p className="text-[#111418] text-base font-normal leading-normal">
                      {employee.review?.notes ?? " "}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
                <AddReviewForm/>
            )
        }
          </div>
        </div>
      </div>
    </div>
  );
}
