import React from "react";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { Button, Card, Container, FormControl } from "react-bootstrap";
import ConnectWallet from "./ConnectWallet";
import profile from "../assets/ethereum-currency-main.jpg";
//FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
//Sweet Alert & Loading
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

//privat key
const privatKey =
  "55457a98f48d9b211285a2122195c5f43f2f5b1a18581bf05d66dbc2738c09b0";
function Info() {
  const { active, account, chainId } = useWeb3React();
  const [addressTo, setAddressTo] = useState();
  const [value, setValue] = useState();
  const [sending, setSending] = useState(false);

  function useBalance() {
    const { account, library } = useWeb3React();
    const [balance, setBalance] = useState();

    useEffect(() => {
      if (account) {
        library.getBalance(account).then((val) => setBalance(val));
      }
    }, [balance, account, library]);

    return balance ? `${formatEther(balance)} ETH` : null;
  }
  const balance = useBalance();

  const deploy = async () => {
    console.log(
      `Attempting to make transaction from ${account} to ${addressTo}`
    );
    setSending(true);
    let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
    const createTransaction = await web3.eth.accounts.signTransaction(
      {
        from: account,
        to: addressTo,
        value: Web3.utils.toWei(value, "ether"),
        gas: "21000",
      },
      privatKey
    );

    // Deploy transaction
    const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
    );
    setSending(false);
    setAddressTo("");
    setValue("");
    Swal.fire({
      title: "Transaction successful",
      icon: "success",
    });
  };

  function copieAddress() {
    navigator.clipboard.writeText(account);
    Swal.fire({
      title: "Copied",
      icon: "success",
    });
  }
  return (
    <Container>
      <Card className="wallet-card">
        {chainId ? (
          <span className="network-type">
            {chainId === 1 ? "MainNet" : "TestNet"}
          </span>
        ) : null}
        <Card.Body>
          <div style={{ textAlign: "center" }}>
            <img
              src={profile}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{ borderRadius: "50%" }}
            />
            {active ? (
              <p style={{ color: "rgb(183 158 160)" }}>
                {account + " "}
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={faCopy}
                  onClick={copieAddress}
                  title="Copy"
                />
              </p>
            ) : null}
          </div>
          <Card.Title
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Available Balance</span> <ConnectWallet />
          </Card.Title>

          <Card.Text>
            <span style={{ fontSize: 32 }}>{balance}</span>
          </Card.Text>
        </Card.Body>
      </Card>
      {active ? (
        <div className="transaction">
          <div style={{ marginTop: 16 }}>
            <FormControl
              placeholder="Public address(0x)"
              value={addressTo}
              onChange={(e) => setAddressTo(e.target.value)}
            />
            <FormControl
              placeholder="Value of ETH"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ marginTop: 12 }}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Button
              style={{ paddingLeft: 16, paddingRight: 16 }}
              onClick={deploy}
            >
              Send Ether
            </Button>
          </div>
          {sending ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <ReactLoading
                type="spinningBubbles"
                color="#333"
                height={50}
                width={40}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </Container>
  );
}

export default Info;
