import { useState, useEffect } from 'react';


/**
 *
 * @param {string} expresion : min-width | max-width | min-height | max-height
 * @param {number} size : >= 0
 * @param {string} [unit = px] : px | em | rem
 *
 */


function useMediaQuery(expresion, size, unit = 'px') {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(${expresion}: ${size}${unit})`);
    const mediaQueryListener = () => setMatch(mediaQuery.matches);

    mediaQuery.addListener(mediaQueryListener);
    mediaQueryListener();

    return () => mediaQuery.removeListener(mediaQueryListener);
  }, []);

  return match;
}


export default useMediaQuery;
