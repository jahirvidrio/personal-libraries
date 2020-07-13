import { useState, useEffect, useCallback, useMemo } from 'react';


/**
 *
 * @param {( 'min-width' | 'max-width' | 'min-height' | 'max-height' )} expression Must be a "Media query" expression
 * @param {number} size Must be a positive integer
 * @param {( 'px' | 'em' | 'rem' )} [unitType=px] Must be an unit type of css media queries
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
