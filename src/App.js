import './App.css';
import { Button } from 'antd';
import Web3 from 'web3';
import ABI from './abi.json';
import { useRef } from 'react';
function App() {
  const bankContractRef = useRef();
  const addressRef = useRef();
  const connectWallect = async() => {
    const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
    console.log("ACCOUNTS",accounts);
    addressRef.current = accounts[0];
    const web3 = new Web3(window.web3.currentProvider);
    const bankContract = new web3.eth.Contract(ABI,"0xb2f0D02BA1c4414Bc959592CA4f0a1A324eC98DE");
    console.log("bankContract",bankContract);
    bankContractRef.current = bankContract;
  }

  const getMyDesposits = async() => {
    const deposit = await bankContractRef.current.methods.myBalance().call({from:addressRef.current});
    console.log("deposit",deposit);
  }

  const deposit = async() => {
    await bankContractRef.current.methods.depositeds(1).send({from:addressRef.current});
  
  }

  const withdraw = async() => {
    await bankContractRef.current.methods.withDraw(1).send({from:addressRef.current});
  }

  const transfer = async() => {
    await bankContractRef.current.methods.bankTransfer("0x832f267bD7E74f910174BB262a704c1C2D556709",1).send({from:addressRef.current});
  }
  
  return (
    <div className="App">
       <Button onClick={connectWallect}>连接钱包</Button>
       <Button onClick={getMyDesposits}>查询存款</Button>
       <Button onClick={deposit}>存款</Button>
       <Button onClick={withdraw}>取款</Button>
       <Button onClick={transfer}>转账</Button>
    </div>
  );
}

export default App;
