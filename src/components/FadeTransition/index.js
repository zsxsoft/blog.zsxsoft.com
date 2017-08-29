import './fade.css'

import CSSTransition from 'react-transition-group/CSSTransition'
import React from 'react'

export default ({ children, ...props }) => ( // eslint-disable-line react/prop-types
  <CSSTransition
    {...props}
    timeout={500}
    classNames='fade'
  >
    {children}
  </CSSTransition>
)
