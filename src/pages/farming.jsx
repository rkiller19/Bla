import React from 'react'
import { useEthers, ChainId } from '@usedapp/core'

import { Navbar, Sidebar } from '../components'
import FarmingView from '../views/farming'
import MaticFarming from '../views/maticfarming'

export const Farming = () => {
  const { chainId } = useEthers()

  const isMaticEnabled = () => {
    return chainId === ChainId.Polygon
  }

  const isEthereumEnabled = () => {
    return chainId === ChainId.Mainnet
  }

  return (
    <div className={'stacking-connected connectWallet'}>
      <div className="side-nav">
        <Sidebar />
      </div>
      <div className="main">
        <Navbar />
        {!isMaticEnabled() && !isEthereumEnabled() ? (
          <div className="card-element">
            <div className="card-content">
              <p>Wrong Network Connected</p>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Currently Farming is only available on Ethereum and Polygon.
                <br /> Kindly switch the network to continue using the app.
              </p>
            </div>
          </div>
        ) : (
          <div className="cards">
            <div className="stake-cards-list">
              {isMaticEnabled() && <MaticFarming />}
              {isEthereumEnabled() && <FarmingView />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
