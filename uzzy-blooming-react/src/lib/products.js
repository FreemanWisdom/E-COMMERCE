
const CATEGORY_MAP = {
  'women-clothing': { id: 'women-clothing', name: 'Women Clothing' },
  shoes: { id: 'shoes', name: 'Shoes' },
  bags: { id: 'bags', name: 'Bags' },
  utility: { id: 'utility', name: 'Utility' },
  children: { id: 'children', name: 'Children' }
};

const CATEGORY_RULES = [
  {
    slug: 'children',
    name: 'Children',
    keywords: ['children shoe', 'children shoes', 'school shoe', 'kids shoe', 'baby shoes']
  },
  {
    slug: 'women-clothing',
    name: 'Women Clothing',
    keywords: ['gown', 'polo', 'jeans', 'geans', 'wrapper', 'wrappers', 'nightwear', 'underwear', 'skirt', 'trouser']
  },
  {
    slug: 'shoes',
    name: 'Shoes',
    keywords: ['shoe', 'shoes', 'canvas', 'heel', 'sandal', 'women shoes']
  },
  {
    slug: 'bags',
    name: 'Bags',
    keywords: ['handbag', 'women bag', 'women bags', 'school bag', 'school bags', 'lunch bag', 'lunch bags', 'travel bag', 'travelling bag', 'travelling bags', 'box']
  },
  {
    slug: 'utility',
    name: 'Utility',
    keywords: ['flask', 'food flask', 'water can', 'water cans', 'socks']
  }
];

function cleanProductBase(filename) {
  const parts = filename.split('.');
  const nameWithoutExt = parts.slice(0, -1).join('.');
  return nameWithoutExt
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s+\d+$/g, '')
    .trim();
}

function titleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function hashValue(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function detectCategory(normalizedName) {
  let bestMatch = { rule: CATEGORY_MAP.utility, score: 0 };
  CATEGORY_RULES.forEach((rule) => {
    rule.keywords.forEach((keyword) => {
      if (normalizedName.includes(keyword) && keyword.length > bestMatch.score) {
        bestMatch = { rule: CATEGORY_MAP[rule.slug], score: keyword.length };
      }
    });
  });
  return bestMatch.rule;
}

function buildDescription(name, categoryName) {
  return `${name} from UZZYBLOOMING HOMES is designed for daily comfort, durability, and standout style in the ${categoryName.toLowerCase()} range.`;
}

function getSizesForCategory(categoryId) {
  if (categoryId === 'women-clothing') return ['S', 'M', 'L', 'XL'];
  if (categoryId === 'shoes' || categoryId === 'children') return ['28', '30', '32', '34', '36', '38', '40'];
  return [];
}

function buildPrice(seed) {
  const hash = hashValue(seed);
  return 5000 + (hash % 15000);
}

const ALL_FILES = [
  "children shoes 1.jpg", "children shoes 2.jpg", "children shoes 3.jpg", "children shoes 4.jpg", "children shoes 5.jpg",
  "children shoes 6.jpg", "children shoes 7.jpg", "children shoes 8.jpg", "children shoes 9.jpg", "food flasks 1.jpg",
  "food flasks 2.jpg", "food flasks 3.jpg", "food flasks 4.jpg", "food flasks 5.jpg", "food flasks 6.jpg",
  "food flasks 7.jpg", "food flasks 8.jpg", "geans skirt 1.jpg", "geans skirt 2.jpg", "geans skirt 3.jpg",
  "geans skirt 4.jpg", "geans skirt 5.jpg", "geans trouser 1.jpg", "geans trouser 2.jpg", "geans trouser 3.jpg",
  "geans trouser 4.jpg", "geans trouser 5.jpg", "gown 1.jpg", "gown 10.jpg", "gown 2.jpg", "gown 3.jpg",
  "gown 4.jpg", "gown 5.jpg", "gown 6.jpg", "gown 7.jpg", "gown 8.jpg", "gown 9.jpg", "lunch bag 1.jpg",
  "lunch bag 2.jpg", "lunch bag 3.jpg", "lunch bag 4.jpg", "lunch bag 5.jpg", "lunch bag 6.jpg",
  "lunch bag 7.jpg", "lunch bag 8.jpg", "polo 1.jpg", "polo 10.jpg", "polo 2.jpg", "polo 3.jpg",
  "polo 4.jpg", "polo 5.jpg", "polo 6.jpg", "polo 7.jpg", "polo 8.jpg", "polo 9.jpg", "school bags 1.jpg",
  "school bags 10.jpg", "school bags 2.jpg", "school bags 3.jpg", "school bags 4.jpg", "school bags 5.jpg",
  "school bags 6.jpg", "school bags 7.jpg", "school bags 8.jpg", "school bags 9.jpg", "socks 1.jpg",
  "socks 2.jpg", "socks 3.jpg", "socks 4.jpg", "socks 5.jpg", "socks 6.jpg", "socks 7.jpg",
  "travelling bags 1.jpg", "travelling bags 10.jpg", "travelling bags 2.jpg", "travelling bags 3.jpg", "travelling bags 4.jpg",
  "travelling bags 5.jpg", "travelling bags 6.jpg", "travelling bags 7.jpg", "travelling bags 8.jpg", "travelling bags 9.jpg",
  "water cans 1.jpg", "water cans 10.jpg", "water cans 2.jpg", "water cans 3.jpg", "water cans 4.jpg",
  "water cans 5.jpg", "water cans 6.jpg", "water cans 7.jpg", "water cans 8.jpg", "water cans 9.jpg",
  "women bags 1.jpg", "women bags 2.jpg", "women bags 3.jpg", "women bags 4.jpg", "women bags 5.jpg",
  "women bags 6.jpg", "women bags 7.jpg", "women bags 8.jpg", "women shoes 1.jpg", "women shoes 10.jpg",
  "women shoes 2.jpg", "women shoes 3.jpg", "women shoes 4.jpg", "women shoes 5.jpg", "women shoes 6.jpg",
  "women shoes 7.jpg", "women shoes 8.jpg", "women shoes 9.jpg", "wrappers 1.jpg", "wrappers 2.jpg",
  "wrappers 3.jpg", "wrappers 4.jpg", "wrapppers 5.jpg"
];

const products = ALL_FILES.map((file) => {
  const basename = cleanProductBase(file);
  const normalized = basename.toLowerCase();
  const category = detectCategory(normalized);
  const name = titleCase(basename);
  const seed = `${name}-${file}`;
  const slug = `${slugify(name)}-${hashValue(file).toString().slice(0, 6)}`;
  const price = buildPrice(seed);

  return {
    id: slug,
    slug,
    name,
    image: `/products/${file}`,
    filename: file,
    category,
    description: buildDescription(name, category.name),
    price,
    currency: 'NGN',
    sizes: getSizesForCategory(category.id),
    rating: 4 + (hashValue(seed) % 10) / 10
  };
});

export function getProducts() {
  return products;
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getCategories() {
  const counts = products.reduce((acc, p) => {
    const key = p.category.id;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.values(CATEGORY_MAP)
    .filter((c) => counts[c.id])
    .map((c) => ({
      ...c,
      count: counts[c.id]
    }))
    .sort((a, b) => b.count - a.count);
}

export function getProductsByCategory(id) {
  return products.filter((p) => p.category.id === id);
}

export function getRelatedProducts(categoryId, currentId) {
  return products
    .filter((p) => p.category.id === categoryId && p.id !== currentId)
    .slice(0, 4)
    .sort((a, b) => b.rating - a.rating);
}

export function formatCurrency(amount, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}
