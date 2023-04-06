import { useEffect, useRef } from 'react';
import { Lib9cType } from '../types/lib9c';

export function useLib9c() {
  const once = useRef<boolean>(false);
  const module = useRef<Lib9cType>();

  useEffect(() => {
    if (once.current) {
      return;
    }

    (async () => {
      if (!module.current) {
        const lib9c = await import('lib9c-wasm');

        console.log('Booting lib9c-wasm...');
        await lib9c.boot();

        module.current = lib9c;

        console.log('Loaded lib9c-wasm');
      }
    })();

    once.current = true;
  }, []);

  return module.current;
}
