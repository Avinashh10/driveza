import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Browse cars", href: "/cars" },
  { label: "Book a car", href: "/booking" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#171717] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_0.7fr_1fr] md:py-14">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight">
            Driveza
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-300">
            Find the right ride for the road ahead. Browse our cars and send a
            booking request in just a few steps.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link className="transition-colors hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Get in touch</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-stone-300">
            <p>
              Email: <a className="hover:text-white" href="mailto:hello@driveza.com">hello@driveza.com</a>
            </p>
            <p>
              Phone: <a className="hover:text-white" href="tel:+911800123456">+91 1800 123 456</a>
            </p>
          </address>
          <div className="mt-5 flex gap-4 text-sm">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-stone-300 transition-colors hover:text-white"
              aria-label="Instagram (opens in a new tab)"
            >
              Instagram <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="text-stone-300 transition-colors hover:text-white"
              aria-label="Facebook (opens in a new tab)"
            >
              Facebook <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-stone-400 sm:px-8">
          © {new Date().getFullYear()} Driveza. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
