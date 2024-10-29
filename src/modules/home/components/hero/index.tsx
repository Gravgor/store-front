import { Button } from "@medusajs/ui";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="max-w-[1440px] mx-auto flex flex-col-reverse lg:flex-row items-center px-4 py-16">
      <div className="flex-1">
        <Image 
          src="/handbag.jpg"
          alt="Featured handbag"
          width={800}
          height={800}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex-1 flex flex-col gap-6 max-w-[600px] mb-10 lg:mb-0">
        <h1 className="text-5xl font-bold leading-tight">
          Shop the best Deals on Top Brands & Unique Finds
        </h1>
        <p className="text-gray-600 text-lg">
          From everyday essentials to rare gems, we've got something for everyone.
        </p>
        <div>
          <Button 
            variant="primary"
            className="bg-black text-white px-8 py-4 rounded-md text-lg hover:opacity-90"
          >
            Shop now
          </Button>
        </div>
      </div>
    </div>
  )
}
