import React from 'react'

import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'

const Staking = () => {
  return (
    <div className="connectWallet">
      <div className="side-nav">
        <Sidebar />
      </div>
      <div className="main">
        <Navbar />
        <div className="card-element">
          <div className="card-content">
            <p>Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Staking
