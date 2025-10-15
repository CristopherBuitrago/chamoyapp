import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useOverflowMode<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [overflowing, setOverflowing] = useState(false);

  // Determina si el contenido se desborda horizontalmente
  const measure = () => {
    const el = ref.current;
    if (!el) return;
    setOverflowing(el.scrollWidth > el.clientWidth + 1); // +1 por redondeos
  };

  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Recalcular al redimensionar
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // También observar hijos (ancho de cards)
    Array.from(el.children).forEach((c) => ro.observe(c as Element));

    window.addEventListener("orientationchange", measure);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return { ref, overflowing };
}
