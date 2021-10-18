import React from 'react'
import { useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'

import {
  layout,
  mainSection,
  mainContent,
  connectMessage,
  connectMessageInnerContainer,
  connectMessageInnerContainerTitle,
} from './mainLayout.module.scss'
import { SidebarNew, Header, Title, ConnectionStatus } from '../'

function MainWrap({ title, children }) {
  return (
    <div className={layout}>
      <SidebarNew />
      <section className={mainSection}>
        <Header title={title} />
        <main className={mainContent}>{children}</main>
      </section>
    </div>
  )
}

export function MainLayout({ title, children }) {
  const { chainId, error } = useEthers()
  const isConnected = useSelector((state) => state.connectionReducer)

  // if no metamask detected
  if (!window.ethereum) {
    return (
      <MainWrap title={title}>
        <div className={connectMessage}>
          <div className={connectMessageInnerContainer}>
            <Title level={6}>
              Please use Metamask app or browser extension
            </Title>
          </div>
        </div>
      </MainWrap>
    )
  }

  if (error) {
    return (
      <MainWrap title={title}>
        <div className={connectMessage}>
          <div className={connectMessageInnerContainer}>{String(error)}</div>
        </div>
      </MainWrap>
    )
  }

  if (isConnected && chainId) {
    return <MainWrap title={title}>{children}</MainWrap>
  }

  return (
    <MainWrap title={title}>
      <div className={connectMessage}>
        <div className={connectMessageInnerContainer}>
          <Title className={connectMessageInnerContainerTitle} level={3}>
            Please connect wallet
          </Title>
          <ConnectionStatus />
        </div>
      </div>
    </MainWrap>
  )
}
