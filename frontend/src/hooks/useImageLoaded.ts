import { RefObject, useEffect, useRef, useState } from "react";

export const useImageLoaded = (): [
  ref: RefObject<HTMLImageElement> | undefined,
  loaded: boolean,
  onLoad: () => void
] => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  return [ref, loaded, onLoad];
};
