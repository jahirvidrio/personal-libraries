import { useState, useEffect, useCallback, useMemo } from 'react';


/**
 *
 * @param {string} expresion min-width | max-width | min-height | max-height
 * @param {number} size must be a positive integer
 * @param {string} [unit = px] px | em | rem
 *
 */


function useMediaQuery(expresion, size, unit = 'px') {
  const [match, setMatch] = useState(false);

  const mediaQuery = useMemo(() => (
    window.matchMedia(`(${expresion}: ${size}${unit})`)
  ), [expresion, size, unit]);

  const mediaQueryListener = useCallback(() => (
    setMatch(mediaQuery.matches)
  ), [mediaQuery]);


  useEffect(() => {
    mediaQuery.addListener(mediaQueryListener);
    mediaQueryListener();

    return () => mediaQuery.removeListener(mediaQueryListener);
  }, [mediaQueryListener, mediaQuery]);

  
  return match;
}


export default useMediaQuery;
