export default function Partners() {
  return (
    <section className="px-6 py-16 text-center">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
        Partners
      </span>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
        赛事合作伙伴
      </h2>
      <p className="mt-2 text-sm text-foreground-muted">
        招商合作中，敬请期待
      </p>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex h-20 items-center justify-center rounded-xl border border-dashed border-border text-xs text-foreground-muted"
          >
            虚位以待
          </div>
        ))}
      </div>
    </section>
  );
}
