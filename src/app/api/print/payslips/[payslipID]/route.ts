import { employees } from "@/data/employee";
import { payslips } from "@/data/payslips";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ payslipID: string }>;
}

export const GET = async ( request_:Request,{ params }: RouteParams) => {
  const { payslipID} = await params;

  const payslip = payslips.find((payslip) => payslip.id === payslipID);

  if (!payslip) {
    return NextResponse.json({ message: "Payslip not found" }, { status: 404 });
  }

  const employee = employees.find(
    (employee) => employee.id === payslip.employeeId,
  );

  const payslipData = {
    ...payslip,
    netSalary: payslip.basicSalary + payslip.allowances - payslip.deductions,
    employee: employee
      ? {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          department: employee.department,
          position: employee.position,
        }
      : null,
  };

  return NextResponse.json(payslipData);
};
