"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLocale, useTranslations } from "next-intl"

export default function Faqs(): React.JSX.Element {
  const locale = useLocale()
  const t = useTranslations("faqs")
  return (
    <div className={`w-full px-4 flex justify-center mt-22 ${locale === "ar" && "font-arabic"}`}>
      <div className="w-full max-w-[1188px] flex items-center justify-center h-full">

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className={`${locale === "ar" && "flex flex-row-reverse"}`}> {t("q1")} </AccordionTrigger>
            <AccordionContent className={`flex flex-col text-balance ${locale === "ar" && "text-right"}`}>
              <p>
                {t("r1")}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className={`${locale === "ar" && "flex flex-row-reverse"}`}> {t("q2")} </AccordionTrigger>
            <AccordionContent className={`flex flex-col text-balance ${locale === "ar" && "text-right"}`}>
              <p> {t("r2")} </p>
              <p> {t("r3")} </p>
              <p> {t("r4")} </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className={`${locale === "ar" && "flex flex-row-reverse"}`}> {t("q3")} </AccordionTrigger>
            <AccordionContent className={`flex flex-col text-balance ${locale === "ar" && "text-right"}`}>
              <p> {t("r5")} </p>
              <p> {t("r6")} </p>
              <p> {t("r7")} </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
    </div>
  )
}