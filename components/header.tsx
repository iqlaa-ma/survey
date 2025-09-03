"use client"
import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "@/components/themeToggle"
import LanguageToggle from "@/components/languageToggle"
import { useLocale } from "next-intl"

export default function Header(): React.JSX.Element {
  const locale = useLocale()
  return (
    <header className="w-full h-[60px] px-4 flex justify-center">
      <main className={`w-full max-w-[1388px] flex items-center justify-between h-full ${locale === "ar" && "flex-row-reverse"}`}>

        <div className="w-9 flex justify-center">
          <LanguageToggle />
        </div>

        <Link href="/">
          <Image
            src="/iqlaa.svg"
            unoptimized
            width={100}
            height={56}
            alt=" "
            draggable={false}
            quality={100}
            priority
          />
        </Link>

        <div className="w-9 flex justify-center">
          <ThemeToggle />
        </div>

      </main>
    </header>
  )
}