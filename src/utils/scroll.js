import dynamics from 'dynamics.js'
window.dynamics = dynamics
export const animateToPosition = (to = 0, elementArgument = null, time = 1000) => {
  let element = null
  if (elementArgument === null) {
    if (document.body.scrollTop > 0) element = document.body
    else {
      /* if (document.documentElement.scrollTop > 0) */
      element = document.documentElement
    }
  }
  dynamics.animate(element, {
    scrollTop: to
  }, {
    type: dynamics.easeIn,
    duration: time
  })
}
export const animateToTop = () => animateToPosition(0)
