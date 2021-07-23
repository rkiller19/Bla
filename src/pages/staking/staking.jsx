import React from 'react'
import { useSelector } from 'react-redux'

import {
  connectMessage,
  connectMessageInnerContainer,
  connectMessageInnerContainerTitle,
} from './staking.module.scss'
import { MainLayout, StakingCard, Title, Button } from '../../components'
import { withWalletConnection } from '../../utils/withWalletConnection'

const {
  REACT_APP_FIXED_STAKING_30_ADDRESS: FixedStaking30DaysAddress,
  REACT_APP_FIXED_STAKING_60_ADDRESS: FixedStaking60DaysAddress,
  REACT_APP_FIXED_STAKING_90_ADDRESS: FixedStaking90DaysAddress,
} = process.env

const StakingPure = ({ activateWallet }) => {
  const isConnected = useSelector((state) => state.connectionReducer)

  const Content = () => {
    if (isConnected) {
      return (
        <>
          <div className="col">
            <StakingCard
              name="DAO1 — FIXED 30 DAYS"
              contractAddress={FixedStaking30DaysAddress}
            />
            <StakingCard
              name="DAO1 — FIXED 60 DAYS"
              contractAddress={FixedStaking60DaysAddress}
            />
          </div>
          <div className="col">
            <StakingCard
              name="DAO1 — FIXED 90 DAYS"
              contractAddress={FixedStaking90DaysAddress}
            />
          </div>
        </>
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
