export const ELEMENTS = {
  pyro: {
    id: "pyro",
    name: "Pyro",
    color: "#FF5F40",
    bgTint: "rgba(255, 95, 64, 0.15)",
    icon: encodeURI("/Images/Genshin Impact/TCG/pyro-elementicon · Genshin Impact.png")
  },
  hydro: {
    id: "hydro",
    name: "Hydro",
    color: "#21C8FF",
    bgTint: "rgba(33, 200, 255, 0.15)",
    icon: encodeURI("/Images/Genshin Impact/TCG/hydro-elementicon · Genshin Impact.png")
  },
  anemo: {
    id: "anemo",
    name: "Anemo",
    color: "#33D9B2",
    bgTint: "rgba(51, 217, 178, 0.15)",
    icon: encodeURI("/Images/Genshin Impact/TCG/anemo-elementicon · Genshin Impact.png")
  },
  electro: {
    id: "electro",
    name: "Electro",
    color: "#BE7CF8",
    bgTint: "rgba(190, 124, 248, 0.15)",
    icon: encodeURI("/Images/Genshin Impact/TCG/electro-elementicon · Genshin Impact.png")
  },
  dendro: {
    id: "dendro",
    name: "Dendro",
    color: "#90E040",
    bgTint: "rgba(144, 224, 64, 0.15)",
    icon: encodeURI("/Images/Genshin Impact/TCG/dendro-elementicon · Genshin Impact.png")
  },
  cryo: {
    id: "cryo",
    name: "Cryo",
    color: "#99FFFF",
    bgTint: "rgba(153, 255, 255, 0.15)",
    icon: encodeURI("/Images/Genshin Impact/TCG/cryo-elementicon · Genshin Impact.png")
  },
  geo: {
    id: "geo",
    name: "Geo",
    color: "#E2B144",
    bgTint: "rgba(226, 177, 68, 0.15)",
    icon: encodeURI("/Images/Genshin Impact/TCG/geo-elementicon · Genshin Impact.png")
  }
};

export const CHARACTERS = [
  {
    id: "amber",
    name: "Amber",
    element: "pyro",
    role: "Sub-DPS · Exploración",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/amber-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Amber · Outfit icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Amber · Namecard · Genshin Impact.png")
  },
  {
    id: "barbara",
    name: "Barbara",
    element: "hydro",
    role: "Apoyo · Curación",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/barbara-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Barbara · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Barbara · Namecard · Genshin Impact.png")
  },
  {
    id: "beidou",
    name: "Beidou",
    element: "electro",
    role: "Sub-DPS · Contraataque",
    region: "Liyue",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/beidou-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Beidou · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Beidou · Namecard · Genshin Impact.png")
  },
  {
    id: "bennett",
    name: "Bennett",
    element: "pyro",
    role: "Apoyo · Curación",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/bennett-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Bennett · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Bennett · Namecard · Genshin Impact.png")
  },
  {
    id: "chongyun",
    name: "Chongyun",
    element: "cryo",
    role: "Sub-DPS · Apoyo Cryo",
    region: "Liyue",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/chongyun-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Chongyun · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Chongyun · Namecard · Genshin Impact.png")
  },
  {
    id: "diluc",
    name: "Diluc",
    element: "pyro",
    role: "Daño Principal (DPS)",
    region: "Mondstadt",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/diluc-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Diluc · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Diluc · Namecard · Genshin Impact.png")
  },
  {
    id: "diona",
    name: "Diona",
    element: "cryo",
    role: "Escudo · Curación",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/diona-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Diona · Icon · Genshin Impact.png"),
    namecard: null
  },
  {
    id: "fischl",
    name: "Fischl",
    element: "electro",
    role: "Sub-DPS · Batería",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/fischl-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Fischl · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Fischl · Namecard · Genshin Impact.png")
  },
  {
    id: "jean",
    name: "Jean",
    element: "anemo",
    role: "Apoyo · Curación",
    region: "Mondstadt",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/jean-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Jean · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Jean · Namecard · Genshin Impact.png")
  },
  {
    id: "kaeya",
    name: "Kaeya",
    element: "cryo",
    role: "Sub-DPS · Aplicador Cryo",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/kaeya-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Kaeya · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Kaeya · Namecard · Genshin Impact.png")
  },
  {
    id: "keqing",
    name: "Keqing",
    element: "electro",
    role: "Daño Principal (DPS)",
    region: "Liyue",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/keqing-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Keqing · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Keqing · Namecard · Genshin Impact.png")
  },
  {
    id: "lisa",
    name: "Lisa",
    element: "electro",
    role: "Sub-DPS · Reducción DEF",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/lisa-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Lisa · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Lisa · Namecard · Genshin Impact.png")
  },
  {
    id: "mona",
    name: "Mona",
    element: "hydro",
    role: "Apoyo · Amplificación Daño",
    region: "Mondstadt",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/mona-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Mona · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Mona · Namecard · Genshin Impact.png")
  },
  {
    id: "ningguang",
    name: "Ningguang",
    element: "geo",
    role: "Daño Principal (DPS)",
    region: "Liyue",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/ningguang-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Ningguang · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Ningguang · Namecard · Genshin Impact.png")
  },
  {
    id: "noelle",
    name: "Noelle",
    element: "geo",
    role: "Escudo · Curación",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/noelle-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Noelle · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Noelle · Namecard · Genshin Impact.png")
  },
  {
    id: "qiqi",
    name: "Qiqi",
    element: "cryo",
    role: "Curación Continua",
    region: "Liyue",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/qiqi-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Qiqi · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Qiqi · Namecard · Genshin Impact.png")
  },
  {
    id: "razor",
    name: "Razor",
    element: "electro",
    role: "Daño Físico Principal",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/razor-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Razor · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Razor · Namecard · Genshin Impact.png")
  },
  {
    id: "sucrose",
    name: "Sacarosa",
    element: "anemo",
    role: "Apoyo · Maestría Elemental",
    region: "Mondstadt",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/sucrose-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Sucrose · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Sucrose · Namecard · Genshin Impact.png")
  },
  {
    id: "venti",
    name: "Venti",
    element: "anemo",
    role: "Control de Masas · Batería",
    region: "Mondstadt",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/venti-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Venti · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Venti · Namecard · Genshin Impact.png")
  },
  {
    id: "xiangling",
    name: "Xiangling",
    element: "pyro",
    role: "Sub-DPS · Aplicador Pyro",
    region: "Liyue",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/xiangling-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Xiangling · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Xiangling · Namecard · Genshin Impact.png")
  },
  {
    id: "xingqiu",
    name: "Xingqiu",
    element: "hydro",
    role: "Sub-DPS · Aplicador Hydro",
    region: "Liyue",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/xingqiu-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Xingqiu · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Xingqiu · Namecard · Genshin Impact.png")
  },
  {
    id: "xinyan",
    name: "Xinyan",
    element: "pyro",
    role: "Escudo · Daño Físico",
    region: "Liyue",
    stars: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/xinyan-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Xinyan · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Xinyan · Namecard · Genshin Impact.png")
  },
  {
    id: "tartaglia",
    name: "Tartaglia",
    element: "hydro",
    role: "Main-DPS · Aplicador Hydro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/tartaglia-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Tartaglia · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Tartaglia · Namecard · Genshin Impact.png")
  },
  {
    id: "zhongli",
    name: "Zhongli",
    element: "geo",
    role: "Main-DPS · Aplicador Geo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/zhongli-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Zhongli · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Zhongli · Namecard · Genshin Impact.png")
  },
  {
    id: "albedo",
    name: "Albedo",
    element: "geo",
    role: "Main-DPS · Aplicador Geo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/albedo-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Albedo · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Albedo · Namecard · Genshin Impact.png")
  },
  {
    id: "ganyu",
    name: "Ganyu",
    element: "cryo",
    role: "Main-DPS · Aplicador Cryo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/ganyu-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Ganyu · Outfit icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Ganyu · Namecard · Genshin Impact.png")
  },
  {
    id: "xiao",
    name: "Xiao",
    element: "anemo",
    role: "Main-DPS · Aplicador Anemo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/xiao-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Xiao · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Xiao · Namecard · Genshin Impact.png")
  },
  {
    id: "hu tao",
    name: "Hu Tao",
    element: "pyro",
    role: "Main-DPS · Aplicador Pyro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/hu-tao-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Hu Tao · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Hu Tao · Namecard · Genshin Impact.png")
  },
  {
    id: "rosaria",
    name: "Rosaria",
    element: "cryo",
    role: "Main-DPS · Aplicador Cryo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/rosaria-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Rosaria · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Rosaria · Namecard · Genshin Impact.png")
  },
  {
    id: "yanfei",
    name: "Yanfei",
    element: "pyro",
    role: "Main-DPS · Aplicador Pyro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/yanfei-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Yanfei · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Yanfei · Namecard · Genshin Impact.png")
  },
  {
    id: "eula",
    name: "Eula",
    element: "cryo",
    role: "Main-DPS · Aplicador Cryo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/eula-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Eula · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Eula · Namecard · Genshin Impact.png")
  },
  {
    id: "kaedehara kazuha",
    name: "Kaedehara Kazuha",
    element: "anemo",
    role: "Main-DPS · Aplicador Anemo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/kazuha_genshin_impact_full_body_render_by_deg5270_den41ud-fullview.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Kaedehara Kazuha · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Kaedehara Kazuha · Namecard · Genshin Impact.png")
  },
  {
    id: "kamisato ayaka",
    name: "Kamisato Ayaka",
    element: "cryo",
    role: "Main-DPS · Aplicador Cryo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/ayaka-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Kamisato Ayaka · Outfit icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Kamisato Ayaka · Namecard · Genshin Impact.png")
  },
  {
    id: "sayu",
    name: "Sayu",
    element: "anemo",
    role: "Main-DPS · Aplicador Anemo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/sayu-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Sayu · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Sayu · Namecard · Genshin Impact.png")
  },
  {
    id: "yoimiya",
    name: "Yoimiya",
    element: "pyro",
    role: "Main-DPS · Aplicador Pyro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/yoimiya-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Yoimiya · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Yoimiya · Namecard · Genshin Impact.png")
  },
  {
    id: "aloy",
    name: "Aloy",
    element: "cryo",
    role: "Main-DPS · Aplicador Cryo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/aloy-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Aloy · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Aloy · Namecard · Genshin Impact.png")
  },
  {
    id: "kujou sara",
    name: "Kujou Sara",
    element: "electro",
    role: "Main-DPS · Aplicador Electro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/kujou-sara-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Kujou Sara · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Kujou Sara · Namecard · Genshin Impact.png")
  },
  {
    id: "shogun raiden",
    name: "Shogun Raiden",
    element: "electro",
    role: "Main-DPS · Aplicador Electro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/shogun_raiden_genshin_impact_full_body_render_by_deg5270_deqwe2o-pre.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Raiden Shogun · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Raiden Shogun · Namecard · Genshin Impact.png")
  },
  {
    id: "sangonomiya kokomi",
    name: "Sangonomiya Kokomi",
    element: "hydro",
    role: "Main-DPS · Aplicador Hydro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/kokomi_genshin_impact_full_body_render_by_deg5270_derxa2v-pre.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Sangonomiya Kokomi · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Sangonomiya Kokomi · Namecard · Genshin Impact.png")
  },
  {
    id: "thoma",
    name: "Thoma",
    element: "pyro",
    role: "Main-DPS · Aplicador Pyro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/thoma-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Thoma · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Thoma · Namecard · Genshin Impact.png")
  },
  {
    id: "gorou",
    name: "Gorou",
    element: "geo",
    role: "Main-DPS · Aplicador Geo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/gorou-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Gorou · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Gorou · Namecard · Genshin Impact.png")
  },
  {
    id: "arataki itto",
    name: "Arataki Itto",
    element: "geo",
    role: "Main-DPS · Aplicador Geo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/arataki-itto-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Arataki Itto · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Arataki Itto · Namecard · Genshin Impact.png")
  },
  {
    id: "yun-jin",
    name: "Yun Jin",
    element: "geo",
    role: "Main-DPS · Aplicador Geo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/yun-jin-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Yun Jin · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Yun Jin · Namecard · Genshin Impact.png")
  },
  {
    id: "shenhe",
    name: "Shenhe",
    element: "geo",
    role: "Main-DPS · Aplicador Geo",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/shenhe-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Shenhe · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Shenhe · Namecard · Genshin Impact.png")
  },
  {
    id: "yae miko",
    name: "Yae Miko",
    element: "electro",
    role: "Main-DPS · Aplicador Electro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/yae_miko_genshin_impact_full_body_render_by_deg5270_df0i8p6-fullview.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Yae Miko · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Yae Miko · Namecard · Genshin Impact.png")
  },
  {
    id: "kamisato ayato",
    name: "Kamisato Ayato",
    element: "hydro",
    role: "Main-DPS · Aplicador Hydro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/ayato_genshin_impact_full_body_render_by_deg5270_df2sckt-pre.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Kamisato Ayato · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Kamisato Ayato · Namecard · Genshin Impact.png")
  },
  {
    id: "yelan",
    name: "Yelan",
    element: "hydro",
    role: "Main-DPS · Aplicador Hydro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/yelan_genshin_impact_full_body_render_by_deg5270_df6iqj2-414w-2x.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Yelan · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Yelan · Namecard · Genshin Impact.png")
  },
  {
    id: "kuki shinobu",
    name: "Kuki Shinobu",
    element: "electro",
    role: "Main-DPS · Aplicador Electro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/kuki_shinobu_genshin_impact_full_body_render_by_deg5270_df86ze4-fullview.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Kuki Shinobu · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Kuki Shinobu · Namecard · Genshin Impact.png")
  },
  {
    id: "shikanoin heizou",
    name: "Shikanoin Heizou",
    element: "Anemo",
    role: "Main-DPS · ",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/heizou_genshin_impact_full_body_render_by_deg5270_dfbjq9z-fullview.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Shikanoin Heizou · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Shikanoin Heizou · Namecard · Genshin Impact.png")
  },
  {
    id: "tighnari",
    name: "Tighnari",
    element: "dendro",
    role: "Main-DPS · Aplicador Dendro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/tighnari-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Tighnari · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Tighnari · Namecard · Genshin Impact.png")
  },
  {
    id: "collei",
    name: "Collei",
    element: "dendro",
    role: "Main-DPS · Aplicador Dendro",
    region: "Snezhnaya",
    stars: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/collei-nobg · Genshin Impact.png"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Collei · Icon · Genshin Impact.png"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Collei · Namecard · Genshin Impact.png")
  }
];
