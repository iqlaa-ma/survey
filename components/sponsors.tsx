"use client"
import Image from "next/image"

export default function Sponsors(): React.JSX.Element {
  return (
    <div className="w-full px-4 flex justify-center mt-32 max-md:mt-20">
      <div className="w-full max-w-[1188px] flex items-center justify-center gap-8 h-full max-md:gap-2">

        <Image
          src="/um6p.svg"
          unoptimized
          width={240}
          height={61}
          alt=" "
          draggable={false}
          quality={100}
          priority
          className="max-md:w-[170px]"
        />

        <Image
          src="/1337-b.svg"
          unoptimized
          width={200}
          height={61}
          alt=" "
          draggable={false}
          quality={100}
          priority
          className="block dark:hidden max-md:w-[130px]"
        />

        <Image
          src="/1337-w.svg"
          unoptimized
          width={200}
          height={61}
          alt=" "
          draggable={false}
          quality={100}
          priority
          className="hidden dark:block max-md:w-[130px]"
        />

      </div>
    </div>
  )
}