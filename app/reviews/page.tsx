"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import { MdDeleteOutline } from "react-icons/md";
import EditReviewForm from "../components/ReviewUpdate";
import AddReviewForm from "../components/ReviewAdd";
import { Review } from "../types/type";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<Review[]>([]);
  const [selected, setSelected] = useState<null | number>(null);
  const [loading, setLoading] = useState(true);
  const ratings = ["All Ratings", "1 - 2", "2 - 3", "3 - 4", "4 - 5"];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
        setFilter(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    });
    setReviews(reviews.filter((rvw) => rvw.id !== id));
    setFilter(reviews.filter((rvw) => rvw.id !== id));
  };

  const updateReview = async (id: number, newRvw: Review) => {
    setReviews((prev) =>
      prev.map((rvw) => (rvw.id === id ? { ...prev, ...newRvw } : rvw))
    );
    setFilter((prev) =>
      prev.map((rvw) => (rvw.id === id ? { ...prev, ...newRvw } : rvw))
    );
  };

  const handleFilter = async (label: string, index: number) => {
    setSelected(index);
    if (label === ratings[0]) {
      setFilter(reviews);
    } else if (label === ratings[1]) {
      setFilter(reviews.filter((rvw) => rvw.rating < 2 && rvw.rating >= 1));
    } else if (label === ratings[2]) {
      setFilter(reviews.filter((rvw) => rvw.rating < 3 && rvw.rating >= 2));
    } else if (label === ratings[3]) {
      setFilter(reviews.filter((rvw) => rvw.rating < 4 && rvw.rating >= 3));
    } else if (label === ratings[4]) {
      setFilter(reviews.filter((rvw) => rvw.rating < 5 && rvw.rating >= 4));
    }
  };

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{
        fontFamily: "Inter, Noto Sans, sans-serif",
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />

          <div className="flex-1 ml-80 flex flex-col px-6 py-5">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Reviews
              </p>
            </div>

            <div className="flex px-4 py-3 justify-end">
              <AddReviewForm
                onAddReview={(NewRvw) => {
                  setReviews((prev) => [NewRvw, ...prev]);
                  setFilter((prev) => [NewRvw, ...prev]);
                }}
              />
            </div>

            <div className="px-4 pb-2">
              <div className="flex gap-2 flex-wrap">
                {ratings.map((label, index) => (
                  <button
                    onClick={() => handleFilter(label, index)}
                    key={label}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg border border-[#dbe0e6] text-sm hover:bg-gray-200 text-[#111418] transition-colors
                      ${selected === index ? "bg-gray-200" : "bg-white"}
                      ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              All Reviews
            </h3>
            
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Note
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-left w-60 text-[#617589] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      // Loading skeleton rows
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="border-t border-t-[#dbe0e6] animate-pulse">
                          <td className="h-[72px] px-4 py-2 w-[400px]">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px]">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px]">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px]">
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 bg-gray-200 rounded w-16"></div>
                              <div className="h-8 bg-gray-200 rounded w-20"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : filter.length === 0 ? (
                      // Empty state
                      <tr>
                        <td colSpan={5} className="h-[200px] text-center text-[#617589]">
                          <div className="flex flex-col items-center justify-center">
                            <p className="text-lg font-medium">No reviews found</p>
                            <p className="text-sm mt-1">Try adjusting your filters or add a new review</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      // Actual data
                      filter.map((rvw) => (
                        <tr key={rvw.id} className="border-t border-t-[#dbe0e6]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm">
                            {rvw.employee?.name}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm">
                            {rvw.notes}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm">
                            {new Date(rvw.createdAt).toLocaleDateString()}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm">
                            {rvw.rating}
                          </td>
                          <td className="px-4 py-2 text-[#617589] text-sm font-bold">
                            <div className="flex items-center gap-2">
                              <EditReviewForm
                                reviewId={rvw.id}
                                updateReview={updateReview}
                              />
                              <button
                                onClick={() => handleDelete(rvw.id)}
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