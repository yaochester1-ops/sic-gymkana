// ============================================================================
// 站点内容配置 —— 后续更新赛事信息，只需要改这一个文件即可
// ============================================================================

export const EVENT = {
  name: "全民赛车大奖赛",
  shortName: "全民赛车大奖赛",
  tagline: "精准操控 · 极限圈速",
  season: "2026 赛季",
  description:
    "全年 12 站，每 30 天更换赛道布局与榜单。188 元挑战 4 圈，取最好成绩上榜；每人次为月奖池注入 35 元、年奖池注入 15 元。两轮或四轮，让每一份热爱都能参与全民赛车。",
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

// 报名通道：目前是纯前端演示表单，提交后仅在浏览器本地生成车手证，不会保存或上传数据
export const REGISTRATION = {
  deadlineNote: "报名截止时间待公布",
};

// 滚动奖池金额（人民币元）—— 从 0 起步，随报名人数增加自动增长，报名数据接入后替换即可
export const PRIZE_POOL = {
  amountCNY: 0,
  updatedNote: "奖池金额将随报名人数增加持续增长",
};

// 参赛车手资料 —— 当前暂无报名车手，确认真实报名后更新
export type DriverEntry = {
  rank: number;
  name: string;
  number: string; // 车号
  nationality: string; // 国籍（旗帜 emoji + 名称）
  carModel: string;
  penalty: string; // 罚时/罚点
  bestLap: string; // 最佳圈速（秒）
  team: string; // 车队
  horsepower: string; // 马力
  tires: string; // 轮胎
};

export const DRIVERS: DriverEntry[] = [];

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
  { label: "首页", href: "/" },
  { label: "赛事介绍", href: "/#introduction" },
  { label: "赛事地点", href: "/#venue" },
  { label: "奖池", href: "/#prize-pool" },
  { label: "报名", href: "/registration" },
];
