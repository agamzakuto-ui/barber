/**
 * Single source of truth for all site content (Hebrew / RTL).
 * Keeping copy + data here keeps section components purely presentational
 * and makes the page trivial to extend or localise.
 */

/** Build a responsive, cropped Unsplash URL from a verified photo id. */
const photo = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type NavItem = {
  /** Matches the target section's DOM id (without the leading #). */
  id: string;
  label: string;
};

export const brand = {
  name: "Yarin Zakuto",
  fullName: "Yarin Zakuto Hair Design",
  tagline: "עיצוב שיער אלגנטי, נעשה בכוונה ובדיוק.",
  logo: "/logo.png",
} as const;

export const navItems: NavItem[] = [
  { id: "home", label: "בית" },
  { id: "about", label: "הסטודיו" },
  { id: "services", label: "שירותים" },
  { id: "gallery", label: "גלריה" },
  { id: "testimonials", label: "המלצות" },
  { id: "contact", label: "צרו קשר" },
];

export const hero = {
  eyebrow: "סטודיו לעיצוב שיער · נוסד ב-2014",
  titleTop: "עיצוב שיער אלגנטי",
  titleBottom: "מבית זקוטו",
  description:
    "סטודיו מודרני שבו תספורת מדויקת, צבע זוהר ועיצוב טבעי נפגשים יחד. אנחנו מתאימים כל מראה במיוחד עבורכם — מוקפד, נוח לתחזוקה ובהחלט שלכם.",
  primaryCta: { label: "לקביעת תור", href: "#contact" },
  secondaryCta: { label: "לצפייה בעבודות", href: "#gallery" },
  image: photo("1560066984-138dadb4c035", 1400),
  imageAlt: "Stylist crafting an elegant blow-dry in a bright modern studio",
};

export const about = {
  eyebrow: "הסטודיו",
  title: "במקום שבו אומנות פוגשת רוגע",
  paragraphs: [
    "‏Yarin Zakuto Hair Design הוא סטודיו בוטיק שנבנה סביב רעיון אחד: ששיער יפה צריך להרגיש טוב בדיוק כמו שהוא נראה. אנחנו שומרים על מספר כיסאות מצומצם כך שכל לקוח מקבל יחס מלא, ממוקד וללא לחץ.",
    "מעיצוב מחדש ועד שינוי צבע מלא, הצוות שלנו משלב טכניקה קלאסית עם מבט עכשווי — ותמיד מסיים בעיצוב שתוכלו לשחזר בקלות גם בבית.",
  ],
  image: photo("1521590832167-7bcbfaa6381f", 1000),
  imageAlt: "Calm, minimalist hair studio interior",
  stats: [
    { value: "10+", label: "שנות ניסיון" },
    { value: "8k+", label: "לקוחות מרוצים" },
    { value: "4.9", label: "דירוג ממוצע" },
  ],
};

export type Service = {
  title: string;
  description: string;
  price: string;
};

export const services: Service[] = [
  {
    title: "תספורת ועיצוב מדויק",
    description:
      "ייעוץ אישי, תספורת מדויקת המותאמת לתווי הפנים שלכם וגימור מוקפד.",
    price: "החל מ-₪240",
  },
  {
    title: "צבע ייחודי",
    description:
      "צבע חד-גוני מותאם אישית, גלוס ועבודת שורשים שמחמיאים לגוון העור.",
    price: "החל מ-₪350",
  },
  {
    title: "באליאז' והבהרות",
    description:
      "גוונים מצוירים ביד עם מראה שזוף וטבעי ויציאת צבע רכה לתחזוקה נוחה.",
    price: "החל מ-₪520",
  },
  {
    title: "כלות ואירועים",
    description:
      "ניסיון מקדים, עיצוב ביום האירוע וליווי רגוע לרגעים החשובים שלכם.",
    price: "החל מ-₪670",
  },
  {
    title: "החלקות וטיפולים",
    description:
      "טיפולים משקמים ומחליקי קרזול שמשאירים שיער מבריק, רך וחזק.",
    price: "החל מ-₪410",
  },
  {
    title: "טיפוח לגברים",
    description:
      "תספורות מדויקות, פֵייד ועיצוב זקן בגימור רגוע ומודרני.",
    price: "החל מ-₪170",
  },
];

export type GalleryItem = {
  src: string;
  /** Visible Hebrew caption shown on hover. */
  caption: string;
  /** Descriptive alt text for assistive tech. */
  alt: string;
  category: string;
  /** When true the tile spans two rows for an editorial mosaic feel. */
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    src: photo("1522337660859-02fbefca4702", 800),
    caption: "באליאז' רך עם גלים טבעיים",
    alt: "Soft balayage with loose waves",
    category: "באליאז'",
    tall: true,
  },
  {
    src: photo("1503951914875-452162b0f3f1", 800),
    caption: "בוב מודרני וחלק",
    alt: "Sleek modern bob",
    category: "תספורת ועיצוב",
  },
  {
    src: photo("1605497788044-5a32c7078486", 800),
    caption: "אסוף קלוע ומוקפד",
    alt: "Detailed braided updo",
    category: "כלות",
  },
  {
    src: photo("1519415510236-718bdfcd89c8", 800),
    caption: "שיער ארוך, שכבתי ומבריק",
    alt: "Glossy long layered hair",
    category: "צבע",
    tall: true,
  },
  {
    src: photo("1599351431202-1e0f0137899a", 800),
    caption: "שינוי צבע לגוון נחושת חם",
    alt: "Warm copper colour transformation",
    category: "צבע",
  },
  {
    src: photo("1633681926022-84c23e8cb2d6", 800),
    caption: "עיצוב קצר עם טקסטורה",
    alt: "Textured short crop styling",
    category: "תספורת ועיצוב",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "התספורת הכי מוקפדת שעברתי אי פעם. הקשיבו לי, ואז יצרו משהו טוב יותר ממה שדמיינתי.",
    name: "מאיה לוי",
    role: "לקוחה קבועה",
  },
  {
    quote:
      "הבאליאז' שלי עדיין נראה מדהים גם אחרי שלושה חודשים. יציאת הצבע חלקה לחלוטין.",
    name: "דניאלה ר.",
    role: "לקוחת צבע",
  },
  {
    quote:
      "הם עיצבו את שיער הכלה שלי ושמרו עליי רגועה כל הבוקר. התסרוקת החזיקה מושלם כל הלילה.",
    name: "נועה ותום",
    role: "חתונה 2025",
  },
];

/**
 * WhatsApp business number in international format (digits only, no “+”).
 * Used to build wa.me deep links from the contact form / buttons.
 */
export const whatsappNumber = "972535266828";

export const contact = {
  eyebrow: "בואו לבקר",
  title: "קבעו את השינוי שלכם",
  description:
    "קבעו תור אונליין או צרו איתנו קשר ישירות — נאשר תוך יום אחד ונתאים את הביקור שלכם עוד לפני שתגיעו.",
  details: [
    { label: "כתובת", value: "שדרות רוטשילד 24, תל אביב" },
    { label: "טלפון", value: "053-526-6828", href: "tel:+972535266828" },
    {
      label: "וואטסאפ",
      value: "שלחו לנו הודעה",
      href: `https://wa.me/${whatsappNumber}`,
    },
  ],
  hours: [
    { day: "א׳ – ה׳", time: "9:00 — 20:00" },
    { day: "שישי", time: "8:00 — 14:00" },
    { day: "שבת", time: "סגור" },
  ],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}` },
  ],
};
