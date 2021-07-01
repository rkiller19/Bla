import React from 'react'
import classnames from 'classnames'

import { button, buttonDisabled } from './button.module.scss'

export function Button({ children, type, ...props }) {
  const classNames = classnames(button, {
    [buttonDisabled]: type === 'disabled',
  })

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}
