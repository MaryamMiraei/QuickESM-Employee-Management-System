import serverApi from "@/lib/serverAPI";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const [{ data: payslips }, { data: employees }] = await Promise.all([
      serverApi.get("/payslips"),
      serverApi.get("/employees"),
    ]);

    const payslipData = payslips.map((payslip: any) => {
      const employee = employees.find(
        (employee: any) => employee.id === payslip.employeeId,
      );

      return {
        ...payslip,
        netSalary:
          payslip.basicSalary + payslip.allowances - payslip.deductions,
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
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch payslips" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { employeeId, basicSalary, allowances, deductions, month, year } =
      body;

    // Validate required fields
    if (
      !employeeId ||
      basicSalary == null ||
      allowances == null ||
      deductions == null
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Check employee existence
    const { data: employee } = await serverApi.get(`/employees/${employeeId}`);

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 },
      );
    }

    // Calculate net salary
    // const netSalary = basicSalary + allowances - deductions;
    

    // Create payslip
    const newPayslip = {
      id: crypto.randomUUID(),
      month,
      year,
      employeeId,
      basicSalary,
      allowances,
      deductions,
      // netSalary,
      createdAt: new Date().toISOString(),
    };

    const { data } = await serverApi.post("/payslips", newPayslip);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create payslip" },
      { status: 500 },
    );
  }
};
