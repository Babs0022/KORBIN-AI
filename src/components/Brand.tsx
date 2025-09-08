"use client";
import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 select-none">
      {/* Place your logo at /public/logo.png */}
      <Image src="/logo.png" alt="KorbinAI" width={28} height={28} priority />
      <span className="font-semibold">KorbinAI</span>
    </Link>
  );
}


