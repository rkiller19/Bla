import React, { useState, useEffect } from 'react'
import StakeLogo1 from '../assets/Logo.png'
import {errorModalAction, modalAction, unStakeModalAction} from '../actions/modalAction'
import {useDispatch,useSelector} from 'react-redux'
import { BigNumber } from '@ethersproject/bignumber'
import { useContractCalls, useEthers, useTokenBalance, useContractFunction } from '@usedapp/core'
import {farmingContract, poolLengthContractCall, poolInfoContractCall, lpTokenEarnedContractCall, lpTokenStakedContractCall, stakeFarmingTokenFunction, withdrawFarmingTokenFunction} from '../services/farming/FarmingContractService'
import { utils } from 'ethers'
import {harvestingFailed, harvestingInProgress, harvestingSuccess, stakingFailed, stakingInProgress, stakingSucess, unStakingFailed, unStakingInProgress, unStakingSucess} from '../actions/stakingAction'
import FarmingCard from '../components/farmingcard'
import {lpTokenNameContractCall} from '../services/farming/LPTokenContractService'
import {tokenContract, balanceOfTokenContractCall, allowanceContractCall, approveAllowanceFunction} from '../services/farming/TokenContractService'
import StakeAdder from '../components/stakeadder'
import StakeWithdraw from '../components/stakeWithdraw'
import Errorbox from '../components/errorbox'


const Farming = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.modalReducer.title)
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
    const [poolInfoContractAbis, setPoolInfoContractAbis] = useState([])
    const [poolInfoTokenEarnedContractAbis, setPoolInfoTokenEarnedContractAbis] = useState([])
    const [poolInfoTokenStakedContractAbis, setPoolInfoTokenStakedContractAbis] = useState([])
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
        const usdrate = await getUSDRate()
        setUsdRate(usdrate)
    },[])

    const getUSDRateUrl = () =>{
        return "https://api.coingecko.com/api/v3/simple/price?ids=yfdai-finance&vs_currencies=USD"
    }

    const getUSDRate = async () =>{
        const url = getUSDRateUrl();
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData["yfdai-finance"].usd
    }

    const [poolLengthCall, allowanceCall] = useContractCalls([poolLengthContractCall, allowanceContractCall(account)])

    const poolInfoCall = useContractCalls(poolInfoContractAbis)
    const lpTokenNameCall = useContractCalls(tokenNameContractAbis)
    const lpTokenEarnedCall = useContractCalls(poolInfoTokenEarnedContractAbis)
    const lpTokenStakedCall = useContractCalls(poolInfoTokenStakedContractAbis)
    const userBalanceCall = useContractCalls(userBalanceAbis)
    
    console.log("userBalanceCall", userBalanceCall)
    console.log("poolInfoCall",poolInfoCall)
    console.log("lpTokenNameCall",lpTokenNameCall)
    console.log("lpTokenEarnedCall",lpTokenEarnedCall)
    console.log("lpTokenStakedCall",lpTokenStakedCall)

    console.log("allowanceCall", allowanceCall)

    useEffect(() => {
        setPoolCount(poolLengthCall ? parseInt(poolLengthCall[0]._hex) : 0)
        setAllowance(allowanceCall? utils.formatUnits(allowanceCall[0]._hex, 'ether'): 0)
    }, [poolLengthCall, poolInfoCall, lpTokenNameCall,lpTokenEarnedCall,lpTokenStakedCall])

    useEffect(()=>{
        let abiArray = []
        let tokenEarnedArray = []
        let tokenStakedArray = []
        let tokenNameArray = []
        let userBalanceArray = []
        if(poolCount>0){
            for(var i=0; i<poolCount; i++){
                abiArray.push(poolInfoContractCall(i))
                tokenEarnedArray.push(lpTokenEarnedContractCall(i, account))
                tokenStakedArray.push(lpTokenStakedContractCall(i, account))
                if(poolInfoCall.length>0){
                    tokenNameArray.push(lpTokenNameContractCall(poolInfoCall[i].lpToken))
                    userBalanceArray.push(balanceOfTokenContractCall(poolInfoCall[i].lpToken, account))
                }
            }
            setPoolInfoContractAbis(abiArray)
            setPoolInfoTokenEarnedContractAbis(tokenEarnedArray)
            setPoolInfoTokenStakedContractAbis(tokenStakedArray)
            setTokenNameContractAbis(tokenNameArray)
            setUserBalanceAbis(userBalanceArray)
        }
        
    },[poolCount])


    
    const { state:depositSSGTFunctionState, send:depositSSGT } = useContractFunction(farmingContract, stakeFarmingTokenFunction)
    const { state:approveAllowanceFunctionState, send:sendApproveAllowance } = useContractFunction(tokenContract, approveAllowanceFunction)
    const { state:withdrawSSGTFunctionState, send:withdrawSSGT } = useContractFunction(farmingContract, withdrawFarmingTokenFunction)
    const { state:harvestFunctionState, send:harvest} = useContractFunction(farmingContract, withdrawFarmingTokenFunction)
    

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

    const getUserBalance = (id) => {
        return userBalanceCall.length > 0 ? (userBalanceCall[id] ? utils.formatEther(userBalanceCall[id][0]._hex) : 0) : 0
    }

    const getTokenName = (id) => {
        return lpTokenNameCall.length > 0 ? (lpTokenNameCall[id] ? lpTokenNameCall[id][0] : '') : ''
    }

    const getLPTokenStaked = (id) => {
        return lpTokenStakedCall.length>0 ? parseFloat(lpTokenStakedCall[id]) : 0
    }

    const getPoolViews = () =>{
        let poolViews = []
        for(var i=0; i<poolCount; i++){
            poolViews.push(
                <FarmingCard
                    key={i.toString()}
                    title="DAO1"
                    tokenName={getTokenName(i)} 
                    aprRate={aprRate} 
                    totalstaked={parseFloat(totalStaked)} 
                    totalstakers={totalStakers} 
                    ssgtStaked={getLPTokenStaked(i)} 
                    ssgtEarned={parseFloat(ssgtEarned)} 
                    logo={StakeLogo1}
                    isNFTEnabled={false} 
                    allowance = {allowance}
                    walletBalance = {getUserBalance(i)}
                    walletAmount = {walletAmount}
                    usdRate = {usdRate}
                    stake={() => stake(i)}
                    unStake={unStake}
                    updateWalletAmount = {updateWalletAmount}
                    checkAndStakeSSGT = {checkAndStakeSSGT}
                    checkAndUnStakeSSGT = {checkAndUnStakeSSGT}
                    checkAndHarvest = {checkAndHarvest}
                >
            </FarmingCard>)
        }
        return poolViews
    }

    return( 
        <>
           {getPoolViews()}

           {modalStatus === true ? 
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
                : ''}
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