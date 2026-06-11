import { contact, whatsappNumber } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion/primitives";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatsAppIcon } from "@/components/icons";

const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "שלום! אשמח לקבל פרטים ולקבוע תור 💇",
)}`;

export function Contact() {
  return (
    <section id="contact" className="bg-surface/50 py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            align="left"
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <dl className="flex flex-col gap-5">
              {contact.details.map((detail) => (
                <div key={detail.label} className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">
                    {detail.label}
                  </dt>
                  <dd className="text-base text-foreground">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="transition-colors hover:text-secondary"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-whatsapp/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <WhatsAppIcon className="h-5 w-5" />
              צרו קשר בוואטסאפ
            </a>

            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">
                שעות פעילות
              </span>
              <ul className="flex flex-col gap-2">
                {contact.hours.map((slot) => (
                  <li
                    key={slot.day}
                    className="flex items-center justify-between text-sm text-muted-foreground"
                  >
                    <span>{slot.day}</span>
                    <span className="font-medium text-foreground">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal direction="up" delay={0.05}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
