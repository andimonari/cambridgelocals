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

  // ── Experts (existing — rename to first name + last initial) ───
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

  // ── Guides (existing) ──────────────────────────────────────────
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

  console.log(
    "Seed complete: 8 locations, 9 categories, 10 experts, 17 guides"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
