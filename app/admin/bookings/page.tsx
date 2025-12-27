import { getAllBookings } from "@/app/actions/admindashboardActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Database } from "@/database.types";

export default async function DemoPage() {
  const response = await getAllBookings();
  if (response && response.data) {
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={response.data} />
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10">
      <p>
        An Error has occurred, you are probably not cone ted ot the
        internet{" "}
      </p>
      <p>{response.error}</p>
    </div>
  );
}
