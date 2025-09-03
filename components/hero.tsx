"use client"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import Image from "next/image"
import Questions from "@/components/questions"
import { useState, useEffect } from "react"
import Share, { MiniSharePop } from "@/components/share"
import { Suspense } from "react"

function ImageSide(): React.JSX.Element {
  const locale = useLocale()
  return (
    <div className="max-md:hidden">
      <Image
        src="/garrou-w.svg"
        unoptimized
        width={580}
        height={422}
        alt=" "
        draggable={false}
        quality={100}
        priority
        className={`hidden dark:block rotate-12 transform ${locale !== "ar" &&  "scale-x-[-1]"} max-[1144px]:w-[400px]`}
      />
      <Image
        src="/garrou-b.svg"
        unoptimized
        width={580}
        height={422}
        alt=" "
        draggable={false}
        quality={100}
        priority
        className={`block dark:hidden rotate-12 transform ${locale !== "ar" &&  "scale-x-[-1]"} max-[1144px]:w-[400px]`}
      />
    </div>
  )
}

function TextSide(): React.JSX.Element {

  const t = useTranslations("hero")
  const locale = useLocale()
  const [start, setStart] = useState<boolean>(false)
  const [can, setCan] = useState<boolean>(true)

  useEffect(() => {
    setCan(window.localStorage.getItem("done") === "" || window.localStorage.getItem("done") === null)
  }, [])

  return (
    <div className={`w-[calc(100%-630px)] max-[1144px]:w-[calc(100%-400px)] max-md:w-full md:pr-8 ${locale === "ar" && "text-right"}`}>
      <h1 className={`text-[44px] leading-12 font-ubuntu ${locale === "ar" && "font-rubik mb-4"}`}>
        {t("title")}
      </h1>
      <p className={`mt-1 text-[#111] ${locale === "ar" && "font-arabic"} dark:text-[#A0A0A0]`}> {t("description")} </p>
      <button
        className={`bg-[#26CDBC] mt-8 px-8 py-3 rounded-[4px] cursor-pointer transition-all duration-300 ease-in-out font-[500]
        text-[15px] transform hover:-translate-y-1 hover:bg-[#7AD4CB] ${locale === "ar" && "font-arabic"} select-none dark:text-[#000]`}
        onClick={() => setStart(can) }
      >
        {can ? t("button") : t("buttonThanks")}
      </button>
      <div className="mt-4"/>
      <Share />
      <Questions start={start} close={setStart} />
      <Suspense>
        <MiniSharePop is={can}/>
      </Suspense>
    </div>
  )
}

export default function Hero(): React.JSX.Element {
  const locale = useLocale()
  return (
    <main className="w-full px-4 flex justify-center mt-32">
      <div className={`w-full max-w-[1188px] flex items-center justify-between h-full ${locale === "ar" && "flex-row-reverse"}`}>
        <TextSide />
        <ImageSide />
      </div>
    </main>
  )
}