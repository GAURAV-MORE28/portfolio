/**
 * Single “system narrative” motion language: fast commit, smooth long settle.
 * Use across scroll sections so the journey feels continuous, not chunked.
 */
export const EASE_SYSTEM = [0.22, 0.61, 0.36, 1] as const

/** Snappier — modals, overlays, small UI */
export const EASE_SNAP = [0.4, 0, 0.2, 1] as const

export const DURATION = {
  /** Section titles, first paint of a block */
  narrative: 0.72,
  /** Columns, secondary bands */
  block: 0.58,
  /** Cards, rows, project strips */
  item: 0.5,
  /** Micro (hover hints, overlays) */
  micro: 0.34,
  modal: 0.38,
} as const

/** Slightly early trigger — sections hand off before the viewport feels “empty” */
export const VIEWPORT_NARRATIVE = {
  once: false as const,
  margin: '-18% 0px' as const,
}

/** One-shot blocks (e.g. terminal that should not re-run) */
export const VIEWPORT_ONCE = {
  once: true as const,
  margin: '-18% 0px' as const,
}

/** Stagger between sibling elements in a “pipeline” */
export const DELAY = {
  cascade: 0.14,
  column: 0.1,
  stagger: 0.055,
} as const

/** Vertical offset for direction-aware enter (px) */
export const ENTER_Y = 30

export function enterY(direction: 'up' | 'down', px = ENTER_Y): number {
  return direction === 'down' ? px : -px
}
