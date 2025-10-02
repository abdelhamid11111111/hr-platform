"use client";
import { MdPeopleOutline } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

  const routeUrl = usePathname()
  const routes = [
    {
      icon: MdPeopleOutline,
      title: "Employees",
      route: "/employees",
    },
    {
      icon: BsBuildings,
      title: "Departments",
      route: "/departments",
    },
    {
      icon: MdOutlineRateReview,
      title: "Reviews",
      route: "/reviews",
    },
    {
      icon: TbReportAnalytics,
      title: "Reports",
      route: "/reports",
    },
  ];

  const isActive = (route: string) => {
  return routeUrl.startsWith(route);
}


  return (
    <div className="fixed top-0 left-0 h-screen w-80 bg-white shadow-lg flex flex-col justify-between p-4 z-50">
      {/* Logo / Company */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[#111418] text-base font-bold leading-normal">
          Acme Co
        </h1>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {routes.map((route) => (
            <Link 
              key={route.route} 
              href={route.route}
              >
              <div className={`flex flex-row items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition 
                ${isActive(route.route) ? 'bg-[#e5e7eb]' : ''} `}>
                <route.icon size={22} />
                <p className="text-[#111418] text-sm font-medium">
                  {route.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
