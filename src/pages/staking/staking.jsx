import React from 'react'
import { useEthers } from '@usedapp/core'

import NetworksConfig from '../../networks.json'

import { stakingCardsContainer } from './staking.module.scss'
import { MainLayout, StakingCard } from '../../components'

export const Staking = () => {
  const { chainId } = useEthers()

  const Content = () => {
    if (chainId) {
      const tokenContract = NetworksConfig[chainId].tokenContract
      const fixedStakingContracts =
        NetworksConfig[chainId].fixedStakingContracts

      return (
        <div className={stakingCardsContainer}>
          {fixedStakingContracts.map(({ address, APY }) => (
            <StakingCard
              key={address}
              APY={APY}
              contractAddress={address}
              tokenContract={tokenContract}
            />
          ))}
        </div>
      )
    }
  }

  return (
    <MainLayout title="Staking">
      <Content />
    </MainLayout>
  )
}
