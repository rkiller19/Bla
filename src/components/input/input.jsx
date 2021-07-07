import React from 'react'

import { input } from './input.module.scss'

export function Input({ ...props }) {
  return <input className={input} {...props} />
}
