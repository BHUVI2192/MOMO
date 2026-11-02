/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMAGES, ProductImage } from './images';

export type Category = 'Stationery' | 'Ceramics' | 'Desk' | 'Bags' | 'Homeware';

export interface ProductVariant {
  name: string;
  value: string;
  hex?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  category: Category;
  description: string;
  details: string[];
  dimensions: string;
  materials: string;
  care: string;
  badge?: 'New' | 'Bestseller' | 'Staff Pick' | 'Low Stock' | 'Sale';
  inStock: boolean;
  stockCount: number;
  rating: string; // e.g. "5/5"
  sku: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  images: ProductImage[];
  variants?: {
    type: 'color' | 'size';
    options: ProductVariant[];
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'tuesday-mug',
    name: 'The Tuesday Mug',
    slug: 'the-tuesday-mug',
    tagline: 'Engineered specifically for the longest day of the week.',
    price: 34,
    category: 'Ceramics',
    description: 'Hand-glazed 340ml ceramic mug with a chunky, reassuring thumb rest. Thick clay walls keep tea hot and coffee hotter.',
    details: [
      '340 ml capacity (fills right to the brim)',
      'Double-dipped gloss interior, satin matte exterior',
      'Ergonomic thick loop handle fits three full fingers',
      'Safe in the microwave and top rack dishwasher'
    ],
    dimensions: '9.2 cm diameter × 8.8 cm height',
    materials: 'Stoneware clay, food-safe zinc-free glaze',
    care: 'Dishwasher safe. Avoid rapid thermal shocks (like boiling water straight from freezer).',
    badge: 'Bestseller',
    inStock: true,
    stockCount: 14,
    rating: '5/5',
    sku: 'MM-CRM-001',
    isBestseller: true,
    images: [
      IMAGES.products['tuesday-mug'],
      {
        id: 'tuesday-mug-2',
        url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
        alt: 'Tuesday Mug side handle detail',
        aspectRatio: '4:5',
        placeholderColor: '#FBE9A0',
      },
      {
        id: 'tuesday-mug-3',
        url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
        alt: 'Tuesday Mug top view showing smooth interior',
        aspectRatio: '4:5',
        placeholderColor: '#DCE3FA',
      },
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Buttercup', value: 'buttercup', hex: '#F6CD3B' },
        { name: 'French Blue', value: 'blue', hex: '#2F4BDB' },
        { name: 'Blush Pink', value: 'pink', hex: '#F4A7C3' },
      ],
    },
  },
  {
    id: 'pocket-pal-notebook',
    name: 'Pocket Pal Notebook',
    slug: 'pocket-pal-notebook',
    tagline: 'Small enough for back pockets, patient enough for big thoughts.',
    price: 14,
    category: 'Stationery',
    description: 'Cloth-bound 96-page pocket companion with dot-grid 100gsm fountain-pen friendly Japanese paper. Lies completely flat at 180 degrees.',
    details: [
      '96 numbered pages with 5mm subtle dot grid',
      'Bleed-resistant 100gsm acid-free milled paper',
      'Durable bookcloth hardcover with foil stamped spine',
      'Built-in grosgrain ribbon bookmark'
    ],
    dimensions: '9.5 cm × 14.2 cm (fits any jacket pocket)',
    materials: 'Dutch bookcloth, Munken 100gsm paper',
    care: 'Keep away from coffee splashes; spots can be wiped with a clean dry gum eraser.',
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 28,
    rating: '5/5',
    sku: 'MM-STN-002',
    isNewArrival: true,
    images: [
      IMAGES.products['pocket-pal-notebook'],
      {
        id: 'pocket-pal-2',
        url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
        alt: 'Pocket Pal open flat on desk',
        aspectRatio: '4:5',
        placeholderColor: '#DCE3FA',
      },
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'French Blue', value: 'blue', hex: '#2F4BDB' },
        { name: 'Warm Cream', value: 'cream', hex: '#FBF6E9' },
        { name: 'Midnight Ink', value: 'ink', hex: '#14183A' },
      ],
    },
  },
  {
    id: 'big-feelings-tote',
    name: 'Big Feelings Tote',
    slug: 'big-feelings-tote',
    tagline: 'Carries groceries, laptops, and the weight of your choices.',
    price: 42,
    category: 'Bags',
    description: 'Structured 16oz unbleached cotton duck canvas with reinforced cross-stitched webbing handles and an interior zipped phone pocket.',
    details: [
      '16oz heavyweight organic duck canvas',
      'Internal zippered security pocket for keys and phone',
      'Deep 12cm gusset bottom stands upright when set down',
      'Reinforced box-X stitched 65cm shoulder straps'
    ],
    dimensions: '42 cm width × 38 cm height × 12 cm gusset',
    materials: '100% GOTS certified organic unbleached canvas',
    care: 'Spot clean with mild soap. Cold wash only if necessary, lay flat to dry to avoid shrinkage.',
    badge: 'Bestseller',
    inStock: true,
    stockCount: 9,
    rating: '5/5',
    sku: 'MM-BAG-003',
    isBestseller: true,
    images: [
      IMAGES.products['big-feelings-tote'],
      {
        id: 'tote-2',
        url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
        alt: 'Big Feelings Tote worn on shoulder',
        aspectRatio: '4:5',
        placeholderColor: '#FBDDE8',
      },
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Natural Ecru', value: 'ecru', hex: '#FBF6E9' },
        { name: 'Sun Yellow', value: 'yellow', hex: '#F6CD3B' },
        { name: 'Midnight Ink', value: 'ink', hex: '#14183A' },
      ],
    },
  },
  {
    id: 'wobbly-bud-vase',
    name: 'Wobbly Bud Vase',
    slug: 'wobbly-bud-vase',
    tagline: 'Imperfection is the point. Holds one flower with dignity.',
    price: 38,
    category: 'Ceramics',
    description: 'Individually hand-pinched bud vase with a gentle undulating neck. Glazed in soft matte blush with a raw unglazed foot.',
    details: [
      'Wheel thrown and hand altered by studio potters',
      'Waterproof glazed reservoir holds 120ml',
      'Weighted bottom prevents accidental topples',
      'Every piece possesses a slightly unique silhouette'
    ],
    dimensions: '7.5 cm diameter × 13.5 cm height',
    materials: 'Iron-speckled stoneware clay, satin matte glaze',
    care: 'Hand wash with warm water and bottle brush.',
    badge: 'New',
    inStock: true,
    stockCount: 7,
    rating: '5/5',
    sku: 'MM-CRM-004',
    isNewArrival: true,
    images: [
      IMAGES.products['wobbly-bud-vase'],
      {
        id: 'vase-2',
        url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
        alt: 'Wobbly Bud Vase with single garden poppy',
        aspectRatio: '4:5',
        placeholderColor: '#FBDDE8',
      },
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Blush Pink', value: 'pink', hex: '#F4A7C3' },
        { name: 'Warm Cream', value: 'cream', hex: '#FBF6E9' },
        { name: 'Buttercup', value: 'yellow', hex: '#F6CD3B' },
      ],
    },
  },
  {
    id: 'perpetual-brass-ruler',
    name: 'Perpetual Brass Ruler',
    slug: 'perpetual-brass-ruler',
    tagline: 'Will outlive your current laptop by roughly three centuries.',
    price: 26,
    category: 'Desk',
    description: 'Machined from solid 2mm brass plate with deep laser-etched metric and imperial graduations. Develops a mellow natural patina over time.',
    details: [
      'Solid architectural brass (unlacquered)',
      'Dual metric (20cm) and inch (8in) laser graduations',
      'Chamfered edge lifts easily from flat drafting tables',
      'Weight: a very satisfying 145 grams'
    ],
    dimensions: '21 cm length × 3 cm width × 0.25 cm thickness',
    materials: 'C36000 Grade architectural brass',
    care: 'Let it age naturally, or restore brilliant polish with lemon juice and a microfiber cloth.',
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 19,
    rating: '5/5',
    sku: 'MM-DSK-005',
    isBestseller: true,
    images: [
      IMAGES.products['perpetual-brass-ruler'],
      {
        id: 'ruler-2',
        url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
        alt: 'Perpetual Brass Ruler etched detail',
        aspectRatio: '4:5',
        placeholderColor: '#FBE9A0',
      },
    ],
  },
  {
    id: 'cloud-catch-all-dish',
    name: 'Cloud Catch-All Dish',
    slug: 'cloud-catch-all-dish',
    tagline: 'A designated soft landing spot for keys, coins, and loose clips.',
    price: 24,
    category: 'Homeware',
    description: 'Smooth porcelain dish sculpted with a gentle cloud perimeter. Finished in soft sky blue gloss with felt pads under the base.',
    details: [
      'High-fired porcelain with rounded bullnose lip',
      'Protective wool felt bumpers beneath base',
      'Holds rings, hair pins, keys, or bedside pocket change',
      'Stackable profile'
    ],
    dimensions: '16 cm length × 11 cm width × 2.2 cm depth',
    materials: 'Glazed porcelain, wool felt feet',
    care: 'Wipe clean with a damp cloth.',
    badge: 'New',
    inStock: true,
    stockCount: 22,
    rating: '5/5',
    sku: 'MM-HME-006',
    isNewArrival: true,
    images: [
      IMAGES.products['cloud-catch-all-dish'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Sky Blue', value: 'blue', hex: '#2F4BDB' },
        { name: 'Warm Cream', value: 'cream', hex: '#FBF6E9' },
        { name: 'Dusty Pink', value: 'pink', hex: '#F4A7C3' },
      ],
    },
  },
  {
    id: 'morning-routine-mug',
    name: 'Morning Routine Mug',
    slug: 'morning-routine-mug',
    tagline: 'Holds generous coffee. Requires zero conversation.',
    price: 36,
    category: 'Ceramics',
    description: 'A 380ml heavyweight ceramic mug dipped in vibrant cobalt blue glaze. Flat wide base prevents spills during early morning typing.',
    details: [
      'Generous 380 ml volume',
      'Ultra stable wide-bottom footprint',
      'Smooth rim rolled for pleasant sipping',
      'Oven, microwave, and dishwasher certified'
    ],
    dimensions: '9.8 cm base diameter × 8.2 cm height',
    materials: 'High-fire ceramic stoneware',
    care: 'Dishwasher safe.',
    inStock: true,
    stockCount: 16,
    rating: '5/5',
    sku: 'MM-CRM-007',
    isBestseller: true,
    images: [
      IMAGES.products['morning-routine-mug'],
    ],
  },
  {
    id: 'daily-focus-notepad',
    name: 'Daily Focus Notepad',
    slug: 'daily-focus-notepad',
    tagline: 'Three priority slots. Not twenty-seven.',
    price: 12,
    category: 'Stationery',
    description: '60 tear-off sheets of 120gsm warm cream paper formatted with three main task boxes, an hourly tracker, and a scratch space.',
    details: [
      '60 thick tear-away sheets bound with bookbinder glue',
      'Rigid 2mm chipboard backing board for lap-writing',
      'Warm grey ink print that doesn’t shout over pencil notes',
      'Zero distracting motivational slogans'
    ],
    dimensions: '14 cm × 21 cm (A5 format)',
    materials: 'FSC Certified 120gsm uncoated paper',
    care: 'Keep in dry conditions.',
    badge: 'Bestseller',
    inStock: true,
    stockCount: 45,
    rating: '5/5',
    sku: 'MM-STN-008',
    isBestseller: true,
    images: [
      IMAGES.products['daily-focus-notepad'],
    ],
  },
  {
    id: 'little-sun-lamp',
    name: 'Little Sun Lamp',
    slug: 'little-sun-lamp',
    tagline: 'Warm 2700K ambient glow. Cordless and ready to move.',
    price: 68,
    category: 'Homeware',
    description: 'Rechargeable aluminium dome lamp with three-step touch dimming. Emits a comforting diffused pool of warm evening light.',
    details: [
      'USB-C rechargeable with 18-hour battery life',
      'Three brightness levels (10%, 40%, 100%)',
      'Solid powder-coated spun aluminium shade',
      'Soft silicone base ring protects wood surfaces'
    ],
    dimensions: '15 cm shade diameter × 22 cm height',
    materials: 'Aluminium, polycarbonate diffuser, lithium-ion cell',
    care: 'Dust with soft dry cloth. Includes matching 1.5m braided USB-C cable.',
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 6,
    rating: '5/5',
    sku: 'MM-HME-009',
    isNewArrival: true,
    images: [
      IMAGES.products['little-sun-lamp'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Sunny Yellow', value: 'yellow', hex: '#F6CD3B' },
        { name: 'Deep Ink', value: 'ink', hex: '#14183A' },
        { name: 'Blush Pink', value: 'pink', hex: '#F4A7C3' },
      ],
    },
  },
  {
    id: 'squiggle-paperweight',
    name: 'Squiggle Paperweight',
    slug: 'squiggle-paperweight',
    tagline: 'Keeps open invoices grounded during sudden breezes.',
    price: 22,
    category: 'Desk',
    description: 'Cast iron wavy silhouette finished with a smooth matte ink navy powder coat. Also functions as a rest for two fountain pens.',
    details: [
      'Substantial 310g cast iron core',
      'Curved troughs cradle pens and styluses',
      'Bottom lined with non-scratch natural wool felt',
      'Finished in scratch-resistant satin enamel'
    ],
    dimensions: '12 cm length × 3.5 cm width × 2.8 cm height',
    materials: 'Sand-cast iron, wool felt',
    care: 'Wipe with microfiber cloth.',
    inStock: true,
    stockCount: 31,
    rating: '5/5',
    sku: 'MM-DSK-010',
    images: [
      IMAGES.products['squiggle-paperweight'],
    ],
  },
  {
    id: 'matchbox-sticky-notes',
    name: 'Matchbox Sticky Notes',
    slug: 'matchbox-sticky-notes',
    tagline: 'Pull-drawer box protecting three pastel sticky stacks.',
    price: 9,
    category: 'Stationery',
    description: 'Vintage matchbox style cardboard drawer containing three color-blocked mini sticky note pads with repositionable adhesive.',
    details: [
      '3 pads × 70 sheets each (210 sheets total)',
      'Gentle residue-free water-based adhesive',
      'Sturdy foil-stamped drawer box keeps edges crisp',
      'Ideal for bookmarking books and marking schematics'
    ],
    dimensions: '11 cm × 6.5 cm × 2 cm box',
    materials: 'Recycled cardstock, Japanese colored memo paper',
    care: 'Store away from direct damp heat.',
    inStock: true,
    stockCount: 52,
    rating: '5/5',
    sku: 'MM-STN-011',
    images: [
      IMAGES.products['matchbox-sticky-notes'],
    ],
  },
  {
    id: 'canvas-market-hauler',
    name: 'Canvas Market Hauler',
    slug: 'canvas-market-hauler',
    tagline: 'Extra wide profile. Holds sourdough, leeks, and records.',
    price: 48,
    category: 'Bags',
    description: 'Roomy horizontal tote bag made from tough waterproof coated cotton. Features dual grab handles and a comfortable cross-body sling.',
    details: [
      'Two handle options: short hand-carry + long over-shoulder',
      'Two exterior slip pockets for sunglasses and water bottle',
      'Reinforced copper rivet points on stress corners',
      'Water-repellent beeswax finish'
    ],
    dimensions: '48 cm width × 32 cm height × 16 cm base',
    materials: 'Waxed cotton duck canvas, copper hardware',
    care: 'Wipe with cold wet sponge. Do not machine wash.',
    badge: 'Low Stock',
    inStock: true,
    stockCount: 3,
    rating: '5/5',
    sku: 'MM-BAG-012',
    images: [
      IMAGES.products['canvas-market-hauler'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'French Blue', value: 'blue', hex: '#2F4BDB' },
        { name: 'Warm Cream', value: 'cream', hex: '#FBF6E9' },
      ],
    },
  },
  {
    id: 'dotted-habit-journal',
    name: 'Dotted Habit Journal',
    slug: 'dotted-habit-journal',
    tagline: 'For tracking small daily wins without the self-help guilt.',
    price: 18,
    category: 'Stationery',
    description: 'Hardcover journal with Smyth-sewn binding and 160 pages of buttery 110gsm paper. Includes monthly tracker grids and open dot spreads.',
    details: [
      '160 fountain pen-tested pages (zero feathering)',
      '12 undated monthly spreads + 120 dot grid pages',
      'Two woven silk marker ribbons in yellow and ink',
      'Back expandable pocket for receipts and stickers'
    ],
    dimensions: '14.8 cm × 21 cm (Standard A5)',
    materials: 'Buckram linen, 110gsm recycled woodfree paper',
    care: 'Wipe cover gently with dry cloth.',
    inStock: true,
    stockCount: 20,
    rating: '5/5',
    sku: 'MM-STN-013',
    images: [
      IMAGES.products['dotted-habit-journal'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Blush Pink', value: 'pink', hex: '#F4A7C3' },
        { name: 'Buttercup', value: 'yellow', hex: '#F6CD3B' },
        { name: 'Midnight Ink', value: 'ink', hex: '#14183A' },
      ],
    },
  },
  {
    id: 'cobalt-espresso-cup',
    name: 'Cobalt Espresso Cup (Pair)',
    slug: 'cobalt-espresso-cup',
    tagline: 'Double-shot capacity with substantial ergonomic weight.',
    price: 32,
    category: 'Ceramics',
    description: 'Set of two handmade 90ml espresso cups glazed in signature Yves Klein cobalt blue with an unglazed toasted stoneware base.',
    details: [
      'Sold as a set of two matched cups',
      '90 ml volume (perfect for cortado or double espresso)',
      'Tapered rim designed to enhance crema retention',
      'Microwave and dishwasher safe'
    ],
    dimensions: '6.2 cm diameter × 5.8 cm height each',
    materials: 'High-fire stoneware, cobalt silicate glaze',
    care: 'Dishwasher safe.',
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 11,
    rating: '5/5',
    sku: 'MM-CRM-014',
    images: [
      IMAGES.products['cobalt-espresso-cup'],
    ],
  },
  {
    id: 'chunky-tape-dispenser',
    name: 'Chunky Tape Dispenser',
    slug: 'chunky-tape-dispenser',
    tagline: 'One-handed tape tearing achieved through sheer mass.',
    price: 36,
    category: 'Desk',
    description: 'Weighing over 1.1kg, this solid resin and terrazzo dispenser stays firmly planted on your desk whenever you pull a strip of tape.',
    details: [
      'Heavy 1.1 kg ballast core — will not scoot or tip',
      'Sharp stainless steel cutter cleans tape cleanly',
      'Fits standard 1-inch core masking and washi tapes',
      'Cork base protects delicate wood surfaces'
    ],
    dimensions: '14 cm length × 6.5 cm width × 8 cm height',
    materials: 'Cast mineral resin, stainless steel, cork base',
    care: 'Wipe with dry or damp cloth.',
    badge: 'Bestseller',
    inStock: true,
    stockCount: 12,
    rating: '5/5',
    sku: 'MM-DSK-015',
    isBestseller: true,
    images: [
      IMAGES.products['chunky-tape-dispenser'],
    ],
  },
  {
    id: 'soft-grid-pen-pouch',
    name: 'Soft Grid Pen Pouch',
    slug: 'soft-grid-pen-pouch',
    tagline: 'Quilted protection for your favorite fountain and gel pens.',
    price: 24,
    category: 'Bags',
    description: 'Padded ripstop pouch with diamond grid quilting, brass YKK zipper, and an easy-pull paracord tab. Accommodates up to 10 pens.',
    details: [
      'Cushioned lightweight poly-fill batting',
      'Smooth action antique brass zipper pull',
      'Gusseted base opens wide to see contents easily',
      'Machine washable on cold gentle cycle'
    ],
    dimensions: '20 cm length × 7.5 cm height × 5 cm bottom gusset',
    materials: 'Ripstop nylon, cotton lining, YKK metal zipper',
    care: 'Spot clean or gentle cold hand wash.',
    inStock: true,
    stockCount: 25,
    rating: '5/5',
    sku: 'MM-BAG-016',
    images: [
      IMAGES.products['soft-grid-pen-pouch'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Buttercup Yellow', value: 'yellow', hex: '#F6CD3B' },
        { name: 'Sky Blue', value: 'blue', hex: '#2F4BDB' },
        { name: 'Blush Pink', value: 'pink', hex: '#F4A7C3' },
      ],
    },
  },
  {
    id: 'checkerboard-coaster-set',
    name: 'Checkerboard Coaster Set',
    slug: 'checkerboard-coaster-set',
    tagline: 'Protects oak dining tables from stubborn condensation rings.',
    price: 28,
    category: 'Homeware',
    description: 'Set of four glazed ceramic coasters featuring hand-painted checker patterns in deep navy ink and warm cream, backed with natural cork.',
    details: [
      'Set of four round ceramic coasters',
      'High-absorbency matte ceramic prevents glass sticking',
      'Non-slip 3mm Portuguese cork backing',
      'Packaged in an embossed gift sleeve'
    ],
    dimensions: '10 cm diameter × 0.8 cm thickness each',
    materials: 'Ceramic biscuit, natural cork backing',
    care: 'Wipe clean with a moist sponge.',
    badge: 'New',
    inStock: true,
    stockCount: 18,
    rating: '5/5',
    sku: 'MM-HME-017',
    isNewArrival: true,
    images: [
      IMAGES.products['checkerboard-coaster-set'],
    ],
  },
  {
    id: 'half-moon-bookends',
    name: 'Half-Moon Bookends (Pair)',
    slug: 'half-moon-bookends',
    tagline: 'Bold geometric shapes keeping your art monographs in line.',
    price: 44,
    category: 'Desk',
    description: 'Pair of precision laser-cut and brake-bent steel bookends finished in architectural powder coat. Strong enough for heavy hardcovers.',
    details: [
      'Set of 2 solid 2.5mm cold-rolled steel bookends',
      'Anti-slip silicone pads on bottom flange',
      'Smooth radiused corners that will not dent book jackets',
      'Ultra durable textured powder coat'
    ],
    dimensions: '15 cm height × 12 cm width × 10 cm base depth',
    materials: 'Cold-rolled bent steel, powder coat',
    care: 'Wipe with clean damp cloth.',
    inStock: true,
    stockCount: 15,
    rating: '5/5',
    sku: 'MM-DSK-018',
    images: [
      IMAGES.products['half-moon-bookends'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Blush Pink', value: 'pink', hex: '#F4A7C3' },
        { name: 'Electric Blue', value: 'blue', hex: '#2F4BDB' },
        { name: 'Midnight Ink', value: 'ink', hex: '#14183A' },
      ],
    },
  },
  {
    id: 'sunday-morning-incense-holder',
    name: 'Sunday Morning Incense Dish',
    slug: 'sunday-morning-incense-dish',
    tagline: 'Catches falling ash gracefully in a natural stone curve.',
    price: 24,
    category: 'Homeware',
    description: 'Hand-carved travertine stone vessel with a central brass peg for holding bamboo or Japanese coreless incense sticks safely.',
    details: [
      'Real honed travertine stone with unique natural veining',
      'Solid turned brass insert accepts 1mm to 3mm stick stems',
      'Concave basin catches 100% of falling ash',
      'Smooth chamfered base'
    ],
    dimensions: '12 cm length × 5.5 cm width × 2.2 cm depth',
    materials: 'Honed travertine stone, solid brass',
    care: 'Empty cool ash and rinse under warm water.',
    inStock: true,
    stockCount: 21,
    rating: '5/5',
    sku: 'MM-HME-019',
    images: [
      IMAGES.products['sunday-morning-incense-holder'],
    ],
  },
  {
    id: 'squash-scissors',
    name: 'Squash Scissors',
    slug: 'squash-scissors',
    tagline: 'Chubby handles that bring unexpected delight to unboxing.',
    price: 20,
    category: 'Desk',
    description: 'Japanese stainless steel craft scissors with rounded, tactile silicone-coated handles. Extremely sharp with a satisfying smooth snipping action.',
    details: [
      'High-carbon surgical stainless steel blades',
      'Ergonomic soft-touch ergonomic finger loops',
      'Teflon coated blade prevents packing tape glue buildup',
      'Includes fitted matching blade sheath'
    ],
    dimensions: '16 cm length × 7 cm width',
    materials: 'Japanese stainless steel, soft-touch silicone handles',
    care: 'Keep blades dry. Sharpen periodically if used heavily.',
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 33,
    rating: '5/5',
    sku: 'MM-DSK-020',
    images: [
      IMAGES.products['squash-scissors'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Electric Blue', value: 'blue', hex: '#2F4BDB' },
        { name: 'Buttercup', value: 'yellow', hex: '#F6CD3B' },
      ],
    },
  },
  {
    id: 'warm-welcome-key-dish',
    name: 'Warm Welcome Key Dish',
    slug: 'warm-welcome-key-dish',
    tagline: 'The first thing you touch when arriving home after work.',
    price: 26,
    category: 'Homeware',
    description: 'Terracotta oval dish with rolled rims and a dipped cream glaze interior. Creates a dedicated home for sunglasses, transit cards, and house keys.',
    details: [
      'Warm natural terracotta with glazed interior wells',
      'Protective cork pads attached to underside',
      'Deep enough that keys don’t spill over the rim',
      'Handcrafted in Portugal'
    ],
    dimensions: '20 cm length × 13 cm width × 3 cm rim height',
    materials: 'Red earthenware terracotta, semi-gloss glaze',
    care: 'Wipe with slightly moist cloth.',
    inStock: true,
    stockCount: 17,
    rating: '5/5',
    sku: 'MM-HME-021',
    images: [
      IMAGES.products['warm-welcome-key-dish'],
    ],
  },
  {
    id: 'linen-lunch-sack',
    name: 'Linen Lunch Sack',
    slug: 'linen-lunch-sack',
    tagline: 'Replaces brown paper bags with durable European flax.',
    price: 29,
    category: 'Bags',
    description: 'Pre-washed pure European flax linen sack with an insulated aluminum thermal lining and a roll-down closure secured by a real horn button.',
    details: [
      '100% Normandy flax linen outer shell',
      'Wipe-clean food-grade insulated thermal interior',
      'Roll-top design adjusts easily to snack or lunch container size',
      'Folds completely flat when empty'
    ],
    dimensions: '28 cm height × 18 cm width × 11 cm depth',
    materials: 'European flax linen, insulated thermal film, natural horn button',
    care: 'Wipe interior clean with damp cloth. Hand wash outer linen.',
    inStock: true,
    stockCount: 14,
    rating: '5/5',
    sku: 'MM-BAG-022',
    images: [
      IMAGES.products['linen-lunch-sack'],
    ],
  },
  {
    id: 'midnight-arc-lamp',
    name: 'Midnight Arc Lamp',
    slug: 'midnight-arc-lamp',
    tagline: 'A sculptural bend of light for late-night desk sessions.',
    price: 64,
    category: 'Desk',
    description: 'Architectural steel desk lamp with an arched neck and pivoting head. Touch-sensitive brass dimmer located right at the weighted base.',
    details: [
      'Smooth 360-degree swiveling shade hood',
      'Stepless dimming slider from gentle glow to reading beam',
      'High-CRI 95+ warm LEDs (comfortable on eyes)',
      'Fabric woven 1.8m power cord'
    ],
    dimensions: '38 cm height × 24 cm reach × 14 cm base diameter',
    materials: 'Steel tubing, solid brass fittings, woven fabric cable',
    care: 'Dust with soft dry brush. Low voltage DC power adapter included.',
    badge: 'New',
    inStock: true,
    stockCount: 8,
    rating: '5/5',
    sku: 'MM-DSK-023',
    isNewArrival: true,
    images: [
      IMAGES.products['midnight-arc-lamp'],
    ],
  },
  {
    id: 'good-posture-cushion',
    name: 'Good Posture Cushion',
    slug: 'good-posture-cushion',
    tagline: 'Your lower back will send us a handwritten thank-you note.',
    price: 46,
    category: 'Homeware',
    description: 'Ergonomic circular wool bouclé seat pad with high-density natural latex foam. Gives hard wooden dining chairs and desk stools instant comfort.',
    details: [
      'High resilience biodegradable latex core',
      'Plush textured wool bouclé slipcover with hidden zipper',
      'Silicone dotted underside prevents sliding off chairs',
      'Removable cover is hand washable'
    ],
    dimensions: '38 cm diameter × 4.5 cm thickness',
    materials: 'Wool blend bouclé, natural Dunlop latex foam',
    care: 'Unzip cover for dry cleaning or hand wash in cold wool detergent.',
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 10,
    rating: '5/5',
    sku: 'MM-HME-024',
    images: [
      IMAGES.products['good-posture-cushion'],
    ],
    variants: {
      type: 'color',
      options: [
        { name: 'Petal Pink', value: 'pink', hex: '#F4A7C3' },
        { name: 'Buttercup', value: 'yellow', hex: '#F6CD3B' },
        { name: 'Midnight Ink', value: 'ink', hex: '#14183A' },
      ],
    },
  },
];

export const CATEGORIES: Category[] = [
  'Stationery',
  'Ceramics',
  'Desk',
  'Bags',
  'Homeware',
];
