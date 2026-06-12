import { drizzle } from "drizzle-orm/node-postgres";
import { productsTable } from "../src/schema/index.js";
import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, {
  schema: { productsTable },
});

const products = [
  {
    name: "Hitachi EH5000AC-3 Mining Dump Truck",
    category: "mining-trucks",
    priceNgn: 45000000,
    priceUsd: 95000,
    description:
      "Heavy-duty rigid dump truck designed for maximum hauling capacity in mining operations. Features advanced hydraulic systems and enhanced fuel efficiency for continuous operation in demanding mining environments.",
    specs: JSON.stringify({
      capacity: "326 tons",
      horsepower: "627 HP",
      weight: "326,800 lbs",
      transmission: "Automatic",
      engineType: "Diesel",
      fuelCapacity: "750 gallons",
      groundClearance: "58 inches",
      wheelArrangement: "6x4",
    }),
    imageUrl: "/images/mining-truck-1.png",
    inStock: true,
    featured: true,
    brand: "Hitachi",
    model: "EH5000AC-3",
    year: 2024,
    condition: "new",
  },
  {
    name: "Komatsu HD785-8 Mechanical Haul Truck",
    category: "trucks",
    priceNgn: 35000000,
    priceUsd: 75000,
    description:
      "Versatile mechanical haul truck with 92.2 metric ton capacity. Engineered for reliability and performance in mining, quarrying, and heavy construction operations.",
    specs: JSON.stringify({
      capacity: "92.2 metric tons",
      horsepower: "1200 HP",
      weight: "365,967 lbs",
      transmission: "Automatic",
      engineType: "Diesel",
      fuelCapacity: "525 gallons",
      groundClearance: "53 inches",
      wheelArrangement: "6x4",
    }),
    imageUrl: "/images/cargo-truck-1.png",
    inStock: true,
    featured: true,
    brand: "Komatsu",
    model: "HD785-8",
    year: 2024,
    condition: "new",
  },
  {
    name: "Industrial Drilling Motor Equipment",
    category: "drilling-motors",
    priceNgn: 8500000,
    priceUsd: 18000,
    description:
      "Advanced industrial drilling motor for precision drilling operations. Features high torque output and variable speed control for diverse drilling applications.",
    specs: JSON.stringify({
      motorType: "Electric",
      powerOutput: "150 kW",
      torque: "850 Nm",
      rpm: "3000",
      voltage: "440V",
      efficiency: "95%",
      coolingType: "Forced Air",
      frameSize: "280M",
    }),
    imageUrl: "/images/drilling-motor-1.png",
    inStock: true,
    featured: true,
    brand: "Siemens",
    model: "1LE1 150 kW",
    year: 2024,
    condition: "new",
  },
  {
    name: "Cat 390F Mining Dump Truck",
    category: "mining-trucks",
    priceNgn: 42000000,
    priceUsd: 89000,
    description:
      "Caterpillar flagship mining dump truck with 218-ton payload capacity. Advanced telematics and fuel optimization systems for maximum operational efficiency.",
    specs: JSON.stringify({
      capacity: "218 tons",
      horsepower: "621 HP",
      weight: "305,700 lbs",
      transmission: "Automatic",
      engineType: "Diesel",
      fuelCapacity: "700 gallons",
      groundClearance: "56 inches",
      wheelArrangement: "6x4",
    }),
    imageUrl: "/images/mining-truck-2.png",
    inStock: true,
    featured: false,
    brand: "Caterpillar",
    model: "390F",
    year: 2023,
    condition: "new",
  },
  {
    name: "Volvo FH16 Heavy Cargo Truck",
    category: "trucks",
    priceNgn: 22000000,
    priceUsd: 45000,
    description:
      "Professional long-haul heavy cargo truck with ergonomic cabin design. Equipped with advanced safety features and fuel-efficient powertrain for demanding transport missions.",
    specs: JSON.stringify({
      capacity: "25 tons",
      horsepower: "540 HP",
      weight: "27,000 lbs",
      transmission: "Automatic",
      engineType: "Diesel",
      fuelCapacity: "300 gallons",
      groundClearance: "48 inches",
      wheelArrangement: "6x2",
    }),
    imageUrl: "/images/cargo-truck-2.png",
    inStock: true,
    featured: false,
    brand: "Volvo",
    model: "FH16 750",
    year: 2023,
    condition: "new",
  },
  {
    name: "Atlas Copco Drilling Motor System",
    category: "drilling-motors",
    priceNgn: 9200000,
    priceUsd: 19500,
    description:
      "Professional drilling motor system with integrated speed control. Designed for precision drilling in mining and geotechnical applications.",
    specs: JSON.stringify({
      motorType: "Electric",
      powerOutput: "185 kW",
      torque: "920 Nm",
      rpm: "3600",
      voltage: "440V",
      efficiency: "96%",
      coolingType: "Liquid",
      frameSize: "315M",
    }),
    imageUrl: "/images/drilling-motor-2.png",
    inStock: true,
    featured: false,
    brand: "Atlas Copco",
    model: "E-Drill Pro 185",
    year: 2024,
    condition: "new",
  },
];

async function seed() {
  try {
    console.log("Starting database seed...");

    // Clear existing products (optional - comment out to preserve existing data)
    // await db.delete(productsTable);

    // Insert products
    for (const product of products) {
      await db.insert(productsTable).values(product);
      console.log(`Inserted: ${product.name}`);
    }

    console.log("Database seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
