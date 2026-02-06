import { getPricesFromHostConfigAction } from "@/app/actions/admindashboardActions";
import BookingRequest from "./booking-request";

export default async function BookingRequestSection() {
  const { data: prices } = await getPricesFromHostConfigAction();
  return <BookingRequest prices={prices} />;
}
