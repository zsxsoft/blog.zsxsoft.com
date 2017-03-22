import dynamics from 'dynamics.js'

export const getElementPosition = (element) => {
  let el = element
  for (var lx = 0, ly = 0; el !== null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx, y: ly}
}

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
