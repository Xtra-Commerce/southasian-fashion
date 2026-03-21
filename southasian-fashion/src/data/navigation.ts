export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Wedding Guides',
    href: '/wedding-guides',
    children: [
      { label: 'Indian Wedding Overview', href: '/wedding/indian-wedding-complete-guide' },
      { label: 'What to Wear', href: '/wedding/what-to-wear-indian-wedding-guest' },
      { label: 'Bridal Outfits', href: '/wedding/indian-bridal-outfit-guide' },
      { label: 'Wedding Events', href: '/wedding/indian-wedding-events-explained' },
    ],
  },
  {
    label: 'Buying',
    href: '/buying',
    children: [
      { label: 'Lehengas', href: '/buy/best-lehenga-online' },
      { label: 'Sarees', href: '/buy/best-saree-online' },
      { label: 'Sherwanis', href: '/buy/best-sherwani-online' },
      { label: 'All Buying Guides', href: '/buying' },
    ],
  },
  {
    label: 'Selling',
    href: '/selling',
    children: [
      { label: 'Sell Your Outfit', href: '/sell/how-to-sell-indian-clothes-online' },
      { label: 'Resale Value Guide', href: '/sell/indian-outfit-resale-value-guide' },
      { label: 'All Selling Guides', href: '/selling' },
    ],
  },
  {
    label: 'Learn',
    href: '/learn',
    children: [
      { label: 'Fabric Guide', href: '/learn/south-asian-fabric-guide' },
      { label: 'Embroidery Types', href: '/learn/indian-embroidery-types-guide' },
      { label: 'Regional Styles', href: '/learn/regional-indian-fashion-styles' },
      { label: 'All Articles', href: '/learn' },
    ],
  },
];

export const footerNav = {
  guides: [
    { label: 'Wedding Guides', href: '/wedding-guides' },
    { label: 'Buying Guides', href: '/buying' },
    { label: 'Selling Guides', href: '/selling' },
    { label: 'Learn', href: '/learn' },
  ],
  popular: [
    { label: 'What to Wear to an Indian Wedding', href: '/wedding/what-to-wear-indian-wedding-guest' },
    { label: 'Best Lehenga Online', href: '/buy/best-lehenga-online' },
    { label: 'Sell Indian Clothes Online', href: '/sell/how-to-sell-indian-clothes-online' },
    { label: 'Saree vs Lehenga', href: '/compare/saree-vs-lehenga' },
  ],
  countries: [
    { label: 'India', href: '/country/india' },
    { label: 'United States', href: '/country/united-states' },
    { label: 'United Kingdom', href: '/country/united-kingdom' },
    { label: 'Canada', href: '/country/canada' },
  ],
};
