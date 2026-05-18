import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFullMenu, useUpdateMenuItem, useUpdateMenuCategory } from '@/hooks/useMenu';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Eye, EyeOff, Pencil, ArrowUp, ArrowDown } from 'lucide-react';
import AdminItemEditor from '@/components/AdminItemEditor';
import { useState } from 'react';
import type { MenuItem } from '@/hooks/useMenu';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isStaff, signOut } = useAuth();
  const { menu, isLoading: menuLoading } = useFullMenu(true);
  const updateItem = useUpdateMenuItem();
  const updateCategory = useUpdateMenuCategory();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    } else if (!authLoading && user && !isStaff) {
      toast({
        title: 'Accesso negato',
        description: 'Non hai i permessi per accedere a questa pagina',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [authLoading, user, isStaff, navigate, toast]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const toggleItemAvailability = async (item: MenuItem) => {
    try {
      await updateItem.mutateAsync({
        id: item.id,
        updates: { is_available: !item.is_available },
      });
      toast({
        title: item.is_available ? 'Piatto nascosto' : 'Piatto visibile',
        description: `${item.name} è ora ${item.is_available ? 'non disponibile' : 'disponibile'}`,
      });
    } catch {
      toast({
        title: 'Errore',
        description: 'Non è stato possibile aggiornare il piatto',
        variant: 'destructive',
      });
    }
  };

  const toggleCategoryVisibility = async (category: { id: string; name: string; is_visible: boolean }) => {
    try {
      await updateCategory.mutateAsync({
        id: category.id,
        updates: { is_visible: !category.is_visible },
      });
      toast({
        title: category.is_visible ? 'Categoria nascosta' : 'Categoria visibile',
        description: `${category.name} è ora ${category.is_visible ? 'nascosta' : 'visibile'}`,
      });
    } catch {
      toast({
        title: 'Errore',
        description: 'Non è stato possibile aggiornare la categoria',
        variant: 'destructive',
      });
    }
  };

  const moveItem = async (items: MenuItem[], index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    // Reorder array
    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    // Normalize sort_order for the whole category so ties don't break ordering
    try {
      await Promise.all(
        reordered.map((it, i) =>
          it.sort_order === i
            ? Promise.resolve(null)
            : updateItem.mutateAsync({ id: it.id, updates: { sort_order: i } })
        )
      );
    } catch {
      toast({
        title: 'Errore',
        description: 'Non è stato possibile riordinare il piatto',
        variant: 'destructive',
      });
    }
  };

  if (authLoading || menuLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!user || !isStaff) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-primary">Pannello Staff</h1>
            <p className="text-sm text-muted-foreground">Playground Grottaferrata</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Esci
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📋</span>
              Gestione Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Usa gli switch per nascondere/mostrare piatti. Clicca sulla matita per modificare dettagli.
            </p>
          </CardContent>
        </Card>

        {menu.map((category) => (
          <Card key={category.id} className={!category.is_visible ? 'opacity-60' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span>{category.icon}</span>
                  {category.name}
                  {!category.is_visible && (
                    <Badge variant="secondary" className="ml-2">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Nascosta
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {category.is_visible ? 'Visibile' : 'Nascosta'}
                  </span>
                  <Switch
                    checked={category.is_visible}
                    onCheckedChange={() => toggleCategoryVisibility(category)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {category.items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    !item.is_available ? 'bg-muted/50 opacity-60' : 'bg-background'
                  }`}
                >
                  <div className="flex flex-col gap-1 mr-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={idx === 0 || updateItem.isPending}
                      onClick={() => moveItem(category.items, idx, -1)}
                      aria-label="Sposta in alto"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      disabled={idx === category.items.length - 1 || updateItem.isPending}
                      onClick={() => moveItem(category.items, idx, 1)}
                      aria-label="Sposta in basso"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {item.tag && (
                        <Badge variant="outline" className="text-xs">
                          {item.tag}
                        </Badge>
                      )}
                      {!item.is_available && (
                        <Badge variant="destructive" className="text-xs">
                          Non disponibile
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                    <span className="text-sm font-semibold text-primary">
                      €{Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingItem(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      {item.is_available ? (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                      <Switch
                        checked={item.is_available}
                        onCheckedChange={() => toggleItemAvailability(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Item Editor Dialog */}
      {editingItem && (
        <AdminItemEditor
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default Admin;
