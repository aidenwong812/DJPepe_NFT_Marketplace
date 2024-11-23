"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Switch,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import MultiCarousel from "@/lib/components/carousel/MultiCarousel";
import NFTShowcaseCard from "@/lib/components/card/NFTShowcaseCard";
import ImageContainer from "@/lib/components/container/ImageCotainer";
import { fetchServer } from "@/lib/net/fetch/fetch";
import useColNums from "@/lib/hooks/useColNums";

import NFTDetails from "@/app/(main)/explore/NFTDetails.json";

import type { NFTData } from "@/app/(main)/profile/tabs/TabNFT";

const Explorer = () => {
  const [selectedNFT, setSelectedNFT] = useState(-1);
  const [listedNFTs, setListedNFTs] = useState<NFTData[]>([]);

  const cols = useColNums();

  useEffect(() => {
    const fetchListedNFTs = async () => {
      const res = await fetchServer("/nft/listed");

      setListedNFTs(res);
    };

    fetchListedNFTs();
  }, []);

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
      <div className="container">
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
                    asset={`${process.env.NEXT_PUBLIC_API_BASE_URL}${nft.asset_url}`}
                    hash={nft.asset_hash}
                  />
                );
              })}
            </ImageContainer>
          </div>

          <div className="text-center">
            <div className="mt-16">
              <h2 className="font-maladroit">Hot</h2>
              <p>
                The largest and unique Super rare NFT marketplace For
                crypto-collectibles
              </p>
              <div className="mt-10">
                <MultiCarousel
                  selectedNFT={selectedNFT}
                  setSelectedNFT={setSelectedNFT}
                  delay={2500}
                  data={NFTDetails}
                />
              </div>
            </div>
            <div className="mt-16">
              <h2 className="font-maladroit">Most used</h2>
              <p>
                The largest and unique Super rare NFT marketplace For
                crypto-collectibles
              </p>
              <div className="mt-10">
                <MultiCarousel
                  selectedNFT={selectedNFT}
                  setSelectedNFT={setSelectedNFT}
                  delay={2000}
                  data={NFTDetails}
                />
              </div>
            </div>
            <div className="mt-16">
              <h2 className="font-maladroit">Hot</h2>
              <p>
                The largest and unique Super rare NFT marketplace For
                crypto-collectibles
              </p>
              <div className="mt-10">
                <MultiCarousel
                  delay={3000}
                  data={NFTDetails}
                  selectedNFT={selectedNFT}
                  setSelectedNFT={setSelectedNFT}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
