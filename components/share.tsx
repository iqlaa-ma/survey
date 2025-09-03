"use client"
import Link from "next/link"
import {
  IconWhatsapp,
  IconDiscord,
  IconFacebook,
  IconInstagram
} from "@/icons"
import {
  CheckCircle2Icon
} from "lucide-react"
import {
  Alert,
  AlertTitle
} from "@/components/ui/alert"
import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"

export default function Share(): React.JSX.Element {

  const [copied, setCopied] = useState<string>("")

  const t = useTranslations("share")
  const locale = useLocale()
  const url = encodeURIComponent("https://www.iqlaa.ma")
  const message = encodeURIComponent(t("t1"))

  const copyToClipboard = async (s: string) => {
    await navigator.clipboard.writeText("https://www.iqlaa.ma")
    setCopied(s === "Discord" ? t("discord") : t("instagram"))
    setTimeout(() => {
      window.open(s === "Discord" ? "https://discord.com/channels/@me" : "https://www.instagram.com/", "_blank")
      setTimeout(() => {
        setCopied("")
      }, 5300)
    }, 900)
  }

  const links = {
    whatsapp: `https://wa.me/?text=${message}%20${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`
  }

  return (
    <div className={`flex flex-col gap-2 ${locale === "ar" && "items-end"}`}>

      { copied ? <Alert className={`max-w-max flex ${locale === "ar" ? "flex-row-reverse" : ""}`}>
        <CheckCircle2Icon />
        <AlertTitle> {copied} </AlertTitle>
      </Alert> :

      <div className={`flex items-center gap-8 justify-start ${locale === "ar" && "flex-row-reverse"}`}>
        <Link href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <IconWhatsapp />
        </Link>

        <Link href={links.facebook} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <IconFacebook />
        </Link>

        <button onClick={() => copyToClipboard("Discord")} className="cursor-pointer">
          <IconDiscord />
        </button>

        <button onClick={() => copyToClipboard("Instagram")} className="cursor-pointer">
          <IconInstagram />
        </button>
      </div> }

      <span className={`text-[12px] font-[500] mt-1 ${locale === "ar" && "font-arabic text-[13px]"}`}> {t("t2")} </span>
    </div>
  )
}

export function MiniSharePop({
  is
}: { is: boolean }): React.JSX.Element {

  const [is2, setIs2] = useState<boolean>(true)
  const locale = useLocale()

  return (
    <div
      className={`fixed inset-0 w-full h-[100vh] z-[10000] ${(is2 && !is ) ? "visible opacity-100" : "invisible opacity-0"}
      transition-all duration-300 ease-linear backdrop-blur-md bg-white/50 dark:bg-black/50 flex items-center justify-center px-4 ${locale === "ar" && "font-arabic"}`}
      onClick={(e) => { setIs2(!(e.currentTarget === e.target)) }}
    >
      <div className="w-full max-w-max p-5 bg-white dark:bg-[#222] rounded-[8px] shadow-xl flex flex-col relative border border-[#eeeeee] dark:border-[#333]">
        <Share />
      </div>
    </div>
  )
}