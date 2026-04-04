import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import AdminDashboardClient from "../../components/admin/AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard - UZZYBLOOMING HOMES",
};

export default async function AdminPage() {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Can be ignored if called from a Server Component
          }
        },
      },
    }
  );

  // Fallback to manual cookie mapping if SSR auth tokens are missing
  const token = cookieStore.get("sb-access-token")?.value;
  
  let userId = null;

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    userId = user.id;
  } else if (token) {
    // Basic verification of our manual cookie token sync from sign_in
    const { data: userFromToken } = await supabase.auth.getUser(token);
    if (userFromToken?.user) {
      userId = userFromToken.user.id;
    }
  }

  if (!userId) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || profile?.role !== "admin") {
    redirect("/");
  }

  // Once safely validated, render the client dashboard
  return <AdminDashboardClient />;
}
