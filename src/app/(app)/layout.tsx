import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile to check if placement test has been completed
  const { data: profile } = await supabase
    .from("profiles")
    .select("placement_completed")
    .eq("id", user.id)
    .single();

  // New users who haven't taken placement yet → redirect to placement test
  if (profile && !profile.placement_completed) {
    redirect("/placement");
  }

  return <AppShell>{children}</AppShell>;
}
