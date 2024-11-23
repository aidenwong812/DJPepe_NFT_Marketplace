import axios from "axios";
import { readContract } from "@wagmi/core"
import NFT_ABI from "@/lib/web3/contracts/DJPepeNFT.json"
import getIpfsLink from "@/lib/ipfs/getIpfsLink";
import { wagmiConfig } from "../../WagmiConfig"

const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`;

export const getTokenUri = async (tokenId: number) => {
  const metadata = await readContract(wagmiConfig, {
    abi: NFT_ABI,
    address: NFT_ADDRESS,
    functionName: 'tokenURI',
    args: [tokenId],
  })
  
  const result = await axios.get(getIpfsLink(metadata as string));
  
  return {
    url: getIpfsLink(result.data?.url || ""),
    name: result.data?.nft_name
  };
}
