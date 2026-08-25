import { RULES } from "@/lib/data";

export default function Rules() {
  return (
    <section id="rules" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-green-light">
            Rules
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            赛事规则
          </h2>
          <p className="mt-3 text-sm text-foreground-muted">
            正式规则文件整理中，敬请期待
          </p>
        </div>

        <div className="space-y-4">
          {RULES.map((rule) => (
            <details
              key={rule.title}
              className="card-surface group rounded-xl px-6 py-4 open:pb-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold">
                {rule.title}
                <span className="text-accent-green-light transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {rule.content}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
