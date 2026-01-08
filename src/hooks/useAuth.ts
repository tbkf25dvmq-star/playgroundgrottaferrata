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

  const fetchUserRole = async (userId: string) => {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();
    return roleData?.role as AppRole | null;
  };

  useEffect(() => {
    let isMounted = true;

    // Get initial session first
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!isMounted) return;

      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        if (isMounted) {
          setAuthState({
            user: session.user,
            session,
            isLoading: false,
            role,
          });
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();

    // Then set up listener for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          // Use setTimeout to avoid blocking the auth state change
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            if (isMounted) {
              setAuthState({
                user: session.user,
                session,
                isLoading: false,
                role,
              });
            }
          }, 0);
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

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
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
