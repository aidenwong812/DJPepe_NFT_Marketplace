import { Button } from "@nextui-org/button";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
};

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  isLoading,
}) => {
  return (
    <Button
      variant="light"
      size="lg"
      className={twMerge(
        "w-[240px] h-[40px] px-3 group relative p-4 overflow-hidden rounded text-white transition-all duration-300 ease-out bg-[#4B0082] font-maladroit",
        className,
        "btn"
      )}
      onClick={onClick}
      isLoading={isLoading}
    >
      {text}
    </Button>
  );
}

export default PrimaryButton;