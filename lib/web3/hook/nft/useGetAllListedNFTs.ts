import MARKET_ABI from "@/lib/web3/contracts/DJPepeMarket.json";
import { readContract } from "@wagmi/core";
import { wagmiConfig } from "../../WagmiConfig";
import { getTokenUri } from "./getTokenUri";
import { NFTData } from "@/types";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;

export const useGetAllListedNFTs = async () => {
  const result = await readContract(wagmiConfig, {
    abi: MARKET_ABI,
    address: MARKET_ADDRESS,
    functionName: 'getAllListedNFTs',
  }) as any[];
  
  const NFTdata = await Promise.all(result.map(async (nft) => {
    const {url, name} = await getTokenUri(nft.nftId);
    return {
      token_id: nft.nftId,
      token_name: name,
      asset_url: url,
      creator: nft.creator,
      seller: nft.seller,
      price: nft.price,
      royalty: nft.royalty,
    }
  }))

  return NFTdata as NFTData[];
};