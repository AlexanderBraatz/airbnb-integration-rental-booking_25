"use client";

import { Database } from "@/database.types";
import { ColumnDef } from "@tanstack/react-table";

export type BookingRow = Database["public"]["Tables"]["Bookings"]["Row"];

export const columns: ColumnDef<BookingRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "guest_first_name",
    header: "First name",
  },
  {
    accessorKey: "guest_last_name",
    header: "Last name",
  },
  {
    accessorKey: "guest_email",
    header: "Email",
  },
  {
    accessorKey: "guest_phone_number",
    header: "Phone",
  },
  {
    accessorKey: "check_in_date",
    header: "Check-in",
  },
  {
    accessorKey: "check_out_date",
    header: "Check-out",
  },
  {
    accessorKey: "number_of_guests",
    header: "Guests",
  },
  {
    accessorKey: "with_dog",
    header: "With dog",
  },
  {
    accessorKey: "has_agreed_to_policies",
    header: "Agreed to policies",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
  },
];
