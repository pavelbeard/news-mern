import { client } from "./client";
import { News } from "./models/news.models";
import { INews } from "./schemas/news.schema";

export const newsArticles: INews[] = [
  {
    title: "AI Breakthrough in Language Translation",
    description:
      "A new model surpasses human-level accuracy in multilingual translation.",
    date: new Date("2025-07-01"),
    content: `Researchers have developed a new AI language model that achieves unprecedented accuracy in translation tasks.

The model has been tested across 50 languages and shows superior performance over traditional methods.

Experts believe this could revolutionize international communication and education.`,
    author: "Jane Smith",
  },
  {
    title: "Solar Flares Threaten Satellite Systems",
    description:
      "Strong solar activity expected this week may disrupt communications.",
    date: new Date("2025-07-02"),
    content: `NASA issued a warning about solar flares that could impact satellite-based systems.

Telecommunications and GPS services might experience temporary outages or delays.

Agencies worldwide are preparing for potential disruptions and advising precautions.`,
    author: "Michael Johnson",
    archiveDate: new Date("2026-01-01"),
  },
  {
    title: "New Legislation on Remote Work Passes",
    description:
      "The government approves new rights for remote workers nationwide.",
    date: new Date("2025-07-03"),
    content: `A bill supporting remote employees has passed with overwhelming support.

It includes regulations on working hours, internet subsidies, and home office tax deductions.

Companies are now required to offer equal benefits for remote and in-office roles.`,
    author: "Laura Chen",
  },
  {
    title: "Ocean Cleanup Efforts Expand in the Pacific",
    description: "New technology helps remove plastic waste more efficiently.",
    date: new Date("2025-07-04"),
    content: `The OceanBlue initiative has launched an upgraded fleet of cleanup drones.

They can collect up to 10 tons of plastic per week in the Great Pacific Garbage Patch.

Marine biologists say this could drastically improve marine biodiversity.`,
    author: "David Thompson",
  },
  {
    title: "Virtual Reality in Schools Gains Popularity",
    description:
      "VR headsets are transforming classrooms and learning experiences.",
    date: new Date("2025-07-05"),
    content: `Over 500 schools have introduced virtual reality for history, science, and geography lessons.

Teachers report higher engagement and retention among students.

Funding is now being allocated to scale VR access across all public schools.`,
    author: "Sara Williams",
  },
  {
    title: "Tech Giants Agree on AI Ethics Guidelines",
    description: "Companies commit to safer AI development practices.",
    date: new Date("2025-07-06"),
    content: `Leading tech firms signed a joint agreement outlining AI safety and ethics.

The pact includes transparency requirements and bias detection obligations.

This marks a major step toward responsible development of generative models.`,
    author: "Robert Garcia",
  },
  {
    title: "Record-Breaking Heatwaves Hit Europe",
    description: "Temperatures soar above 45°C across southern regions.",
    date: new Date("2025-07-07"),
    content: `Meteorologists confirm one of the hottest summers in recorded history.

Several countries have issued emergency alerts and hydration guidelines.

Climate experts link the extreme heat to accelerating global warming trends.`,
    author: "Isabella Moreno",
  },
  {
    title: "Mars Rover Discovers Unusual Rock Formations",
    description:
      "The latest rover finds formations that suggest volcanic activity.",
    date: new Date("2025-07-08"),
    content: `NASA’s Perseverance rover captured images of layered rock structures.

These patterns resemble ancient volcanic processes rather than erosion.

Scientists are now analyzing soil samples for more clues about Mars' history.`,
    author: "Alex Turner",
    archiveDate: new Date("2026-01-08"),
  },
  {
    title: "Electric Cars Outsell Gas Vehicles in Q2",
    description:
      "EVs surpass traditional cars in global quarterly sales for the first time.",
    date: new Date("2025-07-09"),
    content: `Sales data reveals a 55% share for electric vehicles in Q2 2025.

Experts attribute the shift to falling prices and wider charging infrastructure.

Legacy automakers are accelerating EV model releases in response.`,
    author: "Emily Clark",
  },
  {
    title: "Breakthrough in Alzheimer’s Research",
    description: "New drug shows promise in slowing cognitive decline.",
    date: new Date("2025-07-10"),
    content: `Pharmaceutical researchers announced positive results from clinical trials.

The new treatment targets amyloid proteins linked to memory loss.

If approved, the drug could become available by late 2026.`,
    author: "Daniel Rivera",
  },
  {
    title: "Global Biodiversity Summit Opens in Brazil",
    description: "Leaders gather to discuss ecosystem preservation strategies.",
    date: new Date("2025-07-11"),
    content: `The summit highlights urgent action needed to prevent mass extinctions.

Delegates propose funding for rainforest protection and sustainable agriculture.

Activists praise the inclusion of Indigenous communities in policy-making.`,
    author: "Fatima El-Sayed",
  },
  {
    title: "Quantum Computing Makes Leap in Speed",
    description: "New qubit architecture allows 10x faster calculations.",
    date: new Date("2025-07-12"),
    content: `A leading university has unveiled a breakthrough in quantum hardware.

The prototype performs complex simulations in seconds that took hours before.

Startups are racing to commercialize the architecture within 3 years.`,
    author: "Liam O'Connor",
  },
  {
    title: "Major Cyberattack Hits Global Banking Systems",
    description: "Hackers exploit zero-day vulnerability in financial APIs.",
    date: new Date("2025-07-13"),
    content: `Several banks reported outages and unusual transactions early Sunday.

The exploit targeted outdated authentication flows in legacy systems.

Authorities are cooperating internationally to trace the attack’s origin.`,
    author: "Priya Natarajan",
    archiveDate: new Date("2025-12-31"),
  },
  {
    title: "Urban Farming Expands in European Cities",
    description: "Rooftop gardens and vertical farms see rising investments.",
    date: new Date("2025-07-14"),
    content: `Urban planners are integrating food production into building designs.

Residents benefit from fresh produce and improved air quality.

This trend supports sustainable city development with lower emissions.`,
    author: "Nina Petrova",
  },
  {
    title: "New eBook Platform Challenges Amazon’s Monopoly",
    description: "Independent authors flock to a royalty-friendly marketplace.",
    date: new Date("2025-07-15"),
    content: `Start-up “LibreReads” launched with higher revenue shares for writers.

Within weeks, it amassed over 1 million downloads and hundreds of sign-ups.

Authors are praising its editorial tools and community support model.`,
    author: "Tom Becker",
  },
  {
    title: "Drone Deliveries Approved Nationwide",
    description:
      "New regulations allow drones to deliver parcels in urban zones.",
    date: new Date("2025-07-16"),
    content: `The civil aviation authority has cleared commercial drone operations.

Retailers can now offer same-hour delivery options for select items.

Privacy advocates are calling for strict tracking limits and transparency.`,
    author: "Alicia Fernández",
  },
  {
    title: "Plastic Bottle Ban in Major Supermarkets",
    description: "Retailers replace plastic with biodegradable packaging.",
    date: new Date("2025-07-17"),
    content: `Several chains are phasing out single-use plastic bottles by the end of the year.

They’ll be replaced with compostable or reusable alternatives.

Environmental groups are applauding this step toward reducing waste.`,
    author: "Jonas Schmidt",
  },
  {
    title: "Global Youth Activists Launch Climate App",
    description: "App lets users track emissions, habits, and impact.",
    date: new Date("2025-07-18"),
    content: `The “EcoSteps” app gamifies sustainable living with badges and social features.

It helps users reduce their carbon footprint and track daily improvements.

Schools and NGOs plan to adopt the app in their environmental programs.`,
    author: "Chloe Wang",
  },
  {
    title: "Art Auction Breaks Records with Digital Pieces",
    description: "NFT-based artworks fetch millions at New York event.",
    date: new Date("2025-07-19"),
    content: `A digital art piece sold for $12 million, breaking previous auction records.

The sale marks growing acceptance of blockchain-based ownership in the art world.

Collectors cite traceability and uniqueness as major benefits.`,
    author: "Carlos Ruiz",
  },
  {
    title: "Revolutionary Battery Charges in 5 Minutes",
    description: "New chemical structure drastically reduces charging time.",
    date: new Date("2025-07-20"),
    content: `Engineers announced a lithium-silicon battery that charges to 80% in 5 minutes.

It retains capacity after over 1000 cycles, making it viable for EVs.

Manufacturers aim to integrate the battery into consumer products by 2026.`,
    author: "Mei Tanaka",
  },
];

export async function seedDb() {
  try {
    await client(process.env.MONGODB_URL ?? "mongodb://localhost:27018")
      .then(() => console.log("Connected to database."))
      .catch(() => console.error("Error while connecting to database."));

    const existingNews = await News.find({ title: newsArticles[0]?.title });

    if (existingNews.length === 0) {
      await News.bulkSave(newsArticles.map((n) => new News({ ...n })));
      console.log("Database is seeded");
      return process.exit(0);
    }

    console.log("Seed already exists. Skipping...");
    return process.exit(0);
  } catch (e) {
    if (e instanceof Error && e.message.includes('with "0"')) {
      return;
    }

    console.error(e);
    return process.exit(1);
  }
}

seedDb()
  .then()
  .catch(() => console.error("Error while seeding database"));
