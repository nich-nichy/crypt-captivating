import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function getBalance() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          const balance = await web3.eth.getBalance(accounts[0]);
          setAccount(accounts[0]);
          setBalance(balance.toString());
        } catch (error) {
          console.error(error);
        }
      }
    }
    getBalance();
  }, []);

  return (
    <div>
      <h1>Wallet</h1>
      <p>Account: {account}</p>
      <p>Balance: {Web3.utils.fromWei(balance, "ether")} ETH</p>
    </div>
  );
};

export default Wallet;