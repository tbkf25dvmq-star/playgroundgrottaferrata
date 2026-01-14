-- Add image_url column to menu_items for cocktail photos
ALTER TABLE public.menu_items 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create cocktail categories
INSERT INTO menu_categories (name, icon, sort_order, is_visible)
VALUES 
  ('Analcolici', '🍹', 11, true),
  ('Aperitivo Italiano', '🍊', 12, true),
  ('Contemporary', '🍸', 13, true),
  ('Tropical', '🌴', 14, true)
ON CONFLICT DO NOTHING;