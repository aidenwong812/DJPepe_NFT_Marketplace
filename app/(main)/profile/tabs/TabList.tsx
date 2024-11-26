"use client";
import { useEffect, useState } from "react";
import { Image, Spinner } from "@nextui-org/react";
import { useAccount } from "wagmi";
import { Box, ImageList } from "@mui/material";

import type { NFTData } from "./TabNFT";
import { useGetAllListedNFTs } from "@/lib/web3/hook/nft/useGetAllListedNFTs";
import getIpfsLink from "@/lib/ipfs/getIpfsLink";

const TabListed = ({
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
  const { address, isConnected } = useAccount();
  const [listed, setListed] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (address && isConnected) {
      setIsLoading(true);
      const fetchListed = async () => {
        const allNFTs = await useGetAllListedNFTs();
        const filtered = allNFTs.filter((nft) => nft.creator === address);
        setListed(filtered);
        setIsLoading(false);
      }
      fetchListed();
    }
  }, [address, isConnected]);

  const handleDelist = async (id: number) => {
    setModalType("delist");
    setSelected(listed.find((nft) => nft.token_id === id));
    open();
  };

  return (
    <div className="flex flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        {
          isLoading ? <Spinner className="mt-10 size-[100px]" /> :
            listed.length > 0 ?
              <ImageList variant="masonry" cols={cols} gap={10} rowHeight={200}>
                {
                  listed.map((nft, index) => {
                    return (
                      <Image
                        key={nft.token_id}
                        src={getIpfsLink(nft.asset_url)}
                        isZoomed
                        alt={`NFT ${index}`}
                        className="py-1 rounded-lg hover:cursor-pointer w-[300px] aspect-square"
                        onClick={() => handleDelist(nft.token_id)}
                      />
                    );
                  })}
              </ImageList>
              :
              <p className="text-center text-medium font-maladroit mt-20">No listed NFTs found</p>
        }
      </Box>
    </div>
  );
};

export default TabListed;
