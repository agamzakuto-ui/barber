import Image from "next/image";
import { about } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives";

const values = [
  {
    title: "ללא לחץ, בכוונה תחילה",
    body: "מספר כיסאות מצומצם בכל יום כך שהביקור שלכם לעולם לא מרגיש נחפז.",
  },
  {
    title: "צוות שמוביל בידע",
    body: "מעצבים שמתעדכנים ומתמחים כל הזמן בתספורת ובצבע מודרניים.",
  },
  {
    title: "מוצרים איכותיים ועדינים",
    body: "מותגים מקיימים ועדינים לקרקפת ששומרים על השיער שלכם.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-cream py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left" className="relative order-2 lg:order-1">
          <div
            aria-hidden
            className="absolute -left-5 -top-5 -z-10 h-full w-full rounded-[2rem] bg-sand"
          />
          <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-xl shadow-ink/10">
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow={about.eyebrow}
            title={about.title}
          />

          <div className="flex flex-col gap-4">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-base leading-relaxed text-stone sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <StaggerGroup className="mt-2 grid gap-x-8 gap-y-6 sm:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title} className="flex flex-col gap-2">
                <span className="font-serif text-base font-semibold text-ink">
                  {value.title}
                </span>
                <span className="text-sm leading-relaxed text-stone">
                  {value.body}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
