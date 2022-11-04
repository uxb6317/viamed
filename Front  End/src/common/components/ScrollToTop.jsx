import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* 
  Scroll to top fix when use navigates between pages.
*/

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
