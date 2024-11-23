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
      console.log(metadataUrl);
      await mintNFT(metadataUrl.uri, royalty);        
    } catch (err) {
      console.error(err);
      customToast("failed", "Failed to mint NFT");
    }
  };

  return (
    <div>
      <div className="relative">
        <img
          className="w-full max-h-[800px] opacity-60"
          src="/page-create.png"
          alt="Not Found"
        />
      </div>
      <div className="container" id="detailed-container">
        <Breadcrumbs
          separator=">>"
          itemClasses={{
            separator: "px-2",
          }}
          className="my-6"
        >
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Create NFTs</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col lg:flex-row gap-3 pb-6">
          <div className="w-full p-4 bg-white/5 rounded-md">
            <div className="lg:h-[calc(100vh-220px)]  ">
              <div className="w-full h-full flex justify-center items-center text-center">                
                <div className="w-full">
                  <h3 className="font-maladroit">Select Image and Mint Your NFT</h3>
                  <div className="mt-10 flex justify-center">
                    <MediaUpload />
                  </div>
                  <Spacer y={6} />
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      min={0}
                      placeholder="Royalty"
                      value={royalty.toString()}
                      onChange={(e) => setRoyalty(parseInt(e.target.value))}
                      classNames={{
                        inputWrapper:
                          "w-full h-full bg-white/10 py-2 rounded-md",
                        input: "text-lg",
                        base: "max-w-[200px]",
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
                      classNames={{
                        inputWrapper: "w-full h-full bg-white/10 py-2",
                        input: "text-lg",
                      }}
                      value={nftName}
                      onChange={(e) => setNftName(e.target.value)}
                      labelPlacement="outside"
                      placeholder="Input your NFT name"
                      radius="sm"
                      endContent={
                        <PrimaryButton
                          onClick={mintNow}
                          text="Mint Now"
                          isLoading={isPendingMint || isMintLoading}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
