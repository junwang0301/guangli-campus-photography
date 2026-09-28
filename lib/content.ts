import { publicPath } from "@/lib/public-path";

export type PhotoWork = {
  id: string;
  title: string;
  author: string;
  school: string;
  category: string;
  image: string;
  note: string;
};

export type CampusSpot = {
  id: string;
  name: string;
  school: string;
  time: string;
  light: string;
  tip: string;
  image: string;
};

export const works: PhotoWork[] = [
  {
    id: "campus-main",
    title: "晨光里的主教学楼",
    author: "Unsplash 精选",
    school: "校园风光",
    category: "校园风光",
    image: publicPath("/demo/campus-main.jpg"),
    note: "清晨侧光会强化砖墙纹理，也让草坪出现更自然的明暗层次。",
  },
  {
    id: "library-round",
    title: "环形书廊",
    author: "Unsplash 精选",
    school: "建筑光影",
    category: "建筑光影",
    image: publicPath("/demo/library-round.jpg"),
    note: "利用书架的弧线形成引导，让画面有重复节奏而不显得凌乱。",
  },
  {
    id: "auditorium",
    title: "开场前的礼堂",
    author: "Unsplash 精选",
    school: "校园空间",
    category: "校园空间",
    image: publicPath("/demo/auditorium.jpg"),
    note: "空场与重复座椅适合低机位拍摄，少量色温变化就能拉开层次。",
  },
  {
    id: "graduation",
    title: "把学士帽抛向天空",
    author: "Unsplash 精选",
    school: "毕业纪实",
    category: "毕业纪实",
    image: publicPath("/demo/graduation.jpg"),
    note: "毕业照要预留抛帽后的天空空间，连拍能抓住动作最舒展的一刻。",
  },
  {
    id: "study-group",
    title: "图书馆的小组讨论",
    author: "Unsplash 精选",
    school: "校园人文",
    category: "校园人文",
    image: publicPath("/demo/study-group.jpg"),
    note: "真实交流比摆拍更有感染力，快门速度保持 1/125s 以上即可。",
  },
  {
    id: "campus-friends",
    title: "草坪上的朋友",
    author: "Unsplash 精选",
    school: "青春人像",
    category: "青春人像",
    image: publicPath("/demo/campus-friends.jpg"),
    note: "让人物占据统一基线，背景留白，人物关系会自然成为视觉重点。",
  },
];

export const campusSpots: CampusSpot[] = [
  {
    id: "main-lawn",
    name: "主楼前大草坪",
    school: "校园示例",
    time: "07:00–09:00",
    light: "侧晨光",
    tip: "站在草坪边缘使用低机位，让主楼保持水平，人物安排在明暗交界处。",
    image: publicPath("/demo/campus-main.jpg"),
  },
  {
    id: "round-library",
    name: "环形图书馆书廊",
    school: "校园示例",
    time: "10:00–16:00",
    light: "室内暖光",
    tip: "沿书架弧线构图，保持 24–35mm 焦段，能让空间纵深更自然。",
    image: publicPath("/demo/library-round.jpg"),
  },
  {
    id: "auditorium",
    name: "礼堂空场",
    school: "校园示例",
    time: "课前或活动前",
    light: "柔和顶光",
    tip: "从座椅后排向前拍摄，利用对称结构，把人物放在透视线交汇处。",
    image: publicPath("/demo/auditorium.jpg"),
  },
  {
    id: "graduation-lawn",
    name: "毕业典礼草坪",
    school: "校园示例",
    time: "日落前一小时",
    light: "暖色天空",
    tip: "使用连拍并预留上方空间，抛帽动作会获得更好的动态弧线。",
    image: publicPath("/demo/graduation.jpg"),
  },
];