export interface INavProps {
  className: string
}

// Desktop (4 integer steps)

export const DESKTOP_STEPS = [1, 2, 3, 4]

export const desktopPathToIndexMap: Record<string, number> = {
  '/': 1,
  '/about-1': 2,
  '/projects-1': 3,
  '/contact': 4,
}

export const desktopPageMap: Record<number, string> = {
  1: '/',
  2: '/about-1',
  3: '/projects-1',
  4: '/contact',
}

export const desktopTitleMap: Record<number, string> = {
  1: 'Home',
  2: 'About Me',
  3: 'Projects',
  4: 'Contact Me',
}

// Mobile (6 fractional steps, About/Projects each have 2 sub-pages)

export const MOBILE_STEPS = [1, 1.5, 2, 2.5, 3, 4]

export const mobilePathToIndexMap: Record<string, number> = {
  '/': 1,
  '/about-1': 1.5,
  '/about-2': 2,
  '/projects-1': 2.5,
  '/projects-2': 3,
  '/contact': 4,
}

export const mobilePageMap: Record<number, string> = {
  1: '/',
  1.5: '/about-1',
  2: '/about-2',
  2.5: '/projects-1',
  3: '/projects-2',
  4: '/contact',
}

export const mobileTitleMap: Record<number, string> = {
  1: 'Home',
  1.5: 'About Me Part 1',
  2: 'About Me Part 2',
  2.5: 'Projects Part 1',
  3: 'Projects Part 2',
  4: 'Contact Me',
}

// Shared utility 

export function getNextStep(
  steps: number[],
  current: number,
  direction: 'up' | 'down',
): number {
  const currentIndex = steps.indexOf(current)
  if (currentIndex === -1) return current

  if (direction === 'down' && currentIndex < steps.length - 1) {
    return steps[currentIndex + 1]
  }
  if (direction === 'up' && currentIndex > 0) {
    return steps[currentIndex - 1]
  }

  return current
}
