import { NextResponse } from "next/server";
import { employees } from "@/data/employee";
import { payslips } from "@/data/payslips";

export const GET = async () => {
  const payslipData = payslips.map((payslip) => {
    const employee = employees.find(
      (employee) => employee.id === payslip.employeeId,
    );

    return {
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
  });

  return NextResponse.json(payslipData);
};
