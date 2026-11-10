import Button from "@/components/Button";
import FormArea from "@/components/FormArea";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Textarea from "@/components/TextArea";
import { systemRole } from "@/data/systemRole";
import { useAddEmployee } from "@/hooks/useAddEmployee";
import { useUpdateEmployee } from "@/hooks/useUpdateEmployee";
import { formatDate } from "@/utils/AUXFunctions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IEmployeeModal {
  setSelectedEmployee: React.Dispatch<React.SetStateAction<IEmployee | null>>;
  selectedEmployee: IEmployee | null;
  close: () => void;
}

const EmployeeModal = ({
  close,
  selectedEmployee,
  setSelectedEmployee,
}: IEmployeeModal) => {
  const isEditMode = Boolean(selectedEmployee);
  const { register, handleSubmit, reset, watch } = useForm<EmployeeFormData>({
    shouldUnregister: false,
  });
  console.log("Watch:", watch());

  
  const handleClose = () => {
    close();
    setSelectedEmployee(null);
  };

  const { mutate: postEmployee } = useAddEmployee(handleClose);
  const { mutate: putEmployee } = useUpdateEmployee(handleClose);

  const handleEmployeeSubmit = (data: EmployeeFormData) => {

    if (selectedEmployee) {
      // Edit Employee
      const updatedEmployee: IEmployee = {
        ...selectedEmployee,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      putEmployee({
        id: selectedEmployee.id,
        data: updatedEmployee,
      });

    } else {
      // Add Employee
      const newEmployee: IEmployee = {
        ...data,
        id: crypto.randomUUID(),
        _id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
        user: {
          email: data.email,
          role: "EMPLOYEE",
        },
        userId: {
          _id: crypto.randomUUID(),
          email: data.email,
          role: "EMPLOYEE",
        },
        __v: 0,
      };
      postEmployee(newEmployee);

    }
  };

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        allowances: selectedEmployee.allowances,
        basicSalary: selectedEmployee.basicSalary,
        bio: selectedEmployee.bio,
        deductions: selectedEmployee.deductions,
        department: selectedEmployee.department,
        email: selectedEmployee.email,
        employmentStatus: selectedEmployee.employmentStatus,
        firstName: selectedEmployee.firstName,
        joinDate: formatDate(selectedEmployee.joinDate),
        lastName: selectedEmployee.lastName,
        phone: selectedEmployee.phone,
        position: selectedEmployee.position,
      });
    } else {
      reset({
        allowances: 0,
        basicSalary: 0,
        bio: "",
        deductions: 0,
        department: "",
        email: "",
        employmentStatus: "ACTIVE",
        firstName: "",
        joinDate: "",
        lastName: "",
        phone: "",
        position: "",
      });
    }
  }, [selectedEmployee, reset]);

  return (
    <div>
      <Modal
        close={close}
        title={isEditMode ? "Edit Employee" : "Add New Employee"}
        description={
          isEditMode
            ? "Update employee details"
            : "Create a user account and employee profile"
        }
      >
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleEmployeeSubmit)}
        >
          <FormArea title="Personal Information">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                type="text"
                id="firstName"
                label="First Name"
                {...register("firstName")}
                placeholder="First Name"
              />
              <Input
                type="text"
                id="lastName"
                label="Last Name"
                {...register("lastName")}
                placeholder="Last Name"
              />
              <Input
                type="tel"
                id="phone"
                label="Phone Number"
                {...register("phone")}
                placeholder="Phone"
              />
              <Input
                type="date"
                id="joinDate"
                label="Join Date"
                {...register("joinDate")}
              />
            </div>
            <div>
              <Textarea
                label="Bio (Optional)"
                id="bio"
                {...register("bio")}
                placeholder="Brief description..."
              />
            </div>
          </FormArea>
          <FormArea title="Employment Details">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                type="text"
                id="position"
                label="Position"
                {...register("position")}
              />
              <Input
                type="number"
                min={0}
                id="basicSalary"
                label="Basic Salary"
                {...register("basicSalary", { valueAsNumber: true })}
              />
              <Input
                type="number"
                min={0}
                id="allowances"
                label="Allowances"
                {...register("allowances", { valueAsNumber: true })}
              />
              <Input
                type="number"
                min={0}
                id="deductions"
                label="Deductions"
                {...register("deductions", { valueAsNumber: true })}
              />
            </div>
          </FormArea>
          <FormArea title="Account Setup">
            <div>
              <Input
                type="email"
                id="email"
                label="Work Email"
                {...register("email")}
              />
            </div>
            <div className="flex items-center gap-3">
              <Input type="text" id="password" label="Temporary Password" />
              <Select
                label="System Role"
                options={systemRole}
                id="systemRole"
                placeholderShow={false}
              />
            </div>
          </FormArea>
          <div className="mt-5 mb-3 flex gap-3 justify-end items-center">
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update Employee" : "Create Employee"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeModal;
