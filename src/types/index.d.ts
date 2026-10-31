
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