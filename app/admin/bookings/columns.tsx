"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/database.types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Ghost, MoreVertical } from "lucide-react";

export type BookingRow = Database["public"]["Tables"]["Bookings"]["Row"];
const columnHelper = createColumnHelper<BookingRow>();

export const columns: ColumnDef<BookingRow>[] = [
  columnHelper.display({
    id: "more",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuLabel className="border-b-2 font-bold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem className="">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),

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
    accessorKey: "price_snapshot_host_accepted_in_EURcents",
    header: "Offer Price (euro)",
  },
  {
    accessorKey: "sent_email_2_payment_link_guest",
    header: "Payment link sent to Guest",
  },
  {
    accessorKey: "price_snapshot_guest_payed_in_EURcents",
    header: "Payed Price (euro)",
  },

  {
    accessorKey: "sent_email_3_paymend_confimed_guest",
    header: "Payment confirmation email sent to Guest",
  },
];
