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

  
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(${expression}: ${size}${unitType})`);
    const mediaQueryListener = () => setMatch(mediaQuery.matches);

    mediaQuery.addListener(mediaQueryListener);
    mediaQueryListener();

    return () => mediaQuery.removeListener(mediaQueryListener);
  }, [expression, size, unitType]);


  return match;
}


export default useMediaQuery;
