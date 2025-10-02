import Sidebar from "@/app/components/SideBar";
import { MdDeleteOutline } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import Link from "next/link";

export default function EmployeesPage() {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
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
                type="text"
                placeholder="Search employees..."
                className="w-full max-w-[320px] rounded-lg border border-[#dbe0e6] bg-white px-4 py-2 text-sm text-[#111418] placeholder-[#617589] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <tr className="border-t border-t-[#dbe0e6]">
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                          style={{
                            backgroundImage:
                              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpQvav9HhHX6pFrcpqgJIVAPQ9jA9lpzx61bZ2uCJi3KFKRj3iPH7lzhKPNDv-RwJk2YF57zimKAVGPsHUFCt3HwUcHC347npAz7zQm5MiqPaNfE-xvJN5dOHSnPPBdrXyhh5U0qP2XTk3UR-v-wyfQo_1u_gT10KSz8PcHKPOAx5MnAMrmrNPpPI8Em93QWGiRsb4RwdsnsEPOTK1UL_-xYlMRt1tW2KIF2QccpegpD3mP0UvVdK2q4p3GV5uMyPW2Qe_fKfNcBc")',
                          }}
                        ></div>
                      </td>
                      <td className="px-4 py-2 text-[#111418] text-sm">
                        Sophia Clark
                      </td>
                      <td className="px-4 py-2 text-[#617589] text-sm">
                        Software Engineer
                      </td>
                      <td className="px-4 py-2 text-[#617589] text-sm">
                        Engineering
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
