import Table from "@/components/Table";

const LeavePage = () => {

  interface ILeave {
    id: number;
    employee: string;
    type: string;
    dates: string;
    reason: string;
    status: string;
  }

  const columns = [
    { key: "employee", title: "Employee" },
    { key: "type", title: "Type" },
    { key: "dates", title: "Dates" },
    { key: "reason", title: "Reason" },
    { key: "status", title: "Status" },
    { key: "actions", title: "Actions" },
  ];
  const leaves: ILeave[] = [];
  
  return (
    <>
      <div className="p-5">
        <header className="ml-15 lg:ml-0 mb-8">
          <h1 className="font-bold text-xl">Leave Management</h1>
          <p className="text-gray-500 text-sm">Manage leave applications</p>
        </header>
        <main>
          <Table
            columns={columns}
            data={leaves}
            rowKey="id"
            emptyMessage="No leave applications found"
          />
   
        </main>
      </div>
    </>
  );
};

export default LeavePage;
