import Image from "next/image";

const partners = [
  { name: "石家庄国际赛车场", src: "/partners/sic.png" },
  { name: "DUNES 盾斯车库", src: "/partners/dunes.jpg" },
  { name: "十三 DRIFT RACING GROUP", src: "/partners/thirteen.jpg" },
];

export default function Partners() {
  return (
    <section id="partners" aria-labelledby="partners-heading" className="px-6 py-16 text-center">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
        Partners
      </span>
      <h2 id="partners-heading" className="mt-2 font-display text-2xl font-bold sm:text-3xl">
        赛事合作伙伴
      </h2>
      <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        {partners.map((partner) => (
          <li key={partner.src} className="min-w-0">
            <div className="relative h-40 overflow-hidden rounded-xl border border-border bg-white">
              <Image
                src={partner.src}
                alt={partner.name}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 33vw, 100vw"
                className="object-contain p-4"
              />
            </div>
            <p className="mt-3 text-xs text-foreground-muted">{partner.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
