"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { IconTranslator } from "@/icons"
import { useTranslations } from "next-intl"

export default function LanguageToggle(): React.JSX.Element {

  const [open, setOpen] = useState<boolean>(false)

  const router = useRouter()

  const setLanguage: (s: string) => void = (s: string) => {
    document.cookie = `MYNEXTAPP_LOCALE=${s};`
    router.refresh()
  }

  const t = useTranslations("header")

  return (
    <div className="relative flex">
      <button
        onClick={() => setOpen(e => !e)}
        className="w-9 h-9 rounded-[calc(.625rem-2px)] transition-all duration-250 ease-linear
        hover:bg-[oklch(97%_0_0)] dark:hover:bg-[color-mix(in_oklab,_oklch(37.1%_0_0)_50%,_transparent)]
        flex items-center justify-center cursor-pointer"
      >
        <IconTranslator />
      </button>
      <Select open={open} onOpenChange={setOpen} onValueChange={v => setLanguage(v)}>
        <SelectTrigger className="absolute left-0 w-[0px] opacity-0 invisible">
          <SelectValue placeholder=" "/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel> {t("languages")} </SelectLabel>
            <SelectItem value="en"> English </SelectItem>
            <SelectItem value="fr"> Français </SelectItem>
            <SelectItem value="ar"> العربية </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}