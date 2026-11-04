"use client";
import { getPayslip } from "@/api/payslips";
import Button from "@/components/Button";
import Table, { type IColumn } from "@/components/Table";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const PayslipDownload = () => {
  const params = useParams<{ payslipID: string }>();

  const {
    data: payslip,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["payslip", params.payslipID],
    queryFn: () => getPayslip(params.payslipID),
    enabled: Boolean(params.payslipID),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError || !payslip) {
    return <p>Failed to load payslip</p>;
  }

  interface ISalaryRow {
    id: string;
    description: string;
    amount: number;
    isTotal?: boolean;
  }

  const salaryData: ISalaryRow[] = [
    {
      id: "basicSalary",
      description: "Basic Salary",
      amount: payslip?.basicSalary!,
    },
    {
      id: "allowances",
      description: "Allowances",
      amount: payslip?.allowances!,
    },
    {
      id: "deductions",
      description: "Deductions",
      amount: payslip?.deductions!,
    },
    {
      id: "netSalary",
      description: "Net Salary",
      amount: payslip?.netSalary!,
      isTotal: true,
    },
  ];

  const columns: IColumn<ISalaryRow>[] = [
    {
      key: "description",
      title: "DESCRIPTION",
      render: (row) => (
        <span className={`${row.isTotal ? "font-bold" : ""}`}>
          {row.description}
        </span>
      ),
    },
    {
      key: "amount",
      title: "AMOUNT",
      render: (row) => (
        <span className={`${row.isTotal ? "font-bold text-lg" : ""}`}>
          {row.id === "allowances" && "+"}
          {row.id === "deductions" && "-"}$
          {(row.amount ?? 0).toLocaleString("en-US")}
        </span>
      ),
    },
  ];
  const handlePrint = () => {
    window.print();
  };
  const formatMonth = (month: number) =>
    new Date(2026, month - 1).toLocaleString("en-US", {
      month: "long",
    });

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white animate-fade-in">
      <div className="text-center border-b border-slate-200 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          PAYSLIP
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {formatMonth(payslip.month)} {payslip.year}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            Employee Name
          </p>
          <p className="font-semibold text-slate-900">
            {payslip.employee?.firstName} {payslip.employee?.lastName}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            Position
          </p>
          <p className="font-semibold text-slate-900">
            {payslip.employee?.position}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            Email
          </p>
          <p className="font-semibold text-slate-900">
            {payslip.employee?.email}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            Period
          </p>
          <p className="font-semibold text-slate-900">
            {" "}
            {formatMonth(payslip.month)} {payslip.year}
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 overflow-hidden mb-8">
        <Table
          columns={columns}
          data={salaryData}
          rowKey="id"
          emptyMessage="No salary information found"
        />
      </div>
      <div className="flex justify-center">
        <Button className="print:hidden" onClick={handlePrint}>
          Print Payslip
        </Button>
      </div>
    </div>
  );
};

export default PayslipDownload;
