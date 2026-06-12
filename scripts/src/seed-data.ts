import { db, productsTable } from "../../lib/db/src/index";

async function seed() {
  console.log("🌱 Seeding database with expanded Garkuwan Kanam Ventures equipment...");

  const initialProducts = [
    {
      name: "Caterpillar 777G Haul Truck",
      category: "mining-trucks",
      priceNgn: 450000000,
      priceUsd: 300000,
      description: "Engineered for performance, designed for comfort, and built to last in the toughest mining environments.",
      specs: "Payload: 100 tons; Engine: Cat C32 ACERT; Gross Power: 1025 HP",
      brand: "Caterpillar",
      model: "777G",
      year: 2024,
      condition: "new",
      featured: true,
      imageUrl: "/attached_assets/generated_images/caterpillar_777g_off_highway_19c6.png"
    },
    {
      name: "FAW J6P Heavy Cargo Transport",
      category: "trucks",
      priceNgn: 95000000,
      priceUsd: 62000,
      description: "High-capacity cargo transport designed for long-haul reliability and fuel efficiency.",
      specs: "Engine: 420HP; Payload: 40 Tons; Drive: 6x4; Transmission: Manual",
      brand: "FAW",
      model: "J6P",
      year: 2024,
      condition: "new",
      featured: true,
      imageUrl: "/attached_assets/generated_images/faw_heavy_cargo_transport_7f63.png"
    },
    {
      name: "Downhole Mud Motor Drilling System",
      category: "drilling-motors",
      priceNgn: 75000000,
      priceUsd: 50000,
      description: "Advanced downhole mud motor for precision borehole drilling and directional control.",
      specs: "Type: Progressive Cavity; Torque: High; Flow Rate: Optimized for deep wells",
      brand: "Industrial",
      model: "DH-5000",
      year: 2024,
      condition: "new",
      featured: true,
      imageUrl: "/attached_assets/generated_images/downhole_mud_motor_drilling_4cf9.png"
    },
    {
      name: "Mercedes-Benz Actros Tractor Unit",
      category: "trucks",
      priceNgn: 155000000,
      priceUsd: 105000,
      description: "Premium heavy-duty tractor unit offering unmatched durability and driver safety for long-haul transport.",
      specs: "Engine: V6 Turbo; Drive: 4x2; Transmission: PowerShift 3",
      brand: "Mercedes-Benz",
      model: "Actros",
      year: 2023,
      condition: "refurbished",
      featured: false,
      imageUrl: "/attached_assets/generated_images/mercedes_benz_actros_heavy_4ec0.png"
    },
    {
      name: "Caterpillar 773G Haul Truck",
      category: "mining-trucks",
      priceNgn: 320000000,
      priceUsd: 215000,
      description: "Mid-sized mining truck offering high productivity and low cost per ton.",
      specs: "Payload: 60 tons; Engine: Cat C27 ACERT; Gross Power: 822 HP",
      brand: "Caterpillar",
      model: "773G",
      year: 2023,
      condition: "new",
      featured: false,
      imageUrl: "/attached_assets/generated_images/caterpillar_773g_haul_truck_c6b7.png"
    },
    {
      name: "Iveco Trakker Tipper Truck",
      category: "trucks",
      priceNgn: 110000000,
      priceUsd: 75000,
      description: "Rugged tipper truck built for off-road construction sites and heavy load carrying.",
      specs: "Engine: Cursor 13; Drive: 8x4; Capacity: 20 Cubic Meters",
      brand: "Iveco",
      model: "Trakker",
      year: 2022,
      condition: "used",
      featured: false,
      imageUrl: "/attached_assets/generated_images/iveco_trakker_tipper_dump_d6a3.png"
    },
    {
      name: "Caterpillar D8T Crawler Dozer",
      category: "mining-trucks",
      priceNgn: 280000000,
      priceUsd: 190000,
      description: "Powerful crawler dozer for heavy earthmoving, land clearing, and site preparation.",
      specs: "Engine: Cat C15 ACERT; Net Power: 310 HP; Operating Weight: 39,420 kg",
      brand: "Caterpillar",
      model: "D8T",
      year: 2023,
      condition: "new",
      featured: false,
      imageUrl: "/attached_assets/generated_images/caterpillar_d8t_crawler_dozer_e8d7.png"
    }
  ];

  try {
    console.log("⏳ Inserting products...");
    await db.insert(productsTable).values(initialProducts);
    console.log("✅ Successfully seeded " + initialProducts.length + " products with correct metadata!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seed();
