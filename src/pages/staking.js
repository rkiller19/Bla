import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import { useEthers } from '@usedapp/core'
import Farming from '../views/farming'

const Staking = () => {
    const { chainId } = useEthers()
    
    return(
        <div className="stacking-connected">
            <div className="side-nav">
                <Sidebar></Sidebar>
            </div>
            <div className="main">
                <Navbar></Navbar>
                <div className="cards">
                    <div className="stake-cards-list">
                        <Farming></Farming>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Staking;