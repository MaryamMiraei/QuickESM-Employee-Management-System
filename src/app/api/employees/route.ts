import { employees } from "@/data/employee";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const department = request.nextUrl.searchParams.get("department");

  const filteredEmployees = department
    ? employees.filter((employee) => employee.department === department)
    : employees;

  return NextResponse.json(filteredEmployees);
};
