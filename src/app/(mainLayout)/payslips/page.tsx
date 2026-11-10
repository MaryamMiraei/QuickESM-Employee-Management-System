"use client";
import Button from "@/components/Button";
import Table, { type IColumn } from "@/components/Table";
import { useState } from "react";
import PayslipsModal from "./components/PayslipsModal";
import { months } from "@/data/months";
import { useQuery } from "@tanstack/react-query";
import { getPayslips } from "@/api/payslips";
import { formatCurrency } from "@/utils/AUXFunctions";

const PayslipsPage = () => {
  const [addFormModal, setAddFormModal] = useState(false);
  const {
    data: payslips = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payslips"],
    queryFn: getPayslips,
  });



  const columns: IColumn<IPayslip>[] = [
    {
      key: "employee",
      title: "Employee",
      render: (row: IPayslip) =>
        row.employee
          ? `${row.employee.firstName} ${row.employee.lastName}`
          : "-",
    },
    {
      key: "period",
      title: "Period",
      className: "text-slate-500",
      render: (row: IPayslip) => {
        const month = months.find((item) => Number(item.value) === row.month);
        return `${month?.label ?? "-"} ${row.year}`;
      },
    },
    {
      key: "basicSalary",
      title: "Basic Salary",
      className: "text-slate-500",
      render: (row: IPayslip) => formatCurrency(row.basicSalary),
    },
    {
      key: "netSalary",
      title: "Net Salary",
      render: (row: IPayslip) => formatCurrency(row.netSalary),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row: IPayslip) => (
        <a
          href={`/print/payslips/${row.id}`}
          target="_blank"
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-white ring-1 ring-blue-600/10 hover:cursor-pointer transition-transform  active:scale-90"
        >
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
            className="lucide lucide-download w-3 h-3 mr-1.5"
            aria-hidden="true"
          >
            <path d="M12 15V3"></path>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <path d="m7 10 5 5 5-5"></path>
          </svg>
          Download
        </a>
      ),
    },
  ];
  // const payslips: IPayslips[] = [];

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
      {addFormModal && <PayslipsModal close={() => setAddFormModal(false)} />}
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
