"use client";
import { useCallback, useMemo } from "react";
import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";

import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import ToggleProfile from "@/lib/components/profile/ToggleProfile";
import ConnectWalletButton from "../button/ConnectWalletButton";

export default function Header() {
  const router = useRouter();
  const { address } = useAccount();
  const path = usePathname();

  const onLogo = useCallback(() => {
    router.push("/explore");
  }, []);

  const logoElement = useMemo(() => {
    return (
      <Image
        classNames={{ img: "w-16 h-16" }}
        src="/logo.png"
        className="hover:cursor-pointer"
        onClick={onLogo}
        alt="Not Found"
      />
    );
  }, []);

  return (
    <div className="px-4 z-50 w-full fixed top-4 font-maladroit">
      <Navbar
        classNames={{
          base: "bg-transparent backdrop-filter-none",
          wrapper:
            "px-4 sm:px-6 bg-white/15 border-1 border-white/30 backdrop-blur-xl backdrop-saturate-150 rounded-full",
          item: "data-[active=true]:text-[#4B0082] max-w-[1536px]",
        }}
        height="100px"
        maxWidth="2xl"
      >
        <NavbarBrand>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
          {logoElement}
        </NavbarBrand>
        <NavbarContent
          className="ml-4 hidden h-12 w-full max-w-fit gap-8 rounded-full px-8 sm:flex"
          justify="start"
        >
          <NavbarItem isActive={path.includes("explore") ? true : false}>
            <Link className="flex gap-2 text-inherit" href="/explore">
              NFT Marketplace
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("create") ? true : false}>
            <Link
              aria-current="page"
              className="flex gap-2 text-inherit"
              href="/create"
            >
              Create NFT
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("profile") ? true : false}>
            <Link
              aria-current="page"
              className="flex gap-2 text-inherit"
              href="/profile"
            >
              My NFTs
            </Link>
          </NavbarItem>
        </NavbarContent>
        {address ? (
          <NavbarContent
            className="ml-auto flex justify-center items-center h-12 max-w-fit gap-0 rounded-full p-0 px-2 bg-white/30 dark:bg-white/30"
            justify="end"
          >
            {/* User Menu */}
            <NavbarItem className="flex items-center">
              <ToggleProfile />
            </NavbarItem>
          </NavbarContent>
        ) : (
          <ConnectWalletButton />
        )}

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem isActive>
            <Link
              aria-current="page"
              className="w-full"
              color="primary"
              href="/explore"
            >
              NFT Marketplace
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/create">
              Create NFT
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
