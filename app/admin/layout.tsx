import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AdminNavbar } from "./admin-navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="bg-background min-h-screen">
      <AdminNavbar userEmail={user.email ?? ""} />
      <main>{children}</main>
    </div>
  );
}
