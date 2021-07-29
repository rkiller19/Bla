import React from 'react'
import { useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'

import NetworksConfig from '../../networks.json'

import {
  connectMessage,
  connectMessageInnerContainer,
  connectMessageInnerContainerTitle,
  stakingCardsContainer,
} from './staking.module.scss'
import {
  MainLayout,
  StakingCard,
  Title,
  ConnectionStatus,
} from '../../components'

export const Staking = () => {
  const { chainId, error } = useEthers()
  const isConnected = useSelector((state) => state.connectionReducer)

  const Content = () => {
    // if no metamask detected
    if (!window.ethereum) {
      return (
        <div className={connectMessage}>
          <div className={connectMessageInnerContainer}>
            <Title level={6}>
              Please use Metamask app or browser extension
            </Title>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className={connectMessage}>
          <div className={connectMessageInnerContainer}>{String(error)}</div>
        </div>
      )
    }

    if (isConnected && chainId) {
      const tokenContract = NetworksConfig[chainId].tokenContract
      const fixedStakingContracts =
        NetworksConfig[chainId].fixedStakingContracts

      return (
        <div className={stakingCardsContainer}>
          {fixedStakingContracts.map((contractAddress, idx) => (
            <StakingCard
              key={idx}
              contractAddress={contractAddress}
              tokenContract={tokenContract}
            />
          ))}
        </div>
      )
    }

    return (
      <div className={connectMessage}>
        <div className={connectMessageInnerContainer}>
          <Title className={connectMessageInnerContainerTitle} level={3}>
            Please connect wallet
          </Title>
          <ConnectionStatus />
        </div>
      </div>
    )
  }

  return (
    <MainLayout>
      <Content />
    </MainLayout>
  )
}
