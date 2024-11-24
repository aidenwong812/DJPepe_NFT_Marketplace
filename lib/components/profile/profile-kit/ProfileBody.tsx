"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";

const ProfileButton = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex items-center gap-4 px-6 py-2 rounded-md hover:cursor-pointer hover:opacity-30 transition-opacity duration-500 active:bg-white/35"
      onClick={onClick}
    >
      <span>
        <Icon icon={icon} className="w-6 h-6" />
      </span>
      <span>{text}</span>
    </div>
  );
};

const ProfileBody = () => {
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col gap-1 px-2 py-3">      
      <ProfileButton
        text="Disconnect"
        icon="majesticons:logout-line"
        onClick={() => disconnect()}
      />
    </div>
  );
};

export default ProfileBody;
