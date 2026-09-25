"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { cars } from "@/data/cars";

type BookingValues = {
  fullName: string;
  contactNumber: string;
  email: string;
  startDate: string;
  endDate: string;
  carId: string;
};

type BookingField = keyof BookingValues;
type BookingErrors = Partial<Record<BookingField, string>>;

type BookingConfirmation = {
  name: string;
  carName: string;
  startDate: string;
  endDate: string;
};

const initialValues: BookingValues = {
  fullName: "",
  contactNumber: "",
  email: "",
  startDate: "",
  endDate: "",
  carId: "",
};

function getLocalDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BookingForm() {
  const searchParams = useSearchParams();
  const requestedCarId = searchParams.get("carId") ?? "";
  const initialCarId = cars.some(
    (car) => String(car.id) === requestedCarId && car.availability === "Available",
  )
    ? requestedCarId
    : "";
  const [values, setValues] = useState<BookingValues>(() => ({
    ...initialValues,
    carId: initialCarId,
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );
  const selectedCar = cars.find((car) => car.id === Number(values.carId));

  function updateField(field: BookingField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setConfirmation(null);
  }

  function validateBooking() {
    const nextErrors: BookingErrors = {};
    const today = getLocalDateString();

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Enter your full name.";
    }

    const phoneDigits = values.contactNumber.replace(/\D/g, "");
    if (!values.contactNumber.trim()) {
      nextErrors.contactNumber = "Enter your contact number.";
    } else if (
      !/^\+?[\d\s()-]+$/.test(values.contactNumber.trim()) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      nextErrors.contactNumber = "Enter a valid number with 7 to 15 digits.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.startDate) {
      nextErrors.startDate = "Select a rental start date.";
    } else if (values.startDate < today) {
      nextErrors.startDate = "The start date cannot be in the past.";
    }

    if (!values.endDate) {
      nextErrors.endDate = "Select a rental end date.";
    } else if (values.startDate && values.endDate < values.startDate) {
      nextErrors.endDate = "The end date cannot be before the start date.";
    }

    if (!values.carId) {
      nextErrors.carId = "Choose a car for your rental.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBooking();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setConfirmation(null);
      return;
    }

    if (!selectedCar || selectedCar.availability !== "Available") {
      setErrors({ carId: "Choose a car that is currently available." });
      return;
    }

    setConfirmation({
      name: values.fullName.trim(),
      carName: selectedCar.name,
      startDate: values.startDate,
      endDate: values.endDate,
    });
  }

  const inputClassName =
    "mt-2 h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-[#202020] outline-none placeholder:text-[#777777] focus:border-[#181818] focus:ring-2 focus:ring-stone-200";

  function fieldError(field: BookingField) {
    return errors[field] ? (
      <span id={`${field}-error`} className="mt-1.5 block text-sm text-red-700">
        {errors[field]}
      </span>
    ) : null;
  }

  return (
    <main className="min-h-screen bg-[#f7f7f3]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#202020]">
            Reserve your ride
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#202020] sm:text-4xl">
            Book a car
          </h1>
          <p className="mt-3 text-base leading-7 text-[#777777]">
            Share your details and rental dates to send a booking request.
          </p>
        </div>

        {confirmation && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-emerald-700 bg-emerald-950 p-5 text-emerald-100"
          >
            <h2 className="font-semibold">Booking request received</h2>
            <p className="mt-1 text-sm leading-6">
              Thanks, {confirmation.name}. Your request for the {confirmation.carName} from{" "}
              {formatDate(confirmation.startDate)} to {formatDate(confirmation.endDate)} has been
              submitted successfully.
            </p>
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <form
            noValidate
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-[#e5e3dd] bg-white p-5 shadow-sm sm:p-8"
          >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-[#777777]">
              Full name
              <input
                type="text"
                autoComplete="name"
                value={values.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={inputClassName}
                placeholder="Your full name"
              />
              {fieldError("fullName")}
            </label>

            <label className="block text-sm font-medium text-[#777777]">
              Contact number
              <input
                type="tel"
                autoComplete="tel"
                value={values.contactNumber}
                onChange={(event) => updateField("contactNumber", event.target.value)}
                aria-invalid={Boolean(errors.contactNumber)}
                aria-describedby={errors.contactNumber ? "contactNumber-error" : undefined}
                className={inputClassName}
                placeholder="e.g. +91 98765 43210"
              />
              {fieldError("contactNumber")}
            </label>

            <label className="block text-sm font-medium text-[#777777] sm:col-span-2">
              Email
              <input
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClassName}
                placeholder="you@example.com"
              />
              {fieldError("email")}
            </label>

            <label className="block text-sm font-medium text-[#777777]">
              Rental start date
              <input
                type="date"
                min={getLocalDateString()}
                value={values.startDate}
                onChange={(event) => updateField("startDate", event.target.value)}
                aria-invalid={Boolean(errors.startDate)}
                aria-describedby={errors.startDate ? "startDate-error" : undefined}
                className={inputClassName}
              />
              {fieldError("startDate")}
            </label>

            <label className="block text-sm font-medium text-[#777777]">
              Rental end date
              <input
                type="date"
                min={values.startDate || getLocalDateString()}
                value={values.endDate}
                onChange={(event) => updateField("endDate", event.target.value)}
                aria-invalid={Boolean(errors.endDate)}
                aria-describedby={errors.endDate ? "endDate-error" : undefined}
                className={inputClassName}
              />
              {fieldError("endDate")}
            </label>

            <label className="block text-sm font-medium text-[#777777] sm:col-span-2">
              Select a car
              <select
                value={values.carId}
                onChange={(event) => updateField("carId", event.target.value)}
                aria-invalid={Boolean(errors.carId)}
                aria-describedby={errors.carId ? "carId-error" : undefined}
                className={inputClassName}
              >
                <option value="">Choose an available car</option>
                {cars.map((car) => (
                  <option
                    key={car.id}
                    value={car.id}
                    disabled={car.availability !== "Available"}
                  >
                    {car.name} — ₹{car.pricePerDay.toLocaleString("en-IN")}/day
                    {car.availability !== "Available" ? " (Booked)" : ""}
                  </option>
                ))}
              </select>
              {fieldError("carId")}
            </label>
          </div>

          <div className="border-t border-[#e5e3dd] pt-5">
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#181818] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b2b2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#181818] sm:w-auto"
            >
              Submit booking request
            </button>
            <p className="mt-3 text-xs leading-5 text-[#777777]">
              This demo shows a confirmation on this page; it does not save a booking to a server.
            </p>
          </div>
          </form>

          <aside className="overflow-hidden rounded-2xl border border-[#e5e3dd] bg-white shadow-sm lg:sticky lg:top-6">
            <div className="border-b border-[#e5e3dd] px-5 py-4">
              <h2 className="text-lg font-semibold text-[#202020]">
                Selected Car
              </h2>
            </div>

            {selectedCar ? (
              <>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="h-full w-full object-cover"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedCar.availability === "Available"
                        ? "bg-emerald-950 text-emerald-200"
                        : "bg-stone-100 text-[#777777]"
                    }`}
                  >
                    {selectedCar.availability}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#202020]">
                    {selectedCar.category}
                  </p>
                  <div className="mt-1 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-[#202020]">
                      {selectedCar.name}
                    </h3>
                    <p className="shrink-0 text-right text-lg font-bold text-[#202020]">
                      ₹{selectedCar.pricePerDay.toLocaleString("en-IN")}
                      <span className="block text-xs font-normal text-[#777777]">
                        per day
                      </span>
                    </p>
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-[#e5e3dd] pt-4 text-sm">
                    <div>
                      <dt className="text-[#777777]">Fuel type</dt>
                      <dd className="mt-1 font-medium text-[#202020]">
                        {selectedCar.fuelType}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#777777]">Seats</dt>
                      <dd className="mt-1 font-medium text-[#202020]">
                        {selectedCar.seats} seats
                      </dd>
                    </div>
                  </dl>
                </div>
              </>
            ) : (
              <div className="flex min-h-56 items-center justify-center px-6 py-10 text-center">
                <div>
                  <div
                    aria-hidden="true"
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-[#777777]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        d="M3 13.5 5.2 7a2 2 0 0 1 1.9-1.4h9.8A2 2 0 0 1 18.8 7l2.2 6.5v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1V17H6.5v1.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.5 13.5h17M7 16h.01M17 16h.01"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-medium text-stone-800">
                    Select a car to see its details
                  </p>
                  <p className="mt-1 text-xs text-[#777777]">
                    Car information will appear here.
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f7f7f3]" />}>
      <BookingForm />
    </Suspense>
  );
}
