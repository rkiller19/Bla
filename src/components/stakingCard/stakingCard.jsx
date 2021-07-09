import React, { useState } from 'react'
import classnames from 'classnames'

import DAO1Logo from '../../assets/white-logo.png'
import ArrowIcon from '../../assets/arrow-down.png'
import {
  card,
  cardHead,
  cardHeadLogo,
  cardLabel,
  cardInfoText,
  cardName,
  cardNameText,
  cardStakingConditions,
  cardStakingConditionsItem,
  cardStakingList,
  cardStakingListEmpty,
  cardStakingItem,
  cardStakingItemHead,
  cardStakingItemInfo,
  cardStakingItemInfoBlock,
  cardStakingItemButtons,
  cardStakingItemDetails,
  cardStakingItemDetailsHide,
  cardStakingItemDetailsRow,
  cardStakingItemDetailsName,
  cardStakingItemDetailsValue,
  cardArrowButton,
  cardArrowButtonActive,
  cardFooter,
  cardTatalStaked,
  cardTatalStakedValue,
  cardButton,
  stakeModal,
  stakeModalTitle,
  stakeModalInput,
} from './stakingCard.module.scss'
import { Button, Modal, Title, Input } from '../'

export function StakingCard({
  name,
  daysAmount,
  yieldPercent,
  stakingHistory,
}) {
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false)
  const [visibleDetailedBlock, setVisibleDetailedBlock] = useState(null)
  const accordionClickHandler = (id) => {
    if (id === visibleDetailedBlock) {
      setVisibleDetailedBlock(null)
      return
    }

    setVisibleDetailedBlock(id)
  }

  const StakingHistory = () =>
    !stakingHistory || stakingHistory.length === 0 ? (
      <div className={cardStakingListEmpty}>Empty! No information</div>
    ) : (
      stakingHistory.map(({ staked, claimed, expires, details }, idx) => {
        const isActive = visibleDetailedBlock === idx
        const hiddenClassNames = classnames(
          cardStakingItemDetails,
          cardStakingItemDetailsHide,
        )
        const detailsClassNames = isActive
          ? cardStakingItemDetails
          : hiddenClassNames
        const activeArrowClassNames = classnames(
          cardArrowButton,
          cardArrowButtonActive,
        )
        const arrowButtonClassnames = isActive
          ? activeArrowClassNames
          : cardArrowButton

        return (
          <div key={idx} className={cardStakingItem}>
            <div className={cardStakingItemHead}>
              <div className={cardStakingItemInfo}>
                <div className={cardStakingItemInfoBlock}>
                  <div className={cardLabel}>DAO1 Staked</div>
                  <div className={cardInfoText}>{staked}</div>
                </div>
                <div className={cardStakingItemInfoBlock}>
                  <div className={cardLabel}>Claimable</div>
                  <div className={cardInfoText}>{claimed}</div>
                </div>
                <div className={cardStakingItemInfoBlock}>
                  <div className={cardLabel}>Expires</div>
                  <div className={cardInfoText}>{expires}</div>
                </div>
              </div>

              <div className={cardStakingItemButtons}>
                <Button className={cardButton}>Claimed</Button>
                <Button className={cardButton} disabled>
                  Unstaked
                </Button>
                <button
                  onClick={() => accordionClickHandler(idx)}
                  className={arrowButtonClassnames}
                >
                  <img src={ArrowIcon} alt="Arrow" />
                </button>
              </div>
            </div>

            <div className={detailsClassNames}>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  Stake Identifier
                </div>
                <div className={cardStakingItemDetailsValue}>
                  {details.identifier}
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>Stake status</div>
                <div className={cardStakingItemDetailsValue}>
                  {details.status}
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  Start date (stake placement)
                </div>
                <div className={cardStakingItemDetailsValue}>
                  {details.start}
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  End date (stake expiration)
                </div>
                <div className={cardStakingItemDetailsValue}>{details.end}</div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>Staked amount</div>
                <div className={cardStakingItemDetailsValue}>
                  {details.amount} DAO1
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  Fee for early (before expire) unstake
                </div>
                <div className={cardStakingItemDetailsValue}>
                  {details.feeForEarlyUnstake}
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  Total yield (for entire period)
                </div>
                <div className={cardStakingItemDetailsValue}>
                  {details.totalYield}
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  Locked yield (releases over time)
                </div>
                <div className={cardStakingItemDetailsValue}>
                  {details.lockedYield} DAO1
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  Released yield (claimed + claimable)
                </div>
                <div className={cardStakingItemDetailsValue}>
                  {details.releasedYield} DAO1
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>Claimed yield</div>
                <div className={cardStakingItemDetailsValue}>
                  {details.claimedYield} DAO1
                </div>
              </div>
              <div className={cardStakingItemDetailsRow}>
                <div className={cardStakingItemDetailsName}>
                  Claimable now (available for withdrawal)
                </div>
                <div className={cardStakingItemDetailsValue}>
                  {details.claimedNow} DAO1
                </div>
              </div>
            </div>
          </div>
        )
      })
    )

  return (
    <>
      <Modal
        isOpen={isStakeModalOpen}
        closeHandler={() => setIsStakeModalOpen(false)}
      >
        <div className={stakeModal}>
          <Title className={stakeModalTitle} level={3}>
            Stake DAO1
          </Title>
          <Input className={stakeModalInput} />
          <Button>Stake</Button>
        </div>
      </Modal>
      <div className={card}>
        <div className={cardHead}>
          <div className={cardHeadLogo}>
            <img src={DAO1Logo} alt="DAO1" />
          </div>
          <div className={cardName}>
            <span className={cardLabel}>Name</span>
            <span className={cardNameText}>{name}</span>
          </div>
        </div>

        <div className={cardStakingConditions}>
          <div className={cardStakingConditionsItem}>
            <div className={cardLabel}>{daysAmount}D yield</div>
            <div className={cardInfoText}>{yieldPercent}%</div>
          </div>
          <div className={cardStakingConditionsItem}>
            <div className={cardLabel}>Daily yield</div>
            <div className={cardInfoText}>0.0516%</div>
          </div>
          <div className={cardStakingConditionsItem}>
            <div className={cardLabel}>APY-{daysAmount}D compound</div>
            <div className={cardInfoText}>20.2%</div>
          </div>
          <div className={cardStakingConditionsItem}>
            <div className={cardLabel}>Duration</div>
            <div className={cardInfoText}>{daysAmount} Days</div>
          </div>
        </div>

        <div className={cardStakingList}>
          <StakingHistory />
        </div>

        <div className={cardFooter}>
          <div className={cardTatalStaked}>
            <div className={cardLabel}>Total Staked:</div>
            <div className={cardTatalStakedValue}>246.246 DAO1</div>
          </div>
          <Button
            onClick={() => setIsStakeModalOpen(true)}
            className={cardButton}
          >
            Stake
          </Button>
        </div>
      </div>
    </>
  )
}
