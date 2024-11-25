"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function Backbutton({ className }: { className?: string }) {
    const router = useRouter();

    return (
        <button 
        className={twMerge(
            "h-[40px] w-[100px] px-3 group p-4 overflow-hidden rounded text-white transition-all duration-300 ease-out bg-[#4B0082] font-maladroit",
            className,
            "btn"
          )} 
            onClick={() => { router.back() }}>
            Back
        </button>
    );
}
