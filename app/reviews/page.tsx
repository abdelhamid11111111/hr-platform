import React from "react";
import Sidebar from "../components/SideBar";
import { MdDeleteOutline } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";

export default function ReviewsPage() {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{
        // ["--select-button-svg"]: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fill='rgb(97,117,137)' viewBox='0 0 256 256'%3e%3cpath d='M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z'%3e%3c/path%3e%3c/svg%3e")`,
        fontFamily: "Inter, Noto Sans, sans-serif",
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar placeholder */}
          <Sidebar />

          {/* Main Content */}
           <div className="flex-1 ml-80 flex flex-col px-6 py-5">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Reviews
              </p>
            </div>

            {/* Add Review Form */}
            {/* <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Add Review
            </h3> */}
            {/* <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <textarea
                  placeholder="Add a note"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] min-h-36 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-lg">
                  <input
                    placeholder="Select date"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#617589] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                  />
                  <div className="text-[#617589] flex border border-[#dbe0e6] bg-white items-center justify-center pr-[15px] rounded-r-lg border-l-0">
                    📅
                  </div>
                </div>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal">
                  <option value="one">Select rating</option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
              </label>
            </div> */}

            <div className="flex px-4 py-3 justify-end">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1172d4] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Add Review</span>
              </button>
            </div>

            <div className="px-4 pb-2">
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 rounded-lg border border-[#dbe0e6] bg-white text-sm text-[#111418] hover:bg-[#f0f2f4]">
                  All Ratings
                </button>
                <button className="px-4 py-2 rounded-lg border border-[#dbe0e6] bg-white text-sm text-[#111418] hover:bg-[#f0f2f4]">
                  1 - 2
                </button>
                <button className="px-4 py-2 rounded-lg border border-[#dbe0e6] bg-white text-sm text-[#111418] hover:bg-[#f0f2f4]">
                  2 - 3
                </button>
                <button className="px-4 py-2 rounded-lg border border-[#dbe0e6] bg-white text-sm text-[#111418] hover:bg-[#f0f2f4]">
                  3 - 4
                </button>
                <button className="px-4 py-2 rounded-lg border border-[#dbe0e6] bg-white text-sm text-[#111418] hover:bg-[#f0f2f4]">
                  4 - 5
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              All Reviews
            </h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Note
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-left text-[#111418] w-60 text-[#617589] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe0e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm">
                        Consistently meets expectations.
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm">
                        2024-07-26
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#617589] text-sm">
                        4
                      </td>
                      <td className="px-4 py-2 text-[#617589] text-sm font-bold">
                        <div className="flex items-center gap-2">
                          <button className="inline-flex cursor-pointer text-sm items-center px-3 py-1.5 font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 outline-none transition-all duration-150">
                            <LiaEdit size={20} />
                            Edit
                          </button>
                          <button className="inline-flex cursor-pointer items-center text-sm px-3 py-1.5 font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 outline-none  transition-all duration-150">
                            <MdDeleteOutline size={20} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
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
