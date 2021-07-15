import { ethers } from 'ethers'

import FixedStakingAbi from '../../abi/staking/FixedStaking.json'
import {
  signer,
  formatAttoToToken,
  formatTokenToAtto,
} from '../../utils/ether-utilities'
import { formatDate } from '../../utils/formatDate'

export function getContractApi(address) {
  const contract = new ethers.Contract(address, FixedStakingAbi, signer)

  async function getData() {
    try {
      const stakeDurationDays = (await contract.stakeDurationDays()).toNumber()
      const rewardRate = (await contract.rewardRate()).toNumber() / 100
      const address = await signer.getAddress()
      const stakesLength = (await contract.getStakesLength(address)).toNumber()
      const stakes = []
      let totalStaked = ethers.BigNumber.from('0')

      for (let i = 0; i < stakesLength; i++) {
        const stake = await contract.getStake(address, i)
        stakes.push(stake)
      }

      const formatedStakes = stakes.map((stake, idx) => {
        const {
          active,
          endTime,
          harvestableYield,
          harvestedYiels,
          lastHarvestTime,
          stakedAmount,
          startTime,
          totalYield,
        } = {
          active: stake.active,
          endTime: stake.endTime.toString(),
          harvestableYield: formatAttoToToken(stake.harvestableYield),
          harvestedYiels: formatAttoToToken(stake.harvestedYield),
          lastHarvestTime: stake.lastHarvestTime.toString(),
          stakedAmount: formatAttoToToken(stake.stakedAmount),
          startTime: stake.startTime.toString(),
          totalYield: formatAttoToToken(stake.totalYield),
        }
        const lockedYield = formatAttoToToken(
          stake.totalYield.sub(stake.harvestableYield),
        )
        totalStaked = totalStaked.add(stake.stakedAmount)

        const expired = endTime * 1000 < Date.now()

        return {
          active,
          staked: stakedAmount,
          harvestable: harvestableYield,
          allowHarvest: !stake.harvestableYield.isZero(),
          expires: expired ? 'Expired' : formatDate(endTime),
          details: [
            { name: 'Stake Identifier', value: idx },
            { name: 'Stake status', value: active ? 'Active' : 'Not active' },
            {
              name: 'Start date (stake placement)',
              value: formatDate(startTime, true),
            },
            {
              name: 'End date (stake expiration)',
              value: formatDate(endTime, true),
            },
            { name: 'Staked amount', value: stakedAmount },
            {
              name: 'Fee for early (before expire) unstake',
              value: '1.55% or 1.908 DAO1',
            },
            {
              name: 'Total yield (for entire period)',
              value: `1.55% or ${totalYield} DAO1`,
            },
            {
              name: 'Locked yield (releases over time)',
              value: lockedYield,
            },
            { name: 'Released yield (harvest + harvestable)', value: 0.674 },
            { name: 'Harvested yield', value: harvestedYiels },
            {
              name: 'Harvestable now (available for withdrawal)',
              value: harvestableYield,
            },
            {
              name: 'Last harvest time',
              value: formatDate(lastHarvestTime, true),
            },
          ],
        }
      })

      return {
        stakeDurationDays,
        rewardRate,
        totalStaked: formatAttoToToken(totalStaked),
        stakes: formatedStakes,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function stake(amount) {
    try {
      const amountBN = formatTokenToAtto(amount)

      contract.stake(amountBN)
    } catch (error) {
      console.log(error)
    }
  }

  async function unstake(id) {
    try {
      contract.unstake(id)
    } catch (error) {
      console.log(error)
    }
  }

  async function harvest(id) {
    try {
      contract.harvest(id)
    } catch (error) {
      console.log(error)
    }
  }

  return { getData, stake, unstake, harvest }
}
