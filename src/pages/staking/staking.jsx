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
import { MainLayout, StakingCard, Title, Button } from '../../components'
import { withWalletConnection } from '../../utils/withWalletConnection'

const StakingPure = ({ activateWallet }) => {
  const { chainId } = useEthers()
  const isConnected = useSelector((state) => state.connectionReducer)

  const Content = () => {
    if (isConnected) {
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
          <Button onClick={activateWallet}>Connect</Button>
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

export const Staking = withWalletConnection(StakingPure)
