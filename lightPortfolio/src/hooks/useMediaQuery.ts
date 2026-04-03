import { useState, useEffect } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    
    // Some older browsers don't support addEventListener on MediaQueryList
    const fn = (e: MediaQueryListEvent) => setMatches(e.matches)
    
    if (mq.addEventListener) {
      mq.addEventListener('change', fn)
    } else {
      mq.addListener(fn)
    }
    
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', fn)
      } else {
        mq.removeListener(fn)
      }
    }
  }, [query])

  return matches
}
