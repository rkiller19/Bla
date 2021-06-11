import FarmingContractAbi from '../../abi/farming/Farming.json'
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'

const abiInterface = new utils.Interface(FarmingContractAbi)
const contractAddress = process.env.REACT_APP_DAO1_FARMING_ADDRESS
export const farmingContract = new Contract(contractAddress, abiInterface)

export const poolLengthContractCall = {
    abi: abiInterface,
    address: contractAddress,
    method: 'poolLength'
}

export const poolInfoContractCall = (poolId) => ({
    abi: abiInterface,
    address: contractAddress,
    method: 'poolInfo',
    args: [poolId]
})

export const lpTokenEarnedContractCall = (poolId, walletAddress) => ({
    abi: abiInterface,
    address: contractAddress,
    method: 'pendingDAO1',
    args: [poolId, walletAddress]
})

export const lpTokenStakedContractCall = (poolId, walletAddress) => ({
    abi: abiInterface,
    address: contractAddress,
    method: 'userInfo',
    args: [poolId, walletAddress]
})

export const stakeFarmingTokenFunction = 'deposit' //while harvesting pass 0 as amount
export const withdrawFarmingTokenFunction = 'withdraw'