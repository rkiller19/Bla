import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { connectionAction } from '../../actions/connectionAction'
import MakeQuerablePromise from '../../utils/querable-promise'

export function ConnectionStatus() {
  const { account, error, deactivate, activateBrowserWallet } = useEthers()

  const dispatch = useDispatch()
  const isConnected = useSelector((state) => state.connectionReducer)

  const activateWallet = async () => {
    const activateBrowserWalletPromise = MakeQuerablePromise(
      activateBrowserWallet(),
    )
    activateBrowserWalletPromise.then(
      function() {
        if (activateBrowserWalletPromise.isFulfilled()) {
          dispatch(connectionAction(true))
        }
      },
      function() {
        /* code if some error */

        dispatch(connectionAction(false))
      },
    )
  }

  const deactivateWallet = () => {
    deactivate()
    dispatch(connectionAction(false))
  }

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
