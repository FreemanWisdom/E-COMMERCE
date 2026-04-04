import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
  const res = NextResponse.next();

  // Try Supabase SSR cookie-based auth first
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const protectedPaths = ["/cart", "/checkout", "/dashboard", "/admin"];
  const path = req.nextUrl.pathname;
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));

  if (!isProtectedPath) {
    return res;
  }

  // If Supabase env vars are available, use SSR client for cookie-based auth
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return req.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.cookies.set(name, value, options);
            });
          },
        },
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return res;
      }
    } catch {
      // Fall through to manual cookie check
    }
  }

  // Fallback: check for manually-set access token cookie
  const token =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("sb-placeholder-auth-token");

  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
