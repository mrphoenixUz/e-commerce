import { Instagram, LinkedIn, RateReview, Twitter } from "@mui/icons-material"
import Image from "next/image"
// import { Twitter, Instagram, Linkedin } from "lucide-react"
import left from "@/images/left-side.png"
import tom from "@/images/tom.png"
import emma from "@/images/emma.png"
import will from "@/images/will.png"

export default function AboutPage() {
  const stats = [
    { number: "10.5k", label: "Sellers active our site" },
    { number: "33k", label: "Monthly Product sale", highlight: true },
    { number: "45.5k", label: "Customer active in our site" },
    { number: "25k", label: "Annual gross sale in our site" },
  ]

  const team = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      image: tom.src,
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      image: emma.src,
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      image: will.src,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <div className="space-y-4 text-gray-600">
            <p>
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in
              Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has
              10,500 sellers and 300 brands and serves 5 millions customers across the region.
            </p>
            <p>
              Exclusive has more than 1 billion products to offer, growing at a very fast. Exclusive offers a diverse
              assortment in categories ranging from consumer.
            </p>
          </div>
        </div>
        <div className="relative  w-full">
          <img
            src={left.src}
            alt="Shopping people"
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 text-center border rounded-lg ${stat.highlight ? "bg-red-500 text-white" : "bg-white"}`}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xl"><RateReview className="text-black"/></span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-2">{stat.number}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <div className="relative h-[400px] w-full mb-4 flex justify-center">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                // fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            <p className="text-gray-600 mb-3">{member.role}</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                <LinkedIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      {/* <div className="flex justify-center space-x-2 mt-8">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-red-500" : "bg-gray-300"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div> */}
    </div>
  )
}

