import Link from "next/link";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Cars", href: "/cars" },
  { label: "Booking", href: "/booking" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-[#171717]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Driveza
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#D4D4D4] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cars"
          className="hidden rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:inline-flex"
        >
          Find a car
        </Link>

        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#D4D4D4] hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
            Menu
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 transition-transform group-open:rotate-180"
            >
              <path
                d="m5 7.5 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <div className="absolute right-0 top-full z-10 mt-2 flex min-w-44 flex-col rounded-xl border border-neutral-800 bg-[#171717] p-2 shadow-lg">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#D4D4D4] hover:bg-neutral-800 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cars"
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Find a car
            </Link>
          </div>
        </details>
      </nav>
    </header>
  );
}
