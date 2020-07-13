import { useState, useEffect, useCallback, useMemo } from 'react';


/**
 *
 * @param {string} expression min-width | max-width | min-height | max-height
 * @param {number} size must be a positive integer
 * @param {string} [unitType = px] px | em | rem
 *
 */


function useMediaQuery(expression, size, unitType = 'px') {
  const [match, setMatch] = useState(false);

  const mediaQuery = useMemo(() => (
    window.matchMedia(`(${expression}: ${size}${unitType})`)
  ), [expression, size, unitType]);

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
