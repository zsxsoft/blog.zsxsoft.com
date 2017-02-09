import BezierEasing from 'bezier-easing'
export const animateToPosition = (to = 0, element = document.documentElement, time = 1000) => {
  const endFrame = parseInt(time / 60, 10)
  const startFrom = element.scrollTop
  const easing = BezierEasing(0.47, 0, 0.745, 0.715)
  let frame = 0
  const main = () => {
    if (element.scrollTop > to) {
      frame++
      const ret = easing(1 - frame / endFrame)
      element.scrollTop = startFrom * ret + to
      requestAnimationFrame(main)
    }
  }
  requestAnimationFrame(main)
}

export const animateToTop = () => animateToPosition(0)
