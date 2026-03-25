import { useEffect, useRef, useState } from 'react';
import { usePdfBuilder } from '../context/PdfBuilderContext';

const AUTOSAVE_KEY_PREFIX = 'hcp_pdf_builder_save_';

export function useAutosave() {
  const { rootComponents, originator, loadPayload } = usePdfBuilder();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isInitialLoad = useRef(true);

  // Load from localStorage on mount
  useEffect(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith(AUTOSAVE_KEY_PREFIX));
    if (keys.length > 0) {
      // Get the most recent one (sorted by key string which is ISO date)
      const latestKey = keys.sort().reverse()[0];
      const savedData = localStorage.getItem(latestKey);
      
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          loadPayload({
            originator: parsed.originator,
            components: parsed.rootComponents.map((c: any) => c.dto) // buildWrappedTree expects raw DTOs
          });
          setLastSaved(new Date(latestKey.replace(AUTOSAVE_KEY_PREFIX, '')));
          console.log('Restored from autosave:', latestKey);
        } catch (e) {
          console.error('Failed to parse autosave data', e);
        }
      }
    }
    isInitialLoad.current = false;
  }, []);

  // Save to localStorage whenever components or originator change
  useEffect(() => {
    if (isInitialLoad.current) return;

    const timeoutId = setTimeout(() => {
      const now = new Date();
      const isoDate = now.toISOString();
      const key = `${AUTOSAVE_KEY_PREFIX}${isoDate}`;
      
      const dataToSave = {
        rootComponents,
        originator,
        timestamp: isoDate
      };

      // Remove old saves before adding new one
      Object.keys(localStorage)
        .filter(k => k.startsWith(AUTOSAVE_KEY_PREFIX))
        .forEach(k => localStorage.removeItem(k));

      localStorage.setItem(key, JSON.stringify(dataToSave));
      setLastSaved(now);
    }, 1000); // 1s debounce

    return () => clearTimeout(timeoutId);
  }, [rootComponents, originator]);

  const clearAutosave = () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith(AUTOSAVE_KEY_PREFIX))
      .forEach(k => localStorage.removeItem(k));
    setLastSaved(null);
    // Also clear the builder state
    loadPayload({ originator: 'hurst', components: [] });
  };

  return { lastSaved, clearAutosave };
}
