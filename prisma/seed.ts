import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  // ── Locations ──────────────────────────────────────────────────
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

  const millRoad = await db.location.upsert({
    where: { slug: "mill-road" },
    update: {},
    create: { name: "Mill Road", slug: "mill-road" },
  });

  const chesterton = await db.location.upsert({
    where: { slug: "chesterton" },
    update: {},
    create: { name: "Chesterton", slug: "chesterton" },
  });

  const trumpington = await db.location.upsert({
    where: { slug: "trumpington" },
    update: {},
    create: { name: "Trumpington", slug: "trumpington" },
  });

  const newnham = await db.location.upsert({
    where: { slug: "newnham" },
    update: {},
    create: { name: "Newnham", slug: "newnham" },
  });

  const castleHill = await db.location.upsert({
    where: { slug: "castle-hill" },
    update: {},
    create: { name: "Castle Hill", slug: "castle-hill" },
  });

  const cherryHinton = await db.location.upsert({
    where: { slug: "cherry-hinton" },
    update: {},
    create: { name: "Cherry Hinton", slug: "cherry-hinton" },
  });

  // ── Categories ─────────────────────────────────────────────────
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

  const nightlife = await db.category.upsert({
    where: { slug: "nightlife" },
    update: {},
    create: { name: "Nightlife", slug: "nightlife" },
  });

  const shopping = await db.category.upsert({
    where: { slug: "shopping" },
    update: {},
    create: { name: "Shopping", slug: "shopping" },
  });

  const parksNature = await db.category.upsert({
    where: { slug: "parks-nature" },
    update: {},
    create: { name: "Parks & Nature", slug: "parks-nature" },
  });

  const cultureMuseums = await db.category.upsert({
    where: { slug: "culture-museums" },
    update: {},
    create: { name: "Culture & Museums", slug: "culture-museums" },
  });

  const housingAccommodation = await db.category.upsert({
    where: { slug: "housing-accommodation" },
    update: {},
    create: {
      name: "Housing & Accommodation",
      slug: "housing-accommodation",
    },
  });

  const sportsFitness = await db.category.upsert({
    where: { slug: "sports-fitness" },
    update: {},
    create: { name: "Sports & Fitness", slug: "sports-fitness" },
  });

  // ── Categories (relocation) ─────────────────────────────────────
  const schoolsEducation = await db.category.upsert({
    where: { slug: "schools-education" },
    update: {},
    create: { name: "Schools & Education", slug: "schools-education" },
  });

  const estateAgentsProperty = await db.category.upsert({
    where: { slug: "estate-agents-property" },
    update: {},
    create: {
      name: "Estate Agents & Property",
      slug: "estate-agents-property",
    },
  });

  const cycling = await db.category.upsert({
    where: { slug: "cycling" },
    update: {},
    create: { name: "Cycling", slug: "cycling" },
  });

  const healthcare = await db.category.upsert({
    where: { slug: "healthcare" },
    update: {},
    create: { name: "Healthcare", slug: "healthcare" },
  });

  const settlingIn = await db.category.upsert({
    where: { slug: "settling-in" },
    update: {},
    create: { name: "Settling In", slug: "settling-in" },
  });

  // ── Experts (Family - Andy, Teresa, Alex, Max, Leo) ───────────
  const andy = await db.expert.upsert({
    where: { slug: "andy-family-dad" },
    update: {
      name: "Andy",
      bio: "Dad of the family, working in IT. Has lived in Cambridge for 15 years and knows the best tech spots and parent-friendly pubs.",
      role: "IT Professional & Dad",
    },
    create: {
      name: "Andy",
      slug: "andy-family-dad",
      bio: "Dad of the family, working in IT. Has lived in Cambridge for 15 years and knows the best tech spots and parent-friendly pubs.",
      role: "IT Professional & Dad",
      locationId: chesterton.id,
    },
  });

  const teresa = await db.expert.upsert({
    where: { slug: "teresa-family-mom" },
    update: {
      name: "Teresa",
      bio: "Mom of the family and local doctor (GP). Expert on healthcare, schools, and navigating Cambridge life with three active boys.",
      role: "GP & Mom",
    },
    create: {
      name: "Teresa",
      slug: "teresa-family-mom",
      bio: "Mom of the family and local doctor (GP). Expert on healthcare, schools, and navigating Cambridge life with three active boys.",
      role: "GP & Mom",
      locationId: chesterton.id,
    },
  });

  const alex = await db.expert.upsert({
    where: { slug: "alex-family-son-10" },
    update: { name: "Alex (10)" },
    create: {
      name: "Alex (10)",
      slug: "alex-family-son-10",
      bio: "Oldest of the three boys. Expert on skate parks, best ice cream spots, and the science museum.",
      role: "Junior Explorer",
      locationId: chesterton.id,
    },
  });

  const max = await db.expert.upsert({
    where: { slug: "max-family-son-7" },
    update: { name: "Max (7)" },
    create: {
      name: "Max (7)",
      slug: "max-family-son-7",
      bio: "Middle brother. Knows all the best playgrounds and where to spot cows on the common.",
      role: "Playground Expert",
      locationId: chesterton.id,
    },
  });

  const leo = await db.expert.upsert({
    where: { slug: "leo-family-son-4" },
    update: { name: "Leo (4)" },
    create: {
      name: "Leo (4)",
      slug: "leo-family-son-4",
      bio: "The youngest. Expert on the best ducks to feed and where to find the biggest puddles.",
      role: "Toddler-at-Large",
      locationId: chesterton.id,
    },
  });

  // ── Experts (Legacy - being reassigned) ──────────────────────────
  const amelia = await db.expert.upsert({
    where: { slug: "amelia-hayes" },
    update: { name: "Amelia H." },
    create: {
      name: "Amelia H.",
      slug: "amelia-hayes",
      bio: "PhD student in History at Pembroke College. Cambridge native who loves uncovering the city's hidden stories.",
      role: "Local Historian",
      locationId: cityCenter.id,
    },
  });

  const priya = await db.expert.upsert({
    where: { slug: "priya-sharma" },
    update: { name: "Priya S." },
    create: {
      name: "Priya S.",
      slug: "priya-sharma",
      bio: "Computer Science graduate, now working at ARM. Expert on the tech scene and student hacks for living in Cambridge.",
      role: "Tech Professional",
      locationId: westCambridge.id,
    },
  });

  const oliver = await db.expert.upsert({
    where: { slug: "oliver-chen" },
    update: { name: "Oliver C." },
    create: {
      name: "Oliver C.",
      slug: "oliver-chen",
      bio: "Third-year undergraduate at King's College. Cyclist, punter, and self-appointed guide to the best cheap eats in Cambridge.",
      role: "Undergraduate Student",
      locationId: cityCenter.id,
    },
  });

  // ── Experts (new) ──────────────────────────────────────────────
  const james = await db.expert.upsert({
    where: { slug: "james-t" },
    update: {},
    create: {
      name: "James T.",
      slug: "james-t",
      bio: "Head porter at a central Cambridge college for over 22 years. Knows every shortcut, every formal hall tradition, and exactly which gates are locked after midnight.",
      role: "College Porter",
      locationId: cityCenter.id,
    },
  });

  const sophie = await db.expert.upsert({
    where: { slug: "sophie-r" },
    update: {},
    create: {
      name: "Sophie R.",
      slug: "sophie-r",
      bio: "Manages a beloved pub on Gwydir Street and has run Cambridge pubs for fifteen years. Mill Road is home — she knows every landlord, every local character, and the best beer gardens in a five-mile radius.",
      role: "Pub Manager",
      locationId: millRoad.id,
    },
  });

  const marcus = await db.expert.upsert({
    where: { slug: "marcus-w" },
    update: {},
    create: {
      name: "Marcus W.",
      slug: "marcus-w",
      bio: "Third-generation market stallholder selling cheese and charcuterie on Cambridge Market. Knows the market's rhythms, the best seasonal produce, and which traders have been here longer than the paving stones.",
      role: "Market Stallholder",
      locationId: cityCenter.id,
    },
  });

  const elena = await db.expert.upsert({
    where: { slug: "elena-k" },
    update: {},
    create: {
      name: "Elena K.",
      slug: "elena-k",
      bio: "Postdoctoral researcher in the Biochemistry department. Originally from Vienna, she has navigated Cambridge's postdoc world — housing, healthcare, social life — and has advice no induction guide will give you.",
      role: "Postdoctoral Researcher",
      locationId: trumpington.id,
    },
  });

  const david = await db.expert.upsert({
    where: { slug: "david-b" },
    update: {},
    create: {
      name: "David B.",
      slug: "david-b",
      bio: "Printmaker and painter with a studio near Castle Hill. Longtime Cambridge resident, occasional art tour guide, and the person to ask about what is actually worth seeing in the smaller galleries.",
      role: "Local Artist",
      locationId: castleHill.id,
    },
  });

  const martin = await db.expert.upsert({
    where: { slug: "martin-r" },
    update: {},
    create: {
      name: "Martin R.",
      slug: "martin-r",
      bio: "Retired Fellow at Gonville & Caius, where he taught English Literature for 35 years. Now writes, walks the Backs, and knows the university's ceremonial traditions better than most active staff.",
      role: "Retired Fellow",
      locationId: newnham.id,
    },
  });

  const rachel = await db.expert.upsert({
    where: { slug: "rachel-n" },
    update: {},
    create: {
      name: "Rachel N.",
      slug: "rachel-n",
      bio: "Senior nurse at Addenbrooke's Hospital. Has lived in Trumpington for eight years and knows the practical realities of Cambridge life that students and newcomers often discover too late.",
      role: "NHS Nurse",
      locationId: trumpington.id,
    },
  });

  const kate = await db.expert.upsert({
    where: { slug: "kate-m" },
    update: {},
    create: {
      name: "Kate M.",
      slug: "kate-m",
      bio: "Primary school governor and parent of two children who have gone through the full Cambridge state school system. Moved from Leeds eight years ago and has navigated catchment areas, secondary applications, and sixth form admissions from the inside.",
      role: "School Governor",
      locationId: chesterton.id,
    },
  });

  const tom = await db.expert.upsert({
    where: { slug: "tom-r" },
    update: {},
    create: {
      name: "Tom R.",
      slug: "tom-r",
      bio: "Senior negotiator at a Cambridge residential estate agency for twelve years, specialising in lettings and sales across the CB1–CB5 postcodes. Has helped hundreds of newcomers find homes and knows which agencies are worth approaching and which to avoid.",
      role: "Estate Agent",
      locationId: cityCenter.id,
    },
  });

  // ── Guides (existing — reassigning to family) ──────────────────
  await db.guide.upsert({
    where: { slug: "cycling-cambridge-beginners-guide" },
    update: { authorId: andy.id },
    create: {
      title: "Cycling Cambridge: A Beginner's Guide",
      slug: "cycling-cambridge-beginners-guide",
      body: `Cambridge is one of the most cycle-friendly cities in the UK. With over 50% of residents commuting by bike, getting around on two wheels is both practical and joyful.\n\n## Where to Hire a Bike\n\nIf you don't have your own bike yet, Rutland Cycling near the train station offers day and weekly rentals. Alternatively, the city's Beryl bike-share scheme has stations across the centre.\n\n## Key Routes\n\n**Station to City Centre:** Follow Hills Road then turn onto Regent Street — mostly flat and well-signposted.\n\n**The Backs:** A scenic path behind the main colleges. Take a detour along the river for the classic Cambridge view.\n\n**West Cambridge:** Huntingdon Road is wide and has a dedicated cycle lane, perfect for reaching the science parks.\n\n## Safety Tips\n\n- Always lock your bike — theft is common near the market square.\n- Use lights at night; police do give fines without them.\n- Watch for pedestrians stepping out from between parked cars on King Street.`,
      authorId: andy.id,
      categoryId: gettingAround.id,
      publishedAt: new Date("2026-04-01"),
    },
  });

  await db.guide.upsert({
    where: { slug: "best-cheap-eats-cambridge-students" },
    update: { authorId: andy.id },
    create: {
      title: "Best Cheap Eats in Cambridge for Students",
      slug: "best-cheap-eats-cambridge-students",
      body: `Living on a student budget doesn't mean sacrificing good food. Here are my favourite spots that won't drain your maintenance loan.\n\n## Market Square\n\nThe daily market (Mon–Sat) is your best friend. The falafel van has been there for years and does an enormous wrap for under £5. The fruit and veg stall on the north side sells produce cheaper than any supermarket in the city.\n\n## Gardenia\n\nThis tiny Greek-Cypriot café on Rose Crescent serves enormous portions of moussaka and kleftiko. Cash only, always packed at lunch — arrive by 12:15.\n\n## The Copper Kettle\n\nRight opposite King's College, the Copper Kettle looks touristy but is genuinely good value for a full English breakfast. Students get 10% off with a valid university card.\n\n## Honest Burgers\n\nA splurge, but their £10 lunch deal (burger + fries + soft drink) is hard to beat. The queues move fast.`,
      authorId: andy.id,
      categoryId: foodDrink.id,
      publishedAt: new Date("2026-04-15"),
    },
  });

  await db.guide.upsert({
    where: { slug: "surviving-freshers-week-cambridge" },
    update: { authorId: teresa.id },
    create: {
      title: "Surviving Freshers' Week at Cambridge",
      slug: "surviving-freshers-week-cambridge",
      body: `Freshers' Week at Cambridge — or Freshers' Fortnight, as it often feels — is overwhelming in the best possible way. Here's what I wish I'd known.\n\n## Pace Yourself\n\nYou don't need to attend every single event. The CUSU Freshers' Fair is non-negotiable — that's where you sign up for societies. Everything else is negotiable.\n\n## Your College, Not Just the University\n\nCambridge life is organised around colleges, not departments. Your college JCR (Junior Combination Room) will have social events, a welfare team, and resources. Get involved early.\n\n## The Academic Side Starts Fast\n\nUnlike many UK universities, Cambridge supervision work can begin in week one. Check your timetable the day you arrive and don't assume you have a grace week.\n\n## Find Your People\n\nCambridge can feel competitive. The best antidote is finding your niche early — a sport, a society, a casual study group. The friendships you make in freshers' week often last your whole degree.`,
      authorId: teresa.id,
      categoryId: studentLife.id,
      publishedAt: new Date("2026-04-20"),
    },
  });

  // ── Guides (new) ───────────────────────────────────────────────

  // Pubs
  await db.guide.upsert({
    where: { slug: "the-eagle-cambridge-a-local-guide" },
    update: {},
    create: {
      title: "The Eagle: Cambridge's Most Historic Pub",
      slug: "the-eagle-cambridge-a-local-guide",
      status: "published",
      body: `Every city has a pub that feels like a living monument. In Cambridge, that pub is The Eagle on Benet Street. It has been serving customers since the sixteenth century, and you feel the weight of that history the moment you step through the coaching yard entrance.

## The DNA Bar

The ceiling of the back bar bears the signatures and insignia of RAF and American airmen who passed through during the Second World War — some scrawled in candle smoke, others in lipstick, a few in whatever came to hand. It is one of the most quietly moving things in Cambridge, tucked above the noise of an ordinary evening pint.

This is also the pub where Francis Crick famously announced, on 28 February 1953, that he and James Watson had "discovered the secret of life" — the double helix structure of DNA, worked out at the nearby Cavendish Laboratory. A plaque marks the occasion with characteristic British understatement.

## What to Order

The Eagle is a Greene King pub, so the ales are reliable rather than adventurous. The IPA is the safe choice. On a cold afternoon, a bowl of their soup and a bread roll will see you right without breaking the bank.

## When to Go

Avoid Saturday lunchtime in summer — the tourist coaches descend and the place becomes genuinely difficult to enjoy. On a weekday morning it is spacious and calm; in the early evening from Tuesday to Thursday, you get a good mix of locals, postgrads, and tourists who have done their homework.

## Getting There

Benet Street runs between King's Parade and Free School Lane. The entrance is through a stone archway into the courtyard — do not miss it by going straight to the front bar, which is fine but lacks the character of the yard-facing rooms.

The Eagle is not the cheapest pub in Cambridge, but it is one of those places you should visit properly at least once — linger over a pint in the DNA Bar and think about what was figured out around the corner.`,
      authorId: james.id,
      categoryId: foodDrink.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-03-10"),
    },
  });

  await db.guide.upsert({
    where: { slug: "the-free-press-cambridge-hidden-gem" },
    update: {},
    create: {
      title: "The Free Press: Cambridge's Best Kept Secret",
      slug: "the-free-press-cambridge-hidden-gem",
      status: "published",
      body: `Tucked down Prospect Row — a quiet residential street ten minutes' walk from the city centre — The Free Press is the kind of pub that people in Cambridge are reluctant to write about, for fear of ruining it.

## Why It's Special

There are no fruit machines. No background music. No television. The conversation is the entertainment, and that is entirely by design. The landlord has maintained this policy for years, and the regulars enforce it cheerfully on any newcomer who asks why their phone is getting no signal.

The pub is small: three rooms, low ceilings, and an open fire in winter. It fills up quickly on Friday evenings, but midweek and Sunday lunchtime it is remarkably tranquil for somewhere so close to the centre.

## The Drinks

The Free Press keeps a rotating selection of cask ales from regional breweries, usually three or four on at any time. The range changes regularly — worth checking their chalkboard before committing. They also stock a well-chosen selection of whiskies and a concise wine list that is better than you'd expect.

## The Food

A short, seasonal menu served lunchtimes and evenings. Nothing elaborate — a proper ploughman's, a pie, a board of local cheese. Everything is well sourced and fairly priced. The Sunday roast sells out by 1 pm most weeks, so book ahead or arrive early.

## Finding It

From the city centre, walk down Parkside past the police station, turn left onto Prospect Row, and look for the small sign. It is genuinely easy to miss, which is part of the point. If you are cycling, there is a rack on the street outside.

The Free Press is what a neighbourhood pub should be. Go on a Tuesday evening, nurse a pint of something local, and enjoy the rare Cambridge experience of not being able to hear anyone at the next table.`,
      authorId: sophie.id,
      categoryId: nightlife.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-03-18"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cambridge-blue-craft-beer-guide" },
    update: {},
    create: {
      title: "The Cambridge Blue: A Proper Local on Gwydir Street",
      slug: "cambridge-blue-craft-beer-guide",
      status: "published",
      body: `Gwydir Street runs through the heart of Mill Road territory, and The Cambridge Blue is its anchor. This is a serious pub for people who take their beer seriously — but not so seriously that it stops being fun.

## The Beer

The Cambridge Blue has one of the best selections of cask ales in the city, typically running eight handpumps with a mix of national names and local breweries. Crafty Beers from Ely, Moonshine from Cambridge Moonshine Brewery, and seasonal specials from further afield are regulars. The staff know the range and are happy to talk you through it — ask for a taster before committing.

The bottled and canned selection is equally strong, with Belgian imports and a rotating craft fridge that usually holds something worth trying.

## The Garden

In summer, the back garden is one of Cambridge's finest pub outdoor spaces: proper tables, not plastic furniture, and a pergola that provides shade without making you feel you're eating under a car park. Dogs are welcome and there is always a water bowl out.

## The Crowd

Mill Road is Cambridge's most genuinely cosmopolitan street, and the Blue reflects that. On any given evening you'll find postdocs, NHS staff from Addenbrooke's, longstanding local families, and anyone who has been told by a reliable source that this is where you come for a real pint. It is not a tourist pub.

## Practical

Gwydir Street is parallel to Mill Road, running behind it on the east side. The Blue is roughly halfway down. It is not served by a bus stop directly, but Mill Road is walkable from the city centre in twenty minutes or cyclable in five.

Opening hours are generous — they open at noon most days and last orders is late enough to make an evening of it. The kitchen closes around 9 pm.`,
      authorId: sophie.id,
      categoryId: nightlife.id,
      locationId: millRoad.id,
      publishedAt: new Date("2026-03-25"),
    },
  });

  // Restaurants
  await db.guide.upsert({
    where: { slug: "aromi-sicilian-street-food-cambridge" },
    update: {},
    create: {
      title: "Aromi: Sicilian Street Food Worth Queuing For",
      slug: "aromi-sicilian-street-food-cambridge",
      status: "published",
      body: `There is a queue outside Aromi on Benet Street at almost any hour of the day. This is not a coincidence or a marketing trick — it is simply what happens when a small Sicilian bakery makes things that are genuinely worth waiting for.

## What They Make

Aromi is built around arancini — Sicilian fried rice balls — and sfincione, a thick Palermitan pizza base loaded with tomato, onion, and caciocavallo cheese. Both are made fresh every morning and sell out fast.

The arancini come in several varieties: the classic ragù, a spinach and ricotta version, and seasonal specials that rotate. They are substantial — one is a snack, two is lunch. At under £4 each, this is some of the best value food in the city centre.

They also bake cannoli, cassate, and granita in summer. If you have never had a proper Sicilian granita on a hot Cambridge day, the almond version here is a revelation.

## When to Go

They open at 8 am and the first rush is around 9–10 am when people collect pastries. The second rush is noon to 2 pm for lunch. If you want arancini and you are arriving after 1:30 pm, there is a real chance they will have sold out of the most popular flavours.

Come before 11 am on a weekday if you want to eat inside and have space to think.

## The Second Shop

Aromi now has a second location on Market Passage, near the covered market. It has more seating and a fuller café menu, but the atmosphere is slightly more corporate. The Benet Street original is the better experience.

## Getting There

Benet Street is a short walk from King's Parade and Corpus Christi College. It is pedestrianised most of the day, so you will be approaching on foot.`,
      authorId: marcus.id,
      categoryId: foodDrink.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-02"),
    },
  });

  await db.guide.upsert({
    where: { slug: "smokeworks-cambridge-bbq-guide" },
    update: {},
    create: {
      title: "Smokeworks: Low and Slow in the City Centre",
      slug: "smokeworks-cambridge-bbq-guide",
      status: "published",
      body: `Free School Lane is best known as the birthplace of the electron — Rutherford's laboratory is a few doors along — but these days it is also where Cambridge goes for American-style barbecue. Smokeworks has been here since 2015 and has earned its place as the city's definitive answer to smoked meat.

## The Food

The menu centres on brisket, pulled pork, and ribs, all smoked low and slow on the premises. The brisket is sliced to order and varies depending on how far into the service you arrive — early in lunch you get the point end with more fat and flavour; later you might get leaner flat. Both are good. The bark is properly seasoned.

The sides hold their own: proper mac and cheese, burnt-end beans with a good amount of heat, and coleslaw that is neither too sweet nor too thin. A half-rack with two sides is the standard order and will fill most people up.

## Lunch Versus Dinner

Lunch is the better time to come. You get the freshest meat, the set lunch deal (a plate plus soft drink at a fixed price) is genuinely good value, and the room is less crowded. Dinner on a Friday fills quickly — book ahead or expect a wait.

## Vegetarian Options

These are limited, which is honest. There is a smoked cauliflower option and the sides are largely vegetarian-friendly, but this is emphatically a meat kitchen. If you have a non-meat-eating member of your group, discuss before you arrive.

## Drinks

A concise list of American-style craft beers on tap, plus a bourbon and whiskey selection that rewards exploration. The house margarita is better than it needs to be.

The restaurant is small — around 40 covers — and the décor is stripped-back industrial. It is loud when full, which adds to the atmosphere rather than detracting from it.`,
      authorId: oliver.id,
      categoryId: foodDrink.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-08"),
    },
  });

  // Cafés
  await db.guide.upsert({
    where: { slug: "fitzbillies-cambridge-chelsea-bun" },
    update: {},
    create: {
      title: "Fitzbillies: The Chelsea Bun That Made Cambridge Famous",
      slug: "fitzbillies-cambridge-chelsea-bun",
      status: "published",
      body: `Fitzbillies has been on Trumpington Street since 1920, and the Chelsea buns it has been producing since then are one of Cambridge's most enduring institutions. They are sticky, deeply caramelised, spiced with cinnamon and mixed peel, and fundamentally different from anything sold in a supermarket under the same name.

## The Chelsea Bun

This is the reason people make special trips to Cambridge. They are sold individually or in boxes of four, and they travel well — the flat boxes fit in most bags. Many Cambridge graduates spend their adult lives trying to recreate them and failing. The recipe is not published.

Buy one for breakfast and eat it with a coffee standing up. This is the correct approach. Sitting down and ordering from the brunch menu is also excellent, but there is something right about the bun-and-coffee-at-the-counter experience.

## The Café

The ground-floor café is light and unhurried, with proper marble-topped tables and a kitchen that produces good eggs benedict, seasonal salads, and cakes. The afternoon tea is popular and requires booking at weekends. The coffee is roasted by a partner supplier and is reliably good.

## The Bakery Side

They do a full range of bread and pastries that are worth exploring beyond the bun. The sourdough is among the best you can buy in Cambridge. Order ahead for celebration cakes — these are not cheap, but they are made properly.

## Practical

The main branch is at 52 Trumpington Street, a few minutes' walk south of the city centre. There is a second location on St John's Street. The original is the correct choice if you have the option.

They open at 8 am on weekdays. The Chelsea buns sell out on popular days — if it is a Saturday afternoon in June, do not assume there will be any left.`,
      authorId: marcus.id,
      categoryId: foodDrink.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-12"),
    },
  });

  await db.guide.upsert({
    where: { slug: "hot-numbers-cambridge-coffee-guide" },
    update: {},
    create: {
      title: "Hot Numbers: Cambridge's Serious Coffee Scene",
      slug: "hot-numbers-cambridge-coffee-guide",
      status: "published",
      body: `If you have a specific opinion about coffee — filter versus espresso, single origin versus blend, light roast versus dark — Hot Numbers is where Cambridge has been arguing about these things since 2011. They roast their own beans and take the sourcing seriously, which means the menu changes with the harvest rather than the season.

## Two Sites, Different Personalities

The Gwydir Street café on Mill Road is the original and remains the more characterful space. It is small, long, and fills up with postdocs, freelancers, and anyone who has discovered that it opens at 7:30 am on weekdays. There is usually a single-origin filter option alongside the standard espresso drinks, and the staff know what they are talking about.

The second site on Trumpington Street is larger, with a full brunch menu and a stage for the live music events Hot Numbers hosts regularly. It is a better choice if you want to eat as well as drink coffee.

## What to Order

If you know you want an espresso drink, the flat white is their benchmark — tight texture, good balance. If you are curious about filter, ask what is on the V60 that day and whether they recommend it light. They will tell you honestly.

The food is solid across both sites: banana bread, granola, good eggs at the Trumpington Street location. Nothing elaborate, but nothing disappointing.

## Working Here

Gwydir Street is popular for laptop workers and has adequate plug sockets for a café of its size. It can feel cramped during the lunchtime rush. Come before 10 am or after 2:30 pm for comfortable working space.

## The Roastery

Hot Numbers sells bags of their roasted coffee to take home, and they run occasional cupping sessions open to the public. Check their website for dates — these are worth attending if you want to understand why the same bean can taste completely different depending on how it is prepared.`,
      authorId: elena.id,
      categoryId: foodDrink.id,
      locationId: millRoad.id,
      publishedAt: new Date("2026-04-14"),
    },
  });

  // Attractions
  await db.guide.upsert({
    where: { slug: "cambridge-botanic-garden-guide" },
    update: {},
    create: {
      title: "Cambridge Botanic Garden: A Year-Round Escape",
      slug: "cambridge-botanic-garden-guide",
      status: "published",
      body: `Forty acres of curated plant collections, eight glasshouses, and a woodland walk — all ten minutes from the city centre and often missed entirely by visitors who spend their time on King's Parade. The Cambridge Botanic Garden is one of the most underused assets the city has.

## The Collections

The garden is a research institution as much as a public space. It holds over eight thousand plant species in living collections, and the layout reflects botanical relationships rather than decorative convenience. This makes it more interesting to walk through than a purely ornamental garden — you can see how plant families relate to one another spatially.

The winter garden is the standout in the colder months: bark, berries, and structure that holds colour from November through February when almost everything else in Cambridge is dormant. The snowdrop collection in late January and February draws dedicated visitors from across the country.

Spring brings the bulb lawn and early blossom in the systematic beds. Summer fills the glasshouses with tropical species and the terrace café becomes genuinely pleasant. Autumn turns the lake and the specimen trees into something worth sitting with.

## Practical

The main entrance is on Bateman Street, off Trumpington Road. There is also an entrance on Hills Road. Admission charges apply for non-University members, though the garden offers annual passes that pay for themselves in three visits.

The café serves good seasonal lunches and the kind of cake that justifies the walk from town on a Sunday afternoon. Seating is limited on warm weekends — bring a blanket and use the lawn.

## For Families

The Discovery Centre runs activities for children through school holidays and at weekends. The pond dipping and seed identification sessions are consistently popular.

There is no better place in Cambridge for a slow, purposeful hour away from the traffic and the tourist clusters of the centre.`,
      authorId: david.id,
      categoryId: parksNature.id,
      locationId: trumpington.id,
      publishedAt: new Date("2026-04-18"),
    },
  });

  await db.guide.upsert({
    where: { slug: "fitzwilliam-museum-visitors-guide" },
    update: {},
    create: {
      title: "The Fitzwilliam Museum: World-Class Art, No Entry Fee",
      slug: "fitzwilliam-museum-visitors-guide",
      status: "published",
      body: `The Fitzwilliam Museum on Trumpington Street holds one of the finest university art collections in the world — Titian, Rembrandt, Cézanne, Monet, Picasso — and it is free to enter. This is not a well-kept secret exactly, but it is chronically undervisited by the students and residents who live a fifteen-minute walk away.

## What to See

The ground floor antiquities galleries are the place to start if you have never been. The Egyptian collection is substantial, and the Greek and Roman ceramics are displayed with enough explanation to be meaningful without requiring prior knowledge.

The main picture galleries on the upper floor contain the core of the collection. The Impressionist and Post-Impressionist rooms are the most immediately accessible: the Monet series, the Degas pastels, and a Cézanne card players painting that stops most people in their tracks.

The applied arts collection — ceramics, armour, illuminated manuscripts — spreads across several rooms and rewards wandering more than a directed route.

## Temporary Exhibitions

The Fitzwilliam runs a year-round programme of temporary exhibitions, typically two or three major shows per year. These are well curated and worth checking before your visit — some require booking a timed entry slot in advance, particularly the larger shows.

## Practical

The museum is closed on Mondays. Opening hours are 10 am to 5 pm Tuesday to Saturday, noon to 5 pm on Sundays. The building itself is worth arriving for — the entrance hall is a piece of Victorian neoclassical theatre that has been confusing first-time visitors into stopping and looking up for over a hundred and fifty years.

The café in the courtyard serves good lunches and is a civilised option for a midday break. Tables in the courtyard itself are available in warmer weather.

There is no reason not to visit. Free, excellent, and twenty minutes on foot from almost anywhere in the city.`,
      authorId: david.id,
      categoryId: cultureMuseums.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-22"),
    },
  });

  await db.guide.upsert({
    where: { slug: "the-backs-cambridge-walking-guide" },
    update: {},
    create: {
      title: "The Backs: How to Actually Enjoy Cambridge's Famous View",
      slug: "the-backs-cambridge-walking-guide",
      status: "published",
      body: `The Backs — the stretch of riverside grounds behind the main street of colleges — is the image that ends up on every Cambridge postcard. It is genuinely beautiful. It is also frequently experienced in the worst possible way: elbows-in on a summer Saturday, fighting through punters and tour groups, seeing it through a phone screen. Here is how to do it properly.

## The Route

Walk it from south to north on the west bank of the Cam, entering near Silver Street Bridge and finishing at Magdalene Bridge. This takes you through the grounds of Queens', King's, Clare, Trinity Hall, Trinity, St John's, and Magdalene in a natural order, with the college buildings on your left and the river on your right.

The footpath is public throughout this stretch, though some sections through college grounds close after dark and during certain university events. Check ahead if you are planning an evening walk.

## The Best Spots

The view of King's College Chapel from the bridge at King's is the canonical one. Arrive before 9 am on any day and you will have it largely to yourself. In summer, this same view at 2 pm involves queuing behind coach parties.

The Fellows' Garden at Clare is the least-visited stop along the Backs and one of the most beautiful. It is open to the public on summer afternoons — check the college website for current hours.

Mathematical Bridge at Queens' is invariably crowded but worth a brief stop. The legend that Newton designed it to stand without bolts is false — it was built in 1749 and has always had bolts — but the bridge itself is genuinely interesting.

## Punting

The Backs is where punt hire operators are concentrated. Scudamore's and Cambridge Chauffeur Punts are the main operators. Self-hire is available and rewarding — expect to be terrible at it for the first twenty minutes, and then to find it manageable.

## Timing

October and late March are the most pleasant months for walking the Backs: good light, manageable crowds, and the college gardens transitioning between seasons. August is the most crowded and the least enjoyable.`,
      authorId: martin.id,
      categoryId: parksNature.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-25"),
    },
  });

  // Practical guides
  await db.guide.upsert({
    where: { slug: "cambridge-citi-bus-guide" },
    update: {},
    create: {
      title: "Getting Around Cambridge by Bus: The Citi Network Explained",
      slug: "cambridge-citi-bus-guide",
      status: "published",
      body: `Not everyone cycles, and not everywhere in Cambridge is walkable. The Citi bus network — operated by Stagecoach under the Cambridgeshire Guided Busway contract — is more useful than most newcomers realise, once you understand how it fits together.

## The Key Routes

**Citi 1** runs from Chesterton through the city centre to Addenbrooke's Hospital and on to Trumpington Park & Ride. If you live in Chesterton or work at Addenbrooke's, this is your route. It runs every 10–12 minutes during the day.

**Citi 2** connects the Arbury estate in the north with Cherry Hinton in the south, passing through the city centre. Useful for anyone living in the northern residential neighbourhoods.

**Citi 7** serves Mill Road and extends to the Beechwood Avenue area. For Mill Road residents, this cuts the walk to the city centre to around five minutes by bus.

The Busway — a dedicated concrete track for guided buses — connects Cambridge city centre to St Ives via Huntingdon. The A and D services run on it and are fast, frequent, and reliable in a way that road-based routes can't always match.

## Ticketing

Single fares are expensive compared to cycling. Day tickets are much better value if you plan to make more than two journeys. The Stagecoach app offers mobile ticketing and is generally reliable, though the interface is not the most intuitive.

University staff and students can access subsidised term-time bus passes through the University's Sustainable Travel initiative — check your department's admin pages for current offers.

## Night Services

Bus frequency drops sharply after 7 pm and significantly after 9 pm. Late night services are limited and infrequent. If you are out after midnight, a taxi or cycling is the realistic option.

## Park & Ride

Cambridge has five Park & Ride sites — Trumpington, Babraham Road, Newmarket Road, Milton, and Madingley Road. All are connected to the city centre by frequent buses and are considerably cheaper than parking in town. If you are driving in from outside Cambridge, these are worth using.`,
      authorId: rachel.id,
      categoryId: gettingAround.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-28"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cambridge-bike-theft-prevention" },
    update: {},
    create: {
      title: "Bike Theft in Cambridge: How to Actually Protect Your Bike",
      slug: "cambridge-bike-theft-prevention",
      status: "published",
      body: `Cambridge has one of the highest rates of bicycle theft in the UK, by volume if not by proportion. More than two thousand bikes are reported stolen every year, and most are taken from the city centre and station area. This is not said to alarm — it is said because the patterns of theft are predictable, and the right habits make a significant difference.

## The Two-Lock Rule

Use two locks, always. The standard advice is to use a D-lock through the rear wheel and frame, attached to an immovable object, combined with a cable or chain lock through the front wheel. This combination takes significantly longer to defeat than any single lock and encourages thieves to move to easier targets.

Quality matters. A cheap cable lock takes seconds with bolt cutters. A good D-lock from Kryptonite, Abus, or Hiplok costs £40–70 and is a different proposition entirely. Think of the lock as insurance: the replacement cost of most adult bikes dwarfs the cost of a decent lock.

## Where Theft Happens

The highest-risk areas are around the train station, the Grand Arcade (Lion Yard), Market Square, and the areas immediately around the main colleges. Bikes locked to residential street furniture in the CB1 and Mill Road postcode areas are also frequently targeted.

Covered, well-lit, and busy locations are safer. The bike cages at the train station (pay-per-use, accessed with an Oyster or contactless card) are among the most secure options in the city if you are leaving a bike for a day or more.

## What to Avoid

Do not lock only to the frame — a wheel-to-frame lock without a fixed anchor is easily defeated. Do not leave a bike unlocked outside your house, even briefly. Do not assume that a busy street makes your bike safe.

Quick-release wheels and saddles are popular targets separately from the bike itself. Consider bolted axle nuts or locking skewers if you are leaving a bike outside regularly.

## Registration

Register your bike on BikeRegister, photograph the frame and note the serial number. It will not prevent theft but it significantly increases the chances of recovery and supports a police report if you need one.`,
      authorId: priya.id,
      categoryId: gettingAround.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-30"),
    },
  });

  await db.guide.upsert({
    where: { slug: "punting-in-cambridge-complete-guide" },
    update: {},
    create: {
      title: "Punting in Cambridge: A Practical Guide",
      slug: "punting-in-cambridge-complete-guide",
      status: "published",
      body: `Punting on the Cam is one of those Cambridge experiences that is both a genuine pleasure and a reliable source of minor humiliation. Here is what to know before you hire a pole and a flat-bottomed boat.

## Self-Hire vs Chauffeur Punt

You have two options. Self-hire means you pole the punt yourself — harder than it looks, achievable with patience, and considerably more satisfying. A chauffeur punt means a student earns money poling you along while reciting a curated tour commentary. Both are valid choices. The chauffeur option is better if you want to look at things rather than steer.

The main operators are Scudamore's (multiple launch sites along the Backs and at Quayside), Cambridge Chauffeur Punts, and Granta Punt Hire near the Mill Pond. Prices are competitive and change seasonally — expect to pay around £30–40 per hour for self-hire.

## How to Punt

Stand at the stern (the flat, raised end). Plant the pole by dropping it vertically into the river — you feel it hit the bottom, then push. Lean into the push. As the punt moves forward, trail the pole behind you as a rudder to steer. Do not try to pull the pole out quickly or it will stick in the mud and you will either capsize or let go, leaving the pole in the river.

Staying in the centre of the channel avoids the worst mud and the overhanging willows. When you need to stop, drop the pole and hold it against the stern; the friction slows you gradually.

## Where to Go

From the Silver Street punts, heading north through the Backs towards Magdalene Bridge is the classic route. It takes around forty minutes at a relaxed pace and passes behind King's, Clare, Trinity Hall, and Trinity. Going south from Silver Street takes you past the Botanic Garden towards Grantchester, which is a longer trip (around two hours return) but very peaceful.

## When to Go

Weekday mornings from April to June offer the best combination of good weather odds, manageable crowds, and available boats. August weekends are the opposite of this.`,
      authorId: oliver.id,
      categoryId: gettingAround.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-01"),
    },
  });

  await db.guide.upsert({
    where: { slug: "renting-in-cambridge-new-arrivals-guide" },
    update: {},
    create: {
      title: "Renting in Cambridge: What New Arrivals Need to Know",
      slug: "renting-in-cambridge-new-arrivals-guide",
      status: "published",
      body: `Cambridge is an expensive place to rent, and the market moves fast. If you are arriving for a postdoc, a job, or any reason other than a full undergraduate degree (which comes with college accommodation), understanding how the rental market works will save you a significant amount of money and stress.

## The Market

The rental market is dominated by student demand, which means leases typically run from late June or early July to late June the following year. If you are arriving in October or January, you are outside the main cycle and will have more leverage — but also fewer options listed at any one time.

Average rents for a one-bedroom flat in 2025 range from around £1,100 per month in Cherry Hinton or Arbury to £1,500–1,800 closer to the city centre or in Newnham. Rooms in shared houses are the most practical option for early career researchers: expect to pay £700–900 per month including bills in a reasonable shared house.

## The Best Areas

**Mill Road and CB1** offers the best combination of price, character, and connectivity for most newcomers. The area is well served by buses and cycling infrastructure, and the independent shops and cafés on Mill Road itself make for a genuinely pleasant place to live.

**Chesterton and Arbury** are quieter residential neighbourhoods north of the city with good bus links (Citi 2) and lower rents than comparable properties to the south.

**Trumpington** is popular with Addenbrooke's staff and anyone who needs easy access to the biomedical campus. Less characterful than Mill Road but well-resourced with supermarkets, parks, and a good primary school.

## What to Watch Out For

Letting agents in Cambridge vary significantly in quality. The University's accommodation office maintains a list of approved private landlords for University staff — worth consulting before engaging with the open market.

Check cycle storage before signing anything. In a city where the bike is your primary transport, a flat with nowhere to store a bike securely is a serious problem.

Energy Performance Certificates matter in older Cambridge terraces, which can be badly insulated. An EPC rating of D or below on a Victorian terrace usually means expensive heating bills.`,
      authorId: elena.id,
      categoryId: housingAccommodation.id,
      locationId: millRoad.id,
      publishedAt: new Date("2026-05-02"),
    },
  });

  // ── Guides (relocation) ────────────────────────────────────────

  await db.guide.upsert({
    where: { slug: "best-areas-to-live-cambridge" },
    update: {},
    create: {
      title: "Best Areas to Live in Cambridge: A Neighbourhood Guide",
      slug: "best-areas-to-live-cambridge",
      status: "published",
      body: `Cambridge is a compact city, and most areas are within reasonable cycling or walking distance of the centre. But where you live shapes your experience considerably — neighbourhood character, transport access, school catchments, and rental prices vary significantly across a city that is only a few miles wide.

## For Families

**Trumpington** is the area most recommended by Cambridge parents with young children. The neighbourhood has expanded significantly with new-build development over the past decade, and the schools — both primaries and Trumpington Community College — are well-regarded. The Addenbrooke's campus is walkable, Trumpington Meadows country park provides open space, and the Waitrose on Trumpington Road makes daily life easy. Rents and prices are higher than Cherry Hinton but lower than Newnham.

**Cherry Hinton** offers more affordable housing while retaining good access to the centre. The community orchards, Cherry Hinton Hall park, and the annual Folk Festival are genuine assets. Schools in the area are solid, and the CB1 postcode means short bus or cycle times to town.

**Chesterton** retains a strong neighbourhood identity. Milton Road has independent shops and a GP surgery, Chesterton Academy has improved significantly, and property prices are lower than equivalent streets south of the river.

## For Professionals

**Mill Road and CB1** is where most newcomers without children end up, and with good reason. The independent shops, cafés, and restaurants make day-to-day life genuinely pleasant. The area is flat and well-connected by cycling. Rents are moderate — cheaper than Newnham, more characterful than Arbury.

**Newnham** is a quieter residential area close to the university, with beautiful Victorian and Edwardian terraces and good walking routes to the Backs and Grantchester. It is expensive for what you get in terms of space, but the quiet streets and proximity to open countryside are hard to put a price on.

**Castle Hill and Chesterton Road** offer the combination of central access and residential character that is hard to find close to the city centre proper. Huntingdon Road has dedicated cycling infrastructure and a reliable bus route.

## For Students and Early Career Researchers

**Romsey and Coleridge** are the postcodes where most Cambridge postgraduates and early-career researchers end up, and they are excellent choices. Walkable to the centre, well-connected by bike to the science parks and hospitals, and notably cheaper than equivalent central addresses.

**Arbury** in the north is the most affordable area with direct bus access and is popular with those on tighter budgets. It is slightly further from the main university departments but the cost difference can be significant.

## What to Avoid

Very central Cambridge addresses — CB2 postcodes closest to the market and colleges — are expensive and noisy during tourist season. Unless you specifically need to be within five minutes of the centre, the areas above offer much better value and quality of life.`,
      authorId: elena.id,
      categoryId: settlingIn.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cambridge-school-guide-new-parents" },
    update: {},
    create: {
      title: "Understanding Cambridge Schools: A Guide for New Parents",
      slug: "cambridge-school-guide-new-parents",
      status: "published",
      body: `If you are moving to Cambridge with children, understanding how the school system works — and acting early — will save you considerable stress. Cambridge's state schools are genuinely good by national standards, but demand for the best of them outstrips supply, and catchment areas are smaller and more sharply enforced than parents used to other cities typically expect.

## Primary Schools

Cambridge operates a two-tier system: primary schools (ages 4–11) feed into secondary schools (11–18). There are no middle schools.

The city has a mix of community primaries, which use address-based catchment, and faith schools (C of E and Catholic), which apply additional criteria. Outstanding-rated primaries include Queen Edith's Community Primary (CB1), Coleridge Community Primary (CB1), Newnham Croft Primary (CB3), and St Alban's Primary (CB4).

Catchment areas for the most sought-after schools have become smaller as the city's population has grown. If you are choosing where to live with primary-age children, check catchment areas carefully using the Cambridgeshire County Council school admissions page before signing a lease or completing a purchase.

## Secondary Schools

The main state secondary schools are Chesterton Academy (CB4), Parkside Community College (CB1), Netherhall School (CB1), and Trumpington Community College (CB2). Hills Road Sixth Form College and Long Road Sixth Form College take students at 16 from across the city — both are consistently rated among the best sixth form colleges in the country.

Hills Road is heavily oversubscribed, with students travelling from Ely and Newmarket. Entry is based on GCSE attainment; applications are made in Year 11.

## Private Options

The Perse School (prep and senior) is Cambridge's main all-through independent school. The Leys is a co-educational independent day and boarding school. St Mary's School is independent and girls-only at secondary level. King's College School at King's College has wider junior admissions beyond its choristers.

## How to Apply

Applications for Reception (age 4) are made in January before the September intake. Secondary applications are made in October of Year 6. Both are managed through **Cambridgeshire County Council's** online admissions portal — not Cambridge City Council, a distinction that confuses many newcomers.

Late applications go into a second round and significantly reduce your chances of getting a catchment school place. Mark the deadlines in your diary the day you arrive.

## Practical Advice

Talk to parents in your prospective neighbourhood before relying solely on Ofsted reports. A good Ofsted rating from a few years ago may not reflect current conditions, and vice versa. The best intelligence on what a school is actually like in a particular year comes from parents who have children there now.`,
      authorId: teresa.id,
      categoryId: schoolsEducation.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "registering-with-gp-cambridge" },
    update: {},
    create: {
      title: "Registering with a GP in Cambridge: What You Need to Know",
      slug: "registering-with-gp-cambridge",
      status: "published",
      body: `One of the most important things to do when you arrive in Cambridge is register with a GP surgery. Do not wait until you are unwell — the registration process takes time, and surgeries in Cambridge are under significant pressure. Registering early gives you access to NHS care, prescriptions, and referrals when you actually need them.

## How to Register

All NHS GP surgeries accept patients based on their home address falling within the practice's registration area. Most Cambridge surgeries allow online registration via their website or through the NHS App, which is the fastest route. You will typically need proof of address (utility bill, bank statement, or tenancy agreement) and photographic ID.

If a surgery near you is not accepting new patients — which does happen, particularly in heavily populated CB1 postcodes — you have the right to register at any practice within a reasonable distance. Call the surgery directly and explain your situation before assuming it is closed to you.

## Main Surgeries by Area

**City Centre and CB1**: The Brookside Practice on Trumpington Street is well-regarded and covers much of the central CB2 area. Mill Road Surgery is popular with CB1 residents and has good GP continuity.

**CB4 (Chesterton and north)**: Chesterton Medical Centre on Union Lane is the main practice for north Cambridge, with a larger-than-average team and reasonable appointment wait times.

**CB2 (Trumpington and south)**: The Trumpington Street Practice handles much of the southern CB2 area. The Firs Medical Centre is a good option for those closer to Hills Road.

## If You Cannot Register Immediately

Use **NHS 111** (call 111 or visit 111.nhs.uk) for non-emergency medical advice and out-of-hours guidance. The Walk-in Centre at Addenbrooke's Hospital handles minor injuries and ailments without a GP referral — queues can be long but the care is good.

Boots Pharmacy on Sidney Street has an NHS-funded minor ailments service that treats a range of common conditions without a GP appointment.

## What Happens After Registration

Most surgeries offer online booking via the NHS App or their patient portal. Routine appointments book up quickly — request them several days in advance. For urgent same-day appointments, call from 8am when slots are released. For continuity on long-term conditions, bring a summary letter from your previous GP when you first register — it speeds up records transfer and ensures repeat prescriptions are not interrupted.`,
      authorId: teresa.id,
      categoryId: healthcare.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "best-areas-to-live-cambridge" },
    update: {},
    create: {
      title: "Best Areas to Live in Cambridge: A Neighbourhood Guide",
      slug: "best-areas-to-live-cambridge",
      status: "published",
      body: `Cambridge is a compact city, and most areas are within reasonable cycling or walking distance of the centre. But where you live shapes your experience considerably — neighbourhood character, transport access, school catchments, and rental prices vary significantly across a city that is only a few miles wide.

## For Families

**Trumpington** is the area most recommended by Cambridge parents with young children. The neighbourhood has expanded significantly with new-build development over the past decade, and the schools — both primaries and Trumpington Community College — are well-regarded. The Addenbrooke's campus is walkable, Trumpington Meadows country park provides open space, and the Waitrose on Trumpington Road makes daily life easy. Rents and prices are higher than Cherry Hinton but lower than Newnham.

**Cherry Hinton** offers more affordable housing while retaining good access to the centre. The community orchards, Cherry Hinton Hall park, and the annual Folk Festival are genuine assets. Schools in the area are solid, and the CB1 postcode means short bus or cycle times to town.

**Chesterton** retains a strong neighbourhood identity. Milton Road has independent shops and a GP surgery, Chesterton Academy has improved significantly, and property prices are lower than equivalent streets south of the river.

## For Professionals

**Mill Road and CB1** is where most newcomers without children end up, and with good reason. The independent shops, cafés, and restaurants make day-to-day life genuinely pleasant. The area is flat and well-connected by cycling. Rents are moderate — cheaper than Newnham, more characterful than Arbury.

**Newnham** is a quieter residential area close to the university, with beautiful Victorian and Edwardian terraces and good walking routes to the Backs and Grantchester. It is expensive for what you get in terms of space, but the quiet streets and proximity to open countryside are hard to put a price on.

**Castle Hill and Chesterton Road** offer the combination of central access and residential character that is hard to find close to the city centre proper. Huntingdon Road has dedicated cycling infrastructure and a reliable bus route.

## For Students and Early Career Researchers

**Romsey and Coleridge** are the postcodes where most Cambridge postgraduates and early-career researchers end up, and they are excellent choices. Walkable to the centre, well-connected by bike to the science parks and hospitals, and notably cheaper than equivalent central addresses.

**Arbury** in the north is the most affordable area with direct bus access and is popular with those on tighter budgets. It is slightly further from the main university departments but the cost difference can be significant.

## What to Avoid

Very central Cambridge addresses — CB2 postcodes closest to the market and colleges — are expensive and noisy during tourist season. Unless you specifically need to be within five minutes of the centre, the areas above offer much better value and quality of life.`,
      authorId: andy.id,
      categoryId: settlingIn.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cambridge-market-square-guide" },
    update: {},
    create: {
      title: "Cambridge Market Square: What to Buy and When to Go",
      slug: "cambridge-market-square-guide",
      status: "published",
      body: `Cambridge Market has been trading in the centre of the city since the Middle Ages, and in its current form it remains one of the most genuinely useful daily markets in England. Unlike many town centre markets that have drifted towards tourist souvenirs, the Cambridge Market retains a strong core of traders selling things people actually need.

## The Stalls

The market runs Monday to Saturday, with some stalls present daily and others appearing only on certain days. The core traders include several fruit and vegetable stalls (competitive pricing, good seasonal range), a cheese stall with a better selection than most supermarkets, a fish stall with fresh Cambridge-area supply, and various hot food vans for lunch.

The secondhand books section on the north side is one of Cambridge's quiet pleasures. The range is variable and depends on the week, but paperback fiction, local history, and academic titles often appear at excellent prices.

## What the Market Does Well

Fresh produce pricing is significantly better than the Grand Arcade supermarkets for most fruit and vegetables. Buying from the market rather than a supermarket for weekly veg is genuinely cost-effective.

The craft and maker stalls are stronger on Saturdays — prints, jewellery, ceramics, and preserved foods from local producers.

## What the Market Does Less Well

The souvenir and tourist section has grown over the years and takes up more of the square than residents would prefer. Navigate around it.

## Practical

The market is busiest between 10am and 1pm. Arrive before 10am for the full choice at the food stalls. The surrounding streets become very congested at lunchtime — approaching on foot or by bike is easier than by car or bus.`,
      authorId: alex.id,
      categoryId: shopping.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-05"),
    },
  });

  await db.guide.upsert({
    where: { slug: "jesus-green-lido-cambridge" },
    update: {},
    create: {
      title: "Jesus Green Lido: Open-Air Swimming in the City Centre",
      slug: "jesus-green-lido-cambridge",
      status: "published",
      body: `Jesus Green Lido is one of Cambridge's most distinctive amenities — a 90-metre outdoor swimming pool on the banks of the Cam, open from early May through mid-September. It is free to enter and has been a Cambridge institution since 1923.

## What to Expect

The pool is 90 metres long and unheated, which means water temperatures depend on the season and the weather. In late May and early June it is bracing; by August it can reach a genuinely comfortable temperature. The pool has separate shallow and deep sections and is popular for lane swimming in the morning and more casual use in the afternoon.

The changing facilities are basic — lockers exist but bring your own padlock. Arrive early on warm weekends; the pool reaches capacity and will close its gates.

## Surrounding Park

Jesus Green itself is one of the most used open spaces in Cambridge: flat, well-maintained, and long enough to run the full length alongside the river. The adjacent Midsummer Common is connected and hosts the annual Strawberry Fair and Midsummer Fair.

## Getting There

Jesus Green is north of the city centre, accessed from Victoria Avenue or Jesus Lock. It is a ten-minute walk from the Grafton Centre and easily cyclable from almost anywhere in Cambridge.

## Cost

Free. No booking required. Bring a towel and arrive prepared for variable water temperatures.`,
      authorId: max.id,
      categoryId: sportsFitness.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-10"),
    },
  });

  await db.guide.upsert({
    where: { slug: "parks-nature-toddler-guide" },
    update: {},
    create: {
      title: "Ducks and Puddles: A 4-Year-Old's Guide to Cambridge Parks",
      slug: "parks-nature-toddler-guide",
      status: "published",
      body: `Cambridge has lots of green places. Here are the best ones for when you are four.

## The Best Ducks

The pond at the Botanic Garden is good, but the ducks near the Mill Pond are the hungriest. They like it when you watch them paddle. Don't give them bread, give them peas!

## The Biggest Puddles

When it rains, Chesterton Recreation Ground has the best puddles for jumping. You need big boots.

## The Cows

The cows on Coe Fen are very big but they are friendly. They just want to eat the grass. Don't touch them, just wave!`,
      authorId: leo.id,
      categoryId: parksNature.id,
      locationId: chesterton.id,
      publishedAt: new Date("2026-05-01"),
    },
  });


  await db.guide.upsert({
    where: { slug: "cambridge-estate-agents-guide" },
    update: {},
    create: {
      title: "Estate Agents in Cambridge: Who to Use and What to Expect",
      slug: "cambridge-estate-agents-guide",
      status: "published",
      body: `Cambridge's property market is active, tight, and expensive relative to most of England. Finding the right estate agent — whether you are renting or buying — makes a material difference to the experience. Here is a frank summary of the main players and what to expect.

## For Rentals

The largest rental portfolio in Cambridge is spread across a handful of agencies. **Redmayne Arnold & Harris (RA&H)** has been a major Cambridge letting agent for decades and handles a large volume of properties across the city. Reliable but not especially proactive — expect to chase for viewings.

**Pocock & Shaw** covers central Cambridge postcodes and has a good reputation for better-quality properties in CB1 and CB2. Response times are generally good.

**Cambridge Accommodation Matching Service** (available to University staff and students) lists private landlords who have agreed to the University's standards. Worth consulting before going to the open market.

For Mill Road and the CB1 area specifically, **Let Property** has a strong local focus with staff who know the streets.

## For Buying

**Bidwells** is Cambridge's most established residential agency for sales, particularly for village and detached properties. Their city-centre coverage is good, and they also handle commercial property.

**Cheffins** is a genuine Cambridge institution operating since 1863, strong in residential, commercial, and auctions. Their residential auctions at the Doubletree Hilton are worth attending even if you are not buying — educational about true market prices.

**Savills** and **Carter Jonas** handle the upper end of the Cambridge residential market. Both have excellent local knowledge above £700,000.

## What to Know Before You Start

In Cambridge's rental market, good properties go within 24–48 hours. Have your documents ready before you need them: proof of income, three months of bank statements, and references from a previous landlord or employer. International arrivals without a UK credit history may be asked for a larger deposit or a UK guarantor — clarify this upfront before spending time on viewings.

For buying, a typical terraced house in CB1 is listed at £400,000–550,000; semi-detached in Chesterton or Cherry Hinton at £450,000–600,000. The spring market (March–June) is the most competitive.

Instruct your solicitor before your offer is accepted. The same small pool of Cambridge conveyancers handles most local transactions, and good ones book up fast in a rising market.`,
      authorId: tom.id,
      categoryId: estateAgentsProperty.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "registering-with-gp-cambridge" },
    update: {},
    create: {
      title: "Registering with a GP in Cambridge: What You Need to Know",
      slug: "registering-with-gp-cambridge",
      status: "published",
      body: `One of the most important things to do when you arrive in Cambridge is register with a GP surgery. Do not wait until you are unwell — the registration process takes time, and surgeries in Cambridge are under significant pressure. Registering early gives you access to NHS care, prescriptions, and referrals when you actually need them.

## How to Register

All NHS GP surgeries accept patients based on their home address falling within the practice's registration area. Most Cambridge surgeries allow online registration via their website or through the NHS App, which is the fastest route. You will typically need proof of address (utility bill, bank statement, or tenancy agreement) and photographic ID.

If a surgery near you is not accepting new patients — which does happen, particularly in heavily populated CB1 postcodes — you have the right to register at any practice within a reasonable distance. Call the surgery directly and explain your situation before assuming it is closed to you.

## Main Surgeries by Area

**City Centre and CB1**: The Brookside Practice on Trumpington Street is well-regarded and covers much of the central CB2 area. Mill Road Surgery is popular with CB1 residents and has good GP continuity.

**CB4 (Chesterton and north)**: Chesterton Medical Centre on Union Lane is the main practice for north Cambridge, with a larger-than-average team and reasonable appointment wait times.

**CB2 (Trumpington and south)**: The Trumpington Street Practice handles much of the southern CB2 area. The Firs Medical Centre is a good option for those closer to Hills Road.

## If You Cannot Register Immediately

Use **NHS 111** (call 111 or visit 111.nhs.uk) for non-emergency medical advice and out-of-hours guidance. The Walk-in Centre at Addenbrooke's Hospital handles minor injuries and ailments without a GP referral — queues can be long but the care is good.

Boots Pharmacy on Sidney Street has an NHS-funded minor ailments service that treats a range of common conditions without a GP appointment.

## What Happens After Registration

Most surgeries offer online booking via the NHS App or their patient portal. Routine appointments book up quickly — request them several days in advance. For urgent same-day appointments, call from 8am when slots are released. For continuity on long-term conditions, bring a summary letter from your previous GP when you first register — it speeds up records transfer and ensures repeat prescriptions are not interrupted.`,
      authorId: rachel.id,
      categoryId: healthcare.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cycle-shops-cambridge-guide" },
    update: {},
    create: {
      title: "Cycle Shops in Cambridge: Where to Buy, Repair, and Get Set Up",
      slug: "cycle-shops-cambridge-guide",
      status: "published",
      body: `If you are arriving in Cambridge without a bicycle, getting one should be near the top of your list. The city's cycling infrastructure is genuinely good, and a working bike changes your relationship with the place. Here is where to go, depending on what you need.

## Ben Hayward Cycles

The oldest bicycle shop in Cambridge — established in 1890 — Ben Hayward Cycles is on City Road, a ten-minute walk from the Grand Arcade. This is where Cambridge cyclists take their bikes for serious repairs, and where buying secondhand is as viable as buying new. The staff have the kind of deep product knowledge that only comes from decades of handling every kind of bike problem.

Ben Hayward is the best first stop if you want a practical commuting or hybrid bike, or if you need mechanical work done properly. Prices are fair and waiting times for repairs are usually shorter than elsewhere in the city.

## Cambridge Bicycle

On Newmarket Road near the Mill Road junction, Cambridge Bicycle is a well-stocked independent covering road cycling, commuting, and accessories. They carry a good range of Brompton folding bikes — worth considering if you are combining cycling with train travel to London.

## Cycle King

The main chain option, with a shop near the Grand Arcade and another in the Grafton Centre. Good for a wide range at accessible prices. For a basic commuter bike under £400, this is a practical starting point.

## Cyclepoint at Cambridge Station

A purpose-built facility next to Cambridge Railway Station offering secure cycle parking (monthly and daily rates), a full servicing workshop, bike hire, and a small accessories shop. If you are combining cycling with a rail commute, a Cyclepoint monthly parking pass is excellent value.

## What to Budget

A reliable commuting bike — mudguards, rear rack, lights — costs £350–600 new. Secondhand bikes via Gumtree or University classified boards can be good value, but have Ben Hayward check any secondhand bike before you commit.

Two locks are non-negotiable. Budget £60–90 for a good D-lock (Kryptonite, Abus, or Hiplok) and a secondary cable. See the separate bike theft guide for security strategy.

## The Cycling Community

Cambridge Cycling Campaign (Camcycle) runs events, advocates for infrastructure improvements, and maintains the best map of recommended cycle routes through the city — including quieter back-street options that are not obvious to newcomers. Their website is a practical first resource.`,
      authorId: priya.id,
      categoryId: cycling.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "council-tax-utilities-cambridge" },
    update: {},
    create: {
      title: "Council Tax and Utilities in Cambridge: A New Resident's Guide",
      slug: "council-tax-utilities-cambridge",
      status: "published",
      body: `Setting up council tax and utilities is one of those tasks nobody tells you about in advance, but getting it right from the start avoids a backlog of letters and potential penalties. Here is what you need to do.

## Council Tax

Council tax in Cambridge is administered by **Cambridge City Council** for properties within the city boundary (primarily CB1–CB4). Properties in parts of CB2 and beyond may fall under **South Cambridgeshire District Council**, which has a different rate. Check your exact postcode on each council's website if you are unsure.

Cambridge City Council Band D for 2025–26 is approximately £1,940 per year, payable in ten monthly instalments. You can request twelve monthly payments instead. Set up a direct debit via the council's online portal.

**Student exemption**: Full-time students registered at a UK university are exempt from council tax. If you are the sole adult in the property and a full-time student, the property is fully exempt. Collect your council tax exemption certificate from your university's student services office and send it to the council immediately upon moving in.

## Water

Cambridge is supplied by **Cambridge Water** for drinking water; sewerage is managed by **Anglian Water**. Both are area monopolies — register with Cambridge Water when you move in. Cambridge water is hard (chalk geology), which means limescale on appliances. A water filter jug is a practical and inexpensive solution.

## Electricity and Gas

Unlike water, you can choose your energy supplier. Find out the current default supplier from the agent or previous occupant and transfer the account to your name first, then switch via Uswitch or the Ofgem comparison tool if you want a better deal. Check whether the property has a smart meter — most newer Cambridge properties do; if not, submit monthly readings.

## Waste and Recycling

Cambridge City Council runs alternate fortnightly collections: one week blue (recycling) and green bins, the next grey (general waste) and food waste caddy. Collection days vary by street — check your schedule via the council website when you arrive. Garden waste requires a separate subscription to the brown bin service (around £65/year).

## Broadband

Full-fibre broadband is available on most Cambridge streets. Providers include BT/EE via Openreach, Virgin Media, and Community Fibre. Standard superfast packages run £25–35 per month. Many Cambridge rentals include broadband in all-bills-included arrangements — clarify this with your landlord before setting up a separate contract.`,
      authorId: elena.id,
      categoryId: settlingIn.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "community-groups-meeting-people-cambridge" },
    update: {},
    create: {
      title: "Community Groups and Meeting People in Cambridge",
      slug: "community-groups-meeting-people-cambridge",
      status: "published",
      body: `Cambridge can feel surprisingly isolating when you first arrive. The city is full of people who are temporarily here — students, postdocs, visiting researchers — and the transience that makes it vibrant also means social networks take more deliberate effort to build than in cities where people stay for decades. The good news is that well-established communities exist for almost every interest, and the city is small enough that connections happen quickly once you start looking.

## For University Newcomers

The **Newcomers and Visiting Scholars (NVS) Group** is one of Cambridge's most active newcomer organisations, primarily serving partners and families of people who have arrived for academic work. It runs coffee mornings, guided tours, language classes, and social events throughout term. Even if you are not technically a "visiting scholar," the group is open to anyone connected to the university community.

The **University of Cambridge Graduate Union** (GU) runs events and support for graduate students specifically, including a comprehensive Freshers' Fair at the start of Michaelmas term.

## Parkrun

Saturday morning Parkrun at Coldham's Common (5km, free, 9am) is one of the most effective ways to meet people in Cambridge who intend to stay. It draws NHS staff, tech workers, academic families, and longtime residents in a non-pretentious, no-membership context. Cambridge also has Parkruns at Milton Country Park and Gog Magog Hills for variation.

## Interest and Activity Groups

Cambridge has an active Meetup.com scene with groups for hiking, board games, language exchange, photography, and most other interests. The Cambridge Film Festival, Cambridge Literary Festival, and Cambridge Science Festival all attract good crowds and are worth attending for their social as well as cultural value.

Cambridge Astronomical Society, University public lecture series (open to non-members), and the Cambridge Union (debates, open to public membership) are among the more distinctive local offerings.

## Volunteering

**Volunteer Cambridge** is the city's main volunteering hub, matching people to organisations across the city. Cambridge Cyrenians runs a night shelter and soup kitchen and is a well-regarded local charity. Community orchard, food bank, hospice support, and museum volunteering networks are all active.

## Neighbourhood Life

Mill Road Winter Fair in early December is the best single event for getting a feel for the Mill Road community. Cherry Hinton Village Festival, Midsummer Fair, and college Open Days throughout the year provide reasons to engage with different parts of the city.

WhatsApp neighbourhood groups and the Cambridge Community Forum on Facebook are where practical Cambridge conversation happens — useful for finding a plumber, asking about local services, or understanding what that helicopter was doing at 2am.`,
      authorId: elena.id,
      categoryId: settlingIn.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cambridge-car-free-guide" },
    update: {},
    create: {
      title: "Living Car-Free in Cambridge: A Practical Guide",
      slug: "cambridge-car-free-guide",
      status: "published",
      body: `Cambridge is one of the most practical cities in England to live without a car. The city is small, flat, cycle-friendly, reasonably well-served by public transport, and connected by rail to the wider region. Many residents manage it without inconvenience. Here is how to make it work.

## Cycling First

Cambridge has over 80 kilometres of cycle paths and routes, and the flat terrain makes cycling practical for most journeys year-round. A commuting bike with mudguards and lights covers 90% of Cambridge journeys. The station to city centre takes about eight minutes; Addenbrooke's to the city centre takes twelve. See the dedicated cycling guides for details on bike shops and security.

## The Bus Network

Stagecoach operates the Citi bus network across the main residential corridors. Citi 1 (Chesterton to Addenbrooke's), Citi 2 (Arbury to Cherry Hinton), and Citi 7 (Mill Road) are the most useful routes for daily life. Frequency is good during the day — roughly every 10–12 minutes on core routes — but drops sharply after 7pm and is sparse after 9pm.

The **Busway** (Citi A and D routes) provides fast, frequent service to St Ives, Huntingdon, and Ely via dedicated guided bus lanes. The Park & Ride sites at Trumpington, Babraham Road, and Milton are the correct approach for anyone driving in from outside.

## Rail Connections

Cambridge Station and Cambridge North (Chesterton) provide excellent regional access. London King's Cross is 50 minutes on the fast train; Stansted Airport is 30 minutes; Ely is 15 minutes. A Railcard significantly reduces the cost of regular rail travel — the Network Railcard covers all of East Anglia and pays for itself quickly.

## Taxis and Car Share

**Panther Taxis** is Cambridge's established taxi company and notably more reliable than Uber for city pickups, particularly at peak times. Booking 15–30 minutes ahead is advisable rather than attempting to hail.

**ZipCar** has a fleet of vehicles at fixed locations around Cambridge. A membership (annual fee plus hourly rates) is the practical solution for the occasional IKEA run or country visit that genuinely requires a car.

## Shopping Without a Car

The central city is walkable for most shopping. Tesco Express, Co-op, and various independent grocery shops are scattered throughout the residential postcodes; you are rarely more than ten minutes from a food shop by bike. For large grocery shops, a cargo bike trailer or a good backpack is practical. For large deliveries — furniture, appliances — order direct; almost everything delivers to Cambridge without difficulty given the city's proximity to major logistics hubs.`,
      authorId: rachel.id,
      categoryId: gettingAround.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-05-03"),
    },
  });

  // ── Guides (new — undercovered categories) ────────────────────

  // Sports & Fitness
  await db.guide.upsert({
    where: { slug: "jesus-green-lido-cambridge" },
    update: {},
    create: {
      title: "Jesus Green Lido: Open-Air Swimming in the City Centre",
      slug: "jesus-green-lido-cambridge",
      status: "published",
      body: `Jesus Green Lido is one of Cambridge's most distinctive amenities — a 90-metre outdoor swimming pool on the banks of the Cam, open from early May through mid-September. It is free to enter and has been a Cambridge institution since 1923.

## What to Expect

The pool is 90 metres long and unheated, which means water temperatures depend on the season and the weather. In late May and early June it is bracing; by August it can reach a genuinely comfortable temperature. The pool has separate shallow and deep sections and is popular for lane swimming in the morning and more casual use in the afternoon.

The changing facilities are basic — lockers exist but bring your own padlock. Arrive early on warm weekends; the pool reaches capacity and will close its gates.

## Surrounding Park

Jesus Green itself is one of the most used open spaces in Cambridge: flat, well-maintained, and long enough to run the full length alongside the river. The adjacent Midsummer Common is connected and hosts the annual Strawberry Fair and Midsummer Fair.

## Getting There

Jesus Green is north of the city centre, accessed from Victoria Avenue or Jesus Lock. It is a ten-minute walk from the Grafton Centre and easily cyclable from almost anywhere in Cambridge.

## Cost

Free. No booking required. Bring a towel and arrive prepared for variable water temperatures.`,
      authorId: rachel.id,
      categoryId: sportsFitness.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-10"),
    },
  });

  await db.guide.upsert({
    where: { slug: "parkrun-cambridge-guide" },
    update: {},
    create: {
      title: "Parkrun in Cambridge: Free Running Every Saturday Morning",
      slug: "parkrun-cambridge-guide",
      status: "published",
      body: `Cambridge has three Parkrun events, each free to enter, timed, and open to anyone with a barcode. Saturday 9am, 5km. This is one of the most effective ways to get fit and meet people in the city simultaneously.

## Coldham's Common (CB1)

The most central Cambridge Parkrun, held on Coldham's Common off Barnwell Road. The course is flat and mostly on grass with some tarmac paths — fast in dry weather, muddy in autumn and winter. Typically draws 200–400 runners depending on the season.

Atmosphere is notably mixed: experienced runners chasing PBs alongside people doing their first ever 5km. The post-run café culture at the nearby Cow Hollow or various local cafés has developed organically.

## Milton Country Park

A short drive or cycle from the city, Milton Parkrun takes place in a pleasant country park setting with lake views and a mix of path types. Better drainage than Coldham's Common, which matters in winter.

## Gog Magog Hills

The hilliest of the Cambridge area options — relatively unusual in this flat part of the country. The views from the escarpment make the extra effort worthwhile.

## How to Register

Register once at parkrun.org.uk, receive a barcode, and show up. Print your barcode or use the app. Results are sent by email within a few hours and your times are tracked permanently. Volunteering is straightforward and valued — the events depend on a roster of weekly volunteers.`,
      authorId: rachel.id,
      categoryId: sportsFitness.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-16"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cambridge-rowing-guide" },
    update: {},
    create: {
      title: "Rowing in Cambridge: Getting on the Water Without a College",
      slug: "cambridge-rowing-guide",
      status: "published",
      body: `Cambridge is one of Britain's great rowing cities — the Cam's straightness and the concentration of university boathouses make it ideal. Most of the visible rowing is collegiate and university-affiliated, but there are accessible routes for anyone who wants to get on the water regardless of college membership.

## City of Cambridge Rowing Club

The City of Cambridge Rowing Club, based at their boathouse on the river near Chesterton, is the main route into rowing for non-university residents. They run beginner courses in spring and autumn, adult recreational rowing, and competitive programmes for those who want race experience. Membership is around £200–350 per year depending on category — less than most Cambridge gyms.

Learn to Row courses run for around six weeks and cover the basics from bank-side to single sculling. Equipment is provided during the course.

## Bumps Racing

Cambridge's traditional form of competitive rowing is Bumps — a format unique to the Cam and the Isis in Oxford, where boats start in a line and attempt to catch and bump the boat ahead. The university Bumps events (Lents and Mays) are not open to non-university rowers, but City Bumps in autumn includes club members.

## The River

The upper Cam (above Jesus Lock) is where most rowing takes place. It is shared with punts, kayaks, and narrow boats, which requires constant vigilance. Priority conventions exist but are not universally understood. Sunday mornings are the best time for a clear river.`,
      authorId: oliver.id,
      categoryId: sportsFitness.id,
      locationId: chesterton.id,
      publishedAt: new Date("2026-04-20"),
    },
  });

  // Shopping
  await db.guide.upsert({
    where: { slug: "cambridge-market-square-guide" },
    update: {},
    create: {
      title: "Cambridge Market Square: What to Buy and When to Go",
      slug: "cambridge-market-square-guide",
      status: "published",
      body: `Cambridge Market has been trading in the centre of the city since the Middle Ages, and in its current form it remains one of the most genuinely useful daily markets in England. Unlike many town centre markets that have drifted towards tourist souvenirs, the Cambridge Market retains a strong core of traders selling things people actually need.

## The Stalls

The market runs Monday to Saturday, with some stalls present daily and others appearing only on certain days. The core traders include several fruit and vegetable stalls (competitive pricing, good seasonal range), a cheese stall with a better selection than most supermarkets, a fish stall with fresh Cambridge-area supply, and various hot food vans for lunch.

The secondhand books section on the north side is one of Cambridge's quiet pleasures. The range is variable and depends on the week, but paperback fiction, local history, and academic titles often appear at excellent prices.

## What the Market Does Well

Fresh produce pricing is significantly better than the Grand Arcade supermarkets for most fruit and vegetables. Buying from the market rather than a supermarket for weekly veg is genuinely cost-effective.

The craft and maker stalls are stronger on Saturdays — prints, jewellery, ceramics, and preserved foods from local producers.

## What the Market Does Less Well

The souvenir and tourist section has grown over the years and takes up more of the square than residents would prefer. Navigate around it.

## Practical

The market is busiest between 10am and 1pm. Arrive before 10am for the full choice at the food stalls. The surrounding streets become very congested at lunchtime — approaching on foot or by bike is easier than by car or bus.`,
      authorId: marcus.id,
      categoryId: shopping.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-05"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cambridge-covered-market-guide" },
    update: {},
    create: {
      title: "The Cambridge Covered Market: Artisan Shops Worth Exploring",
      slug: "cambridge-covered-market-guide",
      status: "published",
      body: `The Cambridge Covered Market — accessed from Market Street or from inside the Grand Arcade — is one of the city's most overlooked commercial spaces. A network of Victorian covered passages, it houses an eclectic mix of independent traders that has resisted the homogenisation of the surrounding high street.

## What's Inside

The mix changes slowly over time, but at the time of writing the covered market contains: a well-stocked map and travel bookshop, two independent record shops (one new, one secondhand), a stamp and coin dealer, a fabric shop, several made-to-order jewellers, a haberdashery, a bespoke leather goods maker, and several cafés and sandwich counters.

The cheese shop inside the covered market is one of the best in Cambridge — smaller than the market square stall but with a more focused range and staff who know the stock in detail.

## Why It Matters

The covered market represents a form of retail that is increasingly rare: small, specialist, independent. Most of the traders have been there for decades and have deep knowledge of their area. This is where you go for something specific that a chain store would not stock, or when you want advice from someone who has spent years in a subject.

## Hours and Access

The covered market is open six days a week, typically 9am–5:30pm Monday to Saturday. Some individual traders keep shorter hours. The market is accessible and undercover, which makes it a practical destination year-round.`,
      authorId: marcus.id,
      categoryId: shopping.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-09"),
    },
  });

  // Culture & Museums
  await db.guide.upsert({
    where: { slug: "kettles-yard-cambridge-guide" },
    update: {},
    create: {
      title: "Kettle's Yard: The Most Personal Gallery in Cambridge",
      slug: "kettles-yard-cambridge-guide",
      status: "published",
      body: `Kettle's Yard, on Castle Street near the Castle Hill roundabout, is one of the most distinctive art spaces in Britain. It was established by Jim and Helen Ede as a living space and open house for artists and students in the 1950s, and it remains today a combination of gallery and house museum that feels unlike anywhere else.

## The House

The original house — four cottages converted into a single flowing space — is kept as it was when the Edes lived here: pictures hung to Jim's exact specifications, pebbles arranged on windowsills, natural light falling on carefully positioned objects. The collection is mid-century British modernism: Brancusi, Gaudier-Brzeska, Ben Nicholson, Christopher Wood, Alfred Wallis. But it is the hanging and arrangement — the way a Miró sits above a spiral of stones, or a Nicholson catches the morning light — that makes the house remarkable.

The house can only be visited in small groups during timed admission slots. Book in advance on busy days.

## The Gallery Extension

The contemporary gallery extension (reopened 2018) sits adjacent to the house and hosts a changing programme of contemporary exhibitions. This is separate from the house admission and is free. The programming is consistently ambitious and tends to avoid the predictable.

## Practical

Castle Street is a short walk from Magdalene Bridge. The house is closed on Mondays. Gallery and cafe hours vary — check the website before visiting. The café is small but good.

Free entry to the gallery; house visits are free but require a timed slot from the desk.`,
      authorId: david.id,
      categoryId: cultureMuseums.id,
      locationId: castleHill.id,
      publishedAt: new Date("2026-04-19"),
    },
  });

  await db.guide.upsert({
    where: { slug: "adc-theatre-cambridge-guide" },
    update: {},
    create: {
      title: "The ADC Theatre: Cambridge's Student Drama Scene",
      slug: "adc-theatre-cambridge-guide",
      status: "published",
      body: `The ADC Theatre on Park Street is the oldest university playhouse in England and the centre of Cambridge's drama world. It produces more than forty productions a year, entirely student-run, and has served as the proving ground for a disproportionate number of people who went on to careers in theatre, television, and film.

## What's On

The main house seats around 200 and runs a year-round programme: Shakespeare, new writing, musicals, comedy revues, and late-night shows after the main evening performance. The Corpus Playroom on Bene't Street, which is also part of the ADC umbrella, provides a more intimate 50-seat space for experimental and new writing.

Tickets are inexpensive — typically £8–14 for the main house — making the ADC one of the best-value cultural options in Cambridge. Quality varies, but the standard is often higher than prices would suggest, and you are occasionally watching future professionals at a very early point in their careers.

## The Cambridge Footlights

The Footlights revue appears at the ADC each year, typically in late spring before touring to Edinburgh. This is the most visible face of Cambridge comedy and an institution since the 1880s. Past members include John Cleese, Emma Thompson, Hugh Laurie, and a significant portion of the British comedy and drama establishment.

## Booking

The ADC box office is online or by phone. Some shows sell out quickly, particularly the Footlights revue and popular musicals. Booking a few days in advance is sensible for anything in the final week of a run.`,
      authorId: martin.id,
      categoryId: cultureMuseums.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-24"),
    },
  });

  // Nightlife
  await db.guide.upsert({
    where: { slug: "cambridge-nightlife-guide-students" },
    update: {},
    create: {
      title: "Cambridge Nightlife: A Practical Guide for Students",
      slug: "cambridge-nightlife-guide-students",
      status: "published",
      body: `Cambridge's nightlife is smaller than its reputation for academic intensity might suggest, but it is more varied than visitors expect. Here is an honest picture of what is available and how to approach it.

## Clubs

**Vinyl** on Sidney Street is the most credible club in the city centre — a basement venue with a proper sound system, focused on dance music, and managed with enough care to maintain a reasonable atmosphere. Guest nights and regular club nights across the week; the Thursday student nights are the most reliably good.

**Fez Club** on Market Passage is a Cambridge institution for better or worse — two floors of different music, consistently busy, uneven in quality but reliable for a full night out when everything else is full. Popular with undergraduates for its capacity and central location.

**Kambar** off King Street is smaller and more focused. Alternative and rock music, a pool table, cheap drinks, and a genuinely local crowd rather than a primarily student one. Good option for those who find the larger clubs uncomfortable.

## Bars

Most of the better Cambridge bars have been mentioned in the pub guides. For later-night drinking, The Regal Wetherspoons on St Andrew's Street is vast, cheap, and unpretentious — the practical option when nothing else is accessible. The Portland Arms in Chesterton has live music most weekends and a local following distinct from the city-centre scene.

## Practical

Cambridge closes early by metropolitan standards. Last entry at most clubs is 2am; last orders are 3am at the latest. Pre-drinking at someone's college or flat is the norm. Panther Taxis is reliable at the end of the night; Uber can be unpredictable at peak hours.`,
      authorId: james.id,
      categoryId: nightlife.id,
      locationId: cityCenter.id,
      publishedAt: new Date("2026-04-21"),
    },
  });

  // Parks & Nature
  await db.guide.upsert({
    where: { slug: "grantchester-meadows-walk" },
    update: {},
    create: {
      title: "Grantchester Meadows: The Best Walk from Cambridge",
      slug: "grantchester-meadows-walk",
      status: "published",
      body: `The walk from Cambridge to Grantchester along the river Cam is the essential Cambridge walk — flat, beautiful, and easy enough to do in any weather. It takes around forty minutes each way at a relaxed pace and delivers you to one of the most pleasant villages within reach of the city.

## The Route

Start at Silver Street Mill Pond and follow the tow path south along the west bank of the Cam. The path passes through Lammas Land — a common-land meadow with a paddling pool popular with families in summer — and continues through fields and riverside meadows to the Grantchester Meadows themselves.

The meadow path is owned by the National Trust and is open year-round. In summer the long grass is full of wildflowers and the meadow fills with Cambridge residents bringing picnic blankets and bottles of wine. In winter the same path is windswept and beautiful in a different way.

## Grantchester Village

The village itself is compact: a church, a pub, and the Orchard Tea Garden. The Orchard has been hosting Cambridge visitors since 1897 and famously entertained Rupert Brooke, Virginia Woolf, and much of pre-war Bloomsbury. Tea and scones under the apple trees in summer remains as good an afternoon as Cambridge offers.

The Rupert Brooke pub in the village centre serves reliable food and has a good garden. Booking ahead at weekends is sensible.

## Punting

The walk can also be done by punt. Scudamore's operates a one-way punt hire from Silver Street to Grantchester with return by taxi. Punting up against the current is hard work; going downstream on return is faster and more pleasant.

## When to Go

May to September for the full meadow experience. November to February for bracing solitude and unobstructed views. Avoid August weekend afternoons if you want peace.`,
      authorId: amelia.id,
      categoryId: parksNature.id,
      locationId: newnham.id,
      publishedAt: new Date("2026-04-26"),
    },
  });

  await db.guide.upsert({
    where: { slug: "cherry-hinton-chalk-pits-guide" },
    update: {},
    create: {
      title: "Cherry Hinton Hall and the Chalk Pits: A Hidden Green Space",
      slug: "cherry-hinton-chalk-pits-guide",
      status: "published",
      body: `Cherry Hinton is an often-overlooked suburb southeast of Cambridge, but it contains one of the city's most distinctive natural spaces: the Cambridge Wildlife Trust chalk pits, adjacent to Cherry Hinton Hall Park. This is a genuinely unusual landscape for East Anglia — exposed chalk grassland with specialist wildflower communities and a different character from the river meadows that define most of Cambridge's open spaces.

## The Chalk Pits

The pits were created by historical quarrying and the exposed south-facing chalk slopes now support a range of chalk-grassland species including several orchids in early summer. The site is managed by the Wildlife Trust and is accessible year-round via a signed path from the Cherry Hinton Hall Park car park.

The orchid flowering season runs from late May through June — pyramid orchids and bee orchids appear reliably in good years. The site is not enormous but the quality of the flora is high for its size.

## Cherry Hinton Hall Park

The surrounding parkland is a straightforward community green space with play equipment, a football pitch, and the Hall itself (used as an event venue). The Cambridge Folk Festival takes place here each July and transforms the park into one of the UK's most beloved music events.

## Getting There

Cherry Hinton Hall is accessible from the Citi 1 bus (towards Addenbrooke's and Trumpington) — stop at Queen Edith's Way, then walk south. By bicycle from the city centre takes around 15–20 minutes via Queen Edith's Way.`,
      authorId: david.id,
      categoryId: parksNature.id,
      locationId: cherryHinton.id,
      publishedAt: new Date("2026-04-29"),
    },
  });

  // ── Reviews ────────────────────────────────────────────────────

  const guideBySlug = async (slug: string) => {
    const g = await db.guide.findUnique({ where: { slug } });
    if (!g) throw new Error(`Guide not found: ${slug}`);
    return g;
  };

  const expertBySlug = async (slug: string) => {
    const e = await db.expert.findUnique({ where: { slug } });
    if (!e) throw new Error(`Expert not found: ${slug}`);
    return e;
  };

  // Reviews on guides
  const cyclingGuide = await guideBySlug("cycling-cambridge-beginners-guide");
  const cheapEatsGuide = await guideBySlug("best-cheap-eats-cambridge-students");
  const freshersGuide = await guideBySlug("surviving-freshers-week-cambridge");
  const eagleGuide = await guideBySlug("the-eagle-cambridge-a-local-guide");
  const freePresssGuide = await guideBySlug("the-free-press-cambridge-hidden-gem");
  const botanicGuide = await guideBySlug("cambridge-botanic-garden-guide");
  const fitzGuide = await guideBySlug("fitzwilliam-museum-visitors-guide");
  const backsGuide = await guideBySlug("the-backs-cambridge-walking-guide");
  const rentingGuide = await guideBySlug("renting-in-cambridge-new-arrivals-guide");
  const puntingGuide = await guideBySlug("punting-in-cambridge-complete-guide");
  const grantchesterGuide = await guideBySlug("grantchester-meadows-walk");
  const marketGuide = await guideBySlug("cambridge-market-square-guide");

  // Reviews on experts
  const andyExpert = await expertBySlug("andy-family-dad");
  const teresaExpert = await expertBySlug("teresa-family-mom");
  const alexExpert = await expertBySlug("alex-family-son-10");
  const maxExpert = await expertBySlug("max-family-son-7");
  const leoExpert = await expertBySlug("leo-family-son-4");

  const reviewSeeds = [
    // Guide reviews
    { rating: 5, body: "Exactly what I needed in my first week. The two-lock rule saved my bike within a month — my neighbour ignored it and lost theirs. Brilliant, practical guide.", authorName: "Jamie F.", guideId: cyclingGuide.id },
    { rating: 5, body: "The falafel van at the market is a game changer. This guide is accurate and the Copper Kettle tip with the student discount is genuinely useful.", authorName: "Priya T.", guideId: cheapEatsGuide.id },
    { rating: 4, body: "Honest and reassuring. The point about supervision work starting in week one is something nobody told me — I wish I'd read this before arriving.", authorName: "Noah C.", guideId: freshersGuide.id },
    { rating: 5, body: "The DNA Bar ceiling stopped me in my tracks. The context about the airmen makes it hit completely differently. Superb guide — I've sent it to everyone visiting Cambridge.", authorName: "Margaret H.", guideId: eagleGuide.id },
    { rating: 5, body: "I've been coming to The Free Press for three years and this description is exactly right. \"Go on a Tuesday evening\" is genuinely the best advice. Nobody should change this pub.", authorName: "Daniel A.", guideId: freePresssGuide.id },
    { rating: 5, body: "The winter garden tip is inspired — I never would have thought to go in January, but the snowdrops were extraordinary. Completely changed how I use this place.", authorName: "Linh P.", guideId: botanicGuide.id },
    { rating: 5, body: "I've lived in Cambridge for two years and never been. This finally got me through the door. The Degas pastels are stunning and the Cézanne card players is exactly as described.", authorName: "Thomas W.", guideId: fitzGuide.id },
    { rating: 4, body: "The timing advice is gold. Got there at 8am on a Tuesday in October and had the King's view entirely to myself. Everyone I know gets there at 2pm in August and complains.", authorName: "Sara K.", guideId: backsGuide.id },
    { rating: 5, body: "Moved from Vienna last year and this guide described my experience exactly. The section on EPC ratings for Victorian terraces would have saved me a very cold winter if I'd read it first.", authorName: "Klaus M.", guideId: rentingGuide.id },
    { rating: 4, body: "The punting technique description is accurate. I fell in twice but that's my fault, not the guide's. The Grantchester trip was the best afternoon I've had in Cambridge.", authorName: "Alex R.", guideId: puntingGuide.id },
    { rating: 5, body: "The Orchard Tea Garden in May is exactly as described — apple trees, deckchairs, and the most civilised afternoon imaginable. This walk should be in every Cambridge guide.", authorName: "Emma B.", guideId: grantchesterGuide.id },
    { rating: 4, body: "The secondhand books section is real and wonderful. Found a 1960s local history book I'd been looking for for months. Go on a weekday morning to find the best stuff before it goes.", authorName: "Robert D.", guideId: marketGuide.id },
    { rating: 5, body: "Rutland Cycling has a good range — I rented a hybrid for a week and it was exactly what I needed to explore the city. Brilliant starting point for anyone new to cycling here.", authorName: "Yi L.", guideId: cyclingGuide.id },
    { rating: 3, body: "Good overview but slightly outdated on prices — the falafel wrap was closer to £6 when I went. Still the best value option in the centre by a mile.", authorName: "Jack O.", guideId: cheapEatsGuide.id },
    // Expert reviews
    { rating: 5, body: "Andy's IT and dad tips are very helpful. He knows all the practical stuff for families.", authorName: "Chloe N.", expertId: andyExpert.id },
    { rating: 5, body: "Teresa's advice on GPs and schools was a lifesaver for our move.", authorName: "Fatima A.", expertId: teresaExpert.id },
    { rating: 5, body: "Alex (10) knows the best stuff for kids. My son loved the museum tip.", authorName: "Ben H.", expertId: alexExpert.id },
    { rating: 5, body: "Max (7) is right about the cows! Great for younger children.", authorName: "Catriona F.", expertId: maxExpert.id },
    { rating: 5, body: "Leo (4) found the best puddles according to my toddler.", authorName: "Hugo S.", expertId: leoExpert.id },
    { rating: 4, body: "Highly recommend following this family's guides if you have kids in Cambridge.", authorName: "Miriam T.", expertId: teresaExpert.id },
  ];

  for (const seed of reviewSeeds) {
    await db.review.upsert({
      where: {
        id: `seed-review-${seed.authorName.toLowerCase().replace(/[^a-z]/g, "-")}-${seed.guideId ?? seed.expertId ?? ""}`,
      },
      update: {},
      create: {
        id: `seed-review-${seed.authorName.toLowerCase().replace(/[^a-z]/g, "-")}-${seed.guideId ?? seed.expertId ?? ""}`,
        rating: seed.rating,
        body: seed.body,
        authorName: seed.authorName,
        guideId: seed.guideId ?? null,
        expertId: seed.expertId ?? null,
      },
    });
  }

  console.log(
    "Seed complete: 8 locations, 14 categories, 12 experts, 35 guides, 20 reviews"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
