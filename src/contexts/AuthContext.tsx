import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signIn, signOut, signUp } from "../services/auth";
import { type ReactNode, createContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadUser() {
    try {
      const {
        data: { user },
      } = await getCurrentUser();

      setUser(user);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const { data, error } = await signIn(email, password);

    if (error) throw error;

    setUser(data.user);
  }

  async function register(name: string, email: string, password: string) {
    const { data, error } = await signUp(email, password, name);

    if (error) {
      throw error;
    }

    setUser(data.user);
  }

  async function logout() {
    const { error } = await signOut();

    if (error) {
      throw error;
    }

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
