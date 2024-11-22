"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Spinner,
  Spacer,
  Input,
} from "@nextui-org/react";

import ImageCard from "./components/ImageCard";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

import { postServer } from "@/lib/net/fetch/fetch";
import useToast from "@/lib/hooks/toast/useToast";
import useNFTMint from "@/lib/web3/hook/nft/useNFTMint";
import ImageComponent from "@/lib/components/imagecomponent";

const CreateNFT = () => {
  const { isConnected, address } = useAccount();

  const customToast = useToast();
  const { isPendingMint, isMintLoading, isMintSuccess, mintNFT } = useNFTMint();

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genImg, setGenImg] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const [nftName, setNftName] = useState("");
  const [royalty, setRoyalty] = useState(0);

  useEffect(() => {
    if (isMintSuccess) {
      customToast("success", "Successfully minted your NFT");
    }
  }, [isMintSuccess]);

  const mintNow = async () => {
    if (selectedImage === "") {
      customToast("failed", "Select image");
      return;
    }
    if (nftName === "") {
      customToast("failed", "Insert NFT name");
      return;
    }

    try {
      const res = await postServer("/nft/mint", {
        address: address as string,
        name: nftName,
        url: selectedImage,
        prompt: inputText,
      });

      if (res.success === true) {
        const { nft_name, metadataURL, assetURL } = res;

        console.log(metadataURL);
        try {
          const tx = await mintNFT(metadataURL, royalty);
          setTimeout(async () => {
            if (tx) {
              const response = await postServer("/nft/save", {
                tx,
                nft_name,
                assetURL,
                prompt: inputText,
              });
            }
          }, 30000);
        } catch (err) {
          console.log(err);
        }
      }
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
                {isGenerating && (
                  <Spinner
                    label="Loading..."
                    size="lg"
                    style={{ color: "#15BFFD", background: "transparent" }}
                  />
                )}
                <div className="w-full">
                  <h3 className="font-maladroit">Select Image and Mint Your NFT</h3>
                  <div className="mt-10 flex justify-center">
                    <label htmlFor="file" className="cursor-pointer">
                      {selectedImage ? (
                        <ImageComponent src={selectedImage} height={200} />
                      ) : (
                        <div className="flex items-center justify-center gap-[20px] w-full h-full duration-700 opacity-100 border-[2px] border-dashed rounded-[18px]">
                          <img
                            src="/icon/upload.svg"
                            width="25"
                            height="25"
                            alt="icon"
                          />
                          <p>Select File</p>
                        </div>
                      )}
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedImage(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
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
