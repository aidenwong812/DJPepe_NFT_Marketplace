"use client";
import { useEffect, useState } from "react";
import {
  Switch,
  Breadcrumbs,
  BreadcrumbItem,
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
  useEffect(() =>{
    const fetchListed = async () => {
      const listedNFTs = await useGetAllListedNFTs();
      setListedNFTs(listedNFTs);
    }
    fetchListed();
  }, [])

  const cols = useColNums();  

  return (
    <div >
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
          <Switch defaultSelected color="secondary">
            <span>Buy Now</span>
          </Switch>
        </div>
        <div> 
          <div className="mt-16 text-center">
            <h2 className="font-maladroit">Latest NFTs</h2>
            <p className="mb-10">The latest NFTs by NYW artists and users</p>
            <ImageContainer cols={cols}>
              {listedNFTs.map((nft, index) => {
                return (
                  <NFTShowcaseCard
                    key={index}
                    asset={nft.asset_url}
                    nftId={nft.token_id}
                  />
                );
              })}
            </ImageContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
