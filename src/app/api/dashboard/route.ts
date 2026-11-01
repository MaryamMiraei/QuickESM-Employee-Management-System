import { employees } from "@/data/employee";
import { NextResponse } from "next/server";


export const GET = async () => {
  const activeRecords = employees.filter((employee) => !employee.isDeleted);
  const totalEmployees = activeRecords.length;

  return NextResponse.json({
    totalEmployees,
  });
};
