"use client";
import Button from "@/components/Button";
import Table from "@/components/Table";
import { useState } from "react";

const PayslipsPage = () => {
  const [addFormModal, setAddFormModal] = useState(false);

  interface IPayslips {
    id: number;
    employee: string;
    type: string;
    dates: string;
    reason: string;
    status: string;
  }
  const columns = [
    { key: "employee", title: "Employee" },
    { key: "period", title: "Period" },
    { key: "basic Salary", title: "Basic Salary" },
    { key: "net Salary", title: "Net Salary" },
    { key: "actions", title: "Actions" },
  ];
  const payslips: IPayslips[] = [];

  return (
    <div className="p-5">
      <header className="ml-15 lg:ml-0 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-bold text-xl">Payslips</h1>
          <p className="text-gray-500 text-sm">
            Generate and manage employee payslips
          </p>
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
          Generate Payslips
        </Button>
      </header>
      <main>
        <Table
          columns={columns}
          data={payslips}
          rowKey="id"
          emptyMessage="No payslip applications found"
        />
      </main>
    </div>
  );
};

export default PayslipsPage;
