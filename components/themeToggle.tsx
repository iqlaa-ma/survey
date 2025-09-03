"use client"
import { useTheme } from "next-themes"
import { IconTheme } from "@/icons"

export default function ThemeToggle(): React.JSX.Element {

  const { theme, setTheme, systemTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <button
      onClick={() => { setTheme(currentTheme === "dark" ? "light" : "dark") }}
      className="w-9 h-9 rounded-[calc(.625rem-2px)] transition-all duration-250 ease-linear
      hover:bg-[oklch(97%_0_0)] dark:hover:bg-[color-mix(in_oklab,_oklch(37.1%_0_0)_50%,_transparent)]
      flex items-center justify-center cursor-pointer"
    >
      <IconTheme />
    </button>
  )
}