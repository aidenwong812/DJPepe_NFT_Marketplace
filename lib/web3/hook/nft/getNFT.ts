import { useGetAllListedNFTs } from "./useGetAllListedNFTs";

export const getNFT = async (token_id: number) => {

    const result = await useGetAllListedNFTs();

    const nftData = result.find((nft) => Number(nft.token_id) === token_id);

      return nftData;
}
