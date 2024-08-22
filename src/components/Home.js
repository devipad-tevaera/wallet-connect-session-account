import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import {  Contract, formatUnits, parseUnits } from "ethers";
import {BrowserProvider} from "zksync-ethers"
import { useState } from "react";

const USDTAddress = "0xCa69ddD4B29CcEF0af4bF7a3d80caa70741255d6";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
const Home = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [balance, setBalance] = useState()
  const [walletAddress, setWalletAddress] = useState()

  async function getBalance() {
    try {
      if (!isConnected) throw Error("User disconnected");
  
      const ethersProvider = new BrowserProvider(walletProvider);
      console.log(ethersProvider,"provider");
      const signer = await ethersProvider.getSigner();
      console.log(signer, "signer", address);

    // The Contract object
    const USDTContract = new Contract(USDTAddress, USDTAbi, signer);
      const USDTBalance = await USDTContract.balanceOf(address);
      console.log(USDTBalance,"check");
  
      console.log(formatUnits(USDTBalance, 18));
      setBalance(Number(formatUnits(USDTBalance, 18)))
    } catch (error) {
      console.log(error);
    }
  }

  async function transferTokens(e){
    e.preventDefault();
    try {
        if (!isConnected) throw Error("User disconnected");

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    
    // The Contract object
    const USDTContract = new Contract(USDTAddress, USDTAbi, signer);

    const tx = await USDTContract.transfer(walletAddress, parseUnits("1"));
    await tx.wait();

    await getBalance();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      {address && <h2>ChainId: {chainId}</h2>}
      <button onClick={getBalance}>Get User Balance</button>
      <div>
        Balance: {balance} TT
      </div>
      <div style={{marginTop:"20px", padding:"20px"}}>
        <h3>Transfer Funds</h3>
        <div style={{marginBlock:"20px"}}>
            <input style={{width:"180px", marginBlock:"20px"}} placeholder="Paste your wallet Address" onChange={(e)=> setWalletAddress(e.target.value)} />
            <button onClick={transferTokens}>Transfer</button>
        </div>
      </div>
    </>
  );
};

export default Home;
