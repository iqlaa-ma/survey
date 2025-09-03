import { NextResponse } from "next/server"

export const GET = async () => {
  return NextResponse.json({
    rules: [
      {
        userAgent: "*",
        disallow: ["/cci"]
      }
    ],
    sitemap: "https://iqlaa.ma/sitemap.xml"
  })
}

export const config = {}