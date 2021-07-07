import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'

import {
  connectMessage,
  connectMessageInnerContainer,
  connectMessageInnerContainerTitle,
} from './staking.module.scss'
import { MainLayout, StakingCard, Title, Button } from '../../components'
import { connectionAction } from '../../actions/connectionAction'
import MakeQuerablePromise from '../../utils/querable-promise'

const datiledStakingFakeData = [
  {
    staked: 0,
    claimed: 0,
    expires: 'Expired',
    details: {
      identifier: 2,
      status: 'Active',
      start: '10 Jun 2021 00:12 UTC',
      end: '10 Jul 2021 00:12 UTC',
      amount: 123.123,
      feeForEarlyUnstake: '1.55% or 1.908 DAO1',
      totalYield: '1.55% or 1.908 DAO1',
      lockedYield: 1.234,
      releasedYield: 0.674,
      claimedYield: 0.673,
      claimedNow: 0.001,
    },
  },
  {
    staked: 0,
    claimed: 0.0001,
    expires: '10 Jul 2021',
    details: {
      identifier: 2,
      status: 'Active',
      start: '10 Jun 2021 00:12 UTC',
      end: '10 Jul 2021 00:12 UTC',
      amount: 123.123,
      feeForEarlyUnstake: '1.55% or 1.908 DAO1',
      totalYield: '1.55% or 1.908 DAO1',
      lockedYield: 1.234,
      releasedYield: 0.674,
      claimedYield: 0.673,
      claimedNow: 0.001,
    },
  },
  {
    staked: 123.123,
    claimed: 0.0001,
    expires: 'Expired',
    details: {
      identifier: 2,
      status: 'Active',
      start: '10 Jun 2021 00:12 UTC',
      end: '10 Jul 2021 00:12 UTC',
      amount: 123.123,
      feeForEarlyUnstake: '1.55% or 1.908 DAO1',
      totalYield: '1.55% or 1.908 DAO1',
      lockedYield: 1.234,
      releasedYield: 0.674,
      claimedYield: 0.673,
      claimedNow: 0.001,
    },
  },
]

export const Staking = () => {
  const { activateBrowserWallet } = useEthers()
  const isConnected = useSelector((state) => state.connectionReducer)
  const dispatch = useDispatch()

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

  const Content = () => {
    if (isConnected) {
      return (
        <>
          <div className="col">
            <StakingCard
              name="DAO1 — FIXED 30 DAYS"
              daysAmount={30}
              yieldPercent={1.55}
              stakingHistory={datiledStakingFakeData}
            />
            <StakingCard
              name="DAO1 — FIXED 60 DAYS"
              daysAmount={60}
              yieldPercent={4.5}
              stakingHistory={[]}
            />
          </div>
          <div className="col">
            <StakingCard
              name="DAO1 — FIXED 60 DAYS"
              daysAmount={60}
              yieldPercent={4.5}
              stakingHistory={[]}
            />
            <StakingCard
              name="DAO1 — FIXED 90 DAYS"
              daysAmount={90}
              yieldPercent={11.05}
              stakingHistory={datiledStakingFakeData}
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
