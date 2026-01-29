import { getAllBookings } from "@/app/actions/admindashboardActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
        Ein Fehler ist aufgetreten. Sie sind möglicherweise nicht mit dem
        Internet verbunden.
      </p>
      <p>{response.error}</p>
    </div>
  );
}
