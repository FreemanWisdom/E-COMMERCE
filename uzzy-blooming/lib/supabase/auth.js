import { supabase } from "./client";

/**
 * Sign up a new user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {{ data: object|null, error: string|null }}
 */
export async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "An unexpected error occurred during sign up." };
  }
}

/**
 * Sign in an existing user with email and password.
 * Sets the access-token cookie for middleware route protection.
 * @param {string} email
 * @param {string} password
 * @returns {{ data: object|null, error: string|null }}
 */
export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    // Sync session token into a cookie so Next.js middleware can read it
    if (data.session) {
      document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=3600; SameSite=Lax`;
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message || "An unexpected error occurred during sign in." };
  }
}

/**
 * Sign out the current user and clear the session cookie.
 * @returns {{ error: string|null }}
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    // Always clear cookie regardless of error
    document.cookie =
      "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (err) {
    return { error: err.message || "An unexpected error occurred during sign out." };
  }
}

/**
 * Get the currently authenticated user (server-validated).
 * @returns {{ user: object|null, error: string|null }}
 */
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: user ?? null, error: null };
  } catch (err) {
    return { user: null, error: err.message || "Failed to retrieve user." };
  }
}

/**
 * Get the current session (client-side, from local storage).
 * @returns {{ session: object|null, error: string|null }}
 */
export async function getSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return { session: null, error: error.message };
    }

    return { session: session ?? null, error: null };
  } catch (err) {
    return { session: null, error: err.message || "Failed to retrieve session." };
  }
}

/**
 * Subscribe to auth state changes.
 * @param {function} callback - Called with (event, session)
 * @returns {{ unsubscribe: function }}
 */
export function onAuthStateChange(callback) {
  const { data: listener } = supabase.auth.onAuthStateChange(callback);
  return {
    unsubscribe: () => listener?.subscription?.unsubscribe(),
  };
}
