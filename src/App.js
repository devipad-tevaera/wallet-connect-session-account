import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import ConnectButton from './components/ConnetWallet'
import Home from './components/Home'

// 1. Get projectId
const projectId = '40b632d5a27b4c387fda596a501c60a7'

// 2. Set chains
const zkSyncSepolia = {
  chainId: 300,
  name: 'zkSync Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.explorer.zksync.io/',
  rpcUrl: 'https://sepolia.era.zksync.dev'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: window.location.origin, // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [zkSyncSepolia],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function App() {
  return <>
    <ConnectButton />
    <Home/>
  </>
}