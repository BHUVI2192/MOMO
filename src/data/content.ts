/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category } from './products';

export interface CategoryTile {
  category: Category;
  title: string;
  count: number;
  description: string;
  bgClass: string; // flat color block: pink, blue-100, yellow-100, cream
  textColor: string;
  image: string;
}

export const CATEGORY_TILES: CategoryTile[] = [
  {
    category: 'Ceramics',
    title: 'Ceramics & Mugs',
    count: 5,
    description: 'Double-glazed stoneware made to be held with both hands on foggy mornings.',
    bgClass: 'bg-[#F4A7C3]', // pink
    textColor: 'text-[#14183A]',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Stationery',
    title: 'Paper & Notebooks',
    count: 5,
    description: 'Smyth-sewn journals and bleed-resistant pads that make to-do lists feel approachable.',
    bgClass: 'bg-[#DCE3FA]', // blue-100
    textColor: 'text-[#14183A]',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Desk',
    title: 'Desk Companions',
    count: 6,
    description: 'Heavy tape dispensers, solid brass rulers, and tidy trays that give work some dignity.',
    bgClass: 'bg-[#FBE9A0]', // yellow-100
    textColor: 'text-[#14183A]',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Bags',
    title: 'Totes & Carriers',
    count: 4,
    description: 'Heavyweight organic duck canvas and washed linen sacks built for farmer markets.',
    bgClass: 'bg-[#FBF6E9]', // cream with border
    textColor: 'text-[#14183A]',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  },
];

export interface CustomerReview {
  id: string;
  quote: string;
  author: string;
  city: string;
  productName: string;
  rating: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    quote: "The Tuesday Mug has somehow become the only mug my partner and I race to get from the cabinet. The thumb rest is ridiculously good.",
    author: "Clara S.",
    city: "Portland, OR",
    productName: "The Tuesday Mug",
    rating: "5/5",
  },
  {
    id: 'rev-2',
    quote: "The brass ruler is so heavy it feels like a relic pulled out of an architect’s study in 1952. My desk is 40% tidier just by association.",
    author: "Julian K.",
    city: "Toronto, ON",
    productName: "Perpetual Brass Ruler",
    rating: "5/5",
  },
  {
    id: 'rev-3',
    quote: "Big Feelings Tote actually holds groceries without snapping my shoulders in half. Straps are wide, fabric is thick, zero regrets.",
    author: "Maya N.",
    city: "Melbourne, AU",
    productName: "Big Feelings Tote",
    rating: "5/5",
  },
];

export const MARQUEE_PHRASES = [
  'Free worldwide shipping on orders over $50',
  'Plastic-free recycled paper packaging',
  'Small batch production & independent craft',
  'Designed for good moods and better Tuesdays',
  'Lifetime repair pledge on hardware',
  'Zero synthetic coatings on ceramics',
];

export const PROMO_CODES: Record<string, number> = {
  MOMO10: 0.1, // 10% off
  HAPPYDROP: 0.15, // 15% off
};
