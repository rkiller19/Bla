import React from 'react'

import { Navbar, Sidebar, StakingCard } from '../../components'
export const Staking = () => {
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
