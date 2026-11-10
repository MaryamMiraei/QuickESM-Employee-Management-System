import { getEmployees } from "@/api/employee";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select, { type SelectOption } from "@/components/Select";
import { months } from "@/data/months";
import { useAddPayslip } from "@/hooks/useAddPayslip";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface IPayslipsModal {
  close: () => void;
}
const PayslipsModal = ({ close }: IPayslipsModal) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IPayslip>({
    shouldUnregister: false,
  });
  console.log("Watch:", watch());

  const { mutate: postPayslip } = useAddPayslip(close);
  const onSubmit = (data: IPayslip) => {
    postPayslip(data);
    close();
  };
  const {
    data: employees,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });
  if (isPending) {
    return <p>Loading employees...</p>;
  }

  if (isError) {
    return <p>Failed to load employees.</p>;
  }

  const employeeOptions: SelectOption[] = employees.map((employee) => ({
    label: `${employee.firstName} ${employee.lastName} (${employee.position})`,
    value: employee.id,
  }));

  return (
    <div>
      <Modal
        maxWeight="max-w-lg"
        title="Generate Monthly Payslip"
        description=""
        close={close}
      >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Select
              options={employeeOptions}
              label="Employee"
              id="employee"
              error={errors.employeeId?.message}
              {...register("employeeId", {
                required: "Please select an employee",
              })}
            />
          </div>
          <div className="flex justify-between items-start gap-3">
            <Select
              options={months}
              label="Month"
              id="month"
              error={errors.month?.message}
              {...register("month", {
                required: "Please select month",
                valueAsNumber: true,
              })}
            />
            <Input
              type="number"
              defaultValue={2026}
              label="Year"
              id="year"
              error={errors.year?.message}
              {...register("year", {
                required: "This field is necessary",
                valueAsNumber: true,
              })}
            />
          </div>
          <div>
            <Input
              type="number"
              min={0}
              label="Basic Salary"
              id="basicSalary"
              error={errors.basicSalary?.message}
              {...register("basicSalary", {
                required: "This field is necessary",
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="flex justify-between items-start gap-3">
            <Input
              type="number"
              min={0}
              label="Allowances"
              id="Allowances"
              error={errors.allowances?.message}
              {...register("allowances", {
                required: "This field is necessary",
                valueAsNumber: true,
              })}
            />
            <Input
              type="number"
              min={0}
              label="Deductions"
              id="Deductions"
              error={errors.deductions?.message}
              {...register("deductions", {
                required: "This field is necessary",
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="mt-5 mb-3 flex gap-3 justify-end items-center">
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PayslipsModal;
