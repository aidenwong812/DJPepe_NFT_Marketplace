"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { Image, Spinner } from "@nextui-org/react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";

import getIpfsLink from "@/lib/ipfs/getIpfsLink";

export type NFTData = {
  token_id: number;
  token_name: string;
  asset_url: string;
  creator: string;
};

const TabNFT = ({
  cols,
  setModalType,
  setSelected,
  open,
}: {
  cols: number;
  setModalType: (type: "list" | "delist") => void;
  setSelected: (type: NFTData | undefined) => void;
  open: () => void;
}) => {
  //const router = useRouter();
  const { address, isConnected } = useAccount();
  const [myNFTs, setMyNFTs] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchMyNFTs = useCallback(async () => {
    try {
      setMyNFTs([]);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ALCHEMY_URL}/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/getNFTsForOwner?owner=${address}`);
      const nfts = res.data?.ownedNfts;
      if (nfts && nfts.length > 0) {
        nfts.map((nft: any) => {
          const metadata = nft.raw.metadata;
          setMyNFTs((prev) => [...prev, { token_id: nft.tokenId, token_name: metadata.nft_name, asset_url: getIpfsLink(metadata.url), creator: nft.mint.mintAddress }]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [address]);

  useEffect(() => {
    if (address && isConnected) {
      fetchMyNFTs();
      setIsLoading(false);
    }
  }, [address, isConnected]);

  const handleClick = (id: number) => {
    setModalType("list");
    setSelected(myNFTs.find((nft) => nft.token_id === id));
    open();
  };

  return (
    <div className="flex flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        {
          isLoading ? <Spinner className="mt-10 size-[100px]" /> :
            <ImageList variant="masonry" cols={cols} gap={10}>
              {
                myNFTs.map((nft, index) => {
                  return (
                    <Image
                      key={nft.token_id}
                      src={nft.asset_url}
                      isZoomed
                      alt={`NFT ${index}`}
                      className="py-1 rounded-lg hover:cursor-pointer h-[300px]"
                      onClick={
                        () => handleClick(nft.token_id)
                      }
                    />
                  );
                })}
            </ImageList>
        }
      </Box>
    </div>
  );
};

export default TabNFT;
