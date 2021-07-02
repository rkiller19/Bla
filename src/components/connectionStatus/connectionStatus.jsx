import React from 'react'

import WalletIcon from '../../assets/wallet-red.png'
import { Button } from '../'
import {
  connectionStatus,
  walletIcon,
  accountAddress,
  connectButton,
} from './connectionStatus.module.scss'

export function ConnectionStatus() {
  return (
    <div className={connectionStatus}>
      <img className={walletIcon} src={WalletIcon} alt="Wallet" />
      <span className={accountAddress}>0xeFd3...bf3b</span>
      <Button className={connectButton}>Connect Wallet</Button>
    </div>
  )
}
