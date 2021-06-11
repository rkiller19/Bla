import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import { useEthers } from '@usedapp/core'
import Farming from '../views/farming'
import MaticFarming from '../views/maticfarming'
import {ChainId} from '@usedapp/core'

const Staking = () => {
    const { chainId } = useEthers()

    const isMaticEnabled = () => {
        return chainId === ChainId.Polygon
    }

    const isEthereumEnabled = () => {
        return chainId === ChainId.Mainnet
    }
    
    return(
        <div className="stacking-connected">
            <div className="side-nav">
                <Sidebar></Sidebar>
            </div>
            <div className="main">
                <Navbar></Navbar>
                <div className="cards">
                    {!isMaticEnabled() && !isEthereumEnabled() ?
                     <p className="about-stake-center">Currently Farming is only available on Ethereum and Polygon. Kindly switch the network to continue using the app.</p>:
                     ''
                     }
                    <div className="stake-cards-list">
                        {isMaticEnabled() && <MaticFarming></MaticFarming>}
                        {isEthereumEnabled() && <Farming></Farming>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Staking;