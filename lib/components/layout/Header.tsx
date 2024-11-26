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
} from "@nextui-org/react";

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
    <div className="px-20 z-50 w-full top-4 font-maladroit">
      <Navbar
        classNames={{
          base: "bg-transparent backdrop-filter-none",
          item: "data-[active=true]:text-[#4B0082]",
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
          <NavbarItem>
            <Link className="flex gap-2 text-inherit" href="https://wordpress-1244155-4708982.cloudwaysapps.com/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path.includes("explore") ? true : false}>
            <Link className="flex gap-2 text-inherit" href="/explore">
              NFT Marketplace
            </Link>
          </NavbarItem>
          {address && (
            <NavbarItem isActive={path.includes("create") ? true : false}>
              <Link
                aria-current="page"
                className="flex gap-2 text-inherit"
                href="/create"
              >
                Create NFT
              </Link>
            </NavbarItem>
          )}
          {address && (
            <NavbarItem isActive={path.includes("profile") ? true : false}>
              <Link
                aria-current="page"
                className="flex gap-2 text-inherit"
                href="/profile"
              >
                My NFTs
              </Link>
            </NavbarItem>
          )}
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
          {address && (
            <NavbarMenuItem>
              <Link
                className="w-full"
                color="foreground"
                href="/create"
              >
                Create NFT
              </Link>
            </NavbarMenuItem>
          )}
          {address && (
            <NavbarMenuItem>
              <Link
                className="w-full"
                color="foreground"
                href="/profile"
              >
                My NFTs
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
