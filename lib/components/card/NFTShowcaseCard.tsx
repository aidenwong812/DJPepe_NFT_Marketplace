"use client";

import { Card, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useState, type FC } from "react";

type Props = {
  asset: string;
  nftId?: number;
  name?: string;
  price?: number;
};

const NFTShowcaseCard: FC<Props> = ({ asset, nftId, name, price }) => {
  const router = useRouter();
  const [, setLoading] = useState(false);

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="flex justify-center items-center border-none p-2 bg-slate-500/40"
    >
      <Image
        alt="Woman listing to music"
        src={asset}
        isZoomed
        className="hover:cursor-pointer w-[300px] aspect-square"
        onClick={() => router.push(`/nft/${nftId}`)}
        onLoad={() => setLoading(true)}
      />
      <div className="flex flex-wrap justify-between w-full px-16 py-3">
        <p className="text-lg font-semibold font-maladroit">{name}</p>
        <p className="text-lg font-semibold font-maladroit">{Number(price)/10**18} ETH</p>
      </div>
    </Card>
  );
};

export default NFTShowcaseCard;
