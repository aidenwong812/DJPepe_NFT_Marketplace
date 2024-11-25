"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  Image,
  Spinner,
} from "@nextui-org/react";

import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { shortenAddress } from "@/lib/components/profile/profile-kit/ProfileHeader";

import useToast from "@/lib/hooks/toast/useToast";
import useNFTBuy from "@/lib/web3/hook/nft/useNFTBuy";
import { getNFT } from "@/lib/web3/hook/nft/getNFT";
import { NFTData } from "@/types";
import Backbutton from "@/lib/components/button/Backbutton";

export default function NFTDetailView({
  params,
}: {
  params: { slug: string };
}) {
  const token_id = parseInt(params.slug);

  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);


  const { address } = useAccount();
  const customToast = useToast();
  const { isBuyNFTLoading, isBuyNFTPending, isBuyNFTSuccess, buyNFT } =
    useNFTBuy();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNFT = async () => {
      const result = await getNFT(token_id);
      setSelectedNFT(result || null);
      setIsLoading(false);
    }
    fetchNFT();
  }, [params.slug]);



  useEffect(() => {
    if (isBuyNFTSuccess) {
      customToast("success", "Successfully Buy NFT");
    }
  }, [isBuyNFTSuccess]);

  const handlePurchase = async () => {
    if (!address) {
      customToast("failed", "Please connect your wallet");
      return;
    }

    if (address.toLocaleLowerCase() == selectedNFT?.seller?.toLocaleLowerCase()) {
      customToast("failed", "You are the owner of this NFT");
      return;
    }

    try {
      await buyNFT(
        Number(selectedNFT?.token_id),
        Number(selectedNFT?.price) / 10 ** 18
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center main-pt">
      {
        isLoading ? <Spinner className="mt-10 size-[100px]" /> :
          <div className="relative">
            <div className="flex justify-center items-center gap-20 lg:mt-10 w-full px-10 font-maladroit">
              <div className="p-2 lg:bg-white/10 rounded-md basis-1/2">
                {selectedNFT && (
                  <Image
                    className="w-[600px] aspect-square hover:cursor-pointer object-cover"
                    src={selectedNFT.asset_url}
                    alt="Not Found"
                  />
                )}
              </div>
              <div className="w-full flex flex-col gap-8 basis-1/2">
                <h2>{selectedNFT?.token_name}</h2>
                <div className="flex justify-between mt-1">
                  <div className="flex gap-2">
                    <div>
                      <p className="text-2xl font-semibold">Creator: {shortenAddress(selectedNFT?.creator || "")}</p>
                      <p className="text-2xl font-semibold">Owner: {shortenAddress(selectedNFT?.seller || "")}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row mt-6 gap-y-2">
                  <div className="lg:w-[30%]">
                    <p>Current Price</p>
                    <p className="text-2xl font-semibold">
                      {Number(selectedNFT?.price) / 10 ** 18} ETH
                    </p>
                  </div>
                  <div>
                    <p>Loyalty Fee</p>
                    <p className="text-2xl font-semibold">
                      {Number(selectedNFT?.royalty).toFixed(2)} %
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <PrimaryButton
                    className={`w-[${isBuyNFTLoading || isBuyNFTPending ? "240px" : "200px"}]`}
                    isLoading={isBuyNFTLoading || isBuyNFTPending}
                    text="Purchase NFT"
                    onClick={handlePurchase}
                  />
                </div>
              </div>
            </div>
            <Backbutton className="absolute top-16 right-10 z-10" />
          </div>
      }
    </div>
  );
}
