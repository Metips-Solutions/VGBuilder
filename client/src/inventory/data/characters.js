export const ELEMENTS = {
  pyro: {
    id: "pyro",
    name: "Pyro",
    color: "#FF5F40",
    colorLight: "#C2410C",
    bgTint: "rgba(255, 95, 64, 0.15)",
    bgTintLight: "rgba(194, 65, 12, 0.10)",
    icon: encodeURI("/Images/Genshin Impact/TCG/pyro-elementicon · Genshin Impact.webp")
  },
  hydro: {
    id: "hydro",
    name: "Hydro",
    color: "#21C8FF",
    colorLight: "#0284C7",
    bgTint: "rgba(33, 200, 255, 0.15)",
    bgTintLight: "rgba(2, 132, 199, 0.10)",
    icon: encodeURI("/Images/Genshin Impact/TCG/hydro-elementicon · Genshin Impact.webp")
  },
  anemo: {
    id: "anemo",
    name: "Anemo",
    color: "#33D9B2",
    colorLight: "#0D9488",
    bgTint: "rgba(51, 217, 178, 0.15)",
    bgTintLight: "rgba(13, 148, 136, 0.10)",
    icon: encodeURI("/Images/Genshin Impact/TCG/anemo-elementicon · Genshin Impact.webp")
  },
  electro: {
    id: "electro",
    name: "Electro",
    color: "#BE7CF8",
    colorLight: "#7E22CE",
    bgTint: "rgba(190, 124, 248, 0.15)",
    bgTintLight: "rgba(126, 34, 206, 0.10)",
    icon: encodeURI("/Images/Genshin Impact/TCG/electro-elementicon · Genshin Impact.webp")
  },
  dendro: {
    id: "dendro",
    name: "Dendro",
    color: "#90E040",
    colorLight: "#15803D",
    bgTint: "rgba(144, 224, 64, 0.15)",
    bgTintLight: "rgba(21, 128, 61, 0.10)",
    icon: encodeURI("/Images/Genshin Impact/TCG/dendro-elementicon · Genshin Impact.webp")
  },
  cryo: {
    id: "cryo",
    name: "Cryo",
    color: "#70E0E0",
    colorLight: "#0891B2",
    bgTint: "rgba(112, 224, 224, 0.15)",
    bgTintLight: "rgba(8, 145, 178, 0.10)",
    icon: encodeURI("/Images/Genshin Impact/TCG/cryo-elementicon · Genshin Impact.webp")
  },
  geo: {
    id: "geo",
    name: "Geo",
    color: "#E2B144",
    colorLight: "#B45309",
    bgTint: "rgba(226, 177, 68, 0.15)",
    bgTintLight: "rgba(180, 83, 9, 0.10)",
    icon: encodeURI("/Images/Genshin Impact/TCG/geo-elementicon · Genshin Impact.webp")
  }
};

export const RARITY_COLORS = {
  5: {
    id: 5,
    name: "5 Estrellas",
    color: "#E6AC38",
    colorLight: "#CCA148"
  },
  4: {
    id: 4,
    name: "4 Estrellas",
    color: "#A156DF",
    colorLight: "#9453C9"
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
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/amber-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Amber · Outfit icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Amber · Namecard · Genshin Impact.webp")
  },
  {
    id: "barbara",
    name: "Barbara",
    element: "hydro",
    role: "Apoyo · Curación",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
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
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/beidou-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Beidou · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Beidou · Namecard · Genshin Impact.webp")
  },
  {
    id: "bennett",
    name: "Bennett",
    element: "pyro",
    role: "Apoyo · Curación",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/bennett-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Bennett · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Bennett · Namecard · Genshin Impact.webp")
  },
  {
    id: "chongyun",
    name: "Chongyun",
    element: "cryo",
    role: "Sub-DPS · Apoyo Cryo",
    region: "Liyue",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/chongyun-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Chongyun · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Chongyun · Namecard · Genshin Impact.webp")
  },
  {
    id: "diluc",
    name: "Diluc",
    element: "pyro",
    role: "Daño Principal (DPS)",
    region: "Mondstadt",
    stars: 5,
    rarity: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/diluc-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Diluc · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Diluc · Namecard · Genshin Impact.webp")
  },
  {
    id: "diona",
    name: "Diona",
    element: "cryo",
    role: "Escudo · Curación",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/diona-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Diona · Icon · Genshin Impact.webp"),
    namecard: null
  },
  {
    id: "fischl",
    name: "Fischl",
    element: "electro",
    role: "Sub-DPS · Batería",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/fischl-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Fischl · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Fischl · Namecard · Genshin Impact.webp")
  },
  {
    id: "jean",
    name: "Jean",
    element: "anemo",
    role: "Apoyo · Curación",
    region: "Mondstadt",
    stars: 5,
    rarity: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/jean-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Jean · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Jean · Namecard · Genshin Impact.webp")
  },
  {
    id: "kaeya",
    name: "Kaeya",
    element: "cryo",
    role: "Sub-DPS · Aplicador Cryo",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/kaeya-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Kaeya · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Kaeya · Namecard · Genshin Impact.webp")
  },
  {
    id: "keqing",
    name: "Keqing",
    element: "electro",
    role: "Daño Principal (DPS)",
    region: "Liyue",
    stars: 5,
    rarity: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/keqing-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Keqing · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Keqing · Namecard · Genshin Impact.webp")
  },
  {
    id: "lisa",
    name: "Lisa",
    element: "electro",
    role: "Sub-DPS · Reducción DEF",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/lisa-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Lisa · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Lisa · Namecard · Genshin Impact.webp")
  },
  {
    id: "mona",
    name: "Mona",
    element: "hydro",
    role: "Apoyo · Amplificación Daño",
    region: "Mondstadt",
    stars: 5,
    rarity: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/mona-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Mona · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Mona · Namecard · Genshin Impact.webp")
  },
  {
    id: "ningguang",
    name: "Ningguang",
    element: "geo",
    role: "Daño Principal (DPS)",
    region: "Liyue",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/ningguang-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Ningguang · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Ningguang · Namecard · Genshin Impact.webp")
  },
  {
    id: "noelle",
    name: "Noelle",
    element: "geo",
    role: "Escudo · Curación",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/noelle-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Noelle · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Noelle · Namecard · Genshin Impact.webp")
  },
  {
    id: "qiqi",
    name: "Qiqi",
    element: "cryo",
    role: "Curación Continua",
    region: "Liyue",
    stars: 5,
    rarity: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/qiqi-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Qiqi · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Qiqi · Namecard · Genshin Impact.webp")
  },
  {
    id: "razor",
    name: "Razor",
    element: "electro",
    role: "Daño Físico Principal",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/razor-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Razor · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Razor · Namecard · Genshin Impact.webp")
  },
  {
    id: "sucrose",
    name: "Sacarosa",
    element: "anemo",
    role: "Apoyo · Maestría Elemental",
    region: "Mondstadt",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/sucrose-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Sucrose · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Sucrose · Namecard · Genshin Impact.webp")
  },
  {
    id: "venti",
    name: "Venti",
    element: "anemo",
    role: "Control de Masas · Batería",
    region: "Mondstadt",
    stars: 5,
    rarity: 5,
    image: encodeURI("/Images/Genshin Impact/Splash Art/venti-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Venti · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Venti · Namecard · Genshin Impact.webp")
  },
  {
    id: "xiangling",
    name: "Xiangling",
    element: "pyro",
    role: "Sub-DPS · Aplicador Pyro",
    region: "Liyue",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/xiangling-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Xiangling · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Xiangling · Namecard · Genshin Impact.webp")
  },
  {
    id: "xingqiu",
    name: "Xingqiu",
    element: "hydro",
    role: "Sub-DPS · Aplicador Hydro",
    region: "Liyue",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/xingqiu-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Xingqiu · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Xingqiu · Namecard · Genshin Impact.webp")
  },
  {
    id: "xinyan",
    name: "Xinyan",
    element: "pyro",
    role: "Escudo · Daño Físico",
    region: "Liyue",
    stars: 4,
    rarity: 4,
    image: encodeURI("/Images/Genshin Impact/Splash Art/xinyan-nobg · Genshin Impact.webp"),
    icon: encodeURI("/Images/Genshin Impact/Character Icons/Xinyan · Icon · Genshin Impact.webp"),
    namecard: encodeURI("/Images/Genshin Impact/Namecards/Xinyan · Namecard · Genshin Impact.webp")
  }
];
