import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select, { type SelectOption } from "@/components/Select";
import { employees } from "@/data/employee";
import { months } from "@/data/months";

interface IPayslipsModal {
  close: () => void;
}
const PayslipsModal = ({ close }: IPayslipsModal) => {
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
        <form className="flex flex-col gap-3">
          <div>
            <Select
              options={employeeOptions}
              label="Employee"
              placeholderShow={false}
              id="employee"
            />
          </div>
          <div className="flex justify-between items-center gap-3">
            <Select
              options={months}
              label="Month"
              placeholderShow={false}
              id="month"
            />
            <Input type="number" defaultValue={2026} label="Year" id="year" />
          </div>
          <div>
            <Input
              type="number"
              min={0}
              label="Basic Salary"
              id="basicSalary"
            />
          </div>
          <div className="flex justify-between items-center gap-3">
            <Input type="number" min={0} label="Allowances" id="Allowances" />
            <Input type="number" min={0} label="Deductions" id="Deductions" />
          </div>
          <div></div>
        </form>
      </Modal>
    </div>
  );
};

export default PayslipsModal;
