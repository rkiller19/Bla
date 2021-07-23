import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, DAppProvider, MULTICALL_ADDRESSES } from '@usedapp/core'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './sass/index.scss'
import { App } from './App'
import { rootReducer } from './reducers'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const config = {
  readOnlyUrls: {
    [ChainId.Localhost]: 'https://farm-staging.dao1.org/rpc-ganache',
  },
  multicallAddresses: {
    [ChainId.Localhost]: 'https://farm-staging.dao1.org/rpc-ganache',
    ...MULTICALL_ADDRESSES,
  },
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Rinkeby,
    ChainId.Polygon,
    ChainId.Mumbai,
    ChainId.Localhost,
  ],
}

ReactDOM.render(
  <Provider store={store}>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </Provider>,
  document.getElementById('root'),
)
