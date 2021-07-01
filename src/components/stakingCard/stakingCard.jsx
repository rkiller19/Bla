import React from 'react'

import {
  Card,
  CardHead,
  CardStakingConditions,
  CardStakingList,
  CardFooter,
} from './stakingCard.module.scss'
import { Button } from '../'

export function StakingCard({ title, daysAmount, yieldPercent }) {
  return (
    <div className={Card}>
      <div className={CardHead}>{title}</div>
      <div className={CardStakingConditions}>
        <div>{daysAmount}</div>
        <div>{yieldPercent}</div>
      </div>
      <div className={CardStakingList}>Staking List</div>
      <div className={CardFooter}>
          <Button>Stake</Button>
      </div>
    </div>
  )
}
