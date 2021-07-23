import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import equal from 'fast-deep-equal'

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
  loader,
  loaderTxHash,
  buttonMax,
} from './stakingCard.module.scss'
import { Button, Modal, Title, Input, Spinner } from '../'
import { getContractApi } from '../../services/staking/FixedStaking'

export function StakingCard({ name, contractAddress }) {
  const { getData, stake, unstake, harvest, approve } = getContractApi(
    contractAddress,
  )
  const [loading, setLoading] = useState(true)
  const [stakeDurationDays, setStakeDurationDays] = useState(0)
  const [rewardRate, setRewardRate] = useState(0)
  const [stakingHistory, setStakingHistory] = useState([])
  const [totalStaked, setTotalStaked] = useState(0)
  const [tokensBalance, setTokensBalance] = useState(0)
  const [allowance, setAllowance] = useState(0)
  const [stakeAmount, setStakeAmount] = useState('')
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false)
  const [visibleDetailedBlock, setVisibleDetailedBlock] = useState(null)
  const [txHash, setTxHash] = useState('')
  const [allowanceEnough, setAllowanceEnough] = useState(true)

  useEffect(() => {
    getData().then(
      ({
        stakeDurationDays,
        rewardRate,
        stakes,
        totalStaked,
        tokensBalance,
        allowance,
      }) => {
        setLoading(false)
        setStakeDurationDays(stakeDurationDays)
        setRewardRate(rewardRate)
        setStakingHistory(stakes)
        setTotalStaked(totalStaked)
        setTokensBalance(tokensBalance)
        setAllowance(allowance)
      },
    )
  }, [])

  useEffect(() => {
    // Rerender component when stakes data is changed
    const interval = setInterval(() => {
      getData().then(({ stakes, totalStaked }) => {
        if (stakingHistory) {
          for (let i = 0; i < stakes.length; i++) {
            if (!equal(stakes[i], stakingHistory[i])) {
              setStakingHistory(stakes)
              setTotalStaked(totalStaked)
              clearInterval(interval)
              return
            }
          }
        }
      })
    }, 2000)
  }, [stakingHistory])

  useEffect(() => {
    setAllowanceEnough(Number(stakeAmount) <= Number(allowance))
  }, [stakeAmount, allowance])

  const accordionClickHandler = (id) => {
    if (id === visibleDetailedBlock) {
      setVisibleDetailedBlock(null)
      return
    }

    setVisibleDetailedBlock(id)
  }

  const stakeAmountHandler = (e) => {
    e.preventDefault()
    setStakeAmount(e.target.value)
  }

  const stakeHandler = () => {
    setIsStakeModalOpen(false)
    stake(String(stakeAmount))
      .then((tx) => {
        setTxHash(tx.hash)
        setLoading(true)

        tx.wait()
          .then(() => {
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const approveHandler = () => {
    approve()
      .then((tx) => {
        setTxHash(tx.hash)
        setLoading(true)

        tx.wait()
          .then(() => {
            setLoading(false)
            getData().then(({ allowance }) => {
              setAllowance(allowance)
            })
          })
          .catch((err) => {
            setLoading(false)
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const StakingHistory = () =>
    !stakingHistory || stakingHistory.length === 0 ? (
      <div className={cardStakingListEmpty}>Empty! No information</div>
    ) : (
      stakingHistory.map(
        (
          { active, staked, harvestable, allowHarvest, expires, details },
          idx,
        ) => {
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
                    <div className={cardLabel}>Harvestable</div>
                    <div className={cardInfoText}>{harvestable}</div>
                  </div>
                  <div className={cardStakingItemInfoBlock}>
                    <div className={cardLabel}>Expires</div>
                    <div className={cardInfoText}>{expires}</div>
                  </div>
                </div>
                <div className={cardStakingItemButtons}>
                  <Button
                    disabled={!allowHarvest}
                    onClick={() => {
                      allowHarvest &&
                        harvest(idx)
                          .then((tx) => {
                            setTxHash(tx.hash)
                            setLoading(true)

                            tx.wait()
                              .then(() => {
                                setLoading(false)
                              })
                              .catch((err) => {
                                setLoading(false)
                                console.log(err)
                              })
                          })
                          .catch((err) => {
                            console.log(err)
                          })
                    }}
                    className={cardButton}
                  >
                    Harvest
                  </Button>
                  <Button
                    disabled={!active}
                    onClick={() => {
                      active &&
                        unstake(idx)
                          .then((tx) => {
                            setTxHash(tx.hash)
                            setLoading(true)

                            tx.wait()
                              .then(() => {
                                setLoading(false)
                              })
                              .catch((err) => {
                                setLoading(false)
                                console.log(err)
                              })
                          })
                          .catch((err) => {
                            console.log(err)
                          })
                    }}
                    className={cardButton}
                  >
                    Unstake
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
                {details &&
                  details.map(({ name, value }, idx) => (
                    <div key={idx} className={cardStakingItemDetailsRow}>
                      <div className={cardStakingItemDetailsName}>{name}</div>
                      <div className={cardStakingItemDetailsValue}>{value}</div>
                    </div>
                  ))}
              </div>
            </div>
          )
        },
      )
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
          <Input
            onChange={stakeAmountHandler}
            value={stakeAmount}
            className={stakeModalInput}
          />
          <Button
            className={buttonMax}
            onClick={() => {
              setStakeAmount(tokensBalance)
            }}
          >
            Max
          </Button>

          {allowanceEnough ? (
            <Button onClick={stakeHandler}>Stake</Button>
          ) : (
            <Button onClick={approveHandler}>Approve</Button>
          )}
        </div>
      </Modal>
      <div className={card}>
        {loading && (
          <div className={loader}>
            <Spinner />
            <span className={loaderTxHash}>{txHash}</span>
          </div>
        )}
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
            <div className={cardLabel}>{stakeDurationDays}D yield</div>
            <div className={cardInfoText}>{rewardRate}%</div>
          </div>
          <div className={cardStakingConditionsItem}>
            <div className={cardLabel}>Daily yield</div>
            <div className={cardInfoText}>0.0516%</div>
          </div>
          <div className={cardStakingConditionsItem}>
            <div className={cardLabel}>APY-{stakeDurationDays}D compound</div>
            <div className={cardInfoText}>20.2%</div>
          </div>
          <div className={cardStakingConditionsItem}>
            <div className={cardLabel}>Duration</div>
            <div className={cardInfoText}>{stakeDurationDays} Days</div>
          </div>
        </div>

        <div className={cardStakingList}>
          <StakingHistory />
        </div>

        <div className={cardFooter}>
          <div className={cardTatalStaked}>
            <div className={cardLabel}>Total Staked:</div>
            <div className={cardTatalStakedValue}>{totalStaked} DAO1</div>
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
