import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const cityCenter = await db.location.upsert({
    where: { slug: "city-centre" },
    update: {},
    create: { name: "City Centre", slug: "city-centre" },
  });

  const westCambridge = await db.location.upsert({
    where: { slug: "west-cambridge" },
    update: {},
    create: { name: "West Cambridge", slug: "west-cambridge" },
  });

  const studentLife = await db.category.upsert({
    where: { slug: "student-life" },
    update: {},
    create: { name: "Student Life", slug: "student-life" },
  });

  const foodDrink = await db.category.upsert({
    where: { slug: "food-drink" },
    update: {},
    create: { name: "Food & Drink", slug: "food-drink" },
  });

  const gettingAround = await db.category.upsert({
    where: { slug: "getting-around" },
    update: {},
    create: { name: "Getting Around", slug: "getting-around" },
  });

  const amelia = await db.expert.upsert({
    where: { slug: "amelia-hayes" },
    update: {},
    create: {
      name: "Amelia Hayes",
      slug: "amelia-hayes",
      bio: "PhD student in History at Pembroke College. Cambridge native who loves uncovering the city's hidden stories.",
      role: "Local Historian",
      locationId: cityCenter.id,
    },
  });

  const priya = await db.expert.upsert({
    where: { slug: "priya-sharma" },
    update: {},
    create: {
      name: "Priya Sharma",
      slug: "priya-sharma",
      bio: "Computer Science graduate, now working at ARM. Expert on the tech scene and student hacks for living in Cambridge.",
      role: "Tech Professional",
      locationId: westCambridge.id,
    },
  });

  const oliver = await db.expert.upsert({
    where: { slug: "oliver-chen" },
    update: {},
    create: {
      name: "Oliver Chen",
      slug: "oliver-chen",
      bio: "Third-year undergraduate at King's College. Cyclist, punter, and self-appointed guide to the best cheap eats in Cambridge.",
      role: "Undergraduate Student",
      locationId: cityCenter.id,
    },
  });

  await db.guide.upsert({
    where: { slug: "cycling-cambridge-beginners-guide" },
    update: {},
    create: {
      title: "Cycling Cambridge: A Beginner's Guide",
      slug: "cycling-cambridge-beginners-guide",
      body: `Cambridge is one of the most cycle-friendly cities in the UK. With over 50% of residents commuting by bike, getting around on two wheels is both practical and joyful.\n\n## Where to Hire a Bike\n\nIf you don't have your own bike yet, Rutland Cycling near the train station offers day and weekly rentals. Alternatively, the city's Beryl bike-share scheme has stations across the centre.\n\n## Key Routes\n\n**Station to City Centre:** Follow Hills Road then turn onto Regent Street — mostly flat and well-signposted.\n\n**The Backs:** A scenic path behind the main colleges. Take a detour along the river for the classic Cambridge view.\n\n**West Cambridge:** Huntingdon Road is wide and has a dedicated cycle lane, perfect for reaching the science parks.\n\n## Safety Tips\n\n- Always lock your bike — theft is common near the market square.\n- Use lights at night; police do give fines without them.\n- Watch for pedestrians stepping out from between parked cars on King Street.`,
      authorId: priya.id,
      categoryId: gettingAround.id,
      publishedAt: new Date("2026-04-01"),
    },
  });

  await db.guide.upsert({
    where: { slug: "best-cheap-eats-cambridge-students" },
    update: {},
    create: {
      title: "Best Cheap Eats in Cambridge for Students",
      slug: "best-cheap-eats-cambridge-students",
      body: `Living on a student budget doesn't mean sacrificing good food. Here are my favourite spots that won't drain your maintenance loan.\n\n## Market Square\n\nThe daily market (Mon–Sat) is your best friend. The falafel van has been there for years and does an enormous wrap for under £5. The fruit and veg stall on the north side sells produce cheaper than any supermarket in the city.\n\n## Gardenia\n\nThis tiny Greek-Cypriot café on Rose Crescent serves enormous portions of moussaka and kleftiko. Cash only, always packed at lunch — arrive by 12:15.\n\n## The Copper Kettle\n\nRight opposite King's College, the Copper Kettle looks touristy but is genuinely good value for a full English breakfast. Students get 10% off with a valid university card.\n\n## Honest Burgers\n\nA splurge, but their £10 lunch deal (burger + fries + soft drink) is hard to beat. The queues move fast.`,
      authorId: oliver.id,
      categoryId: foodDrink.id,
      publishedAt: new Date("2026-04-15"),
    },
  });

  await db.guide.upsert({
    where: { slug: "surviving-freshers-week-cambridge" },
    update: {},
    create: {
      title: "Surviving Freshers' Week at Cambridge",
      slug: "surviving-freshers-week-cambridge",
      body: `Freshers' Week at Cambridge — or Freshers' Fortnight, as it often feels — is overwhelming in the best possible way. Here's what I wish I'd known.\n\n## Pace Yourself\n\nYou don't need to attend every single event. The CUSU Freshers' Fair is non-negotiable — that's where you sign up for societies. Everything else is negotiable.\n\n## Your College, Not Just the University\n\nCambridge life is organised around colleges, not departments. Your college JCR (Junior Combination Room) will have social events, a welfare team, and resources. Get involved early.\n\n## The Academic Side Starts Fast\n\nUnlike many UK universities, Cambridge supervision work can begin in week one. Check your timetable the day you arrive and don't assume you have a grace week.\n\n## Find Your People\n\nCambridge can feel competitive. The best antidote is finding your niche early — a sport, a society, a casual study group. The friendships you make in freshers' week often last your whole degree.`,
      authorId: amelia.id,
      categoryId: studentLife.id,
      publishedAt: new Date("2026-04-20"),
    },
  });

  console.log("Seed complete: 2 locations, 3 categories, 3 experts, 3 guides");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
