"use client"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"
import { PhoneInput } from "@/components/phoneInput"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import enMessages from "@/i18n/en.json"
import arMessages from "@/i18n/ar.json"
import frMessages from "@/i18n/fr.json"

const translate = (key: string, locale: "en" | "ar" | "fr") => {
  const dict = {
    en: enMessages,
    ar: arMessages,
    fr: frMessages
  }[locale]
  return dict.questions[key as keyof typeof dict.questions] || key
}

export default function Questions({
  start,
  close
}: {
  start: boolean
  close: (v: boolean) => void
}): React.JSX.Element {

  const t = useTranslations("questions")
  const locale = useLocale()

  const [responses, setResponses] = useState<string[]>([])

  const questions = useMemo(() => [
    { title: t("q1"), responses: [t("q1r1"), t("q1r2")] },
    { title: t("q2"), responses: [t("q2r1"), t("q2r2"), t("q2r3")] },
    { title: t("q3"), responses: [t("q3r1"), t("q3r2")] },
    { title: t("q4"), responses: [t("q4r1"), t("q4r2"), t("q4r3"), t("q4r4")] },
    { title: t("q5"), responses: [t("q5r1"), t("q5r2"), t("q5r3")] },
    { title: t("q6"), responses: [t("q6r1"), t("q6r2"), t("q6r3")] },
    { title: t("q7"), responses: [t("q7r1"), t("q7r2"), t("q7r3"), t("q7r4")] },
    { title: t("q8"), responses: [t("q8r1"), t("q8r2"), t("q8r3"), t("q8r4")] },
    { title: t("q9"), responses: [t("q9r1"), t("q9r2"), t("q9r3")] },
    { title: t("q10"), responses: [t("q10r1"), t("q10r2"), t("q10r3")] },
    { title: t("q11"), responses: [t("q11r1"), t("q11r2"), t("q11r3")] },
    { title: t("q12"), responses: [t("q12r1"), t("q12r2")] },
    { title: t("q13"), responses: [t("q13r1"), t("q13r2")] },
    { title: t("q14"), responses: [t("q14r1"), t("q14r2")] },
    { title: t("q15"), responses: [t("q15r1"), t("q15r2"), t("q15r3")] },
    { title: t("q16"), responses: [t("q16r1"), t("q16r2")] }
  ], [t])

  useEffect(() => {
    setResponses((prev) => {
      const newResponses = [...prev]
      newResponses[12] = "Yes ✅"
      newResponses[13] = "No 🚷"
      return newResponses
    })
  }, [])

  const [progress, setProgress] = useState<number>(2)
  const [indexPage, setIndexPage] = useState<number>(0)

  const [defaultChooses, setDefaultChooses] = useState<string[]>([])

  const [forceClose, setForceClose] = useState<boolean>(false)

  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [area1, setArea1] = useState<string>("")
  const [area2, setArea2] = useState<string>("")

  const randomDefault: (index: number, d: string[]) => string = (index: number, d: string[]) => {
    const randomIndex = Math.floor(Math.random() * d.length)
    return translate(`q${index + 1}r${randomIndex + 1}`, "en") || d[randomIndex]
  }

  const goNext: () => void = () => {
    setIndexPage((prev) => {
      if (prev + 2 >= questions.length)
        return prev
      setProgress(Math.round(((prev + 4) / questions.length) * 100))
      return prev + 2
    })
    if (indexPage + 2 >= questions.length) {
      window.localStorage.setItem("done", "1")
      setForceClose(true)
      fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "q1": responses[0],
          "q2": responses[1],
          "q3": responses[2],
          "q4": responses[3],
          "q5": responses[4],
          "q6": responses[5],
          "q7": responses[6],
          "q8": responses[7],
          "q9": responses[8],
          "q10": responses[9],
          "q11": responses[10],
          "q12": responses[11],
          "q13": responses[12].includes("Yes") ? area1 : "",
          "q14": responses[13].includes("Yes") ? area2 : "",
          "q15": responses[14],
          "q16": responses[15],
          "q17": phoneNumber
        })
      })
      .finally(() => {
        window.location.reload()
      })
    }
  }

  const goPrev: () => void = () => {
    setIndexPage((prev) => {
      const newIndex = Math.max(0, prev - 2)
      setProgress(Math.round((newIndex / questions.length) * 100))
      return newIndex
    })
  }

  useEffect(() => {
    const defaults = [
      randomDefault(indexPage, questions[indexPage].responses),
      randomDefault(indexPage + 1, questions[indexPage + 1].responses)
    ]
    setDefaultChooses(defaults)
    setResponses((prev) => {
      const newResponses = [...prev]
      if (newResponses[indexPage] === undefined) newResponses[indexPage] = defaults[0]
      if (newResponses[indexPage + 1] === undefined) newResponses[indexPage + 1] = defaults[1]
      return newResponses
    })
  }, [indexPage, questions])

  const addResponse: (index: number, value: string) => void = (index: number, value: string) => {
    setResponses((prev) => {
      const newResponses = [...prev]
      newResponses[index] = value
      return newResponses
    })
  }

  return (
    <div
      className={`fixed inset-0 w-full h-[100vh] z-[10000] ${start && !forceClose ? "visible opacity-100" : "invisible opacity-0"}
      transition-all duration-300 ease-linear backdrop-blur-md bg-white/50 dark:bg-black/50 flex items-center justify-center px-4 ${locale === "ar" && "font-arabic"}`}
      onClick={(e) => { close(!(e.currentTarget === e.target)) }}
    >
      <div className="w-full max-w-[468px] p-5 bg-white dark:bg-[#222] rounded-[8px] shadow-xl flex flex-col relative">
        <Progress value={progress} className="w-full" />

        {/* Page */}
        <div className="flex flex-col transition-all mt-2 duration-200 ease-linear">

          <span className={`my-4 font-[500] ${locale === "ar" ? "font-rubik" : "font-ubuntu"}`}> { questions[indexPage].title } </span>
          <RadioGroup value={responses[indexPage] || defaultChooses[0]} className="gap-1" onValueChange={(v) => addResponse(indexPage, v)}>

            { questions[indexPage].responses.map<React.JSX.Element>((r, key) => (
              
              <div className={`flex items-center gap-3 ${locale === "ar" && "flex-row-reverse"}`} key={key}>
                <RadioGroupItem value={translate(`q${indexPage + 1}r${key+1}`, "en")} id={`${r}-67`} />
                <label htmlFor={`${r}-67`} className="w-full"> {r} </label>
              </div>
            )) }

          </RadioGroup>

          { (indexPage === 12 && responses[indexPage].includes("Yes"))
            &&  <Textarea
                  placeholder={t("placeholder")}
                  className={`mt-4 text-[14px] ${locale === "ar" && "text-right"} max-h-[150px]`}
                  value={area1}
                  maxLength={400}
                  onChange={(v) => { setArea1(v.target.value) }}
                />
          }

          <span className={`my-4 font-[500] ${locale === "ar" ? "font-rubik" : "font-ubuntu"}`}> { questions[indexPage + 1].title } </span>
          <RadioGroup value={responses[indexPage + 1] || defaultChooses[1]} className="gap-1" onValueChange={(v) => addResponse(indexPage + 1, v)}>

            { questions[indexPage + 1].responses.map<React.JSX.Element>((r, key) => (
              <div className={`flex items-center gap-3 ${locale === "ar" && "flex-row-reverse"}`} key={key}>
                <RadioGroupItem value={translate(`q${indexPage + 2}r${key+1}`, "en")} id={`${r}-45`} />
                <label htmlFor={`${r}-45`} className="w-full"> {r} </label>
              </div>
            )) }

          </RadioGroup>

          { (indexPage === 12 && responses[indexPage + 1].includes("Yes"))
            &&  <Textarea
                  placeholder={t("placeholder")}
                  className={`mt-4 text-[14px] ${locale === "ar" && "text-right"} max-h-[150px]`}
                  value={area2}
                  maxLength={400}
                  onChange={(v) => { setArea2(v.target.value) }}
                />
          }

          { indexPage + 2 === questions.length &&
            <>
              <span className="my-4">
                { t("phone").split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                )) }
              </span>
              <PhoneInput
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value || "")} 
              />
            </>
          }

          <div className={`flex gap-2 items-center justify-between transition-all duration-300 ease ${locale === "ar" && "flex-row-reverse"}`}>
            { indexPage > 0 &&
              <button
                className="select-none w-full h-11 rounded-[5px] bg-[#d8fcf8] border border-[#26CDBC] mt-10 cursor-pointer transition-all duration-300 ease-linear hover:bg-[#c7f5ef]
                dark:text-[#111] dark:bg-[#aaf5ec]"
                onClick={() => goPrev()}
              >
                {t("previous")}
              </button>
            }
            <button
              className="select-none w-full h-11 rounded-[5px] bg-[#26CDBC] mt-10 cursor-pointer transition-all duration-300 ease-linear hover:bg-[#64bbb2]
              dark:text-[#111]"
              onClick={() => goNext()}
            >
              {indexPage + 2 >= questions.length ? t("finish") : t("next")}
            </button>
          </div>

        </div>
        {/* Page */}

      </div>
    </div>
  )
}
