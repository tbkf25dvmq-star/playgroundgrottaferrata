import { useState } from 'react';
import { useUpdateMenuItem, MenuItem } from '@/hooks/useMenu';
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
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AdminItemEditorProps {
  item: MenuItem;
  onClose: () => void;
}

const AdminItemEditor = ({ item, onClose }: AdminItemEditorProps) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price.toString());
  const [tag, setTag] = useState(item.tag || '');
  const updateItem = useUpdateMenuItem();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await updateItem.mutateAsync({
        id: item.id,
        updates: {
          name,
          description,
          price: parseFloat(price),
          tag: tag || null,
        },
      });
      toast({
        title: 'Salvato',
        description: `${name} è stato aggiornato`,
      });
      onClose();
    } catch {
      toast({
        title: 'Errore',
        description: 'Non è stato possibile salvare le modifiche',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifica piatto</DialogTitle>
          <DialogDescription>
            Modifica i dettagli del piatto. Le modifiche saranno visibili immediatamente.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prezzo (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.50"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tag">Tag (opzionale)</Label>
              <Input
                id="tag"
                placeholder="🔥 Piccante"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annulla
          </Button>
          <Button onClick={handleSave} disabled={updateItem.isPending}>
            {updateItem.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvataggio...
              </>
            ) : (
              'Salva'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminItemEditor;
