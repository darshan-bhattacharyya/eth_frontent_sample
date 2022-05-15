import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contract from './contract.json'
const abi = contract.abi
const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [greetings, setGreetings] = useState(null);
  const checkWalletIsConnected = () => { 
    const {ethereum} = window;
    if (!ethereum) {
      alert('Install metamask extension')
    } else {
      console.log('Wallet exists') 
    }

  }

  const connectWalletHandler = async () => {
    const {ethereum} = window;
    if (!ethereum) {
      alert('Install metamask extension')
    }
    try{
      const account = await ethereum.request({method:'eth_requestAccounts'});
      console.log("found and account: ", account[0]);
      setCurrentAccount(account[0]);
    } catch(err){
      console.log("error occured while connecting to wallet")
      console.log(err)
    }
   }

   const callContract = async() => {
    const {ethereum} = window;
    if (!ethereum) {
      alert('Install metamask extension')
    }
    try{
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const Greeter = new ethers.Contract(address,abi,signer);

      let greet = await Greeter.greet();
      console.log("Greetings from contract", greet)
      let callCount = await Greeter.getCallCount();
      console.log("Call Count is ", callCount)
    }catch(err) {
      console.log('error while calling smart contract ', err)
    }
   }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler}>
        Connect Wallet
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={callContract}>Call Greete</button>
        <div>
          {connectWalletButton()}
        </div>
        <div>
          <span>{greetings}</span>
        </div>
      </header>
    </div>
  );
}

const callingGreet = (e) => {
  alert('Called Greet')
}

export default App;
