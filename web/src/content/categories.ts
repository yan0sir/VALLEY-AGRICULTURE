import type { Category, CategorySlug } from "./types";

// Descriptions carried over from the old site, with Arabic from content/copy-en-ar.md.
export const categories: Category[] = [
  {
    slug: "tractors",
    isPrimary: true,
    title: { en: "Tractors", ar: "الجرارات" },
    short: {
      en: "Power, efficiency and reliability for every stage of the farming season.",
      ar: "قوة وكفاءة وموثوقية في كل مراحل الموسم الزراعي.",
    },
    text: {
      en: "Our tractor solutions in Bahrain are built to meet the demands of modern agriculture, delivering power, efficiency and reliability across a wide range of farming operations. We offer a selection of high-performance tractors suitable for land preparation, planting, hauling and heavy-duty fieldwork, ensuring optimal productivity in every season.",
      ar: "صُمِّمت حلول الجرارات التي نقدّمها في البحرين لتلبية متطلبات الزراعة الحديثة، إذ تجمع بين القوة والكفاءة والموثوقية في مختلف العمليات الزراعية. ونوفّر تشكيلة من الجرارات عالية الأداء المناسبة لتهيئة الأرض والزراعة والنقل والأعمال الحقلية الشاقة، بما يضمن أعلى إنتاجية في كل موسم.",
    },
    image: "/images/tractors.png",
    benefits: [],
  },
  {
    slug: "irrigation-pivots",
    isPrimary: false,
    title: { en: "Irrigation Pivots", ar: "أنظمة الري المحوري" },
    short: {
      en: "Uniform, efficient water distribution built for harsh climates.",
      ar: "توزيع متجانس وفعّال للمياه، مصمَّم لتحمّل المناخ القاسي.",
    },
    text: {
      en: "Our irrigation pivot systems in Bahrain are designed to deliver efficient, reliable and uniform water distribution for modern agriculture. Built to withstand harsh climates and optimize water usage, these systems provide farmers with a cost-effective solution to maximize crop yield while conserving valuable resources.",
      ar: "صُمِّمت أنظمة الري المحوري التي نوفّرها في البحرين لتوزيع المياه بكفاءة وموثوقية وبصورة متجانسة في الزراعة الحديثة. وقد صُنعت لتتحمّل المناخ القاسي وتُرشِّد استهلاك المياه، فهي حلّ اقتصادي يساعد المزارعين على رفع إنتاجية المحاصيل مع الحفاظ على الموارد الثمينة.",
    },
    image: "/images/irrigation-pivots.png",
    benefits: [
      { en: "Uniform water distribution", ar: "توزيع متجانس للمياه" },
      { en: "Built for harsh climates", ar: "مصمَّمة لتحمّل المناخ القاسي" },
      { en: "Lower water consumption", ar: "استهلاك أقل للمياه" },
      { en: "Higher crop yield", ar: "إنتاجية أعلى للمحاصيل" },
    ],
  },
  {
    slug: "irrigation-automation",
    isPrimary: false,
    title: { en: "Irrigation Automation", ar: "أتمتة الري" },
    short: {
      en: "Smart scheduling, sensors and remote control for less water waste.",
      ar: "جدولة ذكية وأجهزة استشعار وتحكم عن بُعد لهدر أقل للمياه.",
    },
    text: {
      en: "Our irrigation automation solutions in Bahrain are designed to optimize water management through intelligent control and precision technology. By integrating advanced monitoring systems, sensors and remote-control capabilities, farmers can automate irrigation schedules, reduce water waste and ensure consistent crop hydration with minimal manual intervention.",
      ar: "صُمِّمت حلول أتمتة الري التي نقدّمها في البحرين لتحسين إدارة المياه عبر التحكم الذكي والتقنيات الدقيقة. ومن خلال الجمع بين أنظمة المراقبة المتقدمة وأجهزة الاستشعار وإمكانات التحكم عن بُعد، يستطيع المزارعون أتمتة جداول الري، والحدّ من هدر المياه، وضمان ريّ منتظم للمحاصيل بأقل قدر من التدخل اليدوي.",
    },
    image: "/images/irrigation-automation.png",
    benefits: [
      { en: "Smart irrigation scheduling", ar: "جدولة ذكية للري" },
      { en: "Sensors and live monitoring", ar: "أجهزة استشعار ومراقبة مباشرة" },
      { en: "Remote control", ar: "تحكم عن بُعد" },
      { en: "Less water waste", ar: "هدر أقل للمياه" },
    ],
  },
  {
    slug: "bale-handling",
    isPrimary: false,
    title: { en: "Bale Handling Equipment", ar: "معدات مناولة البالات" },
    short: {
      en: "Grabs, loaders, wrappers and transport for faster, safer baling.",
      ar: "ملاقط ومحمِّلات وآلات تغليف ونقل لعمل أسرع وأكثر أمانًا.",
    },
    text: {
      en: "Our bale handling equipment in Bahrain is designed to streamline the collection, transport and storage of hay and straw bales with maximum efficiency and safety. Built for durability and ease of use, our range includes bale grabs, loaders, wrappers and transport systems that reduce manual labour while improving operational speed in the field.",
      ar: "صُمِّمت معدات مناولة البالات التي نوفّرها في البحرين لتسهيل جمع بالات الأعلاف الجافة والقش ونقلها وتخزينها بأعلى درجات الكفاءة والسلامة. وتتميّز تشكيلتنا بالمتانة وسهولة الاستخدام، وتشمل ملاقط البالات والمحمِّلات وآلات التغليف وأنظمة النقل، مما يقلّل الجهد اليدوي ويُسرّع وتيرة العمل في الحقل.",
    },
    image: "/images/bale-handling.png",
    benefits: [
      { en: "Bale grabs", ar: "ملاقط البالات" },
      { en: "Loaders", ar: "المحمِّلات" },
      { en: "Bale wrappers", ar: "آلات تغليف البالات" },
      { en: "Transport systems", ar: "أنظمة النقل" },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const secondaryCategories = categories.filter((c) => !c.isPrimary);
export const isCategorySlug = (s: string): s is CategorySlug => categories.some((c) => c.slug === s);
