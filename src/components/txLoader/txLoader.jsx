import React from 'react'

import { loader, loaderCloseBtn } from './txLoader.module.scss'
import { Spinner, Link } from '../'
import { shortenTxHash } from '../../utils/shortenTxHash'
import NetworksConfig from '../../networks.json'

function TxLink({ txHash, chainId }) {
  if (!txHash) {
    return <></>
  }

  const blockExplorer = NetworksConfig[chainId].blockExplorer
  const link = `${blockExplorer}/${txHash}`

  return (
    <Link className={link} target="_blank" rel="noreferrer" href={link}>
      {shortenTxHash(String(txHash))}
    </Link>
  )
}

export function TxLoader({ txHash, chainId, closeHandler, errorMessage }) {
  const Content = () => {
    if (errorMessage) {
      return <span>{errorMessage}</span>
    }

    if (txHash) {
      return (
        <>
          <span>Tx sent. Waiting for confirmation</span>
          <span>
            View on explorer: <TxLink txHash={txHash} chainId={chainId} />
          </span>
        </>
      )
    }

    return (
      <>
        <span>Waiting For Confirmation</span>
        <span>Confirm this transaction in your wallet</span>
      </>
    )
  }

  return (
    <div className={loader}>
      <button onClick={closeHandler} className={loaderCloseBtn}>
        <span />
        <span />
      </button>

      {!errorMessage && <Spinner />}

      <Content />
    </div>
  )
}
