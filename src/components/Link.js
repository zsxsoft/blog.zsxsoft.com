/* eslint-disable */
import * as React from 'react'
import { Link as L } from '../route.js'

const Link = ({
  href = '',
  route,
  params,
  prefetch = false,
  shallow = false,
  scroll = false,
  replace = false,
  as = '',
  children,
  ...props }) => (

  <L route={route} params={params} href={href} prefetch={prefetch} shallow={shallow} scroll={scroll} replace={replace} as={as}>
    <a {...props}>{children}</a>
  </L>

)

export default Link
