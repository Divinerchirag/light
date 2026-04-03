'use client'
import { useEffect } from 'react'

// Sync Lenis scroll position with Framer Motion's scroll tracker
export function useLenisScroll() {
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (!lenis) return

    // Forward Lenis scroll events to native scroll listeners
    // so Framer Motion's useScroll() works correctly
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'))
    })
  }, [])
}

export function LenisScrollSync() {
  useLenisScroll()
  return null
}
