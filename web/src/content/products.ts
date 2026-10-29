import type { Product } from "./types";

// SAMPLE DATA. The client has not supplied the model list yet.
// Every entry has isSample: true, which shows a "Sample listing" label on the site.
// Replace these with real models (name, specs, photos, brochure) before launch.

const synchro = (f: number, r: number) => ({
  en: `${f}F × ${r}R synchromesh`,
  ar: `${f} أمامي × ${r} خلفي، متزامن`,
});
const powershift = (f: number, r: number) => ({
  en: `${f}F × ${r}R powershift`,
  ar: `${f} أمامي × ${r} خلفي، باور شفت (Powershift)`,
});

export const products: Product[] = [
  {
    slug: "compact-45",
    name: "Compact 45",
    category: "tractors",
    isSample: true,
    status: "inStock",
    featured: true,
    short: {
      en: "A nimble compact tractor for orchards, date farms and greenhouse work.",
      ar: "جرار مدمج سهل المناورة لأعمال البساتين ومزارع النخيل والبيوت المحمية.",
    },
    images: [],
    specs: { powerHp: 45, drive: "4wd", transmission: synchro(8, 8), cylinders: 3, weightKg: 1850, liftKg: 1200, pto: "540", fuelL: 42 },
    uses: ["landPrep", "planting"],
  },
  {
    slug: "utility-60",
    name: "Utility 60",
    category: "tractors",
    isSample: true,
    status: "inStock",
    featured: false,
    short: {
      en: "An economical two-wheel-drive workhorse for everyday hauling and light tillage.",
      ar: "جرار اقتصادي بدفع ثنائي للنقل اليومي وأعمال الحراثة الخفيفة.",
    },
    images: [],
    specs: { powerHp: 60, drive: "2wd", transmission: synchro(8, 2), cylinders: 3, weightKg: 2300, liftKg: 1600, pto: "540", fuelL: 60 },
    uses: ["hauling", "landPrep"],
  },
  {
    slug: "utility-75",
    name: "Utility 75",
    category: "tractors",
    isSample: true,
    status: "inStock",
    featured: true,
    short: {
      en: "A versatile all-rounder for mixed farms, with the power to run most implements.",
      ar: "جرار متعدد الاستخدامات للمزارع المختلطة، بقدرة تكفي لتشغيل معظم الملحقات.",
    },
    images: [],
    specs: { powerHp: 75, drive: "4wd", transmission: synchro(12, 12), cylinders: 4, weightKg: 3100, liftKg: 2500, pto: "540 / 1000", fuelL: 90 },
    uses: ["landPrep", "planting", "hauling"],
  },
  {
    slug: "field-110",
    name: "Field 110",
    category: "tractors",
    isSample: true,
    status: "onOrder",
    featured: true,
    short: {
      en: "Mid-range power and a comfortable cab for long days of field preparation.",
      ar: "قدرة متوسطة ومقصورة مريحة لأيام العمل الطويلة في تهيئة الحقول.",
    },
    images: [],
    specs: { powerHp: 110, drive: "4wd", transmission: powershift(16, 16), cylinders: 4, weightKg: 4600, liftKg: 4500, pto: "540 / 1000", fuelL: 150 },
    uses: ["landPrep", "planting", "heavy"],
  },
  {
    slug: "field-140",
    name: "Field 140",
    category: "tractors",
    isSample: true,
    status: "onOrder",
    featured: false,
    short: {
      en: "High output for contractors running large implements across big acreage.",
      ar: "أداء عالٍ للمقاولين الذين يشغّلون ملحقات كبيرة على مساحات واسعة.",
    },
    images: [],
    specs: { powerHp: 140, drive: "4wd", transmission: powershift(24, 24), cylinders: 6, weightKg: 5900, liftKg: 6500, pto: "540 / 1000", fuelL: 230 },
    uses: ["heavy", "hauling"],
  },
  {
    slug: "heavy-180",
    name: "Heavy 180",
    category: "tractors",
    isSample: true,
    status: "onOrder",
    featured: true,
    short: {
      en: "Our heaviest class, built for deep tillage, heavy haulage and demanding contract work.",
      ar: "الفئة الأثقل لدينا، مصمَّمة للحراثة العميقة والنقل الثقيل وأعمال المقاولات الشاقة.",
    },
    images: [],
    specs: { powerHp: 180, drive: "4wd", transmission: powershift(24, 24), cylinders: 6, weightKg: 7400, liftKg: 8200, pto: "1000", fuelL: 330 },
    uses: ["heavy", "hauling", "landPrep"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (category: string) => products.filter((p) => p.category === category);
export const featuredProducts = () => products.filter((p) => p.featured);
