import { useCallback, useEffect, useState } from "react";

export const clampResizableValue = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type UseResizablePanelOptions = {
  defaultValue: number;
  min: number;
  max: number;
  storageKey: string;
};

export function useResizablePanel({
  defaultValue,
  min,
  max,
  storageKey,
}: UseResizablePanelOptions) {
  const [value, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return clampResizableValue(defaultValue, min, max);
    }

    const storedValue = window.localStorage.getItem(storageKey);
    if (!storedValue) {
      return clampResizableValue(defaultValue, min, max);
    }

    const parsedValue = Number(storedValue);
    if (!Number.isFinite(parsedValue)) {
      return clampResizableValue(defaultValue, min, max);
    }

    return clampResizableValue(parsedValue, min, max);
  });

  const setValue = useCallback(
    (nextValue: number) => {
      setStoredValue(clampResizableValue(nextValue, min, max));
    },
    [max, min],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      String(clampResizableValue(value, min, max)),
    );
  }, [max, min, storageKey, value]);

  return { value, setValue };
}
