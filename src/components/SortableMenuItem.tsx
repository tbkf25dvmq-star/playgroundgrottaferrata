import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Pencil, Eye, EyeOff, GripVertical } from 'lucide-react';
import type { MenuItem } from '@/hooks/useMenu';

interface Props {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onToggleAvailability: (item: MenuItem) => void;
}

const SortableMenuItem = ({ item, onEdit, onToggleAvailability }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 rounded-lg border ${
        !item.is_available ? 'bg-muted/50 opacity-60' : 'bg-background'
      }`}
    >
      <button
        type="button"
        className="touch-none cursor-grab active:cursor-grabbing p-2 -ml-2 mr-1 text-muted-foreground hover:text-foreground"
        aria-label="Trascina per riordinare"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
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
        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
        <span className="text-sm font-semibold text-primary">
          €{Number(item.price).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
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
            onCheckedChange={() => onToggleAvailability(item)}
          />
        </div>
      </div>
    </div>
  );
};

export default SortableMenuItem;
