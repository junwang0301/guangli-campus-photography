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
    id: "dawn",
    title: "晨光落在教学楼上",
    author: "林屿",
    school: "南京大学",
    category: "校园风光",
    image: publicPath("/demo/campus-dawn.svg"),
    note: "早课前十分钟，东侧连廊会出现最柔和的侧逆光。",
  },
  {
    id: "library",
    title: "图书馆的下午四点",
    author: "周野",
    school: "武汉大学",
    category: "建筑光影",
    image: publicPath("/demo/library-light.svg"),
    note: "让窗格形成引导线，人物只需安静地经过。",
  },
  {
    id: "court",
    title: "夜场未完",
    author: "阿远",
    school: "四川大学",
    category: "校园纪实",
    image: publicPath("/demo/night-court.svg"),
    note: "高感光度下保留一点颗粒，比完全抹平更有现场感。",
  },
  {
    id: "rain",
    title: "雨停之前",
    author: "陈昼",
    school: "厦门大学",
    category: "情绪人像",
    image: publicPath("/demo/rain-window.svg"),
    note: "阴天不是坏天气，蓝灰环境最适合克制的情绪表达。",
  },
  {
    id: "silence",
    title: "排练厅的静默",
    author: "苏禾",
    school: "中央美术学院",
    category: "室内人像",
    image: publicPath("/demo/studio-silence.svg"),
    note: "一盏侧灯就足够，暗部留一点细节会更有呼吸感。",
  },
  {
    id: "rooftop",
    title: "天台最后一束光",
    author: "小满",
    school: "浙江大学",
    category: "城市剪影",
    image: publicPath("/demo/rooftop-sunset.svg"),
    note: "日落前后二十分钟，天空和建筑会一起进入最稳定的色温。",
  },
];

export const campusSpots: CampusSpot[] = [
  {
    id: "corridor",
    name: "教学楼东侧连廊",
    school: "南京大学",
    time: "06:40–07:30",
    light: "侧逆光",
    tip: "从低机位拍摄，让栏杆构成前景，人物站在光斑边缘。",
    image: publicPath("/demo/campus-dawn.svg"),
  },
  {
    id: "stairs",
    name: "老图书馆旋转楼梯",
    school: "武汉大学",
    time: "15:30–16:40",
    light: "窗格光",
    tip: "使用 35mm 焦段，等待有人经过楼梯转角再按下快门。",
    image: publicPath("/demo/library-light.svg"),
  },
  {
    id: "court",
    name: "东区篮球场",
    school: "四川大学",
    time: "20:00–21:30",
    light: "混合光源",
    tip: "保留场地灯光，白平衡略偏暖，快门速度不要低于 1/250s。",
    image: publicPath("/demo/night-court.svg"),
  },
  {
    id: "lake",
    name: "湖畔石阶",
    school: "厦门大学",
    time: "雨后全天",
    light: "漫反射",
    tip: "利用潮湿地面的倒影，降低饱和后保留天空的冷色层次。",
    image: publicPath("/demo/rain-window.svg"),
  },
];