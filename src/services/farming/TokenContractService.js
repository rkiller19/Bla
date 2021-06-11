import TokenContractAbi from '../../abi/farming/Token.json'
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'

const abiInterface = new utils.Interface(TokenContractAbi)
const contractAddress = process.env.REACT_APP_DAO1_LP_TOKEN_ADDRESS
export const tokenContract = new Contract("0x2A881131C3F8f825E74757eB5792FA12a162d878", abiInterface)

export const totalStakedContractCall = {
    abi: abiInterface,
    address: contractAddress,
    method: 'balanceOf',
    args: [process.env.REACT_APP_DAO1_FARMING_ADDRESS]
}

export const allowanceContractCall = (walletAddress) => ({
    abi: abiInterface,
    address: "0x2A881131C3F8f825E74757eB5792FA12a162d878",
    method: 'allowance',
    args: [walletAddress, process.env.REACT_APP_DAO1_FARMING_ADDRESS]
})

export const approveAllowanceFunction = 'approve'