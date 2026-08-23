/**
 * Homton Real Estate — MongoDB Seed Script
 * Run: npm run seed
 * Seeds 12 luxury properties across different types
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Property = require('../src/models/Property');

const properties = [
  // ── PENTHOUSES ──────────────────────────────────────────────────────────────
  {
    title: 'The Meridian Penthouse',
    type: 'penthouse',
    status: 'for-sale',
    price: 8500000,
    location: {
      address: '1 Meridian Tower, Floor 54',
      neighborhood: 'Midtown',
      city: 'New York',
      state: 'NY',
      coordinates: { lat: 40.7549, lng: -73.984 },
    },
    specs: { beds: 5, baths: 6, sqft: 7200, floors: 2, parkingSpaces: 3, yearBuilt: 2021 },
    description:
      'Soaring above the Manhattan skyline, The Meridian Penthouse delivers an unparalleled fusion of architectural mastery and refined living. Floor-to-ceiling glass walls frame panoramic views of Central Park and the Hudson River. The duplex layout features Calacatta marble throughout, a chef\'s kitchen by Boffi, a private rooftop terrace with infinity pool, and a dedicated concierge floor.',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg',
    ],
    amenities: ['Rooftop Pool', 'Private Elevator', 'Concierge', 'Wine Cellar', 'Home Theater', 'Gym', '24/7 Security'],
    featured: true,
    agent: { name: 'Alexandra Harmon', phone: '+1 212 555 0101', email: 'a.harmon@homton.com' },
  },
  {
    title: 'Azure Sky Penthouse',
    type: 'penthouse',
    status: 'for-sale',
    price: 12400000,
    location: {
      address: '500 Brickell Key Blvd, PH-1',
      neighborhood: 'Brickell Key',
      city: 'Miami',
      state: 'FL',
      coordinates: { lat: 25.768, lng: -80.188 },
    },
    specs: { beds: 6, baths: 7, sqft: 9100, floors: 2, parkingSpaces: 4, yearBuilt: 2022 },
    description:
      'An architectural statement floating above Biscayne Bay. Azure Sky commands 360-degree ocean and city views from its wraparound terrace. Interiors by Kelly Wearstler feature bespoke Italian marble, a sunken living room, and a private pool deck. The smart home system integrates climate, security, and entertainment seamlessly.',
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/2041556/pexels-photo-2041556.jpeg',
    ],
    amenities: ['Ocean Views', 'Private Pool', 'Smart Home', 'Wine Room', 'Butler Service', 'Spa', 'Helipad Access'],
    featured: true,
    agent: { name: 'Marco Reyes', phone: '+1 305 555 0202', email: 'm.reyes@homton.com' },
  },

  // ── VILLAS ──────────────────────────────────────────────────────────────────
  {
    title: 'Cantera Hills Estate Villa',
    type: 'villa',
    status: 'for-sale',
    price: 6750000,
    location: {
      address: '24 Cantera Ridge Drive',
      neighborhood: 'Beverly Hills Flats',
      city: 'Beverly Hills',
      state: 'CA',
      coordinates: { lat: 34.0736, lng: -118.4004 },
    },
    specs: { beds: 7, baths: 9, sqft: 11500, floors: 2, parkingSpaces: 6, yearBuilt: 2019 },
    description:
      'Set behind private gates in the heart of Beverly Hills, Cantera Hills Estate is a masterwork of California Contemporary design. The single-story north wing opens to a resort-style backyard with a 65-foot pool, outdoor kitchen, and vineyard. Interiors marry warm walnut millwork with travertine stone and panoramic pocket doors.',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    ],
    amenities: ['Pool', 'Vineyard', 'Home Theater', 'Gym', 'Guest House', 'Motor Court', 'Smart Home'],
    featured: true,
    agent: { name: 'Claire Fontaine', phone: '+1 310 555 0303', email: 'c.fontaine@homton.com' },
  },
  {
    title: 'Santorini Cliffside Villa',
    type: 'villa',
    status: 'for-sale',
    price: 4900000,
    location: {
      address: '7 Aegean Terrace',
      neighborhood: 'Oia',
      city: 'Santorini',
      state: 'Cyclades',
      country: 'Greece',
      coordinates: { lat: 36.462, lng: 25.376 },
    },
    specs: { beds: 5, baths: 5, sqft: 5800, floors: 3, parkingSpaces: 2, yearBuilt: 2020 },
    description:
      'Perched on the iconic caldera cliffs of Oia, this whitewashed villa captures the full Santorini experience. Three cascading terraces descend to a private infinity pool overlooking the volcanic crater sea. Traditional Cycladic architecture is married with minimalist contemporary interiors of linen, oak, and hand-cut marble.',
    images: [
      'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg',
      'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg',
      'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg',
    ],
    amenities: ['Infinity Pool', 'Caldera Views', 'Private Terrace', 'Wine Cellar', 'Chef\'s Kitchen', 'Jacuzzi'],
    featured: true,
    agent: { name: 'Eleni Papadopoulos', phone: '+30 210 555 0404', email: 'e.papadopoulos@homton.com' },
  },
  {
    title: 'Malibu Beachfront Villa',
    type: 'villa',
    status: 'for-sale',
    price: 15200000,
    location: {
      address: '31200 Pacific Coast Highway',
      neighborhood: 'Carbon Beach',
      city: 'Malibu',
      state: 'CA',
      coordinates: { lat: 34.0195, lng: -118.4912 },
    },
    specs: { beds: 6, baths: 7, sqft: 8200, floors: 2, parkingSpaces: 5, yearBuilt: 2023 },
    description:
      'On exclusive Carbon Beach — known as "Billionaire\'s Beach" — this newly constructed masterpiece offers 80 feet of direct ocean frontage. The open-plan interior by AD100 designer Martyn Lawrence Bullard flows from the great room through retractable glass walls to a private beach deck, fire pits, and a saltwater pool at the water\'s edge.',
    images: [
      'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg',
    ],
    amenities: ['Direct Beach Access', 'Ocean Views', 'Saltwater Pool', 'Fire Pits', 'Rooftop Deck', 'Smart Home', 'Gourmet Kitchen'],
    featured: true,
    agent: { name: 'Jordan West', phone: '+1 310 555 0505', email: 'j.west@homton.com' },
  },

  // ── APARTMENTS ──────────────────────────────────────────────────────────────
  {
    title: 'One Hudson Yards — Residence 78B',
    type: 'apartment',
    status: 'for-sale',
    price: 3850000,
    location: {
      address: '501 West 30th Street, 78B',
      neighborhood: 'Hudson Yards',
      city: 'New York',
      state: 'NY',
      coordinates: { lat: 40.7536, lng: -74.0018 },
    },
    specs: { beds: 3, baths: 3.5, sqft: 2950, floors: 1, parkingSpaces: 1, yearBuilt: 2020 },
    description:
      'Residence 78B at One Hudson Yards offers sweeping Hudson River and city views from three exposures. The residence features 10-foot ceilings, wide-plank white oak floors, and a custom kitchen with Gaggenau appliances. The building offers amenity spaces across 40,000 sq ft including a spa, pool, and The Club private dining.',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
      'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg',
    ],
    amenities: ['Concierge', 'Pool', 'Spa', 'Fitness Center', 'Private Club', 'Valet Parking', 'Pet Spa'],
    featured: false,
    agent: { name: 'Sophie Laurent', phone: '+1 212 555 0606', email: 's.laurent@homton.com' },
  },
  {
    title: 'The Residences at Mandarin Oriental',
    type: 'apartment',
    status: 'for-sale',
    price: 5600000,
    location: {
      address: '80 Columbus Circle, Floor 53',
      neighborhood: 'Columbus Circle',
      city: 'New York',
      state: 'NY',
      coordinates: { lat: 40.7685, lng: -73.9829 },
    },
    specs: { beds: 4, baths: 4, sqft: 4100, floors: 1, parkingSpaces: 2, yearBuilt: 2018 },
    description:
      'Full-floor residence above the iconic Mandarin Oriental hotel. Central Park views from every room. Hotel services include 24-hour butler, in-residence dining from Café Boulud, spa, and a private owners\' lounge. Custom Bulthaup kitchen, marble master bath with heated floors, and a corner great room wrapping Central Park.',
    images: [
      'https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg',
    ],
    amenities: ['Hotel Services', 'Central Park Views', 'Butler Service', 'Spa', 'Fine Dining', 'Concierge', 'Valet'],
    featured: false,
    agent: { name: 'Nathan Brooks', phone: '+1 212 555 0707', email: 'n.brooks@homton.com' },
  },
  {
    title: 'Chicago Lakefront Sky Residence',
    type: 'apartment',
    status: 'for-sale',
    price: 2200000,
    location: {
      address: '505 N Lake Shore Drive, Suite 4201',
      neighborhood: 'Streeterville',
      city: 'Chicago',
      state: 'IL',
      coordinates: { lat: 41.892, lng: -87.617 },
    },
    specs: { beds: 3, baths: 2.5, sqft: 2400, floors: 1, parkingSpaces: 2, yearBuilt: 2017 },
    description:
      'High above Lake Michigan, this Streeterville sky residence offers unobstructed water views from every room. Open-concept living with floor-to-ceiling glass, chef\'s kitchen with SubZero and Wolf appliances, and a corner primary suite with a spa bath. Building amenities include a lakefront terrace, indoor pool, and fitness studio.',
    images: [
      'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg',
      'https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg',
      'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg',
    ],
    amenities: ['Lake Views', 'Indoor Pool', 'Fitness Studio', 'Rooftop Terrace', 'Doorman', 'Valet Parking'],
    featured: false,
    agent: { name: 'Amelia Chen', phone: '+1 312 555 0808', email: 'a.chen@homton.com' },
  },

  // ── TOWNHOUSES ───────────────────────────────────────────────────────────────
  {
    title: 'Kensington Garden Townhouse',
    type: 'townhouse',
    status: 'for-sale',
    price: 9800000,
    location: {
      address: '14 Pemberton Place',
      neighborhood: 'Kensington',
      city: 'London',
      state: 'England',
      country: 'United Kingdom',
      coordinates: { lat: 51.498, lng: -0.192 },
    },
    specs: { beds: 6, baths: 5, sqft: 6800, floors: 5, parkingSpaces: 2, yearBuilt: 2016 },
    description:
      'A rare freehold Georgian townhouse moments from Kensington Palace Gardens. Five floors of immaculately restored period architecture paired with contemporary interiors by 1508 London. The lower ground floor houses a cinema room, wine cellar, and gym. The principal bedroom suite occupies the entire third floor with Hyde Park views.',
    images: [
      'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg',
      'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg',
    ],
    amenities: ['Private Garden', 'Cinema Room', 'Wine Cellar', 'Gym', 'Period Features', 'Staff Quarters', 'CCTV'],
    featured: false,
    agent: { name: 'Edward Ashworth', phone: '+44 20 7555 0909', email: 'e.ashworth@homton.com' },
  },
  {
    title: 'Tribeca Cast-Iron Townhouse',
    type: 'townhouse',
    status: 'for-sale',
    price: 11500000,
    location: {
      address: '65 Hudson Street',
      neighborhood: 'Tribeca',
      city: 'New York',
      state: 'NY',
      coordinates: { lat: 40.7162, lng: -74.009 },
    },
    specs: { beds: 5, baths: 5.5, sqft: 7400, floors: 4, parkingSpaces: 1, yearBuilt: 2015 },
    description:
      'A landmark 1880s cast-iron building transformed into an extraordinary single-family townhouse with a private courtyard and rooftop. The four-story residence preserves original architectural details — exposed brick, timber beams, and cast-iron columns — while incorporating state-of-the-art systems. A glass addition houses the open chef\'s kitchen.',
    images: [
      'https://images.pexels.com/photos/1132711/pexels-photo-1132711.jpeg',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg',
      'https://images.pexels.com/photos/1009922/pexels-photo-1009922.jpeg',
    ],
    amenities: ['Private Courtyard', 'Rooftop', 'Wine Cellar', 'Exposed Brick', 'Home Office', 'Smart Home', 'Elevator'],
    featured: false,
    agent: { name: 'Olivia Grant', phone: '+1 212 555 1010', email: 'o.grant@homton.com' },
  },

  // ── ESTATES ──────────────────────────────────────────────────────────────────
  {
    title: 'Fairhaven Manor Estate',
    type: 'estate',
    status: 'for-sale',
    price: 22000000,
    location: {
      address: '1 Fairhaven Drive',
      neighborhood: 'Bel Air',
      city: 'Los Angeles',
      state: 'CA',
      coordinates: { lat: 34.0988, lng: -118.4432 },
    },
    specs: { beds: 10, baths: 13, sqft: 22000, floors: 3, parkingSpaces: 12, yearBuilt: 2020 },
    description:
      'Fairhaven Manor is Bel Air\'s most coveted new estate — a masterpiece of Modern European design set on 2.3 gated acres with city-to-ocean views. The main residence features a double-height entry gallery, ballroom-sized formal rooms, and a show kitchen with dual islands. The grounds include a guest villa, tennis court, motor court, and resort pool complex.',
    images: [
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
    ],
    amenities: ['Tennis Court', 'Resort Pool', 'Guest Villa', 'Ballroom', 'Cinema', 'Gym', 'Motor Court', 'City-to-Ocean Views'],
    featured: true,
    agent: { name: 'Victoria Stone', phone: '+1 310 555 1111', email: 'v.stone@homton.com' },
  },
  {
    title: 'Côte d\'Azur Waterfront Estate',
    type: 'estate',
    status: 'for-sale',
    price: 31000000,
    location: {
      address: 'Promenade des Anglais 88',
      neighborhood: 'Cap d\'Antibes',
      city: 'Nice',
      state: 'Provence-Alpes',
      country: 'France',
      coordinates: { lat: 43.5606, lng: 7.127 },
    },
    specs: { beds: 9, baths: 11, sqft: 18500, floors: 3, parkingSpaces: 10, yearBuilt: 2021 },
    description:
      'Set on a private peninsula on the Côte d\'Azur, this extraordinary estate commands 270-degree panoramas of the Mediterranean. The Belle Époque–inspired main villa features 14 principal rooms with hand-painted ceilings, Venetian plaster walls, and a formal garden designed by a pupil of Le Nôtre. The private cove offers direct sea access with a boat house and jetty.',
    images: [
      'https://images.pexels.com/photos/2512010/pexels-photo-2512010.jpeg',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      'https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg',
    ],
    amenities: ['Private Cove', 'Boat House', 'Formal Gardens', 'Pool', 'Wine Cave', 'Staff Quarters', 'Helipad', 'Tennis'],
    featured: true,
    agent: { name: 'Isabelle Morel', phone: '+33 4 93 555 1212', email: 'i.morel@homton.com' },
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  Connected to MongoDB');

    await Property.deleteMany({});
    console.log('🗑️   Cleared existing properties');

    const seeded = await Property.insertMany(properties);
    console.log(`🌱  Seeded ${seeded.length} luxury properties`);

    const featuredCount = seeded.filter((p) => p.featured).length;
    console.log(`⭐  Featured properties: ${featuredCount}`);
    console.log('\n✨  Seed complete! Run "npm run dev" to start the API.\n');
  } catch (error) {
    console.error('❌  Seed Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDB();
