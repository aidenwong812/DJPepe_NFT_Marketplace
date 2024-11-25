import { readContract } from "@wagmi/core";

import MARKET_ABI from "@/lib/web3/contracts/DJPepeMarket.json";
import { NFTData } from "@/app/(main)/profile/tabs/TabNFT";
import { wagmiConfig } from "../../WagmiConfig";
import { useAccount } from "wagmi";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;

export const useListedNFTs = async () => {
  try {
    const { address } = useAccount();
    const result = await readContract(wagmiConfig, {
      abi: MARKET_ABI,
      address: MARKET_ADDRESS,
      functionName: 'getAllListedNFTs',
    })
    const NFTdata = result as NFTData[];
    const listed = NFTdata.filter((nft) => nft.creator === address);

    return {
      listed
    };
  } catch (error) {
    console.log(error);
    return [];
  }
};
