import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEthers, shortenAddress } from '@usedapp/core'
import classnames from 'classnames'

import WalletIcon from '../../assets/wallet-red.png'
import ArrowDown from '../../assets/arrow-down.png'
import { Button } from '../'
import {
  connectionStatus,
  walletIcon,
  accountAddressBlock,
  accountAddress,
  connectButton,
  disconnectButton,
  networksMenu,
  networksMenuHidden,
  networksMenuList,
  networksMenuWrapper,
  networksMenuButton,
  networksMenuArrow,
} from './connectionStatus.module.scss'
import { withWalletConnection } from '../../utils/withWalletConnection'
import { switchNetwork } from '../../utils/switchNetwork'
import NETWORKS from '../../networks.json'
import { supportedChains } from '../../constants'

function NetworkSwitcher({ deactivateWallet }) {
  const { chainId } = useEthers()
  const [menuIsVisible, setMenuIsVidible] = useState(false)

  const menuClassNames = classnames(networksMenu, {
    [networksMenuHidden]: !menuIsVisible,
  })

  return (
    <div className={networksMenuWrapper}>
      <Button
        onClick={() => {
          setMenuIsVidible(!menuIsVisible)
        }}
      >
        {NETWORKS[chainId].name}
        <img className={networksMenuArrow} src={ArrowDown} alt="Select" />
      </Button>
      <div className={menuClassNames}>
        Select network
        <div className={networksMenuList}>
          {supportedChains.map((id) => {
            if (chainId === id) {
              return null
            }

            return (
              <Button
                key={id}
                onClick={() => {
                  switchNetwork(id)
                }}
                className={networksMenuButton}
              >
                {NETWORKS[id].name}
              </Button>
            )
          })}
          <Button onClick={deactivateWallet} className={disconnectButton}>
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  )
}

function ConnectionStatusPure({ activateWallet, deactivateWallet }) {
  const { account, error } = useEthers()

  const isConnected = useSelector((state) => state.connectionReducer)

  const ConnectionResult = () => {
    if (error) {
      return (
        <Button disabled className={connectButton}>
          Error
        </Button>
      )
    }

    if (isConnected && account) {
      return (
        <>
          <div className={accountAddressBlock}>
            <img className={walletIcon} src={WalletIcon} alt="Wallet" />
            <span className={accountAddress}>
              {account && shortenAddress(account)}
            </span>
          </div>
          <NetworkSwitcher deactivateWallet={deactivateWallet} />
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
