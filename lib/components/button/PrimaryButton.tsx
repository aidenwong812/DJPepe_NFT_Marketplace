import { Button } from "@nextui-org/button";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  text: string;
  className?: string;
  varient?: "primary" | "secondary";
  onClick?: () => void;
  isLoading?: boolean;
};

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  className,
  varient = "primary",
  onClick,
  isLoading
}) => {
  return (
    <Button
      variant="light"
      size="sm"
      className={twMerge(
        "w-[180px] h-[40px] px-3 group relative p-4 overflow-hidden rounded text-white transition-all duration-300 ease-out bg-[#4B0082]",
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