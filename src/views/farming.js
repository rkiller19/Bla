import React, { useState, useEffect } from 'react'
import StakeLogo1 from '../assets/Logo.png'
import {errorModalAction, modalAction, unStakeModalAction} from '../actions/modalAction'
import {useDispatch,useSelector} from 'react-redux'
import { BigNumber } from '@ethersproject/bignumber'
import { useContractCall, useContractCalls, useEthers, useTokenBalance, useContractFunction } from '@usedapp/core'
import {farmingAbiInterface, lpTokenEarnedContractCall, lpTokenStakedContractCall, stakeFarmingTokenFunction, withdrawFarmingTokenFunction, harvestFarmingTokenFunction} from '../services/farming/FarmingContractService'
import { utils } from 'ethers'
import {harvestingFailed, harvestingInProgress, harvestingSuccess, stakingFailed, stakingInProgress, stakingSucess, unStakingFailed, unStakingInProgress, unStakingSucess} from '../actions/stakingAction'
import FarmingCard from '../components/farmingcard'
import {lpTokenNameContractCall} from '../services/farming/LPTokenContractService'
import {tokenContract, balanceOfTokenContractCall, allowanceContractCall, approveAllowanceFunction} from '../services/farming/TokenContractService'
import StakeAdder from '../components/stakeadder'
import StakeWithdraw from '../components/stakeWithdraw'
import Errorbox from '../components/errorbox'
import { Contract } from '@ethersproject/contracts'

const Farming = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.modalReducer.title)

    /* Elements for Pool 1 */
    const [tokenStaked1, setTokenStaked1] = useState(0)
    const [tokenEarned1, setTokenEarned1] = useState(0)
    const [tokenDao1, setTokenDao1] = useState(0)
    const [tokenUSDT1, setTokenUSDT1] = useState(0)

    const { account } = useEthers()
    const [poolCount, setPoolCount] = useState(0)
    const [aprRate, setAprRate] = useState(0)
    const [totalStakers, setTotalStakers] = useState(0)
    const [totalStaked, setTotalStaked] = useState(0)
    const [ssgtStaked, setSsgtStaked] = useState(0)
    const [ssgtEarned, setSsgtEarned] = useState(0)
    const [allowance, setAllowance] = useState(0)
    const [walletBalance, setWalletBalance] = useState(0)
    const [walletAmount, setWalletAmount] = useState('')
    const [usdRate, setUsdRate] = useState(0)
    const [usdDAO1Rate, setUsdDAO1Rate] = useState(0)
    const [usdUSDTRate, setUsdUSDTRate] = useState(0)
    const [poolInfoContractAbis, setPoolInfoContractAbis] = useState([])
    const [lpTokenEarnedContractAbis, setLpTokenEarnedContractAbis] = useState([])
    const [lpTokenStakedContractAbis, setLpTokenStakedContractAbis] = useState([])
    const [tokenNameContractAbis, setTokenNameContractAbis] = useState([])
    const [poolInfo, setPoolInfo] = useState([])
    const [tokenName, setTokenName] = useState('')
    const [userBalanceAbis, setUserBalanceAbis] = useState([])
    const modalStatus = useSelector((state) => state.modalReducer.value);
    const unStakeModalStatus = useSelector((state) => state.modalReducer.unStakeModal);
    const errorModalStatus = useSelector((state) => state.modalReducer.errorModal);
    const errorModalMessage = useSelector((state) => state.modalReducer.title);
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const formatToPercentage = (rewardRateValue) => {
        return (rewardRateValue / 100).toFixed(2).replace(/[.,]00$/, "")
    }

    const stake = (id) =>{
        setSelectedIndex(id)
        dispatch(modalAction(true, "DAO1"))
    }
    const unStake = () => {
        setSelectedIndex(-1)
        dispatch(unStakeModalAction(true,"DAO1"))
    }

    const userBalance = useTokenBalance("0x2A881131C3F8f825E74757eB5792FA12a162d878", account)
    
    useEffect(() => {
        console.log("userBalance", userBalance)
        setWalletBalance(!!userBalance ? Math.round(utils.formatEther(userBalance)) : 0)
    },[userBalance])

    useEffect(async () => {
        
        const usddao1rate = await getDAO1USDRate()
        const usdusdtrate = await getUSDTUSDRate()
        setUsdDAO1Rate(usddao1rate)
        setUsdUSDTRate(usdusdtrate)

        //const usdrate = await getUSDRate()
        //setUsdRate(usdrate)
    },[])

    const getUSDRateUrl = () =>{
        return "https://api.coingecko.com/api/v3/simple/price?ids=yfdai-finance&vs_currencies=USD"
    }

    const getDAO1USDRateURL = () => {
        return "https://api.coingecko.com/api/v3/simple/price?ids=DAO1&vs_currencies=USD"
    }

    const getUSDTUSDRateURL = () => {
        return "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=USD"
    }

    const getDAO1USDRate = async () =>{
        const url = getDAO1USDRateURL();
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData["dao1"].usd
    }

    const getUSDTUSDRate = async () =>{
        const url = getUSDTUSDRateURL();
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData["tether"].usd
    }

    const getUSDRate = async () =>{
        const url = getUSDRateUrl();
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData["yfdai-finance"].usd
    }

    useEffect(()=>{
        let lpTokenEarnedArray = []
        lpTokenEarnedArray.push(lpTokenEarnedContractCall(process.env.REACT_APP_DAO1_FARMING_ADDRESS,account))
        setLpTokenEarnedContractAbis(lpTokenEarnedArray)

        let lpTokenStakedArray = []
        lpTokenStakedArray.push(lpTokenStakedContractCall(process.env.REACT_APP_DAO1_FARMING_ADDRESS,account))
        setLpTokenStakedContractAbis(lpTokenStakedArray)

    },[])
    
    const lpTokenEarnedCall = useContractCalls(lpTokenEarnedContractAbis)
    const lpTokenStakedCall = useContractCalls(lpTokenStakedContractAbis)
    const balanceOfLPDAO1TokenCall = useContractCall(balanceOfTokenContractCall(process.env.REACT_APP_DAO1_MATIC_ADDRESS, process.env.REACT_APP_DAO1_USDT_LP_MATIC_ADDRESS))
    const balanceOfLPUSDTTokenCall = useContractCall(balanceOfTokenContractCall(process.env.REACT_APP_USDT_MATIC_ADDRESS, process.env.REACT_APP_DAO1_USDT_LP_MATIC_ADDRESS))
    
    console.log("balanceOfLPDAO1TokenCall", balanceOfLPDAO1TokenCall)
    console.log("balanceOfLPUSDTTokenCall", balanceOfLPUSDTTokenCall)

    useEffect(() => {
        setTokenEarned1(lpTokenEarnedCall.length>0 ? (lpTokenEarnedCall[0] ? parseFloat(lpTokenEarnedCall[0][0]._hex) : 0) : 0)
        setTokenStaked1(lpTokenStakedCall.length>0 ? (lpTokenStakedCall[0] ? parseFloat(lpTokenStakedCall[0][0]._hex) : 0) : 0)
        setTokenDao1(balanceOfLPDAO1TokenCall ? utils.formatUnits(balanceOfLPDAO1TokenCall[0]._hex, 18) : 0)
        setTokenUSDT1(balanceOfLPUSDTTokenCall ? utils.formatUnits(balanceOfLPUSDTTokenCall[0]._hex, 18) : 0)
    }, [lpTokenEarnedCall,lpTokenStakedCall, balanceOfLPDAO1TokenCall, balanceOfLPUSDTTokenCall])

    /*console.log("lpTokenEarnedCall",lpTokenEarnedCall[0])
    console.log("lpTokenStakedCall",lpTokenStakedCall)
    console.log("tokenEarned1",tokenEarned1)
    console.log("tokenStaked1",tokenStaked1)
    */
   
    console.log("tokenUSDT1", tokenUSDT1)
    console.log("tokenDao1", tokenDao1)
    const farmingContract1 = new Contract(process.env.REACT_APP_DAO1_FARMING_ADDRESS, farmingAbiInterface)


    const { state:depositSSGTFunctionState, send:depositSSGT } = useContractFunction(farmingContract1, stakeFarmingTokenFunction)
    const { state:approveAllowanceFunctionState, send:sendApproveAllowance } = useContractFunction(tokenContract, approveAllowanceFunction)
    const { state:withdrawSSGTFunctionState, send:withdrawSSGT } = useContractFunction(farmingContract1, withdrawFarmingTokenFunction)
    const { state:harvestFunctionState, send:harvest} = useContractFunction(farmingContract1, withdrawFarmingTokenFunction)
    

    const updateWalletAmount = (inputAmount) => {
        console.log("inputAmount", inputAmount)
        setWalletAmount(inputAmount)
    }

    const checkAndUnStakeSSGT = () => {
        if(walletAmount>0){
            dispatch(unStakeModalAction(false, selector))
            dispatch(unStakingInProgress())
            withdrawSSGT(1, utils.parseUnits(walletAmount, 18))
        }
    }

    useEffect(() => {
        console.log(withdrawSSGTFunctionState)
        if(withdrawSSGTFunctionState && withdrawSSGTFunctionState.status == "Success"){
            setWalletAmount('')
            dispatch(unStakingSucess())
        }else if(withdrawSSGTFunctionState && withdrawSSGTFunctionState.status == "Exception"){
            setWalletAmount('')
            dispatch(unStakingFailed())
            dispatch(errorModalAction(true, withdrawSSGTFunctionState.errorMessage))
        }
    },[withdrawSSGTFunctionState])

    const checkAndStakeSSGT = () => {
        // Check allowance, if allowance > 0 && < entered amount then proceed
        if(walletAmount <= walletBalance){
            if (parseFloat(allowance) > 0 && parseFloat(allowance) > walletAmount){
                dispatch(stakingInProgress())
                dispatch(modalAction(false, selector))
                stakeSSGT()
            }
            else{
                // Else call approve allowance
                dispatch(stakingInProgress())
                dispatch(modalAction(false, selector))
                sendApproveAllowance(process.env.REACT_APP_DAO1_FARMING_ADDRESS, BigNumber.from(2).pow(256).sub(1))
            }
        }
        else{
            // Show error to user
        }
    }

    const stakeSSGT = () => {
        console.log(utils.parseUnits(walletAmount, 18))
        depositSSGT(1, utils.parseUnits(walletAmount, 18))
    }

    useEffect(() => {
        // handle state
        console.log(approveAllowanceFunctionState)
        if(approveAllowanceFunctionState && approveAllowanceFunctionState.status == "Success"){
            stakeSSGT()
        }else if(approveAllowanceFunctionState && approveAllowanceFunctionState.status == "Exception"){
            setWalletAmount('')
            dispatch(stakingFailed())
            dispatch(errorModalAction(true, approveAllowanceFunctionState.errorMessage))
        }
    },[approveAllowanceFunctionState])

    useEffect(() => {
        // handle state
        console.log(depositSSGTFunctionState)
        if(depositSSGTFunctionState && depositSSGTFunctionState.status == "Success"){
            setWalletAmount('')
            dispatch(stakingSucess())
        }else if(depositSSGTFunctionState && depositSSGTFunctionState.status == "Exception"){
            setWalletAmount('')
            dispatch(stakingFailed())
            dispatch(errorModalAction(true, depositSSGTFunctionState.errorMessage))
        }
    },[depositSSGTFunctionState])

    const checkAndHarvest = () => {
        console.log("checkAndHarvest")
        dispatch(harvestingInProgress())
        harvest()
    }

    useEffect(() => {
        // handle state
        console.log(harvestFunctionState)
        if(harvestFunctionState && harvestFunctionState.status == "Success"){
            dispatch(harvestingSuccess())
        }else if(harvestFunctionState && harvestFunctionState.status == "Exception"){
            setWalletAmount('')
            dispatch(harvestingFailed())
            dispatch(errorModalAction(true, harvestFunctionState.errorMessage))
        }
    },[harvestFunctionState])

    const renderPool1 = () => {
        return <FarmingCard
            title="DAO1"
            tokenName="USDT" 
            aprRate={12.00} 
            totalstaked={parseFloat(totalStaked)} 
            totalstakers={totalStakers} 
            tokenStaked={tokenStaked1} 
            tokenEarned={tokenEarned1} 
            logo={StakeLogo1}
            isNFTEnabled={false} 
            allowance = {allowance}
            walletBalance = {totalStakers}
            walletAmount = {walletAmount}
            usdRate = {usdRate}
            usdDAO1Rate = {usdDAO1Rate}
            usdUSDTRate = {usdUSDTRate}
            tokenDao1 = {tokenDao1}
            tokenUSDT1 = {tokenUSDT1}
            stake={stake}
            unStake={unStake}
            updateWalletAmount = {updateWalletAmount}
            checkAndStakeSSGT = {checkAndStakeSSGT}
            checkAndUnStakeSSGT = {checkAndUnStakeSSGT}
            checkAndHarvest = {checkAndHarvest}
            >
        </FarmingCard>
    }

    return( 
        <>
            {renderPool1()}
            {/*renderPool2()*/}
            {/*renderPool3()*/}

           {/*modalStatus === true ? 
                <StakeAdder 
                    title="DAO1"
                    tokenName={getTokenName(selectedIndex)}
                    logo={StakeLogo1}
                    allowance={allowance}
                    walletBalance={getUserBalance(selectedIndex)}
                    walletAmount={walletAmount}
                    updateWalletAmount={updateWalletAmount}
                    checkAndStakeSSGT={checkAndStakeSSGT}
                    >
                </StakeAdder> 
           : ''*/}
            {/*unStakeModalStatus === true ? 
                <StakeWithdraw 
                    title={props.title} 
                    logo={props.logo} 
                    ssgtStaked={props.ssgtStaked}
                    walletAmount={props.walletAmount}
                    updateWalletAmount={props.updateWalletAmount} 
                    checkAndUnStakeSSGT={props.checkAndUnStakeSSGT}
            /> : ''*/}
            {errorModalStatus === true? <Errorbox errorMessage={errorModalMessage}></Errorbox>: ''}
        </>
    )
}

export default Farming;