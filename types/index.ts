import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type NFTData = {
  token_id: number;
  token_name: string;
  asset_url: string;
  creator: string;
  seller: string;
  price: number;
  royalty: number;
};
