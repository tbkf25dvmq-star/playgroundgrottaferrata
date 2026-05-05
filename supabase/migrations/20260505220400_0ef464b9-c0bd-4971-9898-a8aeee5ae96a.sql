-- Remove menu tables from Realtime publication (Realtime is not used in app)
ALTER PUBLICATION supabase_realtime DROP TABLE public.menu_categories;
ALTER PUBLICATION supabase_realtime DROP TABLE public.menu_items;

-- Revoke direct EXECUTE on has_role from anon/authenticated.
-- It will still work inside RLS policies (evaluated as definer).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;