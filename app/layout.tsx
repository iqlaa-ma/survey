import type { Metadata } from "next"
import { Inter, Ubuntu, Playpen_Sans_Arabic, Rubik } from "next/font/google"
import MyThemeProvider from "@/providers/myThemeProvider"
import { getLocale, getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { Analytics } from "@vercel/analytics/next"
import "./opp.css"

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: "normal"
})

const ubuntuFont = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "normal",
  variable: "--ubuntuFont"
})

const arabicFont = Playpen_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  style: "normal",
  variable: "--arabicFont"
})

const RubikFont = Rubik({
  subsets: ["arabic"],
  weight: ["400", "500"],
  style: "normal",
  variable: "--rubikFont"
})

export async function generateMetadata({
  params: { locale }
}: {
  params: any
}): Promise<Metadata> {
  
  const message = await getMessages({ locale })

  const title = message?.metadata?.title
  const description = message?.metadata?.description
  const keywords = message?.metadata?.keywords
  const graphTitle = message?.metadata?.graphTitle
  const graphDescription = message?.metadata?.graphDescription
  const twitterTitle = message?.metadata?.twitterTitle
  const twitterDescription = message?.metadata?.twitterDescription

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: graphTitle,
      description: graphDescription,
      url: "https://iqlaa.vercel.app/og/image.png",
      siteName: "IQLAA",
      images: [
        {
          url: "https://iqlaa.vercel.app/og/image.png",
          width: 1200,
          height: 630,
          alt: "IQLAA Smoking Habits Survey Platform"
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: ["https://iqlaa.vercel.app/og/image.png"]
    },
    authors: [{ name: "IQLAA Team", url: "https://iqlaa.vercel.app/og/image.png" }]
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.JSX.Element> {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <MyThemeProvider>
      <html lang={locale} suppressHydrationWarning>
        <body className={`${interFont.className} ${ubuntuFont.variable} ${arabicFont.variable} ${RubikFont.variable} antialiased text-[14px]`}>
          <NextIntlClientProvider messages={messages}>
            <Analytics />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </MyThemeProvider>
  )
}