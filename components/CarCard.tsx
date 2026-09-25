import type { Car } from "@/data/cars";
import Link from "next/link";

type CarCardProps = {
  car: Car;
};

const priceFormatter = new Intl.NumberFormat("en-IN");

export default function CarCard({ car }: CarCardProps) {
  const isAvailable = car.availability === "Available";

  return (
    <article className="overflow-hidden rounded-2xl border border-[#e5e3dd] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        {/* Remote image URLs keep this demo self-contained without image configuration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            isAvailable
              ? "bg-emerald-950 text-emerald-200"
              : "bg-stone-100 text-[#777777]"
          }`}
        >
          {car.availability}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#202020]">
              {car.category}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[#202020]">
              {car.name}
            </h2>
          </div>
          <p className="shrink-0 text-right text-lg font-bold text-[#202020]">
            ₹{priceFormatter.format(car.pricePerDay)}
            <span className="block text-xs font-normal text-[#777777]">
              per day
            </span>
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e3dd] pt-4">
          <div className="flex items-center gap-3 text-sm text-[#777777]">
            <span>{car.fuelType}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-stone-300" />
            <span>{car.seats} seats</span>
          </div>
          {isAvailable ? (
            <Link
              href={`/booking?carId=${car.id}`}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#181818] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2b2b2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181818]"
            >
              Book
            </Link>
          ) : (
            <span className="inline-flex min-h-10 items-center justify-center rounded-lg bg-stone-100 px-3 py-2 text-xs font-semibold text-[#777777]">
              Not Available
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
