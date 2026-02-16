import fs from 'fs';
import path from 'path';

const PRODUCTS_DIR = path.join(process.cwd(), 'public', 'products');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const CATEGORY_RULES = [
  {
    slug: 'children',
    name: 'Children',
    keywords: ['children shoe', 'children shoes', 'school shoe', 'kids shoe']
  },
  {
    slug: 'women-clothing',
    name: 'Women Clothing',
    keywords: [
      'gown',
      'polo',
      'jeans',
      'geans',
      'wrapper',
      'wrappers',
      'nightwear',
      'underwear',
      'skirt',
      'trouser'
    ]
  },
  {
    slug: 'shoes',
    name: 'Shoes',
    keywords: ['shoe', 'shoes', 'canvas', 'heel', 'sandal']
  },
  {
    slug: 'bags',
    name: 'Bags',
    keywords: [
      'handbag',
      'women bag',
      'women bags',
      'school bag',
      'school bags',
      'lunch bag',
      'lunch bags',
      'travel bag',
      'travelling bag',
      'travelling bags',
      'box'
    ]
  },
  {
    slug: 'utility',
    name: 'Utility',
    keywords: ['flask', 'food flask', 'water can', 'water cans', 'socks']
  }
];

const CATEGORY_MAP = {
  'women-clothing': { id: 'women-clothing', name: 'Women Clothing' },
  shoes: { id: 'shoes', name: 'Shoes' },
  bags: { id: 'bags', name: 'Bags' },
  utility: { id: 'utility', name: 'Utility' },
  children: { id: 'children', name: 'Children' }
};

let cachedProducts;

function cleanProductBase(filename) {
  const ext = path.extname(filename);
  const raw = filename
    .replace(ext, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return raw.replace(/\s+\d+$/g, '').trim();
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
  if (categoryId === 'women-clothing') {
    return ['S', 'M', 'L', 'XL'];
  }

  if (categoryId === 'shoes' || categoryId === 'children') {
    return ['28', '30', '32', '34', '36', '38', '40'];
  }

  return [];
}

function buildPrice(seed) {
  const hash = hashValue(seed);
  const base = 5000;
  return base + (hash % 15000);
}

function parseProductsFromImages() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((file) => {
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
}

export function getProducts() {
  if (!cachedProducts) {
    cachedProducts = parseProductsFromImages();
  }
  return cachedProducts;
}

export function getProductBySlug(slug) {
  return getProducts().find((product) => product.slug === slug) || null;
}

export function getCategories() {
  const counts = getProducts().reduce((acc, product) => {
    const key = product.category.id;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.values(CATEGORY_MAP)
    .filter((category) => counts[category.id])
    .map((category) => ({
      ...category,
      count: counts[category.id]
    }))
    .sort((a, b) => b.count - a.count);
}

export function getProductsByCategory(slug) {
  return getProducts().filter((product) => product.category.id === slug);
}

export function formatCurrency(amount, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}
