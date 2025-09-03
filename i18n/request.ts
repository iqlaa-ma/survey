import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"
 
export default getRequestConfig(async () => {
  const cookie = (await cookies()).get("MYNEXTAPP_LOCALE")?.value || "en"
  const locale = cookie
  return {
    locale,
    messages: (await import(`./${locale}.json`)).default
  }
})