import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ConnectWallet = () => {
  const [accounts, setAccounts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getAccounts() {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          setAccounts(accounts);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getAccounts();
  }, []);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setAccounts(accounts);
        router.push("/components/items"); // Navigate to dashboard page
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {accounts.length > 0 ? (
        <p>Connected with MetaMask: {accounts[0]}</p>
      ) : (
        <button onClick={handleConnectWallet}>Connect with MetaMask</button>
      )}
    </div>
  );
};

export default ConnectWallet;
