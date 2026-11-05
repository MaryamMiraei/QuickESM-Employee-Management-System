interface ILoginFormData {
  email: string;
  password: string;
}

interface ISigninData {
  email: string;
  password: string;
  role_type: "admin" | "employee";
}

interface IDashboard {
  pendingLeaves: number;
  role: string;
  todayAttendance: number;
  totalDepartments: number;
  totalEmployees: number;
}

interface IEmployee {
  allowances: number;
  basicSalary: number;
  bio: string;
  createdAt: string;
  deductions: number;
  department: string;
  email: string;
  employmentStatus: string;
  firstName: string;
  id: string;
  isDeleted: boolean;
  joinDate: string;
  lastName: string;
  phone: string;
  position: string;
  updatedAt: string;
  user: { email: string; role: string };
  userId: {
    _id: string;
    email: string;
    role: string;
  };
  __v: number;
  _id: string;
}
interface IPayslips {
  id: string;
  employeeId: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}
 interface IPayslip {
  id: string;
  employeeId: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
  } | null;
}

type EmployeeFormData = Pick<
  IEmployee,
  | "allowances"
  | "basicSalary"
  | "bio"
  | "deductions"
  | "department"
  | "email"
  | "employmentStatus"
  | "firstName"
  | "joinDate"
  | "lastName"
  | "phone"
  | "position"
>;