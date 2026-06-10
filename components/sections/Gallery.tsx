import Image from "next/image";
import { gallery } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives";

export function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="יצירות נבחרות"
          title="הצצה לעבודות שלנו"
          description="מבחר קטן מתוך תספורות, צבע ועיצוב אחרונים — כל אחד מהם עוצב סביב האדם שיושב בכיסא."
        />

        <StaggerGroup
          stagger={0.08}
          className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-3"
        >
          {gallery.map((item) => (
            <StaggerItem
              key={item.src}
              className={item.tall ? "row-span-2" : "row-span-1"}
            >
              <figure className="group relative h-full w-full overflow-hidden rounded-2xl shadow-sm shadow-ink/5">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-cream">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
                    {item.category}
                  </span>
                  <span className="translate-y-1 text-sm font-medium opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
