import Link from "next/link";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

const featuredCars = cars
  .filter((car) => car.availability === "Available")
  .slice(0, 4);

export default function Home() {
  return (
    <main className="bg-[#f7f7f3]">
      <section id="home" className="scroll-mt-20 overflow-hidden bg-[#171717] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4D4D4]">
              Your next journey starts here
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The right car makes every trip better.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#D4D4D4] sm:text-lg">
              Find a comfortable, reliable ride for your next commute, weekend
              escape, or family adventure. Choose your car and book in minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cars"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#181818] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b2b2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore cars
              </Link>
              <Link
                href="/booking"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#181818] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b2b2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Book a car
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#D4D4D4]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Cars for every kind of trip
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Clear daily pricing
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-stone-100/20 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-stone-100 shadow-2xl sm:aspect-[16/10]">
              {/* Reuse the existing car image data for the homepage visual. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cars[2].image}
                alt="A modern SUV ready for a road trip"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-xl border border-white/15 bg-[#171717]/80 px-4 py-3 backdrop-blur sm:bottom-6 sm:left-6">
                <p className="text-xs font-medium text-[#D4D4D4]">Make room for</p>
                <p className="mt-0.5 font-semibold text-white">the journey ahead</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#202020]">
              About Driveza
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#202020] sm:text-4xl">
              A simpler way to get where you want to go.
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-[#777777]">
              We make it easy to find a car that fits your plans. Browse a
              thoughtful range of vehicles, compare the details that matter,
              and send your booking request in just a few steps.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="border-l-2 border-stone-700 pl-4">
                <h3 className="font-semibold text-[#202020]">The right fit</h3>
                <p className="mt-1 text-sm leading-6 text-[#777777]">
                  From city cars to roomy SUVs.
                </p>
              </div>
              <div className="border-l-2 border-stone-700 pl-4">
                <h3 className="font-semibold text-[#202020]">Clear details</h3>
                <p className="mt-1 text-sm leading-6 text-[#777777]">
                  See daily prices and car features.
                </p>
              </div>
              <div className="border-l-2 border-stone-700 pl-4">
                <h3 className="font-semibold text-[#202020]">Simple booking</h3>
                <p className="mt-1 text-sm leading-6 text-[#777777]">
                  Send your request online with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cars" className="scroll-mt-20 bg-[#f7f7f3]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#202020]">
                Handpicked for your next trip
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#202020] sm:text-4xl">
                Featured cars
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#777777]">
                Take a look at a few of the cars available in our collection.
              </p>
            </div>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#202020] hover:text-[#777777]"
            >
              View all cars <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#171717] px-6 py-8 text-white sm:px-10 sm:py-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-200">
              Ready when you are
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Your next trip is closer than you think.
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-200 sm:text-base">
              Find your car, choose your dates, and send us your booking request.
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-[#181818] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b2b2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Find your car
          </Link>
        </div>
      </section>
    </main>
  );
}
