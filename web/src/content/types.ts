// Content types. These mirror the Sanity schemas planned in implementation-plan.md (Phase 4),
// so moving from these local files to the CMS only means swapping the data source.

export type Localized = { en: string; ar: string };

export const pick = (value: Localized, locale: string) => (locale === "ar" ? value.ar : value.en);

export type CategorySlug = "tractors" | "irrigation-pivots" | "irrigation-automation" | "bale-handling";

export type Category = {
  slug: CategorySlug;
  isPrimary: boolean;
  title: Localized;
  short: Localized;
  text: Localized;
  image: string;
  benefits: Localized[];
};

export type UseKey = "landPrep" | "planting" | "hauling" | "heavy";

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Placeholder data, shown with a "Sample listing" label. Replace before launch. */
  isSample?: boolean;
  status: "inStock" | "onOrder";
  featured: boolean;
  short: Localized;
  images: string[];
  brochure?: string;
  specs: {
    powerHp: number;
    drive: "2wd" | "4wd";
    transmission: Localized;
    cylinders: number;
    weightKg: number;
    liftKg: number;
    pto: string;
    fuelL: number;
  };
  uses: UseKey[];
};

export type ServiceKey = "consultation" | "installation" | "maintenance" | "aftersales";
