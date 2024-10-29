import { Metadata } from "next"
import { HeroSection } from "@modules/home/components/hero"
import FeaturedCategories from "@modules/home/components/featured-categories"
import NewArrivals from "@modules/home/components/new-arrivals"

export const metadata: Metadata = {
  title: "The Tiny Grand",
  description: "The Tiny Grand",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return (
    <>
      <HeroSection />
      <NewArrivals countryCode={countryCode} />
      <FeaturedCategories />
    </>
  )
}
