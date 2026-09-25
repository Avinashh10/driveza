# Driveza

Driveza is a car rental browsing and booking-request demo built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- Home page with an introduction, featured available cars, and links to browse and book.
- Car listing with search by name, category filtering, and maximum daily price filtering.
- Car cards show the car image, category, name, daily price, fuel type, seat count, and availability.
- Available cars have a **Book** action beside their details. It opens `/booking?carId=<id>` and preselects that car.
- Booked cars show **Not Available** and cannot be selected for a booking.
- Booking form collects the renter's name, phone number, email, rental dates, and car selection. It validates required fields, email and phone formats, dates, and car availability.
- The booking page shows the selected car's image and specifications and displays a confirmation message after a valid submission.

## Demo limitations

Booking submissions are only confirmed in the browser. They are not stored in a database or sent to a rental service. Car data is currently kept in `data/cars.ts`.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
