import { useEffect, useRef, useState } from 'react';

/**
 * Determines wheter to show or not to show loader
 * At beginning - don't show loader
 * After first timeout, if still loading - showLoader, if not - don't show and return
 * After second timout showLoader is equal to passed isLoading param - when loading is finished - don't show loader
 * @param isLoading - usually query.isLoading
 * @returns showLoader state
 */
const useCheckLoader = (isLoading: boolean | undefined) => {
  const [showLoader, setShowLoader] = useState(false);
  const timeoutPassed = useRef(false);
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  useEffect(() => {
    //second timer fired after 300ms if loading didn't finish eariler
    //sync showLoader and from now second useEffect will sync loading state
    const secondTimer = setTimeout(() => {
      timeoutPassed.current = true;
      setShowLoader(!!isLoadingRef.current);
    }, 300);

    //first timer fired after 100ms
    //if still loading - set loader to true, else means finish loading (clear second timeout )
    const timer = setTimeout(() => {
      if (isLoadingRef.current) {
        setShowLoader(true);
      } else {
        clearTimeout(secondTimer);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeoutPassed.current) {
      setShowLoader(!!isLoading);
    }
  }, [isLoading, timeoutPassed]);

  return showLoader;
};

export default useCheckLoader;
