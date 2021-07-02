import React from 'react'

import { header } from './header.module.scss'
import { Title, ConnectionStatus } from '../'

export function Header() {
  return (
    <header className={header}>
      <Title level={1}>Staking</Title>
      <ConnectionStatus>Disconnect Wallet</ConnectionStatus>
    </header>
  )
}
