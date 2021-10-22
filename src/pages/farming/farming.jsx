import React from 'react'
import { useEthers, ChainId } from '@usedapp/core'

import { MainLayout, CardsContainer } from '../../components'
import FarmingView from '../../views/farming'
import MaticFarming from '../../views/maticfarming'

export const Farming = () => {
  const { chainId } = useEthers()

  const isMaticEnabled = () => {
    return chainId === ChainId.Polygon
  }

  const isEthereumEnabled = () => {
    return chainId === ChainId.Mainnet
  }

  return (
    <MainLayout title="Farming">
      <CardsContainer>
        {isEthereumEnabled() && <FarmingView />}
        {isMaticEnabled() && <MaticFarming />}
      </CardsContainer>
    </MainLayout>
  )
}
