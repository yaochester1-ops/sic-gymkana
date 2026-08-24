// ============================================================================
// 站点内容配置 —— 后续更新赛事信息，只需要改这一个文件即可
// ============================================================================

export const EVENT = {
  name: "SIC 飞驰十三金卡纳",
  shortName: "飞驰十三金卡纳",
  tagline: "精准操控 · 极限圈速",
  season: "2026 赛季",
  description:
    "SIC 飞驰十三金卡纳是一项面向专业与业余车手开放的场地绕桩竞速赛事，我们相信精准操控与极限圈速的极致融合。加入我们，见证每一圈的极限突破。",
};

// 赛事地点 —— 场馆名称、实景图片与导航链接已确认，详细门牌地址待补充后替换 addressNote 即可
export const VENUE = {
  name: "石家庄国际卡丁车场",
  englishName: "Shijiazhuang International Circuit",
  city: "河北省 · 石家庄",
  addressNote: "详细门牌地址待公布",
  photo: "https://raw.githubusercontent.com/yaochester1-ops/sic-gymkana/main/public/venue-photo.jpg",
  mapUrl: "https://www.amap.com/place/B0M6TR65LR",
};

// 报名通道：目前是占位链接，拿到真实报名链接（问卷星 / 腾讯问卷等）后替换 url 即可
export const REGISTRATION = {
  url: "#",
  isPlaceholder: true,
  deadlineNote: "报名截止时间待公布",
};

// 滚动奖池金额（人民币元）—— 目前是占位金额，之后替换为真实数字即可
export const PRIZE_POOL = {
  amountCNY: 100000,
  updatedNote: "奖池金额随赛事进程持续更新",
};

// 车手圈速榜 —— 示例占位数据，拿到真实车手成绩后按同样结构替换即可
// 按最佳圈速从快到慢排序，rank 1 为全场最快圈速
export type DriverEntry = {
  rank: number;
  name: string;
  number: string; // 车号
  carModel: string;
  penalty: string; // 罚时/罚点
  bestLap: string; // 最佳圈速（秒）
};

export const DRIVERS: DriverEntry[] = [
  { rank: 1, name: "车手01", number: "13", carModel: "本田 思域 Type R", penalty: "无罚时", bestLap: "52.318s" },
  { rank: 2, name: "车手02", number: "07", carModel: "丰田 GR86", penalty: "无罚时", bestLap: "52.904s" },
  { rank: 3, name: "车手03", number: "22", carModel: "大众 高尔夫 GTI", penalty: "+0.5s", bestLap: "53.117s" },
  { rank: 4, name: "车手04", number: "18", carModel: "宝马 M2", penalty: "无罚时", bestLap: "53.685s" },
  { rank: 5, name: "车手05", number: "05", carModel: "斯巴鲁 WRX STI", penalty: "+1.0s", bestLap: "54.220s" },
  { rank: 6, name: "车手06", number: "99", carModel: "马自达 MX-5", penalty: "无罚时", bestLap: "54.891s" },
  { rank: 7, name: "车手07", number: "11", carModel: "福特 福克斯 ST", penalty: "+0.5s", bestLap: "55.362s" },
  { rank: 8, name: "车手08", number: "44", carModel: "现代 i30 N", penalty: "无罚时", bestLap: "55.940s" },
];

// 赛事规则 —— 占位内容，规则文本发给我之后会替换成正式版本
export type RuleSection = {
  title: string;
  content: string;
};

export const RULES: RuleSection[] = [
  {
    title: "报名资格",
    content: "规则内容待补充，敬请期待正式发布。",
  },
  {
    title: "赛事流程",
    content: "规则内容待补充，敬请期待正式发布。",
  },
  {
    title: "计时与排名规则",
    content: "规则内容待补充，敬请期待正式发布。",
  },
  {
    title: "违规与罚时",
    content: "规则内容待补充，敬请期待正式发布。",
  },
];

export const NAV_LINKS = [
  { label: "首页", href: "#home" },
  { label: "赛事地点", href: "#venue" },
  { label: "圈速榜", href: "#leaderboard" },
  { label: "奖池", href: "#prize-pool" },
  { label: "规则", href: "#rules" },
  { label: "报名", href: "#registration" },
];
