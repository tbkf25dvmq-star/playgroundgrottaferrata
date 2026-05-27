import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFullMenu, useUpdateMenuItem, useUpdateMenuCategory } from '@/hooks/useMenu';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { LogOut, EyeOff } from 'lucide-react';
import AdminItemEditor from '@/components/AdminItemEditor';
import AdminAddItem from '@/components/AdminAddItem';
import SortableMenuItem from '@/components/SortableMenuItem';
import type { MenuItem } from '@/hooks/useMenu';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isStaff, signOut } = useAuth();
  const { menu, isLoading: menuLoading } = useFullMenu(true);
  const updateItem = useUpdateMenuItem();
  const updateCategory = useUpdateMenuCategory();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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

  const handleDragEnd = async (items: MenuItem[], event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(items, oldIndex, newIndex);
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

  if (!user || !isStaff) return null;

  return (
    <div className="min-h-screen bg-background">
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

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📋</span>
              Gestione Menu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Usa gli switch per nascondere/mostrare piatti. Clicca sulla matita per modificare i dettagli.
                Tieni premuto il pulsante <span className="font-semibold">Sposta</span> a sinistra di un piatto e trascinalo dove preferisci.
            </p>
            <AdminAddItem />
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(category.items, e)}
              >
                <SortableContext
                  items={category.items.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {category.items.map((item) => (
                    <SortableMenuItem
                      key={item.id}
                      item={item}
                      onEdit={setEditingItem}
                      onToggleAvailability={toggleItemAvailability}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        ))}
      </main>

      {editingItem && (
        <AdminItemEditor item={editingItem} onClose={() => setEditingItem(null)} />
      )}
    </div>
  );
};

export default Admin;
