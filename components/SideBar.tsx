export default function Sidebar() {
  const navItems = [
    { icon: "groups", label: "Employees", active: true },
    { icon: "person", label: "Employee Details" },
    { icon: "apartment", label: "Departments" },
    { icon: "monitoring", label: "Performance Reviews" },
    { icon: "show_chart", label: "Analytics Dashboard" },
    { icon: "contact_page", label: "Directory" },
    { icon: "description", label: "Reports" },
  ];

  return (
    <aside className="w-64 bg-card-light dark:bg-card-dark flex flex-col border-r border-subtle-light dark:border-subtle-dark">
      <div className="p-6">
        <h1 className="text-xl font-bold text-foreground-light dark:text-foreground-dark">Acme Co</h1>
        <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70">HR Management</p>
      </div>
      <nav className="flex-grow px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  item.active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}