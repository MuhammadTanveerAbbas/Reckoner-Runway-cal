import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      
      Object.entries(shortcuts).forEach(([shortcut, callback]) => {
        const [modifier, ...keys] = shortcut.split('+');
        const keyCombo = keys.join('+');
        
        if (modifier === 'ctrl' && ctrl && key === keyCombo) {
          e.preventDefault();
          callback();
        } else if (modifier !== 'ctrl' && key === shortcut) {
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
