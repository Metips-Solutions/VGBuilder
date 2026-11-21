var DEFAULT_CHARACTERS = [
  {
    id: 1,
    name: "Amber",
    element: "Pyro",
    weaponType: "Bow",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Sub-DPS"],
    mechanics: [
      { category: "mecanica", value: "taunt" },
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "off_field_pyro_dmg" },
      { category: "mecanica", value: "buff_movement_speed", minConstellation: 6 },
      { category: "mecanica", value: "buff_attack", minConstellation: 6 }
    ]
  },
  {
    id: 2,
    name: "Barbara",
    element: "Hydro",
    weaponType: "Catalyst",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Healer", "Support"],
    mechanics: [
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "buff_hydro_dmg", minConstellation: 2 },
      { category: "mecanica", value: "revive", minConstellation: 6 }
    ]
  },
  {
    id: 3,
    name: "Beidou",
    element: "Electro",
    weaponType: "Claymore",
    rarity: 4,
    region: "Liyue",
    roles: ["Sub-DPS"],
    mechanics: [
      { category: "mecanica", value: "off_field_electro_dmg" },
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "coordinated_attacks" },
      { category: "mecanica", value: "damage_reduction" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "shield", minConstellation: 1 },
      { category: "mecanica", value: "parry" },
      { category: "mecanica", value: "debuff_electro_res", minConstellation: 6 }
    ]
  },
  {
    id: 4,
    name: "Bennett",
    element: "Pyro",
    weaponType: "Sword",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Support", "Healer"],
    mechanics: [
      { category: "mecanica", value: "buff_attack" },
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "pyro_infusion", minConstellation: 6 }
    ]
  },
  {
    id: 5,
    name: "Chongyun",
    element: "Cryo",
    weaponType: "Claymore",
    rarity: 4,
    region: "Liyue",
    roles: ["Sub-DPS", "Support"],
    mechanics: [
      { category: "mecanica", value: "cryo_infusion" },
      { category: "mecanica", value: "buff_attack_speed" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "debuff_cryo_res" },
      { category: "mecanica", value: "cooldown_reduction", minConstellation: 2 }
    ]
  },
  {
    id: 6,
    name: "Diluc",
    element: "Pyro",
    weaponType: "Claymore",
    rarity: 5,
    region: "Mondstadt",
    damageProfile: "Pyro Melee",
    roles: ["Main DPS"],
    mechanics: [
      { category: "mecanica", value: "pyro_infusion" },
      { category: "mecanica", value: "pyro_application" }
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_attack_buff", priority: 8 },
      { value: "need_interruption_resistance", priority: 7 }
    ]
  },
  {
    id: 7,
    name: "Fischl",
    element: "Electro",
    weaponType: "Bow",
    rarity: 4,
    region: "Mondstadt",
    alignmentClass: "Hexerei",
    roles: ["Sub-DPS"],
    mechanics: [
      { category: "mecanica", value: "off_field_electro_dmg" },
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "snapshot" },
      { category: "mecanica", value: "coordinated_attacks", minConstellation: 6 }
    ]
  },
  {
    id: 8,
    name: "Jean",
    element: "Anemo",
    weaponType: "Sword",
    rarity: 5,
    region: "Mondstadt",
    roles: ["Support", "Healer"],
    mechanics: [
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "sunfire" },
      { category: "mecanica", value: "buff_attack_speed", minConstellation: 2 },
      { category: "mecanica", value: "debuff_anemo_res", minConstellation: 4 }
    ]
  },
  {
    id: 9,
    name: "Kaeya",
    element: "Cryo",
    weaponType: "Sword",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Sub-DPS", "Support"],
    mechanics: [
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "off_field_cryo_dmg" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "shield", minConstellation: 4 }
    ]
  },
  {
    id: 10,
    name: "Keqing",
    element: "Electro",
    weaponType: "Sword",
    rarity: 5,
    region: "Liyue",
    damageProfile: "Electro Fast",
    roles: ["Main DPS"],
    mechanics: [
      { category: "mecanica", value: "electro_application" }
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_interruption_resistance", priority: 7 }
    ],
    antiTags: [
      { value: "cryo_infusion", reason: "Sobrescribe la infusión Electro nativa" },
      { value: "pyro_infusion", reason: "Sobrescribe la infusión Electro nativa" }
    ]
  },
  {
    id: 11,
    name: "Klee",
    element: "Pyro",
    weaponType: "Catalyst",
    rarity: 5,
    region: "Mondstadt",
    alignmentClass: "Hexerei",
    damageProfile: "Pyro Melee",
    roles: ["Main DPS"],
    mechanics: [
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "debuff_defense", minConstellation: 2 }
    ],
    needs: [
      { value: "need_shield", priority: 10 },
      { value: "need_reaction_enabler", priority: 9 },
      { value: "need_crowd_control", priority: 8 }
    ]
  },
  {
    id: 12,
    name: "Lisa",
    element: "Electro",
    weaponType: "Catalyst",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Sub-DPS", "Support"],
    mechanics: [
      { category: "mecanica", value: "off_field_electro_dmg" },
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "debuff_defense" },
      { category: "mecanica", value: "catalyst_buffer" }
    ]
  },
  {
    id: 13,
    name: "Mona",
    element: "Hydro",
    weaponType: "Catalyst",
    rarity: 5,
    region: "Mondstadt",
    alignmentClass: "Hexerei",
    roles: ["Support", "Sub-DPS"],
    mechanics: [
      { category: "mecanica", value: "buff_all_dmg" },
      { category: "mecanica", value: "off_field_hydro_dmg" },
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "taunt" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "buff_vaporize_dmg", minConstellation: 1 },
      { category: "mecanica", value: "buff_electrocharged_dmg", minConstellation: 1 },
      { category: "mecanica", value: "buff_hydro_swirl_dmg", minConstellation: 1 },
      { category: "mecanica", value: "extend_frozen_duration", minConstellation: 1 },
      { category: "mecanica", value: "hexerei_vaporize_bonus", minAlignmentCount: 2 }
    ]
  },
  {
    id: 14,
    name: "Ningguang",
    element: "Geo",
    weaponType: "Catalyst",
    rarity: 4,
    region: "Liyue",
    damageProfile: "Geo Ranged",
    roles: ["Main DPS", "Sub-DPS"],
    mechanics: [
      { category: "mecanica", value: "buff_geo_dmg" },
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "battery", minConstellation: 2 }
    ],
    needs: [
      { value: "need_geo_partner", priority: 10 },
      { value: "need_shield", priority: 9 },
      { value: "need_attack_buff", priority: 8 },
      { value: "need_offfield_dps", priority: 7 }
    ]
  },
  {
    id: 15,
    name: "Noelle",
    element: "Geo",
    weaponType: "Claymore",
    rarity: 4,
    region: "Mondstadt",
    damageProfile: "Geo Tank",
    roles: ["Main DPS", "Support", "Healer"],
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "geo_infusion_absolute" }
    ],
    needs: [
      { value: "need_geo_partner", priority: 10 },
      { value: "need_battery_geo", priority: 10 },
      { value: "need_offfield_dps", priority: 8 }
    ]
  },
  {
    id: 16,
    name: "Qiqi",
    element: "Cryo",
    weaponType: "Sword",
    rarity: 5,
    region: "Liyue",
    alignmentClass: "Witch",
    roles: ["Healer", "Support"],
    mechanics: [
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "revive", minConstellation: 6 },
      { category: "mecanica", value: "buff_superconduct_dmg", minAlignmentCount: 2 }
    ]
  },
  {
    id: 17,
    name: "Razor",
    element: "Electro",
    weaponType: "Claymore",
    rarity: 4,
    region: "Mondstadt",
    damageProfile: "Physical Melee",
    roles: ["Main DPS"],
    mechanics: [
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "debuff_defense", minConstellation: 4 }
    ],
    needs: [
      { value: "need_physical_shred", priority: 10 },
      { value: "need_interruption_resistance", priority: 8 },
      { value: "need_attack_buff", priority: 7 },
      { value: "need_sustain", priority: 9 }
    ],
    antiTags: [
      { value: "cryo_infusion", reason: "Sobrescribe y destruye el daño físico" },
      { value: "pyro_infusion", reason: "Sobrescribe y destruye el daño físico" }
    ]
  },
  {
    id: 18,
    name: "Sucrose",
    element: "Anemo",
    weaponType: "Catalyst",
    rarity: 4,
    region: "Mondstadt",
    alignmentClass: "Hexerei",
    roles: ["Support"],
    mechanics: [
      { category: "mecanica", value: "buff_elemental_mastery" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "anemo_application" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "buff_elemental_dmg", minConstellation: 6 },
      { category: "mecanica", value: "buff_all_dmg", minAlignmentCount: 2 },
      { category: "mecanica", value: "buff_hexerei_dmg", minAlignmentCount: 2 }
    ]
  },
  {
    id: 19,
    name: "Venti",
    element: "Anemo",
    weaponType: "Bow",
    rarity: 5,
    region: "Mondstadt",
    alignmentClass: "Hexerei",
    roles: ["Support"],
    mechanics: [
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "anemo_application" },
      { category: "mecanica", value: "off_field_anemo_dmg" },
      { category: "mecanica", value: "debuff_anemo_res", minConstellation: 2 },
      { category: "mecanica", value: "debuff_elemental_res", minConstellation: 6 }
    ]
  },
  {
    id: 20,
    name: "Xiangling",
    element: "Pyro",
    weaponType: "Polearm",
    rarity: 4,
    region: "Liyue",
    roles: ["Sub-DPS"],
    mechanics: [
      { category: "mecanica", value: "off_field_pyro_dmg" },
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "snapshot" },
      { category: "mecanica", value: "buff_attack" },
      { category: "mecanica", value: "debuff_pyro_res", minConstellation: 1 },
      { category: "mecanica", value: "buff_pyro_dmg", minConstellation: 6 }
    ]
  },
  {
    id: 21,
    name: "Xingqiu",
    element: "Hydro",
    weaponType: "Sword",
    rarity: 4,
    region: "Liyue",
    roles: ["Sub-DPS", "Support"],
    mechanics: [
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "off_field_hydro_dmg" },
      { category: "mecanica", value: "damage_reduction" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "coordinated_attacks" },
      { category: "mecanica", value: "debuff_hydro_res", minConstellation: 2 }
    ]
  },
  {
    id: 22,
    name: "Diona",
    element: "Cryo",
    weaponType: "Bow",
    rarity: 4,
    region: "Mondstadt",
    alignmentClass: "Witch",
    roles: ["Support", "Healer"],
    damageProfile: "Cryo Utility",
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "buff_movement_speed" },
      { category: "mecanica", value: "debuff_attack" },
      { category: "mecanica", value: "buff_shield_strength", minConstellation: 2 },
      { category: "mecanica", value: "buff_elemental_mastery", minConstellation: 6 },
      { category: "mecanica", value: "buff_superconduct_dmg", minAlignmentCount: 2 },
      { category: "mecanica", value: "buff_swirl_dmg", minAlignmentCount: 2 }
    ]
  },
  {
    id: 23,
    name: "Tartaglia",
    element: "Hydro",
    weaponType: "Bow",
    rarity: 5,
    region: "Snezhnaya",
    roles: ["Main DPS"],
    damageProfile: "Hydro Fast Melee",
    mechanics: [
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "buff_normal_attack_level" },
      { category: "mecanica", value: "interruption_power" },
      { category: "mecanica", value: "coordinated_attacks", minConstellation: 4 }
    ],
    needs: [
      { value: "need_offfield_pyro_dmg", priority: 10 },
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_attack_buff", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_interruption_resistance", priority: 7 }
    ]
  },
  {
    id: 24,
    name: "Xinyan",
    element: "Pyro",
    weaponType: "Claymore",
    rarity: 4,
    region: "Liyue",
    roles: ["Support", "Sub-DPS", "Main DPS"],
    damageProfile: "Physical Melee",
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "buff_physical_dmg" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "debuff_physical_res", minConstellation: 4 }
    ],
    needs: [
      { value: "need_physical_shred", priority: 10 },
      { value: "need_attack_buff", priority: 8 },
      { value: "need_interruption_resistance", priority: 7 }
    ],
    antiTags: [
      { value: "cryo_infusion", reason: "Sobrescribe y destruye el daño físico" },
      { value: "pyro_infusion", reason: "Sobrescribe y destruye el daño físico" }
    ]
  },
  {
    id: 25,
    name: "Zhongli",
    element: "Geo",
    weaponType: "Polearm",
    rarity: 5,
    region: "Liyue",
    roles: ["Support"],
    damageProfile: "Geo Tank",
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "need_resistance_shred" },
      { category: "mecanica", value: "debuff_all_res" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "geo_construct" },
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "healer", minConstellation: 6 }
    ]
  },
  {
    id: 26,
    name: "Albedo",
    element: "Geo",
    weaponType: "Sword",
    rarity: 5,
    region: "Mondstadt",
    alignmentClass: "Hexerei",
    roles: ["Sub-DPS", "Support"],
    damageProfile: "Geo Off-Field AoE",
    mechanics: [
      { category: "mecanica", value: "off_field_geo_dmg" },
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "geo_construct" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "buff_elemental_mastery" },
      { category: "mecanica", value: "buff_plunge_dmg", minConstellation: 4 },
      { category: "mecanica", value: "buff_all_dmg", minConstellation: 6 },
      { category: "mecanica", value: "buff_all_dmg", minAlignmentCount: 2 }
    ]
  },
  {
    id: 27,
    name: "Ganyu",
    element: "Cryo",
    weaponType: "Bow",
    rarity: 5,
    region: "Liyue",
    roles: ["Main DPS", "Sub-DPS", "Support"],
    damageProfile: "Cryo Charged Shot",
    mechanics: [
      { category: "mecanica", value: "off_field_cryo_dmg" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "buff_cryo_dmg" },
      { category: "mecanica", value: "taunt" },
      { category: "mecanica", value: "debuff_cryo_res", minConstellation: 1 }
    ],
    needs: [
      { value: "need_shield", priority: 10 },
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_attack_buff", priority: 8 },
      { value: "need_crowd_control", priority: 8 }
    ]
  },
  {
    id: 28,
    name: "Xiao",
    element: "Anemo",
    weaponType: "Polearm",
    rarity: 5,
    region: "Liyue",
    roles: ["Main DPS"],
    damageProfile: "Anemo Melee Plunge",
    mechanics: [
      { category: "mecanica", value: "anemo_application" },
      { category: "mecanica", value: "interruption_power" }
    ],
    needs: [
      { value: "need_battery_anemo", priority: 10 },
      { value: "need_sustain", priority: 10 },
      { value: "need_anemo_shred", priority: 9 },
      { value: "need_attack_buff", priority: 8 }
    ]
  },
  {
    id: 29,
    name: "Hu Tao",
    element: "Pyro",
    weaponType: "Polearm",
    rarity: 5,
    region: "Liyue",
    roles: ["Main DPS"],
    damageProfile: "Pyro Melee Fast",
    mechanics: [
      { category: "mecanica", value: "buff_crit_rate" },
      { category: "mecanica", value: "pyro_application" }
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_offfield_hydro_dmg", priority: 10 },
      { value: "need_shield", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_geo_partner", priority: 8 }
    ]
  },
  {
    id: 30,
    name: "Rosaria",
    element: "Cryo",
    weaponType: "Polearm",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Sub-DPS", "Support"],
    damageProfile: "Cryo Burst",
    mechanics: [
      { category: "mecanica", value: "off_field_cryo_dmg" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "buff_crit_rate" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "debuff_physical_res", minConstellation: 6 }
    ],
    needs: [
      { value: "need_physical_shred", priority: 10 }
    ],
    antiTags: [
      { value: "cryo_infusion", reason: "Sobrescribe y destruye el daño físico (si se juega como Carry)" },
      { value: "pyro_infusion", reason: "Sobrescribe y destruye el daño físico (si se juega como Carry)" }
    ]
  },
  {
    id: 31,
    name: "Yanfei",
    element: "Pyro",
    weaponType: "Catalyst",
    rarity: 4,
    region: "Liyue",
    roles: ["Main DPS", "Support"],
    damageProfile: "Pyro Ranged AoE",
    mechanics: [
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "shield", minConstellation: 4 }
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_shield", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_attack_buff", priority: 8 }
    ]
  },
  {
    id: 32,
    name: "Eula",
    element: "Cryo",
    weaponType: "Claymore",
    rarity: 5,
    region: "Mondstadt",
    roles: ["Main DPS", "Support"],
    damageProfile: "Physical Melee",
    mechanics: [
      { category: "mecanica", value: "debuff_physical_res" },
      { category: "mecanica", value: "debuff_cryo_res" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "physical_nuke" }
    ],
    needs: [
      { value: "need_physical_shred", priority: 10 },
      { value: "need_battery_cryo", priority: 10 },
      { value: "need_sustain", priority: 9 },
      { value: "need_attack_buff", priority: 8 }
    ],
    antiTags: [
      { value: "pyro_infusion", reason: "Sobrescribe golpes normales a Pyro, destruyendo sus bonos de daño físico (si actúa como Carry)" },
      { value: "cryo_infusion", reason: "Sobrescribe golpes normales a Cryo, destruyendo sus bonos de daño físico (si actúa como Carry)" }
    ]
  },
  {
    id: 33,
    name: "Kaedehara Kazuha",
    element: "Anemo",
    weaponType: "Sword",
    rarity: 5,
    region: "Inazuma",
    roles: ["Support", "Sub-DPS"],
    damageProfile: "Anemo AoE / Swirl Buffer",
    mechanics: [
      { category: "mecanica", value: "anemo_application" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "buff_elemental_dmg" },
      { category: "mecanica", value: "absorption_elemental" },
      { category: "mecanica", value: "interruption_power" },
      { category: "mecanica", value: "buff_elemental_mastery", minConstellation: 2 }
    ]
  },
  {
    id: 34,
    name: "Kamisato Ayaka",
    element: "Cryo",
    weaponType: "Sword",
    rarity: 5,
    region: "Inazuma",
    roles: ["Main DPS"],
    damageProfile: "Cryo Burst Melee",
    mechanics: [
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "debuff_defense", minConstellation: 4 }
    ],
    needs: [
      { value: "need_freeze", priority: 10 },
      { value: "need_offfield_hydro_dmg", priority: 10 },
      { value: "need_battery_cryo", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_crowd_control", priority: 9 },
      { value: "need_attack_buff", priority: 8 }
    ],
    antiTags: [
      { value: "pyro_infusion", reason: "Rompe el estado de congelación y desestabiliza Nómada del Invierno" }
    ]
  },
  {
    id: 35,
    name: "Sayu",
    element: "Anemo",
    weaponType: "Claymore",
    rarity: 4,
    region: "Inazuma",
    roles: ["Support", "Healer"],
    damageProfile: "Anemo Utility",
    mechanics: [
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "continuous_healing" },
      { category: "mecanica", value: "anemo_application" },
      { category: "mecanica", value: "absorption_elemental" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "battery" }
    ]
  },
  {
    id: 36,
    name: "Yoimiya",
    element: "Pyro",
    weaponType: "Bow",
    rarity: 5,
    region: "Inazuma",
    roles: ["Main DPS"],
    damageProfile: "Pyro Ranged Fast",
    mechanics: [
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "buff_attack" },
      { category: "mecanica", value: "off_field_pyro_dmg" }
    ],
    needs: [
      { value: "need_shield", priority: 10 },
      { value: "need_interruption_resistance", priority: 10 },
      { value: "need_offfield_hydro_dmg", priority: 10 },
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_attack_buff", priority: 9 },
      { value: "need_resistance_shred", priority: 9 }
    ]
  },
  {
    id: 37,
    name: "Aloy",
    element: "Cryo",
    weaponType: "Bow",
    rarity: 5,
    region: "Mondstadt",
    roles: ["Sub-DPS", "Support"],
    damageProfile: "Cryo Burst Ranged",
    mechanics: [
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "debuff_attack" },
      { category: "mecanica", value: "buff_attack" }
    ]
  },
  {
    id: 38,
    name: "Kujou Sara",
    element: "Electro",
    weaponType: "Bow",
    rarity: 4,
    region: "Inazuma",
    roles: ["Support", "Sub-DPS"],
    damageProfile: "Electro Burst",
    mechanics: [
      { category: "mecanica", value: "buff_attack" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "buff_electro_crit_dmg", minConstellation: 6 }
    ]
  },
  {
    id: 39,
    name: "Shogun Raiden",
    element: "Electro",
    weaponType: "Polearm",
    rarity: 5,
    region: "Inazuma",
    roles: ["Main DPS", "Sub-DPS", "Support"],
    damageProfile: "Electro Burst Melee",
    mechanics: [
      { category: "mecanica", value: "coordinated_attacks" },
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "universal_battery" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "buff_burst_dmg" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "debuff_defense", minConstellation: 2 }
    ],
    needs: [
      { value: "need_attack_buff", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_offfield_dps", priority: 9 },
      { value: "need_sustain", priority: 8 }
    ]
  },
  {
    id: 40,
    name: "Sangonomiya Kokomi",
    element: "Hydro",
    weaponType: "Catalyst",
    rarity: 5,
    region: "Inazuma",
    roles: ["Support", "Healer", "Main DPS"],
    damageProfile: "Hydro Sustained Catalyst",
    mechanics: [
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "continuous_healing" },
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "off_field_hydro_dmg" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "interruption_resistance" }
    ],
    needs: [
      { value: "need_offfield_electro_dmg", priority: 10 },
      { value: "need_battery_electro", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_interruption_resistance", priority: 7 }
    ],
    antiTags: [
      { value: "buff_crit_rate", reason: "Pasiva reduce su Prob. Crítico en -100%, volviendo inútiles los buffs de crítico" }
    ]
  },
  {
    id: 41,
    name: "Thoma",
    element: "Pyro",
    weaponType: "Polearm",
    rarity: 4,
    region: "Inazuma",
    roles: ["Support", "Sub-DPS"],
    damageProfile: "Pyro Shield Utility",
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "coordinated_attacks" },
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "buff_normal_attack_dmg", minConstellation: 6 }
    ]
  },
  {
    id: 42,
    name: "Gorou",
    element: "Geo",
    weaponType: "Bow",
    rarity: 4,
    region: "Inazuma",
    roles: ["Support"],
    damageProfile: "Geo Utility",
    mechanics: [
      { category: "mecanica", value: "buff_defense" },
      { category: "mecanica", value: "buff_geo_dmg" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "magnetize_crystallize" },
      { category: "mecanica", value: "buff_geo_crit_dmg", minConstellation: 6 },
      { category: "mecanica", value: "healer", minConstellation: 4 }
    ]
  },
  {
    id: 43,
    name: "Arataki Itto",
    element: "Geo",
    weaponType: "Claymore",
    rarity: 5,
    region: "Inazuma",
    roles: ["Main DPS"],
    damageProfile: "Geo Sustained Charged / DEF Scaling",
    mechanics: [
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "taunt" }
    ],
    needs: [
      { value: "need_defense_buff", priority: 10 },
      { value: "need_battery_geo", priority: 10 },
      { value: "need_geo_partner", priority: 9 },
      { value: "need_shield", priority: 9 },
      { value: "need_resistance_shred", priority: 8 }
    ],
    antiTags: [
      { value: "need_reaction_enabler", reason: "Hypercarry Geo puro; no aprovecha Vaporizados ni Derretidos" }
    ]
  },
  {
    id: 44,
    name: "Yun Jin",
    element: "Geo",
    weaponType: "Polearm",
    rarity: 4,
    region: "Liyue",
    roles: ["Support"],
    damageProfile: "Normal Attack Buffer / DEF Scaling",
    mechanics: [
      { category: "mecanica", value: "buff_normal_attack_dmg" },
      { category: "mecanica", value: "buff_attack_speed", minConstellation: 6 },
      { category: "mecanica", value: "buff_rainbow_team" },
      { category: "mecanica", value: "battery" }
    ]
  },
  {
    id: 45,
    name: "Shenhe",
    element: "Cryo",
    weaponType: "Polearm",
    rarity: 5,
    region: "Liyue",
    roles: ["Support", "Sub-DPS"],
    damageProfile: "Cryo Dedicated Buffer / Icy Quills Flat Damage",
    mechanics: [
      { category: "mecanica", value: "buff_cryo_flat_dmg" },
      { category: "mecanica", value: "buff_cryo_dmg" },
      { category: "mecanica", value: "buff_skill_burst_dmg" },
      { category: "mecanica", value: "buff_normal_charge_dmg" },
      { category: "mecanica", value: "debuff_cryo_res" },
      { category: "mecanica", value: "debuff_physical_res" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "buff_cryo_crit_dmg", minConstellation: 2 },
      { category: "mecanica", value: "cryo_application" }
    ]
  },
  {
    id: 46,
    name: "Yae Miko",
    element: "Electro",
    weaponType: "Catalyst",
    rarity: 5,
    region: "Inazuma",
    alignmentClass: "Witch",
    roles: ["Sub-DPS", "Main DPS"],
    damageProfile: "Electro Off-field Turret / Burst Nuke",
    mechanics: [
      { category: "mecanica", value: "off_field_electro_dmg" },
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "em_scaling" },
      { category: "mecanica", value: "buff_elemental_mastery", minConstellation: 2 },
      { category: "mecanica", value: "buff_electro_dmg", minConstellation: 4 }
    ],
    needs: [
      { value: "need_battery_electro", priority: 9 },
      { value: "need_reaction_enabler", priority: 9 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_attack_buff", priority: 8 }
    ]
  },
  {
    id: 47,
    name: "Kamisato Ayato",
    element: "Hydro",
    weaponType: "Sword",
    rarity: 5,
    region: "Inazuma",
    roles: ["Main DPS", "Sub-DPS", "Driver"],
    damageProfile: "Hydro Sustained Normal / AoE Slashes",
    mechanics: [
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "buff_normal_attack_dmg" },
      { category: "mecanica", value: "off_field_hydro_dmg" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "buff_attack_speed", minConstellation: 4 }
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_offfield_pyro_dmg", priority: 10 },
      { value: "need_offfield_electro_dmg", priority: 9 },
      { value: "need_attack_buff", priority: 9 },
      { value: "need_resistance_shred", priority: 9 }
    ]
  },
  {
    id: 48,
    name: "Yelan",
    element: "Hydro",
    weaponType: "Bow",
    rarity: 5,
    region: "Liyue",
    roles: ["Sub-DPS", "Support"],
    damageProfile: "Hydro Off-field Single-Target / Ramp-Up Buffer",
    mechanics: [
      { category: "mecanica", value: "off_field_hydro_dmg" },
      { category: "mecanica", value: "coordinated_attacks" },
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "buff_all_dmg" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "buff_hp", minConstellation: 4 }
    ]
  },
  {
    id: 49,
    name: "Kuki Shinobu",
    element: "Electro",
    weaponType: "Sword",
    rarity: 4,
    region: "Inazuma",
    roles: ["Support", "Healer"],
    damageProfile: "Electro Utility / Continuous Healing & Reaction Trigger",
    mechanics: [
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "continuous_healing" },
      { category: "mecanica", value: "electro_application" },
      { category: "mecanica", value: "off_field_electro_dmg" },
      { category: "mecanica", value: "em_scaling" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "coordinated_attacks", minConstellation: 4 }
    ]
  },
  {
    id: 50,
    name: "Shikanoin Heizou",
    element: "Anemo",
    weaponType: "Catalyst",
    rarity: 4,
    region: "Inazuma",
    roles: ["Main DPS", "Driver", "Sub-DPS"],
    damageProfile: "Anemo Melee Burst / Declension Punch",
    mechanics: [
      { category: "mecanica", value: "anemo_application" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "buff_elemental_mastery" },
      { category: "mecanica", value: "catalyst_buffer" }
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_offfield_dps", priority: 10 },
      { value: "need_coordinated_attacks", priority: 10 },
      { value: "need_attack_buff", priority: 8 }
    ]
  },
  {
    id: 51,
    name: "Tighnari",
    element: "Dendro",
    weaponType: "Bow",
    rarity: 5,
    region: "Sumeru",
    roles: ["Main DPS"],
    damageProfile: "Dendro Quickswap Charged / Spread Nuke",
    mechanics: [
      { category: "mecanica", value: "dendro_application" },
      { category: "mecanica", value: "taunt" },
      { category: "mecanica", value: "buff_elemental_mastery", minConstellation: 4 }
    ],
    needs: [
      { value: "need_offfield_electro_dmg", priority: 10 },
      { value: "need_dendro_shred", priority: 10 },
      { value: "need_shield", priority: 8 },
      { value: "need_attack_buff", priority: 8 }
    ],
    antiTags: [
      { value: "pyro_application", reason: "Quemadura consume el aura de Aceleración y arruina la Propagación" }
    ]
  },
  {
    id: 52,
    name: "Collei",
    element: "Dendro",
    weaponType: "Bow",
    rarity: 4,
    region: "Sumeru",
    roles: ["Sub-DPS", "Support"],
    damageProfile: "Dendro Off-field Burst / Fast Application",
    mechanics: [
      { category: "mecanica", value: "dendro_application" },
      { category: "mecanica", value: "off_field_dendro_dmg" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "buff_elemental_mastery", minConstellation: 4 }
    ]
  }
];
var DEFAULT_SUPPORT_ARTIFACT_SETS = [
  {
    id: 1,
    name: "Sombra Verde Esmeralda",
    description: "Torbellino reduce la resistencia elemental enemiga en un -40%",
    providedTag: "need_resistance_shred",
    isSupportSet: true
  },
  {
    id: 2,
    name: "Ritual Antiguo de la Nobleza",
    description: "Lanzar Definitiva aumenta el ATK de todo el equipo en +20% por 12s",
    providedTag: "need_attack_buff",
    isSupportSet: true
  },
  {
    id: 3,
    name: "Tenacidad de la Geoarmada",
    description: "Habilidad elemental continua aumenta ATK +20% y fuerza de escudo +30%",
    providedTag: "need_attack_buff",
    isSupportSet: true
  },
  {
    id: 4,
    name: "Instructor",
    description: "Causar reacción en campo aumenta la Maestría Elemental de todo el equipo en +120",
    providedTag: "buff_elemental_mastery",
    isSupportSet: true
  },
  {
    id: 5,
    name: "Son de Antaño",
    description: "Convierte curación acumulada en daño plano directo al Carry activo",
    providedTag: "buff_flat_dmg",
    isSupportSet: true
  },
  {
    id: 6,
    name: "Petra Arcaica",
    description: "Recoger cristal elemental otorga +35% de bono de daño de ese elemento al equipo",
    providedTag: "buff_elemental_dmg",
    isSupportSet: true
  },
  {
    id: 7,
    name: "Pergamino del Héroe",
    description: "Reacción elemental del portador otorga +12% o +24% de daño elemental a todo el equipo",
    providedTag: "buff_all_dmg",
    isSupportSet: true
  },
  {
    id: 8,
    name: "Recuerdos del Bosque",
    description: "Impactar con elemental o definitiva reduce la resistencia Dendro un -30%",
    providedTag: "debuff_dendro_res",
    isSupportSet: true
  },
  {
    id: 9,
    name: "Corazón Forjado",
    description: "Reacción estelar activa otorga ATK +20% y daño estelar al equipo",
    providedTag: "need_attack_buff",
    isSupportSet: true
  },
  {
    id: 10,
    name: "Alborada de la Estrella",
    description: "Potencia el daño de reacciones lunares y daño de rito",
    providedTag: "buff_all_dmg",
    isSupportSet: true
  },
  {
    id: 11,
    name: "Serenata de la Luna",
    description: "Otorga Maestría Elemental masiva para reacciones lunares",
    providedTag: "buff_elemental_mastery",
    isSupportSet: true
  }
];
var DEFAULT_ARTIFACT_BINDS = [
  { characterName: "Kaedehara Kazuha", artifactName: "Sombra Verde Esmeralda", priority: 10 },
  { characterName: "Shikanoin Heizou", artifactName: "Sombra Verde Esmeralda", priority: 10 },
  { characterName: "Sucrose", artifactName: "Sombra Verde Esmeralda", priority: 10 },
  { characterName: "Jean", artifactName: "Sombra Verde Esmeralda", priority: 10 },
  { characterName: "Venti", artifactName: "Sombra Verde Esmeralda", priority: 10 },
  { characterName: "Sayu", artifactName: "Sombra Verde Esmeralda", priority: 10 },
  { characterName: "Shenhe", artifactName: "Ritual Antiguo de la Nobleza", priority: 10 },
  { characterName: "Bennett", artifactName: "Ritual Antiguo de la Nobleza", priority: 10 },
  { characterName: "Rosaria", artifactName: "Ritual Antiguo de la Nobleza", priority: 10 },
  { characterName: "Mona", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Kaeya", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Amber", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Diona", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Ganyu", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Yanfei", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Kujou Sara", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Thoma", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Aloy", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Yun Jin", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Kamisato Ayato", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Yelan", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Collei", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Chongyun", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Lisa", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Xingqiu", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Xiangling", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Zhongli", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Xinyan", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Eula", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Gorou", artifactName: "Ritual Antiguo de la Nobleza", priority: 9 },
  { characterName: "Sayu", artifactName: "Ritual Antiguo de la Nobleza", priority: 8 },
  { characterName: "Albedo", artifactName: "Ritual Antiguo de la Nobleza", priority: 7 },
  { characterName: "Razor", artifactName: "Ritual Antiguo de la Nobleza", priority: 7 },
  { characterName: "Shogun Raiden", artifactName: "Ritual Antiguo de la Nobleza", priority: 7 },
  { characterName: "Zhongli", artifactName: "Petra Arcaica", priority: 10 },
  { characterName: "Yun Jin", artifactName: "Petra Arcaica", priority: 9 },
  { characterName: "Albedo", artifactName: "Petra Arcaica", priority: 9 },
  { characterName: "Noelle", artifactName: "Petra Arcaica", priority: 8 },
  { characterName: "Ningguang", artifactName: "Petra Arcaica", priority: 8 },
  { characterName: "Gorou", artifactName: "Petra Arcaica", priority: 7 },
  { characterName: "Fischl", artifactName: "Tenacidad de la Geoarmada", priority: 10 },
  { characterName: "Sangonomiya Kokomi", artifactName: "Tenacidad de la Geoarmada", priority: 10 },
  { characterName: "Zhongli", artifactName: "Tenacidad de la Geoarmada", priority: 9 },
  { characterName: "Albedo", artifactName: "Tenacidad de la Geoarmada", priority: 9 },
  { characterName: "Kuki Shinobu", artifactName: "Tenacidad de la Geoarmada", priority: 9 },
  { characterName: "Yae Miko", artifactName: "Tenacidad de la Geoarmada", priority: 8 },
  { characterName: "Xinyan", artifactName: "Tenacidad de la Geoarmada", priority: 8 },
  { characterName: "Shogun Raiden", artifactName: "Tenacidad de la Geoarmada", priority: 8 },
  { characterName: "Mona", artifactName: "Tenacidad de la Geoarmada", priority: 7 },
  { characterName: "Qiqi", artifactName: "Tenacidad de la Geoarmada", priority: 7 },
  { characterName: "Yanfei", artifactName: "Tenacidad de la Geoarmada", priority: 6 },
  { characterName: "Diona", artifactName: "Tenacidad de la Geoarmada", priority: 5 },
  { characterName: "Thoma", artifactName: "Tenacidad de la Geoarmada", priority: 5 },
  { characterName: "Kuki Shinobu", artifactName: "Instructor", priority: 9 },
  { characterName: "Collei", artifactName: "Instructor", priority: 9 },
  { characterName: "Mona", artifactName: "Instructor", priority: 9 },
  { characterName: "Amber", artifactName: "Instructor", priority: 9 },
  { characterName: "Yanfei", artifactName: "Instructor", priority: 9 },
  { characterName: "Bennett", artifactName: "Instructor", priority: 8 },
  { characterName: "Sucrose", artifactName: "Instructor", priority: 8 },
  { characterName: "Kaeya", artifactName: "Instructor", priority: 8 },
  { characterName: "Lisa", artifactName: "Instructor", priority: 8 },
  { characterName: "Chongyun", artifactName: "Instructor", priority: 8 },
  { characterName: "Diona", artifactName: "Instructor", priority: 8 },
  { characterName: "Zhongli", artifactName: "Instructor", priority: 8 },
  { characterName: "Rosaria", artifactName: "Instructor", priority: 8 },
  { characterName: "Aloy", artifactName: "Instructor", priority: 8 },
  { characterName: "Thoma", artifactName: "Instructor", priority: 8 },
  { characterName: "Shikanoin Heizou", artifactName: "Instructor", priority: 8 },
  { characterName: "Yae Miko", artifactName: "Instructor", priority: 8 },
  { characterName: "Xiangling", artifactName: "Instructor", priority: 7 },
  { characterName: "Razor", artifactName: "Instructor", priority: 7 },
  { characterName: "Xinyan", artifactName: "Instructor", priority: 7 },
  { characterName: "Ganyu", artifactName: "Instructor", priority: 7 },
  { characterName: "Eula", artifactName: "Instructor", priority: 7 },
  { characterName: "Kaedehara Kazuha", artifactName: "Instructor", priority: 7 },
  { characterName: "Sangonomiya Kokomi", artifactName: "Instructor", priority: 7 },
  { characterName: "Kujou Sara", artifactName: "Instructor", priority: 7 },
  { characterName: "Sayu", artifactName: "Instructor", priority: 7 },
  { characterName: "Gorou", artifactName: "Instructor", priority: 7 },
  { characterName: "Shenhe", artifactName: "Instructor", priority: 7 },
  { characterName: "Yun Jin", artifactName: "Instructor", priority: 7 },
  { characterName: "Kamisato Ayato", artifactName: "Instructor", priority: 7 },
  { characterName: "Yelan", artifactName: "Instructor", priority: 7 },
  { characterName: "Barbara", artifactName: "Instructor", priority: 6 },
  { characterName: "Qiqi", artifactName: "Son de Antaño", priority: 10 },
  { characterName: "Barbara", artifactName: "Son de Antaño", priority: 10 },
  { characterName: "Sangonomiya Kokomi", artifactName: "Son de Antaño", priority: 10 },
  { characterName: "Jean", artifactName: "Son de Antaño", priority: 8 },
  { characterName: "Diona", artifactName: "Son de Antaño", priority: 8 },
  { characterName: "Sayu", artifactName: "Son de Antaño", priority: 8 },
  { characterName: "Kuki Shinobu", artifactName: "Son de Antaño", priority: 8 },
  { characterName: "Albedo", artifactName: "Pergamino del Héroe", priority: 8 },
  { characterName: "Gorou", artifactName: "Pergamino del Héroe", priority: 8 },
  { characterName: "Yun Jin", artifactName: "Pergamino del Héroe", priority: 8 },
  { characterName: "Bennett", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Mona", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Fischl", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Kaeya", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Xiangling", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Amber", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Lisa", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Chongyun", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Razor", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Zhongli", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Ganyu", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Rosaria", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Kujou Sara", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Shogun Raiden", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Aloy", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Thoma", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Sangonomiya Kokomi", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Shenhe", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Yae Miko", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Kamisato Ayato", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Yelan", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Kuki Shinobu", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Shikanoin Heizou", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Collei", artifactName: "Pergamino del Héroe", priority: 7 },
  { characterName: "Barbara", artifactName: "Pergamino del Héroe", priority: 6 },
  { characterName: "Kaedehara Kazuha", artifactName: "Pergamino del Héroe", priority: 6 },
  { characterName: "Collei", artifactName: "Recuerdos del Bosque", priority: 10 },
  { characterName: "Kuki Shinobu", artifactName: "Recuerdos del Bosque", priority: 8 },
  { characterName: "Zhongli", artifactName: "Recuerdos del Bosque", priority: 8 },
  { characterName: "Yae Miko", artifactName: "Recuerdos del Bosque", priority: 7 },
  { characterName: "Lisa", artifactName: "Recuerdos del Bosque", priority: 6 },
  { characterName: "Fischl", artifactName: "Recuerdos del Bosque", priority: 6 },
  { characterName: "Kaeya", artifactName: "Corazón Forjado", priority: 7 },
  { characterName: "Lisa", artifactName: "Corazón Forjado", priority: 7 },
  { characterName: "Fischl", artifactName: "Corazón Forjado", priority: 7 },
  { characterName: "Rosaria", artifactName: "Corazón Forjado", priority: 7 },
  { characterName: "Mona", artifactName: "Alborada de la Estrella", priority: 7 },
  { characterName: "Lisa", artifactName: "Alborada de la Estrella", priority: 7 },
  { characterName: "Fischl", artifactName: "Alborada de la Estrella", priority: 7 },
  { characterName: "Yae Miko", artifactName: "Alborada de la Estrella", priority: 7 },
  { characterName: "Sucrose", artifactName: "Serenata de la Luna", priority: 7 },
  { characterName: "Mona", artifactName: "Serenata de la Luna", priority: 7 },
  { characterName: "Lisa", artifactName: "Serenata de la Luna", priority: 7 },
  { characterName: "Shikanoin Heizou", artifactName: "Serenata de la Luna", priority: 7 }
];
var DEFAULT_TEAM_PRESETS = [
  {
    id: 1,
    name: "Vaporizados Clásico",
    description: "Carry Pyro + Habilitador Hydro + Buffer ATK + Bajada Anemo VV",
    composition: {
      carryElement: "Pyro",
      archetype: "Vaporizados Clásico",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Pyro", "Hydro", "Pyro", "Anemo"],
      requiredTags: ["hydro_application", "buff_attack", "need_resistance_shred"]
    }
  },
  {
    id: 2,
    name: "Derretidos Cuerpo a Cuerpo",
    description: "Carry Pyro + Cryo Proximidad + Batería Pyro + Flex",
    composition: {
      carryElement: "Pyro",
      archetype: "Derretidos",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Pyro", "Cryo", "Pyro", "Anemo"],
      requiredTags: ["cryo_application", "buff_attack"]
    }
  },
  {
    id: 3,
    name: "Doble Geo Doble Pyro",
    description: "Carry Geo + Batería/Partner Geo + Bennett ATK + Xiangling Off-field",
    composition: {
      carryElement: "Geo",
      archetype: "Doble Geo Doble Pyro",
      roles: ["Main DPS", "Support", "Support", "Sub-DPS"],
      elements: ["Geo", "Geo", "Pyro", "Pyro"],
      requiredTags: ["shield", "buff_attack", "off_field_pyro_dmg"]
    }
  },
  {
    id: 4,
    name: "Superconductor Físico",
    description: "Carry Físico + Cryo Offfield + Buffer/Batería Electro + Sustain",
    composition: {
      archetype: "Superconductor Físico",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Electro", "Cryo"],
      requiredTags: ["cryo_application", "electro_application", "need_physical_shred"]
    }
  },
  {
    id: 5,
    name: "Mono Pyro Hipercarry",
    description: "Carry Pyro + Bennett + Xiangling + Anemo VV",
    composition: {
      carryElement: "Pyro",
      archetype: "Mono Pyro Hipercarry",
      roles: ["Main DPS", "Support", "Sub-DPS", "Support"],
      elements: ["Pyro", "Pyro", "Pyro", "Anemo"],
      requiredTags: ["buff_attack", "off_field_pyro_dmg", "need_resistance_shred"]
    }
  },
  {
    id: 6,
    name: "Sunfire Pyro Vaporizado",
    description: "Carry + Jean + Bennett + Hydro Enabler",
    composition: {
      carryElement: "Pyro",
      archetype: "Sunfire Vaporizado",
      roles: ["Main DPS", "Support", "Support", "Sub-DPS"],
      requiredTags: ["sunfire", "buff_attack", "hydro_application"]
    }
  },
  {
    id: 7,
    name: "Tartaglia Internacional",
    description: "Tartaglia Hydro rápido + Pyronado Xiangling + Bennett ATK + Anemo VV",
    composition: {
      targetCarryName: "Tartaglia",
      carryElement: "Hydro",
      archetype: "Tartaglia Internacional",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Hydro", "Pyro", "Pyro", "Anemo"],
      requiredTags: ["hydro_application", "off_field_pyro_dmg", "buff_attack", "need_resistance_shred"]
    }
  },
  {
    id: 8,
    name: "Hu Tao Doble Geo",
    description: "Hu Tao + Xingqiu Vaporizado + Zhongli Escudo/Shred + Albedo EM",
    composition: {
      targetCarryName: "Hu Tao",
      carryElement: "Pyro",
      archetype: "Hu Tao Doble Geo",
      roles: ["Main DPS", "Sub-DPS", "Support", "Sub-DPS"],
      elements: ["Pyro", "Hydro", "Geo", "Geo"],
      requiredTags: ["hydro_application", "shield", "need_resistance_shred", "coordinated_attacks"]
    }
  },
  {
    id: 9,
    name: "Morgana Freeze",
    description: "Ganyu Lluvia + Mona Presagio/Hydro + Venti CC + Diona Batería/Shield",
    composition: {
      targetCarryName: "Ganyu",
      carryElement: "Cryo",
      archetype: "Morgana Freeze",
      roles: ["Main DPS", "Support", "Support", "Support"],
      elements: ["Cryo", "Hydro", "Anemo", "Cryo"],
      requiredTags: ["cryo_application", "hydro_application", "crowd_control", "battery"]
    }
  },
  {
    id: 10,
    name: "Xiao Hypercarry",
    description: "Xiao Plunge + Batería Anemo + Zhongli Escudo/Shred + Bennett ATK",
    composition: {
      targetCarryName: "Xiao",
      carryElement: "Anemo",
      archetype: "Xiao Hypercarry",
      roles: ["Main DPS", "Support", "Support", "Support"],
      elements: ["Anemo", "Anemo", "Geo", "Pyro"],
      requiredTags: ["anemo_application", "battery", "shield", "buff_attack"]
    }
  },
  {
    id: 11,
    name: "Eula Superconductor",
    description: "Eula Nuke Físico + Electro fuera de campo + Rosaria/Diona Batería + Sustain",
    composition: {
      targetCarryName: "Eula",
      carryElement: "Cryo",
      archetype: "Eula Superconductor",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Cryo", "Electro"],
      requiredTags: ["debuff_physical_res", "electro_application", "cryo_application", "battery"]
    }
  },
  {
    id: 12,
    name: "Melt Ganyu",
    description: "Ganyu Disparos Cargados + Xiangling Pyro + Bennett ATK + Zhongli Escudo",
    composition: {
      targetCarryName: "Ganyu",
      carryElement: "Cryo",
      archetype: "Melt Ganyu",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Cryo", "Pyro", "Pyro", "Geo"],
      requiredTags: ["cryo_application", "pyro_application", "shield", "buff_attack"]
    }
  },
  {
    id: 13,
    name: "Raiden National",
    description: "Raiden Shogun Batería/Nuke + Pyronado Xiangling + Xingqiu Hydro + Bennett ATK",
    composition: {
      targetCarryName: "Shogun Raiden",
      carryElement: "Electro",
      archetype: "Raiden National",
      roles: ["Main DPS", "Sub-DPS", "Sub-DPS", "Support"],
      elements: ["Electro", "Pyro", "Hydro", "Pyro"],
      requiredTags: ["universal_battery", "off_field_pyro_dmg", "hydro_application", "buff_attack", "coordinated_attacks"]
    }
  },
  {
    id: 14,
    name: "Ayaka Permafrost",
    description: "Ayaka Soumetsu Nuke + Kokomi Hydro AoE/Heal + Kazuha VV/CC + Rosaria Batería Cryo",
    composition: {
      targetCarryName: "Kamisato Ayaka",
      carryElement: "Cryo",
      archetype: "Ayaka Permafrost",
      roles: ["Main DPS", "Support", "Support", "Support"],
      elements: ["Cryo", "Hydro", "Anemo", "Cryo"],
      requiredTags: ["cryo_application", "hydro_application", "crowd_control", "battery"]
    }
  },
  {
    id: 15,
    name: "Yoimiya Vaporizado",
    description: "Yoimiya Ataque Normal N5 + Xingqiu Coordinado + Zhongli Escudo Anti-Interrupción + Bennett ATK",
    composition: {
      targetCarryName: "Yoimiya",
      carryElement: "Pyro",
      archetype: "Yoimiya Vaporizado",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Pyro", "Hydro", "Geo", "Pyro"],
      requiredTags: ["hydro_application", "coordinated_attacks", "shield", "buff_attack"]
    }
  },
  {
    id: 16,
    name: "Kokomi Taser",
    description: "Kokomi Driver On-field + Beidou Rayos Cadena + Fischl Batería + Kazuha VV",
    composition: {
      targetCarryName: "Sangonomiya Kokomi",
      carryElement: "Hydro",
      archetype: "Kokomi Taser",
      roles: ["Main DPS", "Sub-DPS", "Sub-DPS", "Support"],
      elements: ["Hydro", "Electro", "Electro", "Anemo"],
      requiredTags: ["hydro_application", "off_field_electro_dmg", "electro_application", "need_resistance_shred"]
    }
  },
  {
    id: 17,
    name: "Raiden Hypercarry",
    description: "Raiden Nuke C2 + Sara C6 Electro CRIT + Kazuha VV/DMG + Bennett ATK",
    composition: {
      targetCarryName: "Shogun Raiden",
      carryElement: "Electro",
      archetype: "Raiden Hypercarry",
      roles: ["Main DPS", "Support", "Support", "Support"],
      elements: ["Electro", "Electro", "Anemo", "Pyro"],
      requiredTags: ["buff_attack", "buff_electro_crit_dmg", "need_resistance_shred", "universal_battery"]
    }
  },
  {
    id: 18,
    name: "Triple Geo Hiperdefensa",
    description: "Noelle DEF Carry + Gorou DEF/Geo CRIT Buffer + Albedo Daño Geo + Flex",
    composition: {
      carryElement: "Geo",
      archetype: "Triple Geo",
      roles: ["Main DPS", "Support", "Sub-DPS", "Support"],
      elements: ["Geo", "Geo", "Geo"],
      requiredTags: ["buff_defense", "buff_geo_dmg", "off_field_geo_dmg"]
    }
  },
  {
    id: 19,
    name: "Mono Geo Hiperdefensa",
    description: "Itto DEF Carry + Gorou DEF/Geo CRIT Buffer + Albedo Daño Geo + Zhongli Escudo/Shred",
    composition: {
      targetCarryName: "Arataki Itto",
      carryElement: "Geo",
      archetype: "Mono Geo Hiperdefensa",
      roles: ["Main DPS", "Support", "Sub-DPS", "Support"],
      elements: ["Geo", "Geo", "Geo", "Geo"],
      requiredTags: ["buff_defense", "buff_geo_dmg", "off_field_geo_dmg", "shield"]
    }
  },
  {
    id: 20,
    name: "Tighnari Spread Quickswap",
    description: "Tighnari Disparos Cargados Dendro + Electro fuera de campo + Collei Recuerdos del Bosque + Zhongli/Kuki Sustain",
    composition: {
      targetCarryName: "Tighnari",
      carryElement: "Dendro",
      archetype: "Tighnari Spread",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Dendro", "Electro", "Dendro", "Geo"],
      requiredTags: ["off_field_electro_dmg", "debuff_dendro_res", "dendro_application"]
    }
  },
  {
    id: 21,
    name: "Hu Tao Doble Hydro",
    description: "Hu Tao Vaporizado + Xingqiu C2 + Yelan Daño Rampa + Zhongli Escudo/Shred",
    composition: {
      targetCarryName: "Hu Tao",
      carryElement: "Pyro",
      archetype: "Hu Tao Doble Hydro",
      roles: ["Main DPS", "Sub-DPS", "Sub-DPS", "Support"],
      elements: ["Pyro", "Hydro", "Hydro", "Geo"],
      requiredTags: ["hydro_application", "coordinated_attacks", "shield", "buff_all_dmg"]
    }
  },
  {
    id: 22,
    name: "Ayato Doble Hydro Vaporizado",
    description: "Ayato Cortes Shunsuiken + Pyronado Xiangling + Bennett ATK + Yelan/Kazuha",
    composition: {
      targetCarryName: "Kamisato Ayato",
      carryElement: "Hydro",
      archetype: "Ayato Vaporizado",
      roles: ["Main DPS", "Sub-DPS", "Support", "Support"],
      elements: ["Hydro", "Pyro", "Pyro", "Hydro"],
      requiredTags: ["hydro_application", "off_field_pyro_dmg", "buff_attack"]
    }
  },
  {
    id: 23,
    name: "Ayaka Freeze Shenhe Core",
    description: "Ayaka Soumetsu Nuke + Shenhe Plumas Glaciares + Kokomi Hydro AoE/Heal + Kazuha VV",
    composition: {
      targetCarryName: "Kamisato Ayaka",
      carryElement: "Cryo",
      archetype: "Ayaka Freeze Shenhe",
      roles: ["Main DPS", "Support", "Support", "Support"],
      elements: ["Cryo", "Cryo", "Hydro", "Anemo"],
      requiredTags: ["buff_cryo_flat_dmg", "cryo_application", "hydro_application", "crowd_control"]
    }
  },
  {
    id: 24,
    name: "Motor de Hiperflorecimiento",
    description: "Driver On-field + Kuki/Raiden Detonador EM + Hydro Coordinado + Collei/Dendro",
    composition: {
      archetype: "Hiperflorecimiento",
      roles: ["Main DPS", "Support", "Sub-DPS", "Support"],
      elements: ["Electro", "Hydro", "Dendro"],
      requiredTags: ["electro_application", "hydro_application", "dendro_application", "continuous_healing"]
    }
  },
  {
    id: 25,
    name: "Heizou Nacional",
    description: "Heizou Driver On-field + Pyronado Xiangling + Xingqiu/Yelan Hydro + Bennett ATK/Batería",
    composition: {
      targetCarryName: "Shikanoin Heizou",
      carryElement: "Anemo",
      archetype: "Heizou Nacional",
      roles: ["Main DPS", "Sub-DPS", "Sub-DPS", "Support"],
      elements: ["Anemo", "Pyro", "Hydro", "Pyro"],
      requiredTags: ["off_field_pyro_dmg", "hydro_application", "buff_attack", "coordinated_attacks"]
    }
  },
  {
    id: 26,
    name: "Heizou Taser",
    description: "Heizou Driver On-field + Xingqiu/Yelan Hydro + Fischl Batería + Beidou Rayos Cadena",
    composition: {
      targetCarryName: "Shikanoin Heizou",
      carryElement: "Anemo",
      archetype: "Heizou Taser",
      roles: ["Main DPS", "Sub-DPS", "Sub-DPS", "Support"],
      elements: ["Anemo", "Hydro", "Electro"],
      requiredTags: ["hydro_application", "off_field_electro_dmg", "electro_application", "coordinated_attacks"]
    }
  }
];
var DEFAULT_TAG_AFFINITIES = [
  { tagA: "pyro_application", tagB: "hydro_application", weight: 1000 },
  { tagA: "pyro_application", tagB: "cryo_application", weight: 950 },
  { tagA: "electro_application", tagB: "cryo_application", weight: 1000 },
  { tagA: "anemo_application", tagB: "need_resistance_shred", weight: 900 },
  { tagA: "sunfire", tagB: "pyro_application", weight: 500 },
  { tagA: "battery", tagB: "off_field_pyro_dmg", weight: 500 },
  { tagA: "catalyst_buffer", tagB: "need_attack_buff", weight: 300 },
  { tagA: "buff_geo_dmg", tagB: "geo_application", weight: 300 },
  { tagA: "snapshot", tagB: "buff_attack", weight: 300 },
  { tagA: "debuff_all_res", tagB: "shield", weight: 500 },
  { tagA: "buff_crit_rate", tagB: "need_physical_shred", weight: 300 },
  { tagA: "buff_normal_attack_level", tagB: "hydro_application", weight: 300 },
  { tagA: "universal_battery", tagB: "off_field_pyro_dmg", weight: 500 },
  { tagA: "buff_burst_dmg", tagB: "snapshot", weight: 300 },
  { tagA: "buff_electro_crit_dmg", tagB: "electro_application", weight: 500 },
  { tagA: "buff_geo_crit_dmg", tagB: "buff_defense", weight: 500 },
  { tagA: "need_shield", tagB: "shield", weight: 400 },
  { tagA: "need_freeze", tagB: "hydro_application", weight: 500 },
  { tagA: "dendro_application", tagB: "electro_application", weight: 1000 },
  { tagA: "dendro_application", tagB: "hydro_application", weight: 900 },
  { tagA: "buff_cryo_flat_dmg", tagB: "cryo_application", weight: 800 },
  { tagA: "buff_normal_attack_dmg", tagB: "coordinated_attacks", weight: 600 },
  { tagA: "debuff_dendro_res", tagB: "dendro_application", weight: 900 },
  { tagA: "debuff_anemo_res", tagB: "anemo_application", weight: 900 }
];
var DEFAULT_CATALOG = {
  characters: DEFAULT_CHARACTERS,
  artifactSets: DEFAULT_SUPPORT_ARTIFACT_SETS,
  artifactBinds: DEFAULT_ARTIFACT_BINDS,
  presets: DEFAULT_TEAM_PRESETS,
  tagAffinities: DEFAULT_TAG_AFFINITIES
};
function isSupportSetViableForTeam(setName, targetCarry, companions) {
  if (setName === "Instructor") {
    if (targetCarry.element === "Geo")
      return false;
    if (targetCarry.damageProfile === "Physical Melee" || targetCarry.name === "Razor" || targetCarry.name === "Eula" || targetCarry.name === "Xiao") {
      return false;
    }
    const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
    const elementCounts = new Map;
    for (const c of fullTeam) {
      elementCounts.set(c.element, (elementCounts.get(c.element) ?? 0) + 1);
    }
    const carryCount = elementCounts.get(targetCarry.element) ?? 0;
    if (carryCount >= 3) {
      if (targetCarry.element === "Pyro") {
        const hasReaction = fullTeam.some((c) => c.element === "Hydro" || c.element === "Cryo");
        if (!hasReaction)
          return false;
      } else if (targetCarry.element === "Cryo") {
        const hasReaction = fullTeam.some((c) => c.element === "Pyro");
        if (!hasReaction)
          return false;
      } else if (targetCarry.element === "Electro") {
        const hasReaction = fullTeam.some((c) => c.element === "Hydro" || c.element === "Dendro" || c.element === "Pyro");
        if (!hasReaction)
          return false;
      } else if (targetCarry.element === "Geo" || targetCarry.element === "Anemo") {
        return false;
      }
    }
  }
  if (setName === "Sombra Verde Esmeralda") {
    if (targetCarry.element === "Anemo" || targetCarry.element === "Geo") {
      const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
      const hasPHECSubDps = fullTeam.some((c) => ["Pyro", "Hydro", "Electro", "Cryo"].includes(c.element) && c.roles.includes("Sub-DPS"));
      if (!hasPHECSubDps) {
        return false;
      }
    }
  }
  if (setName === "Petra Arcaica") {
    const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
    const hasPHEC = fullTeam.some((c) => ["Pyro", "Hydro", "Electro", "Cryo"].includes(c.element));
    if (!hasPHEC) {
      return false;
    }
    const isPHECCarry = ["Pyro", "Hydro", "Electro", "Cryo"].includes(targetCarry.element);
    const isPhysicalCarry = targetCarry.damageProfile?.toLowerCase().includes("physical");
    if (!isPHECCarry || isPhysicalCarry) {
      return false;
    }
  }
  return true;
}
function bindSupportArtifacts(companions, targetCarry, artifactSets, artifactBinds) {
  const setByName = new Map;
  for (const s of artifactSets) {
    setByName.set(s.name, s);
  }
  const allCandidates = [];
  for (const comp of companions) {
    if (comp.character.name === "Razor" && comp.constellation < 4) {
      continue;
    }
    const binds = artifactBinds.filter((b) => b.characterName.toLowerCase() === comp.character.name.toLowerCase());
    for (const b of binds) {
      if (!isSupportSetViableForTeam(b.artifactName, targetCarry, companions)) {
        continue;
      }
      const setObj = setByName.get(b.artifactName);
      if (setObj) {
        allCandidates.push({
          companion: comp,
          setName: b.artifactName,
          priority: b.priority,
          setObj
        });
      }
    }
  }
  allCandidates.sort((a, b) => b.priority - a.priority);
  const usedSets = new Set;
  const companionAssignment = new Map;
  for (const cand of allCandidates) {
    const charId = cand.companion.character.id;
    if (companionAssignment.has(charId))
      continue;
    if (usedSets.has(cand.setName))
      continue;
    companionAssignment.set(charId, {
      setName: cand.setName,
      setObj: cand.setObj
    });
    usedSets.add(cand.setName);
  }
  const assignments = [];
  const injectedTags = [];
  for (const comp of companions) {
    const charId = comp.character.id;
    const assigned = companionAssignment.get(charId);
    if (assigned) {
      assignments.push({
        characterId: charId,
        characterName: comp.character.name,
        artifactSetName: assigned.setName,
        providedTag: assigned.setObj.providedTag
      });
      if (assigned.setObj.providedTag) {
        injectedTags.push(assigned.setObj.providedTag);
      }
    } else {
      const compBinds = artifactBinds.filter((b) => b.characterName.toLowerCase() === comp.character.name.toLowerCase());
      const topSet = compBinds.length > 0 ? compBinds[0].artifactName : null;
      let alertMsg;
      if (topSet && usedSets.has(topSet)) {
        alertMsg = `Conflicto de set: ${comp.character.name} compite por ${topSet}, pero ya está asignado. Equípale con artefactos de daño personal/substats ofensivos.`;
      } else {
        alertMsg = `Sin set de soporte aplicable para esta composición: Equípale con artefactos de daño personal/estadísticas ofensivas acordes a su rol.`;
      }
      assignments.push({
        characterId: charId,
        characterName: comp.character.name,
        artifactSetName: "Set de Daño Personal (ej. Emblema)",
        providedTag: null,
        alert: alertMsg
      });
    }
  }
  return { assignments, injectedTags };
}
function calculateTeamScore(targetCarry, companions, activeTags, injectedArtifactTags, presets, tagAffinities) {
  const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
  const explanations = [];
  const allActiveTags = new Set(activeTags);
  for (const t of injectedArtifactTags) {
    allActiveTags.add(t);
  }
  const hasHydro = allActiveTags.has("hydro_application");
  const hasCryo = allActiveTags.has("cryo_application");
  const hasPyro = allActiveTags.has("pyro_application");
  const hasElectro = allActiveTags.has("electro_application");
  const hasAnemo = allActiveTags.has("anemo_application");
  const hasGeo = allActiveTags.has("geo_application");
  const hasDendro = allActiveTags.has("dendro_application");
  const hasVV = allActiveTags.has("need_resistance_shred") || allActiveTags.has("debuff_elemental_res");
  const hasCompanionCoordinated = companions.some((c) => c.character.mechanics.some((m) => m.value === "coordinated_attacks" && (!m.minConstellation || c.constellation >= m.minConstellation)));
  const hasHydroCoordinated = companions.some((c) => c.character.element === "Hydro" && c.character.mechanics.some((m) => (m.value === "coordinated_attacks" || m.value === "raincutter") && (!m.minConstellation || c.constellation >= m.minConstellation)));
  let sScalingBuffs = 0;
  const carryNeeds = targetCarry.needs ?? [
    { value: "need_reaction_enabler", priority: 8 },
    { value: "need_attack_buff", priority: 8 },
    { value: "need_sustain", priority: 8 }
  ];
  for (const need of carryNeeds) {
    const baseValue = need.priority * 100;
    let matchSources = 0;
    if (need.value === "need_reaction_enabler") {
      if (targetCarry.element === "Pyro") {
        const hydroSources = companions.filter((c) => c.character.mechanics.some((m) => m.value === "hydro_application" && (!m.minConstellation || c.constellation >= m.minConstellation))).length;
        const cryoSources = companions.filter((c) => c.character.mechanics.some((m) => m.value === "cryo_application" && (!m.minConstellation || c.constellation >= m.minConstellation))).length;
        const pyroCount = fullTeam.filter((c) => c.element === "Pyro").length;
        if (hydroSources > 0)
          matchSources += hydroSources;
        else if (cryoSources > 0)
          matchSources += cryoSources;
        else if (pyroCount >= 3 && hasVV)
          matchSources += 1;
      } else if (targetCarry.element === "Hydro") {
        const pyroSources = companions.filter((c) => c.character.mechanics.some((m) => (m.value === "pyro_application" || m.value === "off_field_pyro_dmg") && (!m.minConstellation || c.constellation >= m.minConstellation))).length;
        if (pyroSources > 0)
          matchSources += pyroSources * 2;
      } else if (targetCarry.element === "Cryo") {
        const pyroSources = companions.filter((c) => c.character.mechanics.some((m) => (m.value === "pyro_application" || m.value === "off_field_pyro_dmg") && (!m.minConstellation || c.constellation >= m.minConstellation))).length;
        const hydroSources = companions.filter((c) => c.character.mechanics.some((m) => m.value === "hydro_application" && (!m.minConstellation || c.constellation >= m.minConstellation))).length;
        if (pyroSources > 0)
          matchSources += pyroSources;
        if (hydroSources > 0)
          matchSources += hydroSources;
      } else if (targetCarry.element === "Electro") {
        if (allActiveTags.has("hydro_application"))
          matchSources++;
        if (allActiveTags.has("cryo_application"))
          matchSources++;
        if (allActiveTags.has("pyro_application"))
          matchSources++;
        if (allActiveTags.has("dendro_application"))
          matchSources += 2;
      } else if (targetCarry.element === "Dendro") {
        const electroSources = companions.filter((c) => c.character.mechanics.some((m) => (m.value === "electro_application" || m.value === "off_field_electro_dmg") && (!m.minConstellation || c.constellation >= m.minConstellation))).length;
        if (electroSources > 0)
          matchSources += electroSources * 2;
      } else {
        if (allActiveTags.has("hydro_application"))
          matchSources++;
        if (allActiveTags.has("cryo_application"))
          matchSources++;
      }
    } else if (need.value === "need_dendro_shred") {
      if (allActiveTags.has("debuff_dendro_res"))
        matchSources += 2;
    } else if (need.value === "need_anemo_shred") {
      if (allActiveTags.has("debuff_anemo_res"))
        matchSources += 2;
      if (allActiveTags.has("debuff_all_res"))
        matchSources += 1;
      if (allActiveTags.has("debuff_defense"))
        matchSources += 1;
    } else if (need.value === "need_normal_attack_buff") {
      if (allActiveTags.has("buff_normal_attack_dmg"))
        matchSources += 2;
      if (allActiveTags.has("buff_attack_speed"))
        matchSources += 1;
    } else if (need.value === "need_coordinated_attacks") {
      if (allActiveTags.has("coordinated_attacks"))
        matchSources += 2;
    } else if (need.value === "need_resistance_shred") {
      const isSwirlable = ["Pyro", "Hydro", "Electro", "Cryo"].includes(targetCarry.element);
      if (isSwirlable) {
        if (allActiveTags.has("need_resistance_shred"))
          matchSources++;
        if (allActiveTags.has("debuff_elemental_res"))
          matchSources++;
      }
      if (allActiveTags.has("debuff_all_res"))
        matchSources++;
      if (allActiveTags.has(`debuff_${targetCarry.element.toLowerCase()}_res`))
        matchSources++;
      if (allActiveTags.has("debuff_defense"))
        matchSources++;
    } else if (need.value === "need_attack_buff") {
      if (allActiveTags.has("buff_attack"))
        matchSources++;
      if (allActiveTags.has("need_attack_buff"))
        matchSources++;
      if (allActiveTags.has("catalyst_buffer"))
        matchSources++;
    } else if (need.value === "need_interruption_resistance") {
      if (allActiveTags.has("interruption_resistance"))
        matchSources++;
      if (allActiveTags.has("shield"))
        matchSources++;
    } else if (need.value === "need_shield") {
      if (allActiveTags.has("shield"))
        matchSources++;
    } else if (need.value === "need_geo_partner") {
      const geoCount = fullTeam.filter((c) => c.element === "Geo").length;
      if (geoCount >= 2)
        matchSources += geoCount - 1;
    } else if (need.value === "need_freeze") {
      if (hasHydro && (hasCryo || targetCarry.element === "Cryo"))
        matchSources += 2;
    } else if (need.value === "need_defense_buff") {
      if (allActiveTags.has("buff_defense"))
        matchSources += 2;
    } else if (need.value === "need_offfield_electro_dmg") {
      if (allActiveTags.has("off_field_electro_dmg") || allActiveTags.has("coordinated_attacks"))
        matchSources += 2;
      else if (allActiveTags.has("electro_application"))
        matchSources += 1;
    } else if (need.value.startsWith("need_battery")) {
      const neededElement = need.value.replace("need_battery_", "").toLowerCase();
      const sameElementBatteries = companions.filter((c) => c.character.element.toLowerCase() === neededElement && (c.character.mechanics.some((m) => m.value === "battery") || c.character.name === "Ningguang" && c.constellation >= 2 || c.character.name === "Diona" || c.character.name === "Rosaria" || c.character.name === "Shenhe" || c.character.name === "Kaeya" || c.character.name === "Aloy" || c.character.name === "Sucrose" || c.character.name === "Jean" || c.character.name === "Venti" || c.character.name === "Fischl" || c.character.name === "Kujou Sara"));
      if (sameElementBatteries.length > 0) {
        matchSources += 2;
      } else if (allActiveTags.has("universal_battery")) {
        matchSources += 2;
      }
    } else if (need.value === "need_physical_shred") {
      if (allActiveTags.has("cryo_application") && (targetCarry.element === "Electro" || allActiveTags.has("electro_application")))
        matchSources += 2;
      if (allActiveTags.has("debuff_physical_res"))
        matchSources += 2;
      if (allActiveTags.has("debuff_all_res"))
        matchSources++;
      if (allActiveTags.has("debuff_defense"))
        matchSources++;
    } else if (need.value === "need_hydro_app" || need.value === "need_offfield_hydro_dmg") {
      if (allActiveTags.has("off_field_hydro_dmg") || allActiveTags.has("coordinated_attacks"))
        matchSources += 2;
      else if (allActiveTags.has("hydro_application"))
        matchSources += 1;
    } else if (need.value === "need_offfield_pyro_dmg" || need.value === "need_pyro_app") {
      if (allActiveTags.has("off_field_pyro_dmg"))
        matchSources += 2;
      else if (allActiveTags.has("pyro_application"))
        matchSources += 1;
    } else if (need.value === "need_sustain") {
      if (allActiveTags.has("healer") || allActiveTags.has("shield"))
        matchSources++;
    } else if (need.value === "need_crowd_control") {
      if (allActiveTags.has("crowd_control"))
        matchSources++;
    } else if (need.value === "need_offfield_dps") {
      if (allActiveTags.has("buff_electro_crit_dmg"))
        matchSources += 2;
      if (allActiveTags.has("off_field_pyro_dmg"))
        matchSources++;
      if (allActiveTags.has("off_field_hydro_dmg"))
        matchSources++;
      if (allActiveTags.has("off_field_electro_dmg"))
        matchSources++;
      if (allActiveTags.has("off_field_cryo_dmg"))
        matchSources++;
      if (allActiveTags.has("off_field_geo_dmg"))
        matchSources++;
    } else {
      if (allActiveTags.has(need.value))
        matchSources++;
    }
    let needScore = 0;
    for (let k = 1;k <= matchSources; k++) {
      if (k === 1)
        needScore += baseValue * 1;
      else if (k === 2)
        needScore += baseValue * 0.5;
      else
        needScore += baseValue * 0.25;
    }
    if (needScore > 0) {
      sScalingBuffs += Math.round(needScore);
      explanations.push(`Demanda satisfecha: ${need.value} (${matchSources} fuente(s) -> +${Math.round(needScore)} pts)`);
    }
  }
  let sAmplification = 0;
  let detectedArchetype = "Sinergia Balanceada";
  if (targetCarry.damageProfile === "Physical Melee" || targetCarry.name === "Razor" || targetCarry.name === "Eula" || targetCarry.name === "Xinyan") {
    const hasCryoApp = hasCryo || targetCarry.element === "Cryo";
    const hasElectroApp = hasElectro || targetCarry.element === "Electro";
    if (hasCryoApp && hasElectroApp) {
      sAmplification = 1000;
      if (allActiveTags.has("buff_superconduct_dmg")) {
        sAmplification += 200;
        explanations.push(`Multiplicador físico: Superconductor Estelar mejorado (-40% RES Física + daño de reacción aumentado -> +${sAmplification} pts)`);
      } else {
        explanations.push(`Multiplicador físico: Superconductor (-40% RES Física enemigo -> +1000 pts)`);
      }
      detectedArchetype = "Superconductor Físico";
    }
  } else if (targetCarry.element === "Pyro") {
    let vapeScore = 0;
    let meltScore = 0;
    let monoPyroScore = 0;
    if (hasHydro) {
      vapeScore = 1000;
      if (allActiveTags.has("buff_vaporize_dmg") || allActiveTags.has("hexerei_vaporize_bonus")) {
        vapeScore += 200;
      }
      if (hasHydroCoordinated) {
        vapeScore += 350;
      } else if (allActiveTags.has("off_field_hydro_dmg")) {
        vapeScore += 150;
      }
    }
    if (hasCryo) {
      meltScore = 900;
      const hasCloseCryo = companions.some((c) => c.character.name === "Kaeya" || c.character.name === "Rosaria");
      if (hasCloseCryo)
        meltScore += 100;
    }
    const pyroCount = fullTeam.filter((c) => c.element === "Pyro").length;
    if (pyroCount >= 3 && hasVV) {
      monoPyroScore = 950;
    }
    if (vapeScore >= meltScore && vapeScore >= monoPyroScore && vapeScore > 0) {
      sAmplification = vapeScore;
      detectedArchetype = "Vaporizados";
      explanations.push(`Multiplicador ofensivo: Vaporizado continuo (+${vapeScore} pts)`);
    } else if (meltScore >= vapeScore && meltScore >= monoPyroScore && meltScore > 0) {
      sAmplification = meltScore;
      detectedArchetype = "Derretidos";
      explanations.push(`Multiplicador ofensivo: Derretido orbital (+${meltScore} pts)`);
    } else if (monoPyroScore > 0) {
      sAmplification = monoPyroScore;
      detectedArchetype = "Mono Pyro Hipercarry";
      explanations.push(`Multiplicador ofensivo: Mono Pyro concentrado (+${monoPyroScore} pts)`);
    }
  } else if (targetCarry.element === "Hydro") {
    if (hasPyro || allActiveTags.has("off_field_pyro_dmg")) {
      sAmplification = 1000;
      detectedArchetype = targetCarry.name === "Kamisato Ayato" ? "Ayato Vaporizado" : "Vaporizados (Internacional)";
      explanations.push(`Multiplicador ofensivo: Vaporizado continuo con acompañante Pyro (+1000 pts)`);
    } else if (hasElectro && hasDendro) {
      sAmplification = 950;
      detectedArchetype = "Hiperflorecimiento";
      explanations.push(`Multiplicador elemental: Hiperflorecimiento (Dendro + Hydro + Electro) (+950 pts)`);
    } else if (hasElectro) {
      sAmplification = 850;
      detectedArchetype = targetCarry.name === "Sangonomiya Kokomi" ? "Kokomi Taser" : targetCarry.name === "Kamisato Ayato" ? "Ayato Taser" : "Electro-Charged / Taser";
      explanations.push(`Multiplicador elemental: Electrocargado continuo (+850 pts)`);
    }
  } else if (targetCarry.element === "Dendro") {
    if (hasElectro) {
      sAmplification = 1100;
      detectedArchetype = "Tighnari Spread";
      explanations.push("Multiplicador elemental: Aceleración y Propagación (Spread) continua (+1100 pts)");
    } else if (hasHydro) {
      sAmplification = 600;
      detectedArchetype = "Florecimiento (Bloom)";
      explanations.push("Multiplicador elemental: Florecimiento (+600 pts)");
    }
  } else if (targetCarry.element === "Cryo") {
    let meltScore = 0;
    let freezeScore = 0;
    if (hasPyro || allActiveTags.has("off_field_pyro_dmg")) {
      meltScore = 1000;
    }
    if (hasHydro && (allActiveTags.has("crowd_control") || allActiveTags.has("need_freeze") || targetCarry.name === "Kamisato Ayaka")) {
      freezeScore = 1000;
      if (allActiveTags.has("crowd_control"))
        freezeScore += 100;
    }
    if (targetCarry.name === "Kamisato Ayaka" && freezeScore > 0) {
      sAmplification = freezeScore;
      detectedArchetype = "Ayaka Permafrost";
      explanations.push(`Multiplicador ofensivo: Permafrost permanente para Soumetsu (+${freezeScore} pts)`);
    } else if (meltScore >= freezeScore && meltScore > 0) {
      sAmplification = meltScore;
      detectedArchetype = "Derretidos (Melt Ganyu)";
      explanations.push(`Multiplicador ofensivo: Derretido cargado (+${meltScore} pts)`);
    } else if (freezeScore > 0) {
      sAmplification = freezeScore;
      detectedArchetype = "Permafrost / Morgana";
      explanations.push(`Multiplicador ofensivo: Congelamiento permanente con CC (+${freezeScore} pts)`);
    }
  } else if (targetCarry.element === "Anemo") {
    if (targetCarry.name === "Shikanoin Heizou") {
      if (hasPyro && hasHydro) {
        sAmplification = 1400;
        detectedArchetype = "Heizou Nacional";
        explanations.push("Multiplicador elemental: Vaporizado conducido con Torbellinos en área (Heizou Nacional) (+1400 pts)");
      } else if (hasHydro && hasElectro) {
        sAmplification = 1200;
        detectedArchetype = "Heizou Taser";
        explanations.push("Multiplicador elemental: Doble Torbellino Electrocargado continuo (Heizou Taser) (+1200 pts)");
      } else {
        sAmplification = 800;
        detectedArchetype = "Heizou Driver";
        explanations.push("Multiplicador Anemo: Driver cuerpo a cuerpo con Torbellinos continuos (+800 pts)");
      }
    } else if (targetCarry.name === "Xiao") {
      if (allActiveTags.has("battery")) {
        sAmplification = 1000;
        detectedArchetype = "Xiao Hypercarry";
        explanations.push("Multiplicador Anemo: Rotación fluida de Ataques Descendentes (+1000 pts)");
      }
    } else if (allActiveTags.has("battery")) {
      sAmplification = 1000;
      detectedArchetype = "Anemo Swirl/Burst";
      explanations.push("Multiplicador Anemo: Rotación fluida con batería elemental (+1000 pts)");
    }
  } else if (targetCarry.element === "Geo") {
    const geoCount = fullTeam.filter((c) => c.element === "Geo").length;
    if (geoCount >= 3 && allActiveTags.has("buff_defense")) {
      sAmplification = 1100;
      if (geoCount >= 4 || targetCarry.name === "Arataki Itto") {
        detectedArchetype = "Mono Geo Hiperdefensa";
      } else {
        detectedArchetype = "Triple Geo";
      }
      explanations.push("Multiplicador Geo: Hiperdefensa escalada con Gorou (+1100 pts)");
    } else if (geoCount >= 2) {
      sAmplification = 900;
      if (allActiveTags.has("shield"))
        sAmplification += 100;
      const pyroCount = fullTeam.filter((c) => c.element === "Pyro").length;
      if (pyroCount >= 2) {
        detectedArchetype = "Doble Geo Doble Pyro";
      } else {
        detectedArchetype = "Doble Geo";
      }
      explanations.push(`Multiplicador Geo: Resonancia Geo + Daño de cristalización (+${sAmplification} pts)`);
    }
  } else if (targetCarry.element === "Electro") {
    if (targetCarry.name === "Shogun Raiden") {
      if (hasPyro && hasHydro) {
        sAmplification = 1100;
        if (hasCompanionCoordinated) {
          sAmplification += 300;
          explanations.push("Multiplicador elemental: Sobrecarga y Electro-Vaporizado continuo coordinado en equipo Nacional (+1400 pts)");
        } else {
          explanations.push("Multiplicador elemental: Sobrecarga y Electro-Vaporizado en equipo Nacional (+1100 pts)");
        }
        detectedArchetype = "Raiden National";
      } else if (allActiveTags.has("buff_electro_crit_dmg") || hasVV) {
        sAmplification = 1000;
        detectedArchetype = "Raiden Hypercarry";
        explanations.push("Multiplicador elemental: Electro Hipercarry concentrado (+1000 pts)");
      } else if (hasDendro) {
        sAmplification = 1000;
        detectedArchetype = "Aceleración / Aggravate";
        explanations.push("Multiplicador elemental: Aceleración e Intensificación (Aggravate) (+1000 pts)");
      } else if (hasHydro) {
        sAmplification = 850;
        detectedArchetype = "Electro-Charged / Taser";
        explanations.push("Multiplicador elemental: Electrocargado continuo (+850 pts)");
      }
    } else if (hasHydro) {
      sAmplification = 800;
      detectedArchetype = "Electro-Charged / Taser";
      explanations.push(`Multiplicador elemental: Electrocargado continuo (+800 pts)`);
    } else if (hasCryo) {
      sAmplification = 700;
      detectedArchetype = "Superconductor";
    }
  }
  let sBlueprint = 0;
  for (const preset of presets) {
    if (preset.composition.targetCarryName && preset.composition.targetCarryName !== targetCarry.name) {
      continue;
    }
    if ((targetCarry.damageProfile === "Physical Melee" || targetCarry.name === "Xinyan") && (preset.composition.archetype === "Vaporizados Clásico" || preset.composition.archetype === "Vaporizados" || preset.composition.archetype === "Derretidos" || preset.composition.archetype === "Mono Pyro Hipercarry" || preset.composition.archetype === "Sunfire Pyro Vaporizado")) {
      continue;
    }
    if (preset.composition.carryElement && preset.composition.carryElement !== targetCarry.element) {
      continue;
    }
    let matches = 0;
    const reqTags = preset.composition.requiredTags ?? [];
    for (const rt of reqTags) {
      if (rt === "coordinated_attacks") {
        if (targetCarry.element === "Pyro" && preset.composition.archetype.includes("Vaporizado")) {
          if (hasHydroCoordinated)
            matches++;
        } else if (hasCompanionCoordinated) {
          matches++;
        }
      } else if (allActiveTags.has(rt)) {
        matches++;
      }
    }
    const teamElems = fullTeam.map((c) => c.element).sort();
    const presetElems = preset.composition.elements ? [...preset.composition.elements].sort() : [];
    let elemsMatch = false;
    if (presetElems.length === 4) {
      elemsMatch = teamElems.every((el, idx) => el === presetElems[idx]);
    } else if (presetElems.length > 0) {
      elemsMatch = presetElems.every((el) => teamElems.includes(el));
    } else {
      elemsMatch = true;
    }
    if (reqTags.length > 0 && matches === reqTags.length) {
      if (elemsMatch) {
        let bonus = preset.composition.targetCarryName ? 1600 : 1500;
        if (preset.composition.targetCarryName && preset.composition.requiredTags?.some((t) => t.includes("flat_dmg") || t.includes("crit_dmg"))) {
          bonus = 1650;
        }
        if (bonus > sBlueprint) {
          sBlueprint = bonus;
          if (preset.composition.archetype) {
            detectedArchetype = preset.composition.archetype;
          }
        }
      } else {
        const partial = 1000;
        if (partial > sBlueprint) {
          sBlueprint = partial;
          if (detectedArchetype === "Sinergia Balanceada" && preset.composition.archetype) {
            detectedArchetype = preset.composition.archetype;
          }
        }
      }
    } else if (reqTags.length > 0 && matches >= reqTags.length - 1) {
      const partial = 1000;
      if (partial > sBlueprint)
        sBlueprint = partial;
    }
  }
  if (sBlueprint > 0) {
    explanations.push(`Blueprint Meta reconocido: ${detectedArchetype} (+${sBlueprint} pts)`);
  }
  let sResonance = 0;
  const elementCounts = new Map;
  for (const c of fullTeam) {
    elementCounts.set(c.element, (elementCounts.get(c.element) ?? 0) + 1);
  }
  const scalesWithAtk = targetCarry.damageProfile !== "Geo Tank";
  if ((elementCounts.get("Pyro") ?? 0) >= 2) {
    const val = scalesWithAtk ? 400 : 150;
    sResonance += val;
    explanations.push(`Resonancia Pyro (+25% ATK -> +${val} pts)`);
  }
  if ((elementCounts.get("Geo") ?? 0) >= 2) {
    const isGeoCarry = targetCarry.element === "Geo";
    const val = isGeoCarry ? 500 : 300;
    sResonance += val;
    explanations.push(isGeoCarry ? `Resonancia Geo (+15% Daño protegido por escudo y -20% RES Geo -> +500 pts)` : `Resonancia Geo (+15% Daño protegido por escudo -> +300 pts)`);
  }
  if ((elementCounts.get("Cryo") ?? 0) >= 2) {
    sResonance += 350;
    explanations.push(`Resonancia Cryo (+15% Prob. Crítico -> +350 pts)`);
  }
  if ((elementCounts.get("Hydro") ?? 0) >= 2) {
    const hpBeneficiary = targetCarry.name === "Hu Tao" || fullTeam.some((c) => c.name === "Yelan");
    const val = hpBeneficiary ? 500 : 350;
    sResonance += val;
    explanations.push(`Resonancia Hydro (+25% Vida Máxima -> +${val} pts)`);
  }
  if ((elementCounts.get("Electro") ?? 0) >= 2) {
    sResonance += 250;
    explanations.push(`Resonancia Electro (Generación de partículas elementales -> +250 pts)`);
  }
  let sMicroAffinities = 0;
  const hasJean = companions.some((c) => c.character.name === "Jean");
  const hasBennett = companions.some((c) => c.character.name === "Bennett");
  if (hasJean && hasBennett) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Motor Sunfire (Jean Q + Bennett Q) remolinos Pyro continuos (+300 pts)");
  }
  const hasXiangling = companions.some((c) => c.character.name === "Xiangling");
  if (hasBennett && hasXiangling) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Batería Bennett alimentando Pyronado de Xiangling (+500 pts)");
  }
  const hasFischl = companions.some((c) => c.character.name === "Fischl");
  if ((hasFischl || hasXiangling) && hasBennett) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Habilidad Snapshot fijando el buff de ATK (+300 pts)");
  }
  if (hasBennett && targetCarry.element === "Pyro" && targetCarry.name !== "Bennett") {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Batería Bennett alimentando al Carry Pyro (+300 pts)");
  }
  if (hasBennett && targetCarry.element !== "Pyro" && scalesWithAtk && targetCarry.name !== "Bennett") {
    sMicroAffinities += 300;
    explanations.push(`Micro-afinidad: Viaje Fantástico de Bennett hiperbufa el ATK base de ${targetCarry.name} en campo (+300 pts)`);
  }
  if (hasFischl && targetCarry.element === "Electro" && targetCarry.name !== "Fischl" && targetCarry.name !== "Shogun Raiden") {
    sMicroAffinities += 300;
    explanations.push(`Micro-afinidad: Batería Electro (Oz de Fischl) recargando la Definitiva de ${targetCarry.name} (+300 pts)`);
  }
  const hasEMBuffer = allActiveTags.has("buff_elemental_mastery");
  if (hasEMBuffer && (hasHydro || hasCryo) && targetCarry.element === "Pyro" && targetCarry.damageProfile !== "Physical Melee") {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Buffer de Maestría Elemental potenciando reacciones de amplificación (+300 pts)");
  }
  if (hasCompanionCoordinated && (targetCarry.damageProfile === "Pyro Melee" || targetCarry.damageProfile === "Pyro Melee Fast" || targetCarry.damageProfile === "Pyro Ranged Fast" || targetCarry.damageProfile === "Electro Fast Melee" || targetCarry.damageProfile === "Electro Fast" || targetCarry.damageProfile === "Physical Melee" || targetCarry.damageProfile === "Hydro Fast Melee" || targetCarry.name === "Hu Tao" || targetCarry.name === "Yoimiya" || targetCarry.name === "Shogun Raiden")) {
    sMicroAffinities += 350;
    explanations.push("Micro-afinidad: Ataques coordinados activados fluidamente por el Carry (+350 pts)");
  }
  if (allActiveTags.has("universal_battery")) {
    sMicroAffinities += 350;
    explanations.push("Micro-afinidad: Batería Universal (Musou Isshin de Raiden) recargando energía de todo el equipo (+350 pts)");
  }
  const teamHasBurstDamage = targetCarry.damageProfile?.includes("Burst") || targetCarry.name === "Shogun Raiden" || targetCarry.name === "Kamisato Ayaka" || targetCarry.name === "Eula" || targetCarry.name === "Tartaglia" || fullTeam.some((c) => c.name === "Xiangling" || c.name === "Xingqiu" || c.name === "Beidou" || c.name === "Rosaria");
  if (allActiveTags.has("buff_burst_dmg") && teamHasBurstDamage) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Ojo del Castigo Atronador potencia el daño de las Definitivas (+300 pts)");
  }
  if (allActiveTags.has("buff_electro_crit_dmg") && (targetCarry.element === "Electro" || hasElectro)) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Danza Tengu C6 otorga +60% Daño Crítico Electro (+500 pts)");
  }
  if (targetCarry.name === "Shogun Raiden" && hasBennett && allActiveTags.has("buff_electro_crit_dmg")) {
    sMicroAffinities += 400;
    explanations.push("Micro-afinidad: Dúo Hiperbuffer insustituible (Bennett ATK + Sara C6 CRIT Electro) (+400 pts)");
  }
  if (allActiveTags.has("buff_geo_crit_dmg") && targetCarry.element === "Geo" && targetCarry.name !== "Sangonomiya Kokomi") {
    sMicroAffinities += 400;
    explanations.push("Micro-afinidad: Colmillo del General C6 otorga hasta +40% Daño Crítico Geo (+400 pts)");
  }
  if (allActiveTags.has("buff_defense") && (targetCarry.name === "Noelle" || targetCarry.name === "Arataki Itto" || targetCarry.damageProfile?.includes("DEF Scaling"))) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Estandarte de Gorou otorga Bono de Defensa y Resistencia a Interrupción (+300 pts)");
  }
  if (allActiveTags.has("magnetize_crystallize") && (targetCarry.element === "Geo" || targetCarry.damageProfile?.includes("DEF Scaling"))) {
    sMicroAffinities += 200;
    explanations.push("Micro-afinidad: Succión magnética de fragmentos de Cristalización garantizando uptime de escudos (+200 pts)");
  }
  if (allActiveTags.has("buff_normal_attack_dmg") && (targetCarry.damageProfile === "Pyro Ranged Fast" || targetCarry.damageProfile === "Physical Melee" || targetCarry.name === "Yoimiya" || targetCarry.name === "Razor" || targetCarry.name === "Noelle")) {
    sMicroAffinities += 250;
    explanations.push("Micro-afinidad: Bono de Daño a Ataques Normales en Carry rápido (+250 pts)");
  }
  const hasNingguang = fullTeam.some((c) => c.name === "Ningguang");
  const hasOtherGeo = fullTeam.some((c) => c.name !== "Ningguang" && c.element === "Geo");
  if (hasNingguang && hasOtherGeo && targetCarry.element === "Geo") {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Pantalla de Jade otorga +12% Bono Geo a aliado (+300 pts)");
  }
  if (allActiveTags.has("debuff_all_res")) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Escudo de Jade de Zhongli tritura -20% todas las resistencias enemigas (+300 pts)");
  }
  if (allActiveTags.has("buff_crit_rate") && targetCarry.name !== "Rosaria") {
    sMicroAffinities += 250;
    explanations.push("Micro-afinidad: Bono de Probabilidad de Crítico compartido al Carry (+250 pts)");
  }
  const hexereiCount = fullTeam.filter((c) => c.alignmentClass === "Hexerei").length;
  if (hexereiCount >= 2) {
    sMicroAffinities += 300;
    explanations.push(`Micro-afinidad: Rito Hexerei activo (${hexereiCount} brujas en equipo -> +300 pts)`);
  }
  const isPHECCarry = ["Pyro", "Hydro", "Electro", "Cryo"].includes(targetCarry.element);
  const isPhysicalCarry = targetCarry.damageProfile?.toLowerCase().includes("physical");
  const hasElementalDmgBonus = isPHECCarry && !isPhysicalCarry && allActiveTags.has("buff_elemental_dmg");
  const hasDmgBonus = allActiveTags.has("buff_all_dmg") || hasElementalDmgBonus || allActiveTags.has(`buff_${targetCarry.element.toLowerCase()}_dmg`);
  if (hasDmgBonus) {
    sMicroAffinities += 400;
    explanations.push("Multiplicador de Daño: Bono de Daño Elemental / Universal al equipo (+400 pts)");
  }
  if (allActiveTags.has("buff_flat_dmg")) {
    sMicroAffinities += 300;
    explanations.push("Daño Plano Adicional: Son de Antaño convierte curación acumulada en daño de impacto (+300 pts)");
  }
  if (allActiveTags.has("buff_swirl_dmg") && fullTeam.some((c) => c.element === "Anemo")) {
    sMicroAffinities += 200;
    explanations.push("Micro-afinidad: Torbellino Estelar amplificado (Witch Revelation + Dispersión Cryo/Anemo) (+200 pts)");
  }
  if (targetCarry.name === "Tighnari" && hasElectro) {
    sMicroAffinities += 600;
    explanations.push("Micro-afinidad: Aceleración / Propagación (Spread) alimentada por Electro off-field (+600 pts)");
    if (hasFischl || fullTeam.some((c) => c.name === "Yae Miko")) {
      sMicroAffinities += 450;
      explanations.push("Micro-afinidad: Sinergia Electro de alta cadencia para Aceleración (Oz / Cerezos Kitsune) (+450 pts)");
    }
  }
  if (allActiveTags.has("buff_cryo_flat_dmg") && (targetCarry.element === "Cryo" || hasCryo)) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Plumas Glaciares de Shenhe (Icy Quills) inyectan daño plano masivo a golpes Cryo (+500 pts)");
    if (targetCarry.name === "Kamisato Ayaka") {
      sMicroAffinities += 500;
      explanations.push("Micro-afinidad: Núcleo Cryo Supremo (Ayaka Soumetsu + Shenhe Plumas Glaciares) (+500 pts)");
      if (fullTeam.some((c) => c.name === "Kaedehara Kazuha")) {
        sMicroAffinities += 350;
        explanations.push("Micro-afinidad: Agrupación y Bono Cryo masivo de Kazuha para la tormenta de Soumetsu (+350 pts)");
      }
    }
  }
  const hasNormalAttackFocus = targetCarry.name === "Yoimiya" || targetCarry.name === "Kamisato Ayato" || targetCarry.name === "Noelle" || targetCarry.damageProfile?.includes("Normal") || targetCarry.damageProfile?.includes("Fast");
  const hasYunJin = fullTeam.some((c) => c.name === "Yun Jin");
  if (hasYunJin && hasNormalAttackFocus) {
    sMicroAffinities += 400;
    explanations.push(`Micro-afinidad: Formación de las Nubes de Yun Jin bufa los Ataques Normales de ${targetCarry.name} (+400 pts)`);
  }
  const hasXingqiu = fullTeam.some((c) => c.name === "Xingqiu");
  const hasYelan = fullTeam.some((c) => c.name === "Yelan");
  if ((targetCarry.name === "Hu Tao" || targetCarry.name === "Yoimiya") && hasXingqiu && hasYelan) {
    sMicroAffinities += 500;
    explanations.push(`Micro-afinidad: Doble Hydro insustituible (Xingqiu + Yelan) garantizando vaporización perfecta y +25% Vida (+500 pts)`);
  }
  if (targetCarry.name === "Hu Tao") {
    const hasZhongli = fullTeam.some((c) => c.name === "Zhongli");
    const hasAlbedo = fullTeam.some((c) => c.name === "Albedo");
    if (hasZhongli && hasAlbedo) {
      sMicroAffinities += 300;
      explanations.push("Micro-afinidad: Núcleo Doble Geo clásico (Zhongli Escudo + Albedo Daño Off-field y Maestría Elemental) (+300 pts)");
    }
  }
  if (targetCarry.name === "Arataki Itto") {
    const hasGorou = fullTeam.some((c) => c.name === "Gorou");
    const hasAlbedo = fullTeam.some((c) => c.name === "Albedo");
    if (hasGorou && hasAlbedo) {
      sMicroAffinities += 400;
      explanations.push("Micro-afinidad: Núcleo Geo de Hiperdefensa (Gorou + Albedo alimentando a Itto) (+400 pts)");
    }
  }
  if (targetCarry.element === "Anemo" && (allActiveTags.has("debuff_anemo_res") || allActiveTags.has("debuff_all_res"))) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Trituración de Resistencia Anemo genuina activa (Zhongli / Jean C4 / Faruzan) (+500 pts)");
  }
  if (targetCarry.name === "Shikanoin Heizou") {
    if (hasCompanionCoordinated) {
      sMicroAffinities += 400;
      explanations.push("Micro-afinidad: Heizou Driver en campo activa ataques coordinados a máxima cadencia (+400 pts)");
    }
    if (hasPyro || hasHydro || hasElectro) {
      sMicroAffinities += 300;
      explanations.push("Micro-afinidad: Pasiva A4 (Razonamiento penetrante) comparte +80 ME tras Torbellino (+300 pts)");
    }
    if (hasCompanionCoordinated && (hasPyro || hasElectro || hasHydro)) {
      sMicroAffinities += 300;
      explanations.push("Micro-afinidad: Torbellinos continuos alimentan 4 cargas de Declinación para Puñetazo Fudou de Convicción (+300 pts)");
    }
  }
  let pPenalties = 0;
  const hasHealer = allActiveTags.has("healer");
  const hasShield = allActiveTags.has("shield");
  if (!hasHealer && !hasShield) {
    pPenalties += 1500;
    explanations.push("Penalización crítica: Ausencia total de sustain (sin curador ni escudo -> -1500 pts)");
  }
  const hasDedicatedHealer = companions.some((c) => c.character.name !== "Xingqiu" && c.character.mechanics.some((m) => (m.value === "healer" || m.value === "continuous_healing") && (!m.minConstellation || c.constellation >= m.minConstellation)));
  if (targetCarry.name === "Hu Tao" && hasDedicatedHealer) {
    pPenalties += 250;
    explanations.push("Penalización leve: Curador continuo eleva vida por encima del 50% reduciendo bono A4 (-250 pts)");
  }
  if (targetCarry.damageProfile === "Pyro Melee" && hasElectro && !hasHydro) {
    pPenalties += 600;
    explanations.push("Penalización táctica: Sobrecarga empuja enemigos fuera del rango cuerpo a cuerpo (-600 pts)");
  }
  const hasBattery = allActiveTags.has("battery");
  if (hasXiangling && !hasBattery) {
    pPenalties += 250;
    explanations.push("Penalización energética moderada: Xiangling sin batería en el equipo (-250 pts)");
  }
  if (targetCarry.name === "Noelle") {
    const hasGeoBattery = companions.some((c) => c.character.name === "Ningguang" && c.constellation >= 2 || c.character.name === "Gorou" || c.character.name === "Albedo" || c.character.name === "Shogun Raiden") || allActiveTags.has("universal_battery");
    if (!hasGeoBattery) {
      pPenalties += 600;
      explanations.push("Penalización de rotación: Noelle sin batería Geo de recarga rápida (-600 pts)");
    }
  }
  const hasOtherHydro = companions.some((c) => c.character.element === "Hydro");
  if (targetCarry.name === "Tartaglia" && hasOtherHydro) {
    pPenalties += 600;
    explanations.push("Penalización táctica: Doble Hydro con Tartaglia satura el aura e impide el control elemental Anemo por Torbellino (-600 pts)");
  }
  const hasBeidou = companions.some((c) => c.character.name === "Beidou");
  if (targetCarry.name === "Shogun Raiden" && hasBeidou) {
    pPenalties += 1000;
    explanations.push("Penalización crítica: Ruptura mecánica (los ataques en Definitiva de Raiden no pueden activar las descargas de Beidou) (-1000 pts)");
  }
  if (targetCarry.element === "Cryo" && (allActiveTags.has("need_freeze") || targetCarry.name === "Kamisato Ayaka") && hasElectro) {
    pPenalties += 800;
    explanations.push("Penalización táctica: Electro en equipo Permafrost consume auras y desestabiliza la congelación (-800 pts)");
  }
  if (targetCarry.name === "Yoimiya" && !hasShield) {
    pPenalties += 400;
    explanations.push("Penalización táctica: Yoimiya sin escudo sufre interrupciones críticas que reinician su combo N5 (-400 pts)");
  }
  if (targetCarry.name === "Sangonomiya Kokomi" && allActiveTags.has("buff_crit_rate")) {
    pPenalties += 250;
    explanations.push("Penalización mecánica: Buff de Probabilidad de Crítico anulado por pasiva (-100% CRIT) (-250 pts)");
  }
  if (targetCarry.name === "Tighnari" && hasHydro) {
    pPenalties += 400;
    explanations.push("Penalización táctica: Hidro genera Florecimiento descontrolado, consumiendo el aura Dendro y privando a Tighnari de Propagación (-400 pts)");
  }
  if (targetCarry.name === "Arataki Itto") {
    const hasGeoBattery = companions.some((c) => c.character.name === "Gorou" || c.character.name === "Albedo" || c.character.name === "Zhongli" || c.character.name === "Ningguang" && c.constellation >= 2) || allActiveTags.has("universal_battery");
    if (!hasGeoBattery) {
      pPenalties += 600;
      explanations.push("Penalización de rotación: Arataki Itto sin batería Geo para sostener su Definitiva de 70 de coste (-600 pts)");
    }
  }
  const hasPHECOffField = allActiveTags.has("off_field_pyro_dmg") || allActiveTags.has("off_field_hydro_dmg") || allActiveTags.has("off_field_electro_dmg") || allActiveTags.has("off_field_cryo_dmg");
  const hasVVAssigned = injectedArtifactTags.includes("need_resistance_shred");
  if (targetCarry.element === "Anemo" && hasVVAssigned && !hasPHECOffField) {
    pPenalties += 400;
    explanations.push("Penalización táctica: Sombra Verde Esmeralda (VV) no reduce Resistencia Anemo ni potencia ataques Anemo (-400 pts)");
  }
  const hasGorou = companions.some((c) => c.character.name === "Gorou");
  const isDefOrGeoCarry = targetCarry.element === "Geo" || targetCarry.damageProfile?.includes("DEF Scaling") || targetCarry.name === "Noelle" || targetCarry.name === "Arataki Itto";
  if (hasGorou && !isDefOrGeoCarry) {
    pPenalties += 800;
    explanations.push("Penalización táctica: Gorou es un buffer hiperespecializado en DEF/Geo; en este equipo sus aumentos de Defensa y Daño Crítico Geo son completamente desperdiciados (-800 pts)");
  }
  const totalScore = sScalingBuffs + sAmplification + sBlueprint + sResonance + sMicroAffinities - pPenalties;
  return {
    totalScore,
    breakdown: {
      scalingBuffs: sScalingBuffs,
      amplification: sAmplification,
      blueprint: sBlueprint,
      resonance: sResonance,
      microAffinities: sMicroAffinities,
      penalties: pPenalties
    },
    detectedArchetype,
    explanations
  };
}
function getEffectiveRoles(character, constellation = 0) {
  let roles = [...character.roles];
  if (character.name === "Klee") {
    if (constellation < 2) {
      roles = roles.filter((r) => r.toLowerCase() !== "support");
    } else if (!roles.some((r) => r.toLowerCase() === "support")) {
      roles.push("Support");
    }
  }
  if (character.name === "Razor") {
    if (constellation >= 4) {
      if (!roles.some((r) => r.toLowerCase() === "support")) {
        roles.push("Support");
      }
    } else {
      roles = roles.filter((r) => r.toLowerCase() !== "support");
    }
  }
  if (character.name === "Amber") {
    if (constellation >= 6) {
      if (!roles.some((r) => r.toLowerCase() === "support")) {
        roles.push("Support");
      }
    } else {
      roles = roles.filter((r) => r.toLowerCase() !== "support");
    }
  }
  return roles;
}
function findOptimalTeams(input, catalog = DEFAULT_CATALOG) {
  const targetCarry = catalog.characters.find((c) => c.id === input.targetCharacterId || String(c.id) === String(input.targetCharacterId));
  if (!targetCarry) {
    throw new Error(`Personaje carry con ID ${input.targetCharacterId} no encontrado en catálogo.`);
  }
  const blacklist = new Set((input.blacklist ?? []).map(String));
  const candidateEntries = [];
  for (const item of input.inventory) {
    const charIdStr = String(item.characterId);
    if (charIdStr === String(targetCarry.id))
      continue;
    if (blacklist.has(charIdStr))
      continue;
    const charData = catalog.characters.find((c) => c.id === item.characterId || String(c.id) === charIdStr);
    if (!charData)
      continue;
    const eligibleRoles = ["sub-dps", "support", "healer"];
    const charConstellation = item.constellation ?? 0;
    const effectiveRoles = getEffectiveRoles(charData, charConstellation);
    const hasEligibleRole = effectiveRoles.some((r) => eligibleRoles.includes(r.toLowerCase()));
    if (hasEligibleRole) {
      candidateEntries.push({
        character: charData,
        constellation: charConstellation
      });
    }
  }
  const K = candidateEntries.length;
  if (K < 3) {
    return [];
  }
  const antiTagValues = new Set((targetCarry.antiTags ?? []).map((at) => at.value));
  const evaluatedTeams = [];
  for (let i = 0;i < K - 2; i++) {
    for (let j = i + 1;j < K - 1; j++) {
      for (let k = j + 1;k < K; k++) {
        const trio = [
          candidateEntries[i],
          candidateEntries[j],
          candidateEntries[k]
        ];
        let hasConflict = false;
        for (const comp of trio) {
          for (const m of comp.character.mechanics) {
            if (m.minConstellation && comp.constellation < m.minConstellation) {
              continue;
            }
            if (antiTagValues.has(m.value)) {
              hasConflict = true;
              break;
            }
          }
          if (hasConflict)
            break;
        }
        if (hasConflict)
          continue;
        const activeTags = new Set;
        for (const m of targetCarry.mechanics) {
          activeTags.add(m.value);
        }
        for (const comp of trio) {
          for (const m of comp.character.mechanics) {
            if (m.minConstellation && comp.constellation < m.minConstellation) {
              continue;
            }
            activeTags.add(m.value);
          }
        }
        const fullTeamChars = [targetCarry, ...trio.map((c) => c.character)];
        const hexereiCount = fullTeamChars.filter((c) => c.alignmentClass === "Hexerei").length;
        const witchCount = fullTeamChars.filter((c) => c.alignmentClass === "Witch").length;
        for (const comp of trio) {
          for (const m of comp.character.mechanics) {
            if (m.minAlignmentCount) {
              const alignCount = comp.character.alignmentClass === "Hexerei" ? hexereiCount : witchCount;
              if (alignCount >= m.minAlignmentCount) {
                activeTags.add(m.value);
              }
            }
          }
        }
        const { assignments, injectedTags } = bindSupportArtifacts(trio, targetCarry, catalog.artifactSets, catalog.artifactBinds);
        const scoreResult = calculateTeamScore(targetCarry, trio, activeTags, injectedTags, catalog.presets, catalog.tagAffinities);
        const carryInventory = input.inventory.find((inv) => inv.characterId === targetCarry.id || String(inv.characterId) === String(targetCarry.id));
        const carryConstellation = carryInventory?.constellation ?? 0;
        evaluatedTeams.push({
          rank: 0,
          archetype: scoreResult.detectedArchetype,
          totalScore: scoreResult.totalScore,
          team: [
            {
              id: targetCarry.id,
              name: targetCarry.name,
              element: targetCarry.element,
              role: "Main DPS",
              constellation: carryConstellation
            },
            ...trio.map((c) => {
              const compRoles = getEffectiveRoles(c.character, c.constellation);
              const displayRole = compRoles.find((r) => r.toLowerCase() !== "main dps") ?? compRoles[0] ?? "Support";
              return {
                id: c.character.id,
                name: c.character.name,
                element: c.character.element,
                role: displayRole,
                constellation: c.constellation
              };
            })
          ],
          scoreBreakdown: scoreResult.breakdown,
          artifactAssignments: assignments,
          synergyTags: Array.from(activeTags).concat(injectedTags),
          explanations: scoreResult.explanations
        });
      }
    }
  }
  evaluatedTeams.sort((a, b) => b.totalScore - a.totalScore);
  const topTeams = evaluatedTeams.slice(0, 5);
  topTeams.forEach((team, idx) => {
    team.rank = idx + 1;
  });
  return topTeams;
}
function calcularSinergiaEquipo(equipo, tablaAfinidad) {
  let score = 0;
  for (let i = 0;i < equipo.length; i++) {
    for (let j = i + 1;j < equipo.length; j++) {
      const tagsA = equipo[i].tags.map((t) => t.value);
      const tagsB = equipo[j].tags.map((t) => t.value);
      for (const afinidad of tablaAfinidad) {
        const match = tagsA.includes(afinidad.tagA) && tagsB.includes(afinidad.tagB) || tagsA.includes(afinidad.tagB) && tagsB.includes(afinidad.tagA);
        if (match)
          score += afinidad.weight;
      }
    }
  }
  return score;
}
function calcularMatchPreset(inventarioIds, presetIds) {
  if (presetIds.length === 0)
    return 0;
  const enInventario = presetIds.filter((id) => inventarioIds.includes(id));
  return Math.round(enInventario.length / presetIds.length * 100);
}
function sugerirSetPorArquetipo(arquetipoEquipo, setsDisponibles) {
  const match = setsDisponibles.find((set) => set.archetypeTag === arquetipoEquipo);
  return match?.name ?? null;
}
export {
  DEFAULT_ARTIFACT_BINDS,
  DEFAULT_CATALOG,
  DEFAULT_CHARACTERS,
  DEFAULT_SUPPORT_ARTIFACT_SETS,
  DEFAULT_TAG_AFFINITIES,
  DEFAULT_TEAM_PRESETS,
  bindSupportArtifacts,
  calcularMatchPreset,
  calcularSinergiaEquipo,
  calculateTeamScore,
  findOptimalTeams,
  getEffectiveRoles,
  isSupportSetViableForTeam,
  sugerirSetPorArquetipo
};
