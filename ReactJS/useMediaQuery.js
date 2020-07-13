import { useState, useEffect } from 'react';


function useMediaQuery(mediaQueryString) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mediaQueryString);

    function mediaQueryListener() {
      setMatch(mediaQuery.matches);
    }

    mediaQuery.addListener(mediaQueryListener);
    mediaQueryListener();

    return () => mediaQuery.removeEventListener(mediaQueryListener);
  }, []);

  return match;
}


export default useMediaQuery;
