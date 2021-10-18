import React, { useState } from 'react'

import {
  Bridge as BridgeSyled,
  BridgeTitle,
  BridgeCard,
  BridgeCardCol,
  BridgeInputContainer,
  BridgeCardNetworks,
  BridgeCardNetwork,
  BridgeCardLabel,
  BridgeCardLabelName,
  BridgeCardLabelValue,
  BridgeCardNetworkValue,
  BridgeButton,
  BridgeInput,
} from './bridge.module.scss'
import { MainLayout, Title, Button, Input } from '../../components'

const networks = {
  from: { symbol: 'ETH', name: 'Ethereum mainnet' },
  to: { symbol: 'BSC', name: 'Binance Smart Chain' },
}

export function Bridge() {
  const [bridgeValue, setBridgeValue] = useState('')
  const [balance, setBalance] = useState('0')

  const bridgeValueHandler = (e) => {
    e.preventDefault()
    setBridgeValue(e.target.value)
  }

  return (
    <MainLayout title="Bridge">
      <div className={BridgeSyled}>
        <Title level={2} className={BridgeTitle}>
          ETH to BSC bridge
        </Title>
        <div className={BridgeCard}>
          <div className={BridgeCardCol}>
            <div className={BridgeInputContainer}>
              <div className={BridgeCardLabel}>
                <div className={BridgeCardLabelName}>Balance:</div>
                <div className={BridgeCardLabelValue}>{balance}</div>
              </div>
              <Input
                type="text"
                placeholder="Enter amount"
                onChange={bridgeValueHandler}
                value={bridgeValue}
                className={BridgeInput}
              />
            </div>
          </div>

          <div className={BridgeCardCol}>
            <div className={BridgeCardNetworks}>
              <div className={BridgeCardNetwork}>
                <div className={BridgeCardLabel}>
                  <div className={BridgeCardLabelName}>From:</div>
                  <div className={BridgeCardLabelValue}>
                    {networks.from.name}
                  </div>
                </div>
                <div className={BridgeCardNetworkValue}>
                  {networks.from.symbol}
                </div>
              </div>

              <div className={BridgeCardNetwork}>
                <div className={BridgeCardLabel}>
                  <div className={BridgeCardLabelName}>To:</div>
                  <div className={BridgeCardLabelValue}>{networks.to.name}</div>
                </div>
                <div className={BridgeCardNetworkValue}>
                  {networks.to.symbol}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button className={BridgeButton}>Bridge</Button>
      </div>
    </MainLayout>
  )
}
