import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export type AppRole = 'admin' | 'staff';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  role: AppRole | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    role: null,
  });

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        
        if (user) {
          // Fetch user role
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();
          
          setAuthState({
            user,
            session,
            isLoading: false,
            role: roleData?.role as AppRole | null,
          });
        } else {
          setAuthState({
            user: null,
            session: null,
            isLoading: false,
            role: null,
          });
        }
      }
    );

    // Then get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      
      if (user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setAuthState({
          user,
          session,
          isLoading: false,
          role: roleData?.role as AppRole | null,
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const isStaff = authState.role === 'staff' || authState.role === 'admin';
  const isAdmin = authState.role === 'admin';

  return {
    ...authState,
    signIn,
    signOut,
    isStaff,
    isAdmin,
  };
};
