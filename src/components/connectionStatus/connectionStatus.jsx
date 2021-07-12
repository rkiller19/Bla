import React from 'react'
import { useSelector } from 'react-redux'
import { useEthers, shortenAddress } from '@usedapp/core'

import WalletIcon from '../../assets/wallet-red.png'
import { Button } from '../'
import {
  connectionStatus,
  walletIcon,
  accountAddressBlock,
  accountAddress,
  connectButton,
} from './connectionStatus.module.scss'
import { withWalletConnection } from '../../utils/withWalletConnection'

function ConnectionStatusPure({ activateWallet, deactivateWallet }) {
  const { account, error } = useEthers()

  const isConnected = useSelector((state) => state.connectionReducer)

  const ConnectionResult = () => {
    if (error) {
      return (
        <Button onClick={activateWallet} className={connectButton}>
          Error
        </Button>
      )
    }

    if (isConnected) {
      return (
        <>
          <div className={accountAddressBlock}>
            <img className={walletIcon} src={WalletIcon} alt="Wallet" />
            <span className={accountAddress}>
              {account && shortenAddress(account)}
            </span>
          </div>
          <Button onClick={deactivateWallet} className={connectButton}>
            Disconnect Wallet
          </Button>
        </>
      )
    }

    return (
      <Button onClick={activateWallet} className={connectButton}>
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className={connectionStatus}>
      <ConnectionResult />
    </div>
  )
}

export const ConnectionStatus = withWalletConnection(ConnectionStatusPure)
