import React from 'react'

import { h1, h2, h3, h4, h5, h6 } from './title.module.scss'

export function Title({ level, children }) {
  let TitleTag
  let className

  switch (level) {
    case 1:
      TitleTag = 'h1'
      className = h1
      break
    case 2:
      TitleTag = 'h2'
      className = h2
      break
    case 3:
      TitleTag = 'h3'
      className = h3
      break
    case 4:
      TitleTag = 'h4'
      className = h4
      break
    case 5:
      TitleTag = 'h5'
      className = h5
      break
    case 6:
      TitleTag = 'h6'
      className = h6
      break
    default:
      TitleTag = 'span'
  }
  return <TitleTag className={className}>{children}</TitleTag>
}
