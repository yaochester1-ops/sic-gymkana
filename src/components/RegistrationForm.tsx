"use client";

import { useState, type FormEvent } from "react";
import DriverIdCard, { type RegisteredDriver } from "./DriverIdCard";

const GENDERS = ["男", "女", "其他"];

function randomDriverNumber() {
  return String(Math.floor(Math.random() * 90) + 10);
}

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [error, setError] = useState("");
  const [driver, setDriver] = useState<RegisteredDriver | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !age.trim() || !gender || !vehicle.trim()) {
      setError("请完整填写姓名、年龄、性别与参赛车辆");
      return;
    }
    const ageNum = Number(age);
    if (!Number.isFinite(ageNum) || ageNum < 16 || ageNum > 99) {
      setError("请填写有效的年龄（16-99）");
      return;
    }

    setError("");
    setDriver({
      name: name.trim(),
      age: age.trim(),
      gender,
      vehicle: vehicle.trim(),
      number: randomDriverNumber(),
      issuedAt: new Date().toLocaleDateString("zh-CN"),
    });
  };

  const handleReset = () => {
    setDriver(null);
    setName("");
    setAge("");
    setGender("");
    setVehicle("");
  };

  if (driver) {
    return (
      <div className="animate-fade-up">
        <p className="mb-6 text-center text-sm text-accent-green-light">
          报名成功！这是你的专属车手证
        </p>
        <DriverIdCard driver={driver} onReset={handleReset} />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-4 text-left"
    >
      <div>
        <label className="mb-1.5 block text-xs text-foreground-muted">
          姓名
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请输入姓名"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent-purple-light"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs text-foreground-muted">
            年龄
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="18"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent-purple-light"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-foreground-muted">
            性别
          </label>
          <div className="flex h-[42px] items-center gap-1 rounded-xl border border-border px-1.5">
            {GENDERS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                  gender === g
                    ? "bg-gradient-to-r from-accent-purple to-accent-green text-white"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-foreground-muted">
          参赛车辆
        </label>
        <input
          type="text"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          placeholder="例如：本田 思域 Type R"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent-purple-light"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-gradient-to-r from-accent-purple to-accent-green py-3 text-sm font-semibold text-white shadow-lg shadow-accent-green/25 transition-transform hover:scale-105"
      >
        提交报名，生成车手证
      </button>
    </form>
  );
}
