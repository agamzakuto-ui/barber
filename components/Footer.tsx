import Image from "next/image";
import { brand, contact, navItems } from "@/lib/site";
import { Container } from "@/components/ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="w-fit rounded-2xl bg-background p-4 shadow-lg shadow-foreground/20">
              <Image
                src={brand.logo}
                alt={`${brand.fullName} logo`}
                width={320}
                height={170}
                className="h-auto w-56"
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              {brand.tagline} קבעו את התור הבא שלכם ותנו לנו ליצור עבורכם מראה
              שמרגיש טבעי לחלוטין.
            </p>
          </div>

          <nav aria-label="ניווט תחתון" className="flex flex-col gap-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
              ניווט
            </h3>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
              עקבו אחרינו
            </h3>
            <ul className="flex flex-col gap-3">
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href={contact.details[1]?.href ?? "#contact"}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {contact.details[1]?.value}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-xs text-primary-foreground/50 sm:flex-row">
          <p>
            © {year} {brand.fullName}. כל הזכויות שמורות.
          </p>
          <p>נוצר באהבה בתל אביב.</p>
        </div>
      </Container>
    </footer>
  );
}
