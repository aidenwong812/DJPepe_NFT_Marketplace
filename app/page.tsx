'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";  
import Header from "@/lib/components/layout/Header";
import Explorer from "./(main)/explore/page";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/explore");
  }, []);
  return (
    <div className="page-bg">
      <Header />
      <Explorer/>
    </div>
  );
}
