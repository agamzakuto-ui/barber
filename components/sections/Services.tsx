import { services } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { ScissorsIcon } from "@/components/icons";

export function Services() {
  return (
    <section id="services" className="bg-sand/50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="מה אנחנו עושים"
          title="שירותים שמותאמים אליכם"
          description="כל תור מתחיל בייעוץ אישי, כך שהתוצאה תמיד מתאימה לשיער שלכם, לאורח החיים ולשגרה."
        />

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.title} className="h-full">
              <article className="group flex h-full flex-col gap-5 rounded-2xl border border-ink/8 bg-cream p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl hover:shadow-ink/10">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors duration-300 group-hover:bg-gold group-hover:text-cream">
                    <ScissorsIcon className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-stone">
                  {service.description}
                </p>

                <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="text-sm font-medium text-ink">
                    {service.price}
                  </span>
                  <span className="text-xs font-medium tracking-[0.12em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    להזמנה ←
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
