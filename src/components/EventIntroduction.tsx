const highlights = [
  { value: "12 站", label: "全年赛事" },
  { value: "30 天", label: "更换赛道布局与榜单" },
  { value: "188 元 / 4 圈", label: "取最好成绩上榜" },
];

export default function EventIntroduction() {
  return (
    <section id="introduction" aria-labelledby="introduction-heading" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-green-light">About the Race</span>
          <h2 id="introduction-heading" className="mt-2 font-display text-3xl font-bold sm:text-4xl">赛事介绍</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground-muted">
            全民赛车大奖赛，全年共 12 站。每 30 天更换赛道布局，并更新新赛道榜单。每一次出发，都是新的挑战。
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="card-surface rounded-2xl px-5 py-6 text-center">
              <p className="text-gradient font-display text-2xl font-bold">{item.value}</p>
              <p className="mt-2 text-xs text-foreground-muted">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="card-surface rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold">四圈挑战，最好成绩上榜</h3>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">
              报名费为每人次 188 元，可挑战 4 圈，取其中最好成绩参与榜单排名。赛事方从每人次报名费中拿出 50 元注入奖池：35 元进入月奖池，15 元进入年奖池。
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-accent-purple/10 px-3 py-4">
                <p className="font-display text-2xl font-bold text-accent-purple-light">35 元</p>
                <p className="mt-1 text-xs text-foreground-muted">每人次注入月奖池</p>
              </div>
              <div className="rounded-xl bg-accent-green/10 px-3 py-4">
                <p className="font-display text-2xl font-bold text-accent-green-light">15 元</p>
                <p className="mt-1 text-xs text-foreground-muted">每人次注入年奖池</p>
              </div>
            </div>
          </article>
          <article className="card-surface rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold">月度争先，年度更精彩</h3>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">
              月奖池按月度榜单名次发放。年度赛事采用积分制，每人次参赛贡献的 15 元在年奖池中累积 12 个月，再按年度积分排名颁发奖金。每一次参与，都让年度大奖更值得期待。
            </p>
            <p className="mt-4 text-sm font-medium">月奖池与年奖池均按以下比例颁发：</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[["第 1 名", "50%"], ["第 2 名", "30%"], ["第 3 名", "20%"]].map(([place, share]) => (
                <div key={place} className="rounded-xl border border-border px-2 py-4">
                  <p className="text-gradient font-display text-2xl font-bold">{share}</p>
                  <p className="mt-1 text-xs text-foreground-muted">{place}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="card-surface mt-6 rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold">全民赛车，让热爱没有门槛</h3>
          <p className="mt-3 text-sm leading-7 text-foreground-muted">
            全民赛车，顾名思义，是全民都可参与的无门槛大奖赛。只要你的车有四个轮子或两个轮子，都可以参加。哪怕骑着二轮共享电车，或带着四轮滑板，也是在为全民赛车文化出一份力。
          </p>
          <p className="mt-4 text-sm leading-7 text-foreground">
            赛事不易，汽车文化不易。请大家文明玩车，最后愿各位车手取得好成绩！
          </p>
        </article>
      </div>
    </section>
  );
}
