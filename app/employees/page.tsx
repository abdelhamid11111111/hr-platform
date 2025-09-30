import React from "react";

export default function EmployeeManagement() {
  return (
    <div className="flex min-h-screen font-display bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark">
      {/* Sidebar */}
      <aside className="w-64 bg-card-light dark:bg-card-dark flex flex-col border-r border-subtle-light dark:border-subtle-dark">
        <div className="p-6">
          <h1 className="text-xl font-bold text-foreground-light dark:text-foreground-dark">Acme Co</h1>
          <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">HR Management</p>
        </div>
        <nav className="flex-grow px-4">
          <ul className="space-y-2">
            <li>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold" href="#">
                <span className="material-symbols-outlined">groups</span>
                <span>Employees</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200" href="#">
                <span className="material-symbols-outlined">person</span>
                <span>Employee Details</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200" href="#">
                <span className="material-symbols-outlined">apartment</span>
                <span>Departments</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200" href="#">
                <span className="material-symbols-outlined">monitoring</span>
                <span>Performance Reviews</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200" href="#">
                <span className="material-symbols-outlined">show_chart</span>
                <span>Analytics Dashboard</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200" href="#">
                <span className="material-symbols-outlined">contact_page</span>
                <span>Directory</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200" href="#">
                <span className="material-symbols-outlined">description</span>
                <span>Reports</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">Employees</h2>
          </header>

          {/* Employee table */}
          <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-foreground-light/50 dark:text-foreground-dark/50">search</span>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <select className="w-full py-2 px-3 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Product</option>
              </select>
              <select className="w-full py-2 px-3 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Any Salary</option>
                <option>&lt; $80,000</option>
                <option>$80,000 - $100,000</option>
                <option>&gt; $100,000</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-foreground-light/70 dark:text-foreground-dark/70 uppercase bg-background-light dark:bg-background-dark">
                  <tr>
                    <th className="p-4"></th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Salary</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example employee row */}
                  <tr className="border-b border-subtle-light dark:border-subtle-dark hover:bg-background-light dark:hover:bg-background-dark">
                    <td className="p-4">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtUpnyvKAFC0KIGWhUejHpLh0kMb9QaRmxj_Ok61cbPiQ7y7VoVENENqA1vMG8EhAUAVYtd7wZrKNOn8z9cEZpYyRasQ3P76rmonw-o7KyZEx9pqDfSOuoMdvuBDsXwO9mz-G80pHiLP2FviVtrhT5dggyk3DlClvarptRQDcwvuafqp2WmDIy3oMOgb-IiguRFwAXgj2lcvsNMqVcu6JIQ2DFutFWIBa7cR4xYKIY-RzxW0jbuI8RlF3DlSMp30Exx3rBmhw2nfjt"
                        alt="Sophia Clark"
                      />
                    </td>
                    <td className="p-4 font-medium text-foreground-light dark:text-foreground-dark">Sophia Clark</td>
                    <td className="p-4">Engineering</td>
                    <td className="p-4">$95,000</td>
                    <td className="p-4">(555) 123-4567</td>
                    <td className="p-4">sophia.clark@example.com</td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <button className="text-primary hover:underline">Edit</button>
                        <button className="text-red-500 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                  {/* Add more rows similarly */}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">Showing 1 to 5 of 10 entries</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-lg border border-subtle-light dark:border-subtle-dark hover:bg-background-light dark:hover:bg-background-dark">Previous</button>
                <button className="px-3 py-1 rounded-lg bg-primary text-white">1</button>
                <button className="px-3 py-1 rounded-lg hover:bg-background-light dark:hover:bg-background-dark">2</button>
                <button className="px-3 py-1 rounded-lg border border-subtle-light dark:border-subtle-dark hover:bg-background-light dark:hover:bg-background-dark">Next</button>
              </div>
            </div>
          </div>

          {/* Add Employee Form */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Add Employee</h3>
            <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Enter name" className="w-full px-3 py-2 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter email" className="w-full px-3 py-2 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" placeholder="Enter phone" className="w-full px-3 py-2 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="department">Department</label>
                  <select id="department" className="w-full px-3 py-2 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Select department</option>
                    <option>Engineering</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Product</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="salary">Salary</label>
                  <input type="number" id="salary" placeholder="Enter salary" className="w-full px-3 py-2 rounded-lg border border-subtle-light dark:border-subtle-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="picture">Profile Picture</label>
                  <input type="file" id="picture" className="w-full text-sm text-foreground-light/70 dark:text-foreground-dark/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200">Add Employee</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
