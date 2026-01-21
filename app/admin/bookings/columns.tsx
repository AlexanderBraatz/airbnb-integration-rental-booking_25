"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/database.types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  Users,
  Dog,
  Euro,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export type BookingRow = Database["public"]["Tables"]["Bookings"]["Row"];
const columnHelper = createColumnHelper<BookingRow>();

// Helper function to format dates
const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  });
};

// Helper function to format currency
const formatCurrency = (cents: number | null) => {
  if (cents === null || cents === undefined) return "-";
  return `€${(cents / 100).toFixed(2)}`;
};

export const columns: ColumnDef<BookingRow>[] = [
  columnHelper.display({
    id: "more",
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant={"ghost"} size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuLabel className="border-b font-semibold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          ID
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <span className="font-mono text-xs text-gray-600">#{id}</span>;
    },
  },
  {
    accessorKey: "guest_first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          Guest Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName = row.getValue("guest_first_name") as string;
      const lastName = row.original.guest_last_name;
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
            {firstName?.[0]}{lastName?.[0]}
          </div>
          <span className="font-medium text-gray-900">
            {firstName} {lastName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "guest_email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("guest_email") as string;
      return (
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "guest_phone_number",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("guest_phone_number") as string;
      return phone ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{phone}</span>
        </div>
      ) : (
        <span className="text-gray-400 text-sm">-</span>
      );
    },
  },
  {
    accessorKey: "check_in_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          Check-in
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("check_in_date") as string;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">{formatDate(date)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "check_out_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          Check-out
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("check_out_date") as string;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-red-600" />
          <span className="text-sm font-medium">{formatDate(date)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "number_of_guests",
    header: "Guests",
    cell: ({ row }) => {
      const guests = row.getValue("number_of_guests") as number;
      return (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{guests}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "with_dog",
    header: "Pet",
    cell: ({ row }) => {
      const withDog = row.getValue("with_dog") as boolean;
      return withDog ? (
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <Dog className="h-3 w-3" />
          Yes
        </Badge>
      ) : (
        <Badge variant="outline" className="text-gray-500 border-gray-300">
          No
        </Badge>
      );
    },
  },
  {
    accessorKey: "price_snapshot_host_accepted_in_EURcents",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          Offer Price
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price_snapshot_host_accepted_in_EURcents") as number;
      return (
        <div className="flex items-center gap-1 font-semibold text-gray-900">
          <Euro className="h-4 w-4 text-gray-400" />
          {formatCurrency(price)}
        </div>
      );
    },
  },
  {
    accessorKey: "sent_email_2_payment_link_guest",
    header: "Payment Link",
    cell: ({ row }) => {
      const sent = row.getValue("sent_email_2_payment_link_guest") as boolean;
      return sent ? (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
          <CheckCircle2 className="h-3 w-3" />
          Sent
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    },
  },
  {
    accessorKey: "price_snapshot_guest_payed_in_EURcents",
    header: "Paid Amount",
    cell: ({ row }) => {
      const paid = row.getValue("price_snapshot_guest_payed_in_EURcents") as number;
      const hasPaid = paid !== null && paid > 0;
      return (
        <div className="flex items-center gap-2">
          {hasPaid ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-700">
                {formatCurrency(paid)}
              </span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">Not paid</span>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "sent_email_3_paymend_confimed_guest",
    header: "Confirmation",
    cell: ({ row }) => {
      const sent = row.getValue("sent_email_3_paymend_confimed_guest") as boolean;
      return sent ? (
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle2 className="h-3 w-3" />
          Confirmed
        </Badge>
      ) : (
        <Badge variant="outline" className="text-gray-500 border-gray-300">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    },
  },
];
