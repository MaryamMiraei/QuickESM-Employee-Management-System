"use client";
import { getEmployees } from "@/api/employee";
import Button from "@/components/Button";
import { getInitials } from "@/utils/AUXFunctions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const EmployeePage = () => {
  const [addFormModal, setAddFormModal] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data: employees,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  if (isPending) {
    return <p>Loading employees...</p>;
  }

  if (isError) {
    return <p>Failed to load employees.</p>;
  }

  return (
    <div className="p-5">
      <header className="ml-15 lg:ml-0 mb-8  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-bold text-xl">Employee</h1>
          <p className="text-gray-500 text-sm">Manage your team members</p>
        </div>
        <Button onClick={() => setAddFormModal(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus"
            aria-hidden="true"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Add Employee
        </Button>
      </header>

      <search>
        <div className="flex flex-col sm:flex-row gap-3 mb-6 ">
          <div className="relative flex-1 px-2 py-1  border-2 border-slate-500/10 rounded-md focus-within:ring-1 focus-within:ring-indigo-500/50 ">
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
              className="lucide lucide-search absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              placeholder="Search employees..."
              className="w-full pl-10! outline-none"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="max-w-40 px-2 py-1 outline-none border-2 border-slate-500/10 rounded-md focus:ring-1 focus:ring-indigo-500/50 "
            name="filter"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="IT Support">IT Support</option>
            <option value="Customer Success">Customer Success</option>
            <option value="Product Management">Product Management</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </search>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {employees.map((employee) => (
          <div key={employee.id} className="group relative overflow-hidden">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-slate-100 to-slate-50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
                  <span className="text-2xl font-medium text-indigo-400">
                    {getInitials(employee.firstName)}{" "}
                    {getInitials(employee.lastName)}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-600 rounded-lg shadow-sm">
                {employee.department}
              </span>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-indigo-700/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center pb-6 gap-3">
              <button className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105">
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
                  className="lucide lucide-pencil w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                  <path d="m15 5 4 4"></path>
                </svg>
              </button>
              <button className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50">
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
                  className="lucide lucide-trash2 lucide-trash-2 w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                  <path d="M3 6h18"></path>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-slate-900">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-xs text-slate-500">{employee.position}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EmployeePage;
