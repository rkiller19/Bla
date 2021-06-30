import TokenContractAbi from '../../abi/farming/LPToken.json'
import { utils } from 'ethers'

const abiInterface = new utils.Interface(TokenContractAbi)

export const lpTokenNameContractCall = (contractAddress) => ({
  abi: abiInterface,
  address: contractAddress,
  method: 'name',
})
