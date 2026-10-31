import { NextResponse } from "next/server";

const employees = [
  {
    allowances: 300,
    basicSalary: 30000,
    bio: "",
    createdAt: "2026-04-02T06:42:07.670Z",
    deductions: 299.99,
    department: "Engineer",
    email: "tem1@gmail.com",
    employmentStatus: "ACTIVE",
    firstName: "Maryam",
    id: "69ce0fbfd7c77ea9be93d055",
    isDeleted: false,
    joinDate: "2026-04-02T00:00:00.000Z",
    lastName: "Miraei",
    phone: "7878787878",
    position: "Engineer",
    updatedAt: "2026-04-02T15:30:43.062Z",
    user: { email: "tem1@gmail.com", role: "EMPLOYEE" },
    userId: {
      _id: "69ce0fbfd7c77ea9be93d053",
      email: "tem1@gmail.com",
      role: "EMPLOYEE",
    },
    __v: 0,
    _id: "69ce0fbfd7c77ea9be93d055",
  },
  {
    allowances: 300,
    basicSalary: 30000,
    bio: "",
    createdAt: "2026-04-02T06:42:07.670Z",
    deductions: 299.99,
    department: "Engineer",
    email: "tem1@gmail.com",
    employmentStatus: "ACTIVE",
    firstName: "Pegah",
    id: "69ce0fbfd7c77ea9be93d05",
    isDeleted: false,
    joinDate: "2026-04-02T00:00:00.000Z",
    lastName: "Ashrafi",
    phone: "7878787878",
    position: "Engineer",
    updatedAt: "2026-04-02T15:30:43.062Z",
    user: { email: "tem1@gmail.com", role: "EMPLOYEE" },
    userId: {
      _id: "69ce0fbfd7c77ea9be93d053",
      email: "tem1@gmail.com",
      role: "EMPLOYEE",
    },
    __v: 0,
    _id: "69ce0fbfd7c77ea9be93d05",
  },
];

export const GET = async () => {
  return NextResponse.json(employees);
};
