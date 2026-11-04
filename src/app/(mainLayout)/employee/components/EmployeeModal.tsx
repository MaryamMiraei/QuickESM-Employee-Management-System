import Button from "@/components/Button";
import FormArea from "@/components/FormArea";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Textarea from "@/components/TextArea";
import { systemRole } from "@/data/systemRole";
interface IEmployeeModal {
  close: () => void;
}

const EmployeeModal = ({ close }: IEmployeeModal) => {

  return (
    <div>
      <Modal
        close={close}
        title="Add New Employee"
        description="Create a user account and employee profile"
      >
        <form className="flex flex-col gap-2">
          <FormArea title="Personal Information">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input type="text" id="firstName" label="First Name" />
              <Input type="text" id="lastName" label="Last Name" />
              <Input type="tel" id="phone" label="Phone Number" />
              <Input type="date" id="joinDate" label="Join Date" />
            </div>
            <div>
              <Textarea
                label="Bio (Optional)"
                id="bio"
                placeholder="Brief description..."
              />
            </div>
          </FormArea>
          <FormArea title="Employment Details">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input type="text" id="position" label="Position" />
              <Input
                type="number"
                min={0}
                id="basicSalary"
                label="Basic Salary"
              />
              <Input type="number" min={0} id="allowances" label="Allowances" />
              <Input type="number" min={0} id="deductions" label="Deductions" />
            </div>
          </FormArea>
          <FormArea title="Account Setup">
            <div>
              <Input type="email" id="email" label="Work Email" />
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
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Create Employee</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeModal;
