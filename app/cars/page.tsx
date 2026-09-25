"use client";

import { useState } from "react";
import CarCard from "@/components/CarCard";
import { cars, type CarCategory } from "@/data/cars";

const categories: ("All types" | CarCategory)[] = [
  "All types",
  "Hatchback",
  "Sedan",
  "SUV",
];

const priceLimits = [
  { label: "Any price", value: 0 },
  { label: "Up to ₹3,000 / day", value: 3000 },
  { label: "Up to ₹5,000 / day", value: 5000 },
  { label: "Up to ₹7,000 / day", value: 7000 },
];

export default function CarsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All types");
  const [maxPrice, setMaxPrice] = useState(0);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === "All types" || car.category === category;
    const matchesPrice = maxPrice === 0 || car.pricePerDay <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <main className="min-h-screen bg-[#f7f7f3]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#202020]">
            Find your drive
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#202020] sm:text-4xl">
            Explore our cars
          </h1>
          <p className="mt-3 text-base leading-7 text-[#777777]">
            Choose a car that fits your trip, with clear daily pricing and the
            details you need to decide.
          </p>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-[#e5e3dd] bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(0,1fr)_220px_240px]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#777777]">
              Search cars
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or model"
              className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-[#202020] outline-none placeholder:text-[#777777] focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#777777]">
              Car type
            </span>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as (typeof categories)[number])
              }
              className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-[#202020] outline-none focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2 lg:col-span-1">
            <span className="mb-2 block text-sm font-medium text-[#777777]">
              Maximum daily price
            </span>
            <select
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-[#202020] outline-none focus:border-stone-700 focus:ring-2 focus:ring-stone-200"
            >
              {priceLimits.map((limit) => (
                <option key={limit.value} value={limit.value}>
                  {limit.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#202020]">Car listings</h2>
          <p className="text-sm text-[#777777]" aria-live="polite">
            {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}
          </p>
        </div>

        {filteredCars.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
            <h3 className="text-lg font-semibold text-[#202020]">No cars found</h3>
            <p className="mt-2 text-sm text-[#777777]">
              Try a different search term or adjust your filters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
