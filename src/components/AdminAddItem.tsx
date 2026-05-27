import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useMenuCategories } from '@/hooks/useMenu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus } from 'lucide-react';

const AdminAddItem = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [saving, setSaving] = useState(false);
  const { data: categories } = useMenuCategories(true);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const reset = () => {
    setCategoryId('');
    setName('');
    setDescription('');
    setPrice('');
    setTag('');
  };

  const handleSave = async () => {
    if (!categoryId || !name.trim() || !price) {
      toast({
        title: 'Campi mancanti',
        description: 'Compila categoria, nome e prezzo.',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const { data: maxRow } = await supabase
        .from('menu_items')
        .select('sort_order')
        .eq('category_id', categoryId)
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle();
      const nextSort = (maxRow?.sort_order ?? -1) + 1;

      const { error } = await supabase.from('menu_items').insert({
        category_id: categoryId,
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        tag: tag.trim() || null,
        is_available: true,
        sort_order: nextSort,
      });
      if (error) throw error;

      toast({ title: 'Piatto aggiunto', description: `${name} è stato aggiunto al menu.` });
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      reset();
      setOpen(false);
    } catch (e) {
      toast({
        title: 'Errore',
        description: e instanceof Error ? e.message : 'Impossibile aggiungere il piatto',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi piatto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuovo piatto</DialogTitle>
          <DialogDescription>
            Compila i dettagli e scegli la categoria in cui inserire il piatto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-name">Nome</Label>
            <Input id="add-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-desc">Descrizione</Label>
            <Textarea
              id="add-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-price">Prezzo (€)</Label>
              <Input
                id="add-price"
                type="number"
                step="0.50"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-tag">Tag (opzionale)</Label>
              <Input
                id="add-tag"
                placeholder="🔥 Piccante"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annulla</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
            ) : 'Aggiungi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddItem;
