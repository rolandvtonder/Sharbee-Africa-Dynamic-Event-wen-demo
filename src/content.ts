/**
 * All copy lives here, drawn from Sharbee Africa's own Facebook posts and
 * page details. Change words here, not in the components.
 */

export const brand = {
  name: 'Sharbee Africa',
  long: 'Sharbee Africa Dynamic Events and Destination Management',
  tagline: 'Dynamic Events & Destination Management',
};

export const contact = {
  person: 'Bernice Blake',
  phone: '063 906 3965',
  phoneHref: 'tel:+27639063965',
  whatsapp: '+27 63 906 3965',
  whatsappNumber: '27639063965',
  email: 'sharbee714@gmail.com',
  address: ['Plot N14, Marabeth', 'Tarlton, 1739', 'Gauteng, South Africa'],
  mapHref: 'https://www.google.com/maps/search/?api=1&query=Marabeth%2C+Tarlton%2C+1739%2C+South+Africa',
  hours: 'Always open',
  website: 'sharbeeafrica.co.za',
  socials: [
    {label: 'Facebook', handle: 'SharbeeAfrica', href: 'https://www.facebook.com/SharbeeAfrica/'},
    {label: 'Instagram', handle: '@sharbeeafrica', href: 'https://www.instagram.com/sharbeeafrica/'},
    {label: 'Instagram', handle: '@shar.beeafrica1', href: 'https://www.instagram.com/shar.beeafrica1/'},
  ],
};

export const nav = [
  {label: 'Home', to: '/'},
  {label: 'About us', to: '/about'},
  {label: 'Services', to: '/services'},
  {label: 'Experiences', to: '/experiences'},
  {label: 'Gallery', to: '/gallery'},
  {label: 'Contact', to: '/contact'},
];

/** Headline lines; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  lines: [{t: 'Discover the'}, {t: 'Essence', i: true}, {t: 'of South'}, {t: 'Africa.', i: true}] as Line[],
  body: 'Experience South Africa on a magical journey through wildlife and culture — where adventure meets authenticity.',
  heroAlt: 'A herd of elephants walking across the savanna beneath a glowing orange sunset',
  statement:
    'Your one-stop networking agency, where out-of-this-world travel experiences, incentives, distinctive adventures, activities and events are meticulously designed and customised to your unique individual needs.',
  signoff: 'Curated with creativity.',
  ideasIntro: 'We have put together a few tantalising ideas for you to consider.',
  ideasOutro:
    'The options are limitless, but each one begins with the personal touch from Sharbee Africa as we create timeless moments and unforgettable memories for you.',
};

export type Idea = {t: string; img?: string; alt?: string};

export const ideas: Idea[] = [
  {t: 'Safari or game drive and bush dinner', img: 'photos/safari-jeep.webp', alt: 'A safari vehicle in golden morning mist between acacia trees'},
  {t: 'Cultural experience with a drumming session and an African-inspired lunch or dinner', img: 'photos/drummers.webp', alt: 'Performers in traditional dress drumming and dancing'},
  {t: 'Thrilling shark cage diving with Great White sharks'},
  {t: 'Food and wine tours in Stellenbosch and Franschhoek', img: 'photos/winelands.webp', alt: 'Vineyards beneath mountain peaks in the Cape Winelands'},
  {t: 'Romantic dining in the sky with spectacular views'},
  {t: 'Corporate functions on a luxury train', img: 'photos/train-window.webp', alt: 'A table set by a train window with countryside rolling past'},
  {t: 'Candlelight concerts'},
  {t: 'Corporate and private boat cruises', img: 'photos/sunset-cruise.webp', alt: 'A cruise boat silhouetted on a golden sea at sunset'},
  {t: 'A stylish and sophisticated masked ball', img: 'photos/gala.webp', alt: 'An elegantly set banquet hall lit for a gala evening'},
];

export type Service = {
  slug: string;
  name: [string, string];
  short: string;
  tint: string;
  hero: string;
  heroAlt: string;
  intro: string;
  includes: string[];
  highlights: {t: string; d: string}[];
  photos: {src: string; alt: string}[];
};

export const services: Service[] = [
  {
    slug: 'travel-destinations',
    name: ['Travel &', 'Destinations'],
    short: 'Travel arrangements, accommodation, holidays and adventure activities across South Africa.',
    tint: '#9a5512',
    hero: 'photos/safari-jeep.webp',
    heroAlt: 'A safari vehicle in golden morning mist between acacia trees',
    intro:
      'From its mountain peaks to its white sand beaches, wildlife and winelands, South Africa is host to a vast array of activities and adventures. We take care of the whole journey so you can simply arrive and experience it.',
    includes: ['Travel arrangements', 'Accommodation', 'Holiday packages', 'Adventure activities', 'Safaris & game drives', 'Food & wine tours'],
    highlights: [
      {t: 'Safari & bush dinner', d: 'Game drives through the bushveld, ending around the fire under the stars.'},
      {t: 'The Cape Winelands', d: 'Food and wine tours through Stellenbosch and Franschhoek.'},
      {t: 'Ocean adventures', d: 'Shark cage diving with Great Whites, and private boat cruises.'},
    ],
    photos: [
      {src: 'photos/cape-town.webp', alt: 'Table Mountain rising above Cape Town under a blue sky'},
      {src: 'photos/winelands.webp', alt: 'Vineyards beneath mountain peaks in the Cape Winelands'},
      {src: 'photos/sunset-cruise.webp', alt: 'A cruise boat silhouetted on a golden sea at sunset'},
    ],
  },
  {
    slug: 'events-conferences',
    name: ['Events &', 'Conferences'],
    short: 'Meetings, conferences, celebrations and corporate functions, designed down to the detail.',
    tint: '#c2411c',
    hero: 'photos/gala.webp',
    heroAlt: 'An elegantly set banquet hall lit for a gala evening',
    intro:
      'Whether it is a boardroom meeting, a full conference or a celebration to remember, every event is meticulously designed around you — your guests, your message and your moment.',
    includes: ['Meetings', 'Conferences', 'Celebrations', 'Corporate functions', 'Gala & themed evenings', 'Venue sourcing'],
    highlights: [
      {t: 'Corporate functions on a luxury train', d: 'Move your guests through spectacular scenery in style.'},
      {t: 'Candlelight concerts', d: 'An intimate, glowing evening of live music.'},
      {t: 'A masked ball', d: 'Stylish and sophisticated — an evening your guests will talk about for years.'},
    ],
    photos: [
      {src: 'photos/conference.webp', alt: 'An audience watching a speaker on a lit conference stage'},
      {src: 'photos/train-window.webp', alt: 'A table set by a train window with countryside rolling past'},
      {src: 'photos/wine-tasting.webp', alt: 'Glasses of red and white wine lined up for a tasting'},
    ],
  },
  {
    slug: 'incentives-team-building',
    name: ['Incentives &', 'Team Building'],
    short: 'Reward your people with distinctive adventures and team experiences that bring them together.',
    tint: '#34418f',
    hero: 'photos/kayak.webp',
    heroAlt: 'Two people paddling a kayak across calm water',
    intro:
      'Incentive trips and team-building days that people genuinely look forward to — cultural, adventurous or simply spectacular — each one designed to match your team and your goals.',
    includes: ['Incentive trips', 'Team building', 'Cultural experiences', 'Adventure days', 'Bush dinners', 'Boat cruises'],
    highlights: [
      {t: 'Drumming sessions', d: 'A cultural experience with drumming and an African-inspired lunch or dinner.'},
      {t: 'Dining in the sky', d: 'Romantic or celebratory dining with spectacular views.'},
      {t: 'Corporate boat cruises', d: 'Time on the water, together.'},
    ],
    photos: [
      {src: 'photos/drummers.webp', alt: 'Performers in traditional dress drumming and dancing'},
      {src: 'photos/fire-dinner.webp', alt: 'A fire burning in a fire pit at dusk'},
      {src: 'photos/sunset-cruise.webp', alt: 'A cruise boat silhouetted on a golden sea at sunset'},
    ],
  },
  {
    slug: 'learner-tours',
    name: ['Educational', 'Learner Tours'],
    short: 'School-friendly holiday day tours: interactive cultural or thrilling wildlife experiences.',
    tint: '#5f5a2e',
    hero: 'photos/learners.webp',
    heroAlt: 'Children playing a game together outdoors on a sunny lawn',
    intro:
      'Give your child an exciting start to the holiday with one of our specially arranged, school-friendly day tours. Parents or teachers of participating learners are welcome to join at the same discounted rate as learners.',
    includes: ['School-holiday day tours', 'Interactive cultural experiences', 'Thrilling wildlife experiences', 'Parents & teachers welcome', 'Discounted group rates', 'Snack packs'],
    highlights: [
      {t: 'Interactive & cultural', d: 'Learners meet South Africa’s cultures hands-on.'},
      {t: 'Thrilling wildlife', d: 'An up-close day with South Africa’s animals.'},
      {t: 'Same rate for adults', d: 'Parents and teachers join at the learners’ discounted rate.'},
    ],
    photos: [
      {src: 'posts/588650038.webp', alt: 'Sharbee Africa flyer for educational holiday tours for learners'},
      {src: 'photos/zulu-dancers.webp', alt: 'Women in beaded traditional Zulu dress singing together'},
      {src: 'photos/safari-jeep.webp', alt: 'A safari vehicle in golden morning mist between acacia trees'},
    ],
  },
];

/** The three home panels share one film; each links to a service. */
export const panels = services.slice(0, 3);

export const about = {
  lines: [{t: 'Adventure'}, {t: 'meets', i: true}, {t: 'Authenticity.'}] as Line[],
  intro:
    'Sharbee Africa Dynamic Events and Destination Management is a South African networking agency based in Tarlton, Gauteng. We bring together the people, places and partners that turn a trip, an event or an incentive into something unforgettable.',
  story: [
    'South Africa is known for its vibrant cultures and unforgettable experiences — from its mountain peaks to its white sand beaches, wildlife and winelands. There is something for everyone, from the corporate client to family and friends.',
    'We are here to assist you with your travel arrangements, accommodation, meetings, conferences, celebrations, team building, holiday and adventure activities. Every experience begins with a personal touch, and ends with timeless moments and memories.',
  ],
  values: [
    {t: 'Personal touch', d: 'You deal with us directly, from the first message to the last farewell.'},
    {t: 'Curated with creativity', d: 'No two itineraries are the same. Each one is designed around you.'},
    {t: 'One-stop network', d: 'Travel, venues, activities and suppliers — coordinated in one place.'},
    {t: 'Proudly South African', d: 'We share the wildlife, cultures and cuisine of home with every guest.'},
  ],
};

export const experiences = {
  lines: [{t: 'Spotlight on'}, {t: 'South Africa', i: true}] as Line[],
  intro:
    'Every week we share a little more of the country we love — its places, its flavours, its stories. A taste of what is waiting for you.',
  series: [
    {day: 'Wednesday', t: 'Spotlight Wednesday', d: 'Destination highlights across South Africa.'},
    {day: 'Thursday', t: 'Cultural Cuisine Thursday', d: 'Traditional dishes and the stories behind them.'},
    {day: 'Friday', t: 'Fun Facts Friday', d: 'Surprising facts about our country.'},
  ],
  facts: [
    'South Africa is home to the second highest waterfall in the world, the Tugela Falls, with a total drop of 948 metres (3,110 ft).',
    'SALT in Sutherland, Northern Cape, is the largest optical telescope in the Southern Hemisphere, at the South African Astronomical Observatory.',
    'Moses Mabhida Stadium was built for the 2010 FIFA World Cup. It features a sky car to the top of the arch and the “Big Rush”, the world’s largest swing.',
    'Kruger National Park is comparable in size to Israel, and about a third of the size of Ireland.',
    'The UNESCO World Heritage Site of Mapungubwe in Limpopo is home to ancient rock art and South Africa’s only queendom, the Balobedu, ruled by the Rain Queen Modjadji.',
  ],
  cuisineIntro:
    'The history of Zulu cuisine goes back to an era where traditions and values were important elements of Zulu life. Five traditional Zulu foods:',
  cuisine: [
    {t: 'Uphuthu', d: 'A staple made from maize meal — a crumbly, coarse porridge eaten hot with stews, or cold with amasi. Also enjoyed with beans or cabbage.'},
    {t: 'Amadumbe', d: 'A root vegetable similar to a yam, roasted or grilled. Its texture sits somewhere between a potato and a sweet potato.'},
    {t: 'Amadombolo', d: 'Steamed dumplings, often made from flour — a common partner to stews and meat dishes like usu (tripe).'},
    {t: 'Isijingi', d: 'A sweet porridge made by cooking and mashing pumpkin or butternut with water and maize meal.'},
    {t: 'Amasi', d: 'Curdled or soured milk, with a taste similar to plain yoghurt or cottage cheese. Often eaten with uphuthu.'},
  ],
  baobab: [
    'Known as the “Tree of Life”',
    'Can live for over 2,000 years',
    'Stores up to 120,000 litres of water',
    'Called the “upside-down tree” for its root-like branches',
    'Produces a highly nutritious fruit',
    'Its flowers are pollinated by bats',
    'Can regrow its bark after being stripped',
  ],
  tips: [
    {t: 'Track your luggage', d: 'The Airports Company South Africa (ACSA) app now lets you follow your checked-in bags in real time, from check-in through every stage of handling.'},
    {t: 'Prepare for long-haul', d: 'Make a checklist of essential documents: passports, visas, eTAs, insurance — and transit visas for layovers.'},
    {t: 'Pack a travel kit', d: 'A travel-sized toiletry kit keeps you refreshed during the journey.'},
    {t: 'Dress in layers', d: 'Loose, breathable layers adapt to temperature changes. Wear comfortable shoes you have worn before.'},
    {t: 'Beat the jet lag', d: 'Follow the destination’s time zone — adjust meals and sleep to local time, and spend time outdoors to reset your clock.'},
  ],
};

export type Post = {id: string; alt: string; w: number; h: number};

export const posts: Post[] = [
  {id: '587979125', alt: 'A lion in close-up beside the words: Experience South Africa on a magical journey through wildlife and culture', w: 1141, h: 642},
  {id: '589962756', alt: 'Spotlight Wednesday: friends celebrating in front of Table Mountain', w: 1536, h: 1024},
  {id: '588650038', alt: 'Flyer: Educational holiday tours for learners — book now', w: 1127, h: 1600},
  {id: '588456821', alt: 'Cultural Cuisine Thursday: bowls of uphuthu, amadumbe and isijingi', w: 1536, h: 1024},
  {id: '589962778', alt: 'Cultural Cuisine Thursday: a smiling young man in Zulu traditional dress', w: 864, h: 1280},
  {id: '587849327', alt: 'Travel tips: a plane landing on a runway at sunset', w: 996, h: 1235},
  {id: '589359137', alt: 'Facts about the baobab tree', w: 1024, h: 1536},
  {id: '592332057', alt: 'Flyer: Educational holiday tours for learners — join us and get your free snack pack', w: 900, h: 1280},
  {id: '589009461', alt: 'A few tantalising ideas: safari, cultural drumming, shark cage diving, wine tours and more', w: 968, h: 576},
  {id: '591108579', alt: 'Fun and interesting facts Friday', w: 955, h: 691},
  {id: '589930169', alt: 'South African cultural cuisine: five traditional Zulu foods', w: 922, h: 716},
  {id: '590410108', alt: 'Spotlight on South Africa: destination highlights', w: 941, h: 511},
  {id: '589087464', alt: 'Travel tips from Sharbee Africa', w: 1038, h: 683},
  {id: '589200508', alt: 'The history of Zulu cuisine', w: 960, h: 405},
];

export const enquiryTypes = [
  'Travel & destinations',
  'Events & conferences',
  'Incentives & team building',
  'Educational learner tours',
  'Something else',
];

export const footer = {
  credit: 'Stock photography and film courtesy of Pexels.',
};
