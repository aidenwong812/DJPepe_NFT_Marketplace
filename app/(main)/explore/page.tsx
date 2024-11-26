"use client";
import { useEffect, useState } from "react";
import {
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
      <div className="bg-[url('/metaverse.png')] bg-cover bg-left-top bg-repeat opacity-50 fixed top-0 w-full h-full z-0" />
      <div className="pb-16 px-40">
        <div className="flex justify-between items-center">
          <span style={{ zIndex: 20 }}>
            <Breadcrumbs
              separator=">>"
              itemClasses={{
                separator: "px-2",
              }}
            >
              <BreadcrumbItem href="https://wordpress-1244155-4708982.cloudwaysapps.com/">Home</BreadcrumbItem>
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
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-maladroit" style={{ zIndex: 20 }}>DJ Pepe NFTs</h2>
              <p className="mb-10" style={{ zIndex: 20 }}>New NFTs added daily</p>
            </div>
            <div>
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
                  <p className="text-center text-medium font-maladroit mt-20" style={{ zIndex: 20 }}>No NFTs found</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
