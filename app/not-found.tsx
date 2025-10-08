import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="relative flex h-screen w-full flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full items-center justify-center px-6">
       <div className="text-center max-w-xl scale-[0.9]">
          {/* 404 Illustration */}
          <div className="mb-6">
            <svg
              className="w-48 h-48 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Error Code */}
          <h1 className="text-[#111418] text-5xl md:text-6xl font-bold tracking-tight mb-3">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-[#111418] text-xl md:text-2xl font-bold tracking-tight mb-2">
            Page Not Found
          </h2>
          
          <p className="text-[#617589] text-sm md:text-base leading-relaxed mb-6 max-w-sm mx-auto">
            Sorry, we could not find the page you are looking for. The page might have been moved, deleted, or never existed.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Link href="/employees">
              <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#1172d4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0d5cb5] transition-colors duration-200">
                <span className="truncate">Go to Employees</span>
              </button>
            </Link>
            
            <Link href="/departments">
              <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 border-2 border-[#dbe0e6] bg-white text-[#111418] text-sm font-bold leading-normal hover:bg-[#f0f2f4] transition-colors duration-200">
                <span className="truncate">View Departments</span>
              </button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-[#dbe0e6]">
            <p className="text-[#617589] text-xs mb-3">Quick Links:</p>
            <div className="flex flex-wrap gap-3 justify-center text-xs">
              <Link href="/employees" className="text-[#1172d4] font-medium hover:underline">
                Employees
              </Link>
              <span className="text-[#dbe0e6]">•</span>
              <Link href="/departments" className="text-[#1172d4] font-medium hover:underline">
                Departments
              </Link>
              <span className="text-[#dbe0e6]">•</span>
              <Link href="/reviews" className="text-[#1172d4] font-medium hover:underline">
                Reviews
              </Link>
              <span className="text-[#dbe0e6]">•</span>
              <Link href="/reports" className="text-[#1172d4] font-medium hover:underline">
                Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}