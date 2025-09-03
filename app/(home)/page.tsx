import Footer from "@/components/footer"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Sponsors from "@/components/sponsors"
import Faqs from "@/components/faqs"

export default function Home(): React.JSX.Element {
  return (
    <>
      <Header />
      <Hero />
      <Sponsors />
      <Faqs />
      <Footer />
    </>
  )
}