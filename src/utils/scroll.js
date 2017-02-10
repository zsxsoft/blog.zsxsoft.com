import dynamics from 'dynamics.js'
window.dynamics = dynamics
export const animateToPosition = (to = 0, element = document.documentElement, time = 1000) => {
  dynamics.animate(element, {
    scrollTop: to
  }, {
    type: dynamics.easeIn,
    duration: time
  })
}

export const animateToTop = () => animateToPosition(0)
