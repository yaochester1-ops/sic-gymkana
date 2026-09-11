import { DRIVERS, PRIZE_POOL, VENUE } from "@/lib/data";

export default function EventStats() {
  const stats = [
    { label: "报名车手", value: `${DRIVERS.length}` },
    { label: "比赛场地", value: VENUE.name },
    { label: "滚动奖池", value: `¥${PRIZE_POOL.amountCNY.toLocaleString("zh-CN")}` },
  ];

  return (
    <section className="border-b border-border px-6 py-12">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card-surface rounded-2xl px-6 py-6 text-center"
          >
            <p className="truncate font-display text-2xl font-bold text-gradient">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-foreground-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
