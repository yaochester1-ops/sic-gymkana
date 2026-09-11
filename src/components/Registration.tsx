import { REGISTRATION } from "@/lib/data";
import RegistrationForm from "./RegistrationForm";

export default function Registration() {
  return (
    <section id="registration" className="px-6 py-20">
      <div className="card-surface bg-glow mx-auto max-w-3xl rounded-2xl px-8 py-14 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          准备好上赛道了吗？
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground-muted">
          填写报名信息，加入飞驰十三金卡纳，与全国顶尖车手同场竞速。提交后立即生成你的专属车手证。
        </p>

        <div className="mt-8">
          <RegistrationForm />
        </div>

        <p className="mt-6 text-xs text-foreground-muted">
          {REGISTRATION.deadlineNote}（当前为演示报名，不会保存或提交你的信息）
        </p>
      </div>
    </section>
  );
}
