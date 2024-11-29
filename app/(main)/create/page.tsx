"use client";
import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Spacer,
  Input,
} from "@nextui-org/react";

import PrimaryButton from "@/lib/components/button/PrimaryButton";

import useToast from "@/lib/hooks/toast/useToast";
import useNFTMint from "@/lib/web3/hook/nft/useNFTMint";
import MediaUpload from "./components/MediaUpload";
import { useFileUploadProvider } from "@/provider/FileUploadProvider";
import { uploadJson } from "@/lib/ipfs/uploadJson";
import Backbutton from "@/lib/components/button/Backbutton";

const CreateNFT = () => {
  const { imageUri } = useFileUploadProvider()

  const customToast = useToast();
  const { isPendingMint, isMintLoading, isMintSuccess, mintNFT } = useNFTMint();

  const [nftName, setNftName] = useState("");
  const [royalty, setRoyalty] = useState(0);

  useEffect(() => {
    if (isMintSuccess) {
      customToast("success", "Successfully minted your NFT");
    }
  }, [isMintSuccess]);

  const mintNow = async () => {
    if (imageUri === null) {
      customToast("failed", "Select image");
      return;
    }
    if (nftName === "") {
      customToast("failed", "Insert NFT name");
      return;
    }


    try {
      const metaData = {
        nft_name: nftName,
        url: imageUri,
      }
      const metadataUrl = await uploadJson(metaData);
      await mintNFT(metadataUrl.uri, royalty);
    } catch (err) {
      console.error(err);
      customToast("failed", "Failed to mint NFT");
    }
  };

  return (
    <div className="mb-0">
      <div className="bg-[url('/page-create.png')] bg-cover bg-left-top bg-repeat opacity-50 fixed top-0 w-full h-full z-0" />      
      <div className="mb-0 px-40" id="detailed-container">
        <div className="relative w-full flex justify-between items-center">
          <Breadcrumbs
            separator=">>"
            itemClasses={{
              separator: "px-2",
            }}
            className="my-6"
          >
            <BreadcrumbItem href="https://djpepe.rocks/">Home</BreadcrumbItem>
            <BreadcrumbItem>Create NFTs</BreadcrumbItem>
          </Breadcrumbs>
          <Backbutton />
        </div>
        <div className="flex flex-col lg:flex-row gap-3 pb-10 mb-0">
          <div className="w-full p-4 bg-slate-500/60 rounded-md">
            <div className="w-full flex flex-col justify-center items-center gap-3">
              <h3 className="font-maladroit" style={{ zIndex: 20 }}>Select Image and Mint Your NFT</h3>
              <div className="mt-10">
                <MediaUpload />
              </div>
              <Spacer y={6} />
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Royalty"
                value={royalty.toString()}
                onChange={(e) => setRoyalty(parseInt(e.target.value))}
                classNames={{
                  inputWrapper:
                    "w-full h-full bg-black/80 py-2 rounded-md flex justify-center items-center",
                  input: "text-lg",
                  base: "max-w-[400px]",
                }}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      %
                    </span>
                  </div>
                }
              />
              <Input
                aria-label="Search"
                className="w-[400px]"
                classNames={{ inputWrapper: "w-[400px] bg-black/80 py-2 h-full", input: "text-lg" }}
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                labelPlacement="outside"
                placeholder="Input your NFT name"
                radius="sm"
              />
              <PrimaryButton
                onClick={mintNow}
                text="Mint Now"
                isLoading={isPendingMint || isMintLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
