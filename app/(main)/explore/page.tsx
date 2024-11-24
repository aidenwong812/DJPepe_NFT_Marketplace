"use client";
import { useEffect, useState } from "react";
import {
  Switch,
  Breadcrumbs,
  BreadcrumbItem,
  Spinner,
} from "@nextui-org/react";
import { useGetAllListedNFTs } from "@/lib/web3/hook/nft/useGetAllListedNFTs"

import NFTShowcaseCard from "@/lib/components/card/NFTShowcaseCard";
import ImageContainer from "@/lib/components/container/ImageCotainer";
import useColNums from "@/lib/hooks/useColNums";

import NFTDetails from "@/app/(main)/explore/NFTDetails.json";
import { NFTData } from "@/types";

const Explorer = () => {
  const [selectedNFT, setSelectedNFT] = useState(-1);
  const [listedNFTs, setListedNFTs] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchListed = async () => {
      setIsLoading(true);
      const listedNFTs = await useGetAllListedNFTs();
      setListedNFTs(listedNFTs);
      setIsLoading(false);
    }
    fetchListed();
  }, [])

  const cols = useColNums();

  return (
    <div>
      <div className="relative">
        <img
          className="w-full max-h-[800px] opacity-60"
          src="/metaverse.png"
          alt="Not Found"
        />
        <div className="absolute top-0 w-full h-full bg-transparent/5" />
      </div>
      <div className="container mb-0 pb-16">
        <div className="flex justify-between items-center my-6">
          <span>
            <Breadcrumbs
              separator=">>"
              itemClasses={{
                separator: "px-2",
              }}
            >
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem onClick={() => setSelectedNFT(-1)}>
                NFT MARKETPLACE
              </BreadcrumbItem>
              {selectedNFT !== -1 && (
                <BreadcrumbItem>
                  {NFTDetails[selectedNFT - 1].name}
                </BreadcrumbItem>
              )}
            </Breadcrumbs>
          </span>
        </div>
        <div>
          <div className="mt-16 text-center">
            <h2 className="font-maladroit">All NFTs</h2>
            <p className="mb-10">All NFTs listed in the DJ Pepe marketplace</p>
            {
              isLoading ? <Spinner className="mt-10 size-[100px]" /> :
                listedNFTs.length > 0 ?
                  <ImageContainer cols={cols}>
                    {listedNFTs.map((nft, index) => {
                      return (
                        <NFTShowcaseCard
                          key={index}
                          asset={nft.asset_url}
                          nftId={nft.token_id}
                          name={nft.token_name}
                          price={nft.price}
                        />
                      );
                    })}
                  </ImageContainer>
                  :
                  <p className="text-center text-medium font-maladroit mt-20">No NFTs found</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
