"use client"
import { ThemeProvider } from "next-themes"

export default function MyThemeProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}