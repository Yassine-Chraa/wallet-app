import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { injected } from "../hook/connector";
import { Button } from 'react-bootstrap';


function ConnectWallet() {
  const {  activate,active } = useWeb3React();


  const connect = async () => {
    await activate(injected)
  };
  return ( 
    <Button onClick={connect} style={{backgroundColor: 'transparent',border:'unset',color: active?'#C6DE41':'red'}}>
      {!active ? 'Connect your wallet' : 'Connected'}
    </Button>
  );
}

export default ConnectWallet