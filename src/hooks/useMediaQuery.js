import { useState, useEffect } from 'react'; // <--- FIX 1: The missing import

export function useMediaQuery(query) {
  // Start with `false`. This will be the value on the server.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // This code only runs on the client (after component mounts)
    const media = window.matchMedia(query);

    // Update state to the correct value on client mount
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Add a listener for window resizing
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', listener);
    
  }, [matches, query]); // Re-run if query or matches state changes

  return matches;
}