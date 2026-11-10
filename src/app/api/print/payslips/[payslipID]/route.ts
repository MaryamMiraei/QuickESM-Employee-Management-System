import serverApi from "@/lib/serverAPI";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ payslipID: string }>;
}

export const GET = async (request: Request, { params }: RouteParams) => {
  try {
    const { payslipID } = await params;

    // Get payslip from JSON Server
    const { data: payslip } = await serverApi.get(`/payslips/${payslipID}`);

    if (!payslip) {
      return NextResponse.json(
        { message: "Payslip not found" },
        { status: 404 },
      );
    }

    // Get employee from JSON Server
    const { data: employee } = await serverApi.get(
      `/employees/${payslip.employeeId}`,
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
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "status" in error.response &&
      error.response.status === 404
    ) {
      return NextResponse.json(
        { message: "Payslip not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch payslip" },
      { status: 500 },
    );
  }
};
