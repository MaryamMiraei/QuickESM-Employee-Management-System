"use client"
import { dashboard } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const { data } = useQuery<IDashboard>({
    queryKey: ["dashboardStatus"],
    queryFn: dashboard,
  });

  const statusCard = [
    {
      title: "Total Employees",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-users size-10 p-2.5 rounded-lg bg-slate-100  text-slate-600 group-hover:bg-indigo-50  group-hover:text-indigo-600 transition-colors duration-200"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      ),
      statusNumber: data?.totalEmployees,
    },
    {
      title: "Departments",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-building2 lucide-building-2 size-10 p-2.5 rounded-lg bg-slate-100  text-slate-600 group-hover:bg-indigo-50  group-hover:text-indigo-600 transition-colors duration-200"
          aria-hidden="true"
        >
          <path d="M10 12h4"></path>
          <path d="M10 8h4"></path>
          <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
          <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
          <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
        </svg>
      ),
      statusNumber: data?.totalDepartments,
    },
    {
      title: "Today's Attendance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-calendar size-10 p-2.5 rounded-lg bg-slate-100  text-slate-600 group-hover:bg-indigo-50  group-hover:text-indigo-600 transition-colors duration-200"
          aria-hidden="true"
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
      ),
      statusNumber: data?.todayAttendance,
    },
    {
      title: "Pending Leaves",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-file-text size-10 p-2.5 rounded-lg bg-slate-100  text-slate-600 group-hover:bg-indigo-50  group-hover:text-indigo-600 transition-colors duration-200"
          aria-hidden="true"
        >
          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
          <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      ),
      statusNumber: data?.pendingLeaves,
    },
  ];

  return (
    <div className="p-5">
      <header className="ml-15 lg:ml-0 mb-8">
        <h1 className="font-bold text-xl">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Welcome back, Admin — here's your overview
        </p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statusCard.map((item) => (
          <div key={item.title} className=" p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between border border-slate-500/10 rounded-md hover:-translate-y-0.5 transition-transform duration-300">
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70">
              
              </div>
              <p className="text-sm font-medium text-slate-700">{item.title}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {item.statusNumber}
              </p>
            </div>
            {item.icon}
          </div>
        ))}
      </main>
    </div>
  );
};

export default DashboardPage;
