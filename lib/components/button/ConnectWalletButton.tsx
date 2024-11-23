"use client";
import { useCallback, useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

import PrimaryButton from "./PrimaryButton";

const ConnectWalletButton = () => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const onSignIn = useCallback(async () => {
    if (!address) {
      localStorage.removeItem("wallteconnet");
      localStorage.removeItem("wagmi.wallet");
      localStorage.removeItem("wagmi.store");
      localStorage.removeItem("wagmi.connected");

      open();
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      onSignIn();
    }
  }, [address, onSignIn]);

  return (
    <PrimaryButton
      text={"Connect Wallet"}
      className="w-40 md:w-48"
      onClick={onSignIn}
    />
  );
};

export default ConnectWalletButton;
