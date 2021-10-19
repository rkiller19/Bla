function web3Injected(e) {
  return e !== undefined
}

export async function switchToMainnet() {
  if (web3Injected(window.ethereum)) {
    try {
      await window.ethereum.request?.({
        id: 1,
        jsonrpc: '2.0',
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x1',
          },
        ],
      })
    } catch (e) {
      console.warn('switchEthereumChain error', e)
      return []
    }
  }

  console.warn('No web3 injection detected')
  return []
}
