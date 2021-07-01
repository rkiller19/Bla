import React from 'react'

import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import { StakingCard } from '../components'
const Staking = () => {
  return (
    <div className="connectWallet">
      <div className="side-nav">
        <Sidebar />
      </div>
      <div className="main">
        <Navbar />
        <div className="content">
          <StakingCard title="DAO1" daysAmount="100" yieldPercent="100" />
        </div>
      </div>
    </div>
  )
}

export default Staking
