import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  is_visible: boolean;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  tag: string | null;
  is_available: boolean;
  sort_order: number;
  image_url?: string | null;
}

export interface MenuCategoryWithItems extends MenuCategory {
  items: MenuItem[];
}

export const useMenuCategories = (includeHidden = false) => {
  return useQuery({
    queryKey: ['menu-categories', includeHidden],
    queryFn: async () => {
      let query = supabase
        .from('menu_categories')
        .select('*')
        .order('sort_order');
      
      if (!includeHidden) {
        query = query.eq('is_visible', true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as MenuCategory[];
    },
  });
};

export const useMenuItems = (includeUnavailable = false) => {
  return useQuery({
    queryKey: ['menu-items', includeUnavailable],
    queryFn: async () => {
      let query = supabase
        .from('menu_items')
        .select('*')
        .order('sort_order');
      
      if (!includeUnavailable) {
        query = query.eq('is_available', true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as MenuItem[];
    },
  });
};

export const useFullMenu = (isStaff = false) => {
  const categoriesQuery = useMenuCategories(isStaff);
  const itemsQuery = useMenuItems(isStaff);

  const menu: MenuCategoryWithItems[] = (categoriesQuery.data || []).map(category => ({
    ...category,
    items: (itemsQuery.data || []).filter(item => item.category_id === category.id),
  }));

  return {
    menu,
    isLoading: categoriesQuery.isLoading || itemsQuery.isLoading,
    error: categoriesQuery.error || itemsQuery.error,
  };
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MenuItem> }) => {
      const { data, error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
    },
  });
};

export const useUpdateMenuCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MenuCategory> }) => {
      const { data, error } = await supabase
        .from('menu_categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-categories'] });
    },
  });
};
