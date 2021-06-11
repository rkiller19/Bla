import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import { useEthers } from '@usedapp/core'
import Farming from '../views/farming'

const Staking = () => {
    const { chainId } = useEthers()
    
    const isSSGTEnabled = () => {
        return chainId === Number(process.env.REACT_APP_SSGT_ALLOWED_NETWORK)
    }

    const isYFDAIEnabled = () => {
        return chainId === Number(process.env.REACT_APP_YDFAI_ALLOWED_NETWORK)
    }

    return(
        <div className="stacking-connected">
            <div className="side-nav">
                <Sidebar></Sidebar>
            </div>
            <div className="main">
                <Navbar></Navbar>
                <div className="cards">
                    {!isSSGTEnabled() && !isYFDAIEnabled() ?
                     <p className="about-stake-center">Currently Staking is only available on Mainnet and Matic. Kindly switch the network to continue using the app.</p>:
                     <p className="about-stake">Stake {isYFDAIEnabled() && 'YFDAI'} {isSSGTEnabled() && 'SSGT'} to earn new tokens. You can unstake at any time. Rewards are calculated per block.</p> 
                     }
                    <div className="stake-cards-list">
                        <Farming></Farming>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Staking;