export function smoothScrollTo(targetId: string) {
  const lenis = (window as any).__lenis
  const el = document.getElementById(targetId)
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, {
      offset: -80,        // account for fixed navbar height
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    // Fallback
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
