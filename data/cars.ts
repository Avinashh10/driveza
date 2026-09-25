export type CarCategory = "Hatchback" | "Sedan" | "SUV";

export type Car = {
  id: number;
  name: string;
  image: string;
  pricePerDay: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  seats: number;
  availability: "Available" | "Booked";
  category: CarCategory;
};

export const cars: Car[] = [
  {
    id: 1,
    name: "Maruti Suzuki Swift",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85",
    pricePerDay: 2200,
    fuelType: "Petrol",
    seats: 5,
    availability: "Available",
    category: "Hatchback",
  },
  {
    id: 2,
    name: "Honda City",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85",
    pricePerDay: 3800,
    fuelType: "Petrol",
    seats: 5,
    availability: "Available",
    category: "Sedan",
  },
  {
    id: 3,
    name: "Hyundai Creta",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85",
    pricePerDay: 5200,
    fuelType: "Diesel",
    seats: 5,
    availability: "Available",
    category: "SUV",
  },
  {
    id: 4,
    name: "Toyota Innova Crysta",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=85",
    pricePerDay: 6800,
    fuelType: "Diesel",
    seats: 7,
    availability: "Booked",
    category: "SUV",
  },
  {
    id: 5,
    name: "Tata Nexon EV",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=85",
    pricePerDay: 4900,
    fuelType: "Electric",
    seats: 5,
    availability: "Available",
    category: "SUV",
  },
  {
    id: 6,
    name: "Hyundai Verna",
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1000&q=85",
    pricePerDay: 4100,
    fuelType: "Hybrid",
    seats: 5,
    availability: "Available",
    category: "Sedan",
  },
];
