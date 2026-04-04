"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../../lib/supabase/auth";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Account created! Check your email to confirm, then log in.");
      setTimeout(() => router.push("/auth/login"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pt-32">
      <Toaster position="top-center" toastOptions={{ 
        duration: 4000, 
        style: { borderRadius: '2rem', background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '12px 24px' }
      }} />

      <div className="w-full max-w-lg animate-floatIn">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-12 shadow-3xl border border-gray-100 flex flex-col items-center">
          
          {/* Brand Header */}
          <div className="mb-12 text-center flex flex-col items-center gap-4">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.6em] text-accent-content/60 hover:text-accent transition-all duration-300">
               Uzzyblooming Homes
            </Link>
            <h1 className="font-[var(--font-heading)] text-5xl font-black tracking-tight text-primary leading-none">SIGN UP.</h1>
            <p className="mt-4 text-muted/60 font-light text-sm max-w-[240px]">
               Join the collective and experience a new standard of artisan living.
            </p>
          </div>

          <form onSubmit={handleSignup} className="w-full space-y-6">
            {/* Email Field */}
            <div className="space-y-2 group">
              <label htmlFor="signup-email" className="text-[10px] uppercase font-black tracking-widest text-muted/60 px-6 block group-focus-within:text-primary transition-colors">
                 Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 rounded-full bg-gray-50 border border-transparent px-8 text-sm focus:bg-white focus:border-primary focus:shadow-[0_10px_30px_rgba(0,0,0,0.05)] outline-none transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <label htmlFor="signup-password" className="text-[10px] uppercase font-black tracking-widest text-muted/60 px-6 block group-focus-within:text-primary transition-colors">
                 Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-16 rounded-full bg-gray-50 border border-transparent px-8 text-sm focus:bg-white focus:border-primary focus:shadow-[0_10px_30px_rgba(0,0,0,0.05)] outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-muted/40 hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 3.62 3.62"/><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93l-2-2H4a2 2 0 0 0-2 2Z"/><path d="m2 2 20 20"/><path d="M15 13a3 3 0 0 1-4 4.12"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2 group">
              <label htmlFor="signup-confirm" className="text-[10px] uppercase font-black tracking-widest text-muted/60 px-6 block group-focus-within:text-primary transition-colors">
                 Confirm Password
              </label>
              <input
                id="signup-confirm"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-16 rounded-full bg-gray-50 border border-transparent px-8 text-sm focus:bg-white focus:border-primary focus:shadow-[0_10px_30px_rgba(0,0,0,0.05)] outline-none transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 mt-6 rounded-full bg-primary text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? "CREATING..." : "JOIN NOW."}</span>
              <div className="absolute inset-0 bg-accent translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] uppercase font-black tracking-widest text-muted/40">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-secondary-foreground hover:text-primary underline decoration-accent/30 underline-offset-8 decoration-2 transition-all">
                SIGN IN instead.
              </Link>
            </p>
          </div>
        </div>
        
        {/* Subtle Portfolio Note */}
        <p className="mt-8 text-center text-[10px] font-bold text-primary/20 uppercase tracking-[0.4em]">
           SECURE AUTH POWERED BY SUPABASE
        </p>
      </div>
    </div>
  );
}
