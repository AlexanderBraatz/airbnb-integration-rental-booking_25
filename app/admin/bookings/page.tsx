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
      <p>AN Error has occured </p>
      <p>{response.error}</p>
    </div>
  );
}
