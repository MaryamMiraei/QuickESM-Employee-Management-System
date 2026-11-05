import { departments } from "@/data/departments";
import { employees } from "@/data/employee";
import { NextResponse } from "next/server";

export const GET = async () => {
  const activeRecords = employees.filter((employee) => !employee.isDeleted);
  const totalEmployees = activeRecords.length;
  const totalDepartments = departments.slice(1,).length;
  // const todayAttendance;
  // const pendingLeaves;

  return NextResponse.json({
    totalEmployees,
    totalDepartments,
  });
};
