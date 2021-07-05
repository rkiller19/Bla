import React from 'react'

import { MainLayout, StakingCard } from '../../components'

const datiledStakingFakeData = [
  {
    staked: '0.0',
    claimed: '0.0',
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
    staked: 0.0,
    claimed: 0.0,
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
    staked: 0.0,
    claimed: 0.0,
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
  return (
    <MainLayout>
      <StakingCard
        name="DAO1 — FIXED 30 DAYS"
        daysAmount={30}
        yieldPercent={1.55}
        stakingHistory={datiledStakingFakeData}
      />
    </MainLayout>
  )
}
