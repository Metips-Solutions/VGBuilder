import { db } from "./client";
import {
    games,
    characters,
    tags,
    characterTags,
    characterNeeds,
    characterAntiTags,
    artifactSets,
    characterArtifactSets,
} from "./schema";
import { eq } from "drizzle-orm";

/**
 * Seed Oficial — Prototipo 1 (VGBuilder)
 *
 * Taxonomía refinada v2.0 estándar KeqingMains (KQM):
 * - 21 personajes iniciales de Mondstadt y Liyue.
 * - Separación de ofertas colectivas (`offers` en characterTags) vs demandas (`needs` en characterNeeds).
 * - Incompatibilidades duras (`characterAntiTags`) para evitar combinaciones destructivas (ej. Razor vs Chongyun/Bennett C6).
 * - Catálogo de los 10 Sets de Artefactos de soporte clave (evaluados por su pasiva de 4pc independiente de substats).
 */

type CharacterSeed = {
    name: string;
    elemento: string;
    weaponType: string;
    rarity: number;
    region: string;
    alignmentClass?: string;
    damageProfile?: string;
    imageUrl: string | null;
    roles: string[]; // 'Main DPS', 'Sub-DPS', 'Support', 'Healer'
    mechanics: Array<{ value: string; minConstellation?: number; minAlignmentCount?: number }>;
    needs?: Array<{ value: string; priority: number }>;
    antiTags?: Array<{ value: string; reason: string }>;
};

const ROSTER: CharacterSeed[] = [
    {
        name: "Amber",
        elemento: "Pyro",
        weaponType: "Bow",
        rarity: 4,
        region: "Mondstadt",
        roles: ["Sub-DPS"],
        imageUrl: null,
        mechanics: [
            { value: "taunt" },
            { value: "pyro_application" },
            { value: "off_field_pyro_dmg" },
            { value: "buff_attack", minConstellation: 6 },
        ],
    },
    {
        name: "Barbara",
        elemento: "Hydro",
        weaponType: "Catalyst",
        rarity: 4,
        region: "Mondstadt",
        roles: ["Support", "Healer"],
        imageUrl: null,
        mechanics: [
            { value: "healer" },
            { value: "hydro_application" },
            { value: "stamina_reduction" },
            { value: "catalyst_buffer" },
            { value: "buff_hydro_dmg", minConstellation: 2 },
            { value: "revive", minConstellation: 6 },
        ],
    },
    {
        name: "Beidou",
        elemento: "Electro",
        weaponType: "Claymore",
        rarity: 4,
        region: "Liyue",
        roles: ["Sub-DPS", "Support"],
        imageUrl: null,
        mechanics: [
            { value: "off_field_electro_dmg" },
            { value: "electro_application" },
            { value: "coordinated_attacks" },
            { value: "damage_reduction" },
            { value: "interruption_resistance" },
            { value: "shield", minConstellation: 1 },
            { value: "debuff_electro_res", minConstellation: 6 },
        ],
        needs: [
            { value: "need_battery", priority: 9 }, // Alto coste de energía (80)
        ],
    },
    {
        name: "Bennett",
        elemento: "Pyro",
        weaponType: "Sword",
        rarity: 4,
        region: "Mondstadt",
        roles: ["Support", "Healer"],
        imageUrl: null,
        mechanics: [
            { value: "healer" },
            { value: "buff_attack" },
            { value: "battery" },
            { value: "cleanse" },
            { value: "pyro_application" },
            { value: "buff_pyro_dmg", minConstellation: 6 },
            { value: "pyro_infusion", minConstellation: 6 },
        ],
    },
    {
        name: "Chongyun",
        elemento: "Cryo",
        weaponType: "Claymore",
        rarity: 4,
        region: "Liyue",
        roles: ["Sub-DPS", "Support"],
        imageUrl: null,
        mechanics: [
            { value: "cryo_infusion" },
            { value: "buff_attack_speed" },
            { value: "debuff_cryo_res" },
            { value: "cryo_application" },
            { value: "cooldown_reduction", minConstellation: 2 },
        ],
    },
    {
        name: "Diluc",
        elemento: "Pyro",
        weaponType: "Claymore",
        rarity: 5,
        region: "Mondstadt",
        roles: ["Main DPS"],
        damageProfile: "Pyro Melee",
        imageUrl: null,
        mechanics: [
            { value: "pyro_application" },
        ],
        needs: [
            { value: "need_reaction_enabler", priority: 10 }, // Flexible: Hydro (Vape) o Cryo (Melt)
            { value: "need_attack_buff", priority: 8 },
            { value: "need_resistance_shred", priority: 8 },
            { value: "need_interruption_resistance", priority: 7 },
        ],
        // Diluc NO tiene antiTags con Chongyun: su infusión Pyro en Q tiene prioridad y en E permite derretir sus propios básicos Cryo
    },
    {
        name: "Fischl",
        elemento: "Electro",
        weaponType: "Bow",
        rarity: 4,
        region: "Mondstadt",
        alignmentClass: "Hexerei",
        roles: ["Sub-DPS", "Support"],
        imageUrl: null,
        mechanics: [
            { value: "off_field_electro_dmg" },
            { value: "battery" },
            { value: "electro_application" },
            { value: "snapshot" },
            { value: "coordinated_attacks", minConstellation: 6 },
            { value: "buff_attack", minAlignmentCount: 2 },
            { value: "buff_elemental_mastery", minAlignmentCount: 2 },
        ],
    },
    {
        name: "Jean",
        elemento: "Anemo",
        weaponType: "Sword",
        rarity: 5,
        region: "Mondstadt",
        roles: ["Support", "Healer"],
        imageUrl: null,
        mechanics: [
            { value: "healer" },
            { value: "anemo_application" },
            { value: "crowd_control" },
            { value: "cleanse" },
            { value: "sunfire" },
            { value: "buff_attack_speed", minConstellation: 2 },
            { value: "debuff_anemo_res", minConstellation: 4 },
        ],
    },
    {
        name: "Kaeya",
        elemento: "Cryo",
        weaponType: "Sword",
        rarity: 4,
        region: "Mondstadt",
        roles: ["Sub-DPS", "Support"],
        imageUrl: null,
        mechanics: [
            { value: "off_field_cryo_dmg" },
            { value: "cryo_application" },
            { value: "battery" },
            { value: "snapshot" },
            { value: "shield", minConstellation: 4 },
        ],
    },
    {
        name: "Keqing",
        elemento: "Electro",
        weaponType: "Sword",
        rarity: 5,
        region: "Liyue",
        roles: ["Main DPS"],
        damageProfile: "Electro Fast Melee",
        imageUrl: null,
        mechanics: [
            { value: "electro_application" },
        ],
        needs: [
            { value: "need_reaction_enabler", priority: 10 }, // Dendro (Aggravate), Hydro (Taser) o Pyro (Overload)
            { value: "need_resistance_shred", priority: 9 },
            { value: "need_interruption_resistance", priority: 7 },
            { value: "need_attack_buff", priority: 7 },
        ],
        antiTags: [
            { value: "cryo_infusion", reason: "Sobrescribe y destruye su infusión Electro" },
            { value: "pyro_infusion", reason: "Sobrescribe y destruye su infusión Electro" },
        ],
    },
    {
        name: "Klee",
        elemento: "Pyro",
        weaponType: "Catalyst",
        rarity: 5,
        region: "Mondstadt",
        alignmentClass: "Hexerei",
        roles: ["Main DPS"],
        damageProfile: "Pyro AoE Ranged",
        imageUrl: null,
        mechanics: [
            { value: "pyro_application" },
            { value: "battery" },
            { value: "interruption_power" },
            { value: "catalyst_buffer" },
            { value: "debuff_defense", minConstellation: 2 }, // Minas C2 bajan -23% DEF
        ],
        needs: [
            { value: "need_shield", priority: 10 },
            { value: "need_interruption_resistance", priority: 10 },
            { value: "need_reaction_enabler", priority: 9 }, // Vape (Xingqiu/Yelan), Melt o Mono Pyro
            { value: "need_crowd_control", priority: 8 },
            { value: "need_resistance_shred", priority: 8 },
        ],
    },
    {
        name: "Lisa",
        elemento: "Electro",
        weaponType: "Catalyst",
        rarity: 4,
        region: "Mondstadt",
        roles: ["Sub-DPS", "Support"],
        imageUrl: null,
        mechanics: [
            { value: "off_field_electro_dmg" },
            { value: "electro_application" },
            { value: "debuff_defense" }, // Pasiva A4 reduce -15% DEF
            { value: "catalyst_buffer" },
        ],
    },
    {
        name: "Mona",
        elemento: "Hydro",
        weaponType: "Catalyst",
        rarity: 5,
        region: "Mondstadt",
        alignmentClass: "Hexerei",
        roles: ["Support", "Sub-DPS"],
        imageUrl: null,
        mechanics: [
            { value: "buff_all_dmg" }, // Presagio (+60% daño recibido)
            { value: "off_field_hydro_dmg" },
            { value: "hydro_application" },
            { value: "taunt" },
            { value: "crowd_control" },
            { value: "catalyst_buffer" },
            { value: "buff_vaporize_dmg", minConstellation: 1 },
            { value: "buff_electrocharged_dmg", minConstellation: 1 },
            { value: "buff_hydro_swirl_dmg", minConstellation: 1 },
            { value: "extend_frozen_duration", minConstellation: 1 },
            { value: "hexerei_vaporize_bonus", minAlignmentCount: 2 }, // Witch's Eve Rite
        ],
    },
    {
        name: "Ningguang",
        elemento: "Geo",
        weaponType: "Catalyst",
        rarity: 4,
        region: "Liyue",
        roles: ["Main DPS", "Sub-DPS"],
        damageProfile: "Geo Ranged",
        imageUrl: null,
        mechanics: [
            { value: "buff_geo_dmg" }, // Pantalla de Jade otorga +12% Geo
            { value: "geo_construct" },
            { value: "catalyst_buffer" },
            { value: "battery", minConstellation: 2 },
        ],
        needs: [
            { value: "need_geo_partner", priority: 10 }, // Consonancia Geo indispensable
            { value: "need_shield", priority: 9 },
            { value: "need_attack_buff", priority: 8 },
        ],
    },
    {
        name: "Noelle",
        elemento: "Geo",
        weaponType: "Claymore",
        rarity: 4,
        region: "Mondstadt",
        roles: ["Main DPS", "Support", "Healer"],
        damageProfile: "Geo Tank / Carry",
        imageUrl: null,
        mechanics: [
            { value: "shield" },
            { value: "healer" },
            { value: "geo_infusion_absolute" }, // Infusión inamovible
            { value: "cooldown_reduction" },
        ],
        needs: [
            { value: "need_battery_geo", priority: 10 }, // No genera partículas propias
            { value: "need_geo_partner", priority: 9 },
            { value: "need_offfield_dps", priority: 8 },
        ],
    },
    {
        name: "Qiqi",
        elemento: "Cryo",
        weaponType: "Sword",
        rarity: 5,
        region: "Liyue",
        alignmentClass: "Witch",
        roles: ["Support", "Healer"],
        imageUrl: null,
        mechanics: [
            { value: "healer" },
            { value: "cryo_application" },
            { value: "buff_superconduct_dmg", minAlignmentCount: 2 },
            { value: "revive", minConstellation: 6 },
        ],
    },
    {
        name: "Razor",
        elemento: "Electro",
        weaponType: "Claymore",
        rarity: 4,
        region: "Mondstadt",
        alignmentClass: "Hexerei",
        roles: ["Main DPS"],
        damageProfile: "Physical Melee",
        imageUrl: null,
        mechanics: [
            { value: "electro_application" },
            { value: "debuff_defense", minConstellation: 4 }, // E pulsada baja -15% DEF
        ],
        needs: [
            { value: "need_physical_shred", priority: 10 }, // Superconductor o debuff físico/defensa
            { value: "need_interruption_resistance", priority: 8 },
            { value: "need_attack_buff", priority: 7 },
        ],
        antiTags: [
            { value: "cryo_infusion", reason: "Sobrescribe y destruye por completo su escalado de daño físico" },
            { value: "pyro_infusion", reason: "Sobrescribe y destruye por completo su escalado de daño físico" },
        ],
    },
    {
        name: "Sucrose",
        elemento: "Anemo",
        weaponType: "Catalyst",
        rarity: 4,
        region: "Mondstadt",
        alignmentClass: "Hexerei",
        roles: ["Support"],
        imageUrl: null,
        mechanics: [
            { value: "anemo_application" },
            { value: "crowd_control" },
            { value: "battery" },
            { value: "buff_elemental_mastery" }, // Comparte EM con el equipo
            { value: "catalyst_buffer" },
            { value: "buff_all_dmg", minAlignmentCount: 2 },
            { value: "buff_hexerei_dmg", minAlignmentCount: 2 },
            { value: "buff_absorbed_element_dmg", minConstellation: 6 },
        ],
    },
    {
        name: "Venti",
        elemento: "Anemo",
        weaponType: "Bow",
        rarity: 5,
        region: "Mondstadt",
        alignmentClass: "Hexerei",
        roles: ["Support"],
        imageUrl: null,
        mechanics: [
            { value: "off_field_anemo_dmg" },
            { value: "anemo_application" },
            { value: "crowd_control" }, // Agrupador supremo
            { value: "battery" },       // Pasiva regenera 15 energía fija
            { value: "debuff_anemo_res", minConstellation: 2 },
            { value: "debuff_absorbed_element_res", minConstellation: 6 },
        ],
    },
    {
        name: "Xiangling",
        elemento: "Pyro",
        weaponType: "Polearm",
        rarity: 4,
        region: "Liyue",
        roles: ["Sub-DPS"],
        imageUrl: null,
        mechanics: [
            { value: "off_field_pyro_dmg" },
            { value: "pyro_application" }, // Sin ICD
            { value: "snapshot" },
            { value: "buff_attack" },       // Chile de Guoba +10% ATK
            { value: "debuff_pyro_res", minConstellation: 1 },
            { value: "buff_pyro_dmg", minConstellation: 6 },
        ],
        needs: [
            { value: "need_battery_pyro", priority: 10 }, // Coste de energía 80
        ],
    },
    {
        name: "Xingqiu",
        elemento: "Hydro",
        weaponType: "Sword",
        rarity: 4,
        region: "Liyue",
        roles: ["Sub-DPS", "Support"],
        imageUrl: null,
        mechanics: [
            { value: "off_field_hydro_dmg" },
            { value: "hydro_application" }, // Alta frecuencia
            { value: "coordinated_attacks" },
            { value: "damage_reduction" },
            { value: "interruption_resistance" },
            { value: "healer" },
            { value: "debuff_hydro_res", minConstellation: 2 },
        ],
    },
];

/**
 * Catálogo de los 11 Sets de Artefactos de Soporte Clave
 * Premisa VGBuilder: No importa si el jugador no tiene substats perfectos;
 * el valor fundamental de estos sets radica en activar su pasiva de 4 piezas
 * para inyectar buffs mecánicos indispensables al equipo.
 */
const SUPPORT_ARTIFACT_SETS = [
    {
        name: "Sombra Verde Esmeralda",
        description: "Al provocar Torbellino, reduce la resistencia elemental del enemigo al elemento absorbido en un -40% durante 10s.",
        providedTag: "debuff_elemental_res",
    },
    {
        name: "Ritual Antiguo de la Nobleza",
        description: "Tras lanzar la Habilidad Definitiva, aumenta el ATK de todo el equipo en +20% durante 12s.",
        providedTag: "buff_attack",
    },
    {
        name: "Tenacidad de la Geoarmada",
        description: "Cuando la Habilidad Elemental impacta a un enemigo de forma continua, aumenta el ATK del equipo en +20% y la protección de escudo en +30%.",
        providedTag: "buff_attack",
    },
    {
        name: "Pergamino del Héroe",
        description: "Al realizar una reacción elemental, otorga +12% de bono de daño elemental a todo el equipo (+24% si usa Noctambulismo).",
        providedTag: "buff_all_dmg",
    },
    {
        name: "Son de Antaño",
        description: "Registra la curación continua; tras 6 segundos, añade un bono masivo de daño plano a los ataques del Carry en campo.",
        providedTag: "buff_all_dmg",
    },
    {
        name: "Recuerdos del Bosque",
        description: "Al golpear con Elemental o Definitiva, reduce la resistencia Dendro de los enemigos en un -30%.",
        providedTag: "debuff_dendro_res",
    },
    {
        name: "Petra Arcaica",
        description: "Al recoger un cristal elemental generado por Cristalización, otorga +35% de bono de daño de ese elemento a todo el equipo.",
        providedTag: "buff_all_dmg",
    },
    {
        name: "Corazón Forjado",
        description: "Aumenta el Ataque y el Daño de destello estelar (Superconductor estelar y Torbellino estelar) de todo el equipo.",
        providedTag: "buff_attack",
    },
    {
        name: "Alborada de la Estrella del Alba y la Luna",
        description: "Aumenta directamente el daño resultante de las reacciones lunares para todo el equipo.",
        providedTag: "buff_all_dmg",
    },
    {
        name: "Serenata de la Luna Tejida",
        description: "Aumenta la Maestría Elemental compartida y el daño de reacciones lunares.",
        providedTag: "buff_elemental_mastery",
    },
    {
        name: "Instructor",
        description: "Tras provocar una reacción elemental, aumenta la Maestría Elemental de todos los miembros del equipo en 120 pts durante 8s.",
        providedTag: "buff_elemental_mastery",
    },
];

/**
 * Matriz de Compatibilidad de Soportes con Sets Universales (KQM Standard)
 * Define qué personajes tienen las mecánicas para activar la pasiva de 4 piezas
 * con su respectiva prioridad táctica (1 a 10).
 */
const ARTIFACT_BINDINGS: Array<{
    artifactName: string;
    compatibleCharacters: Array<{ name: string; priority: number }>;
}> = [
    {
        artifactName: "Sombra Verde Esmeralda",
        compatibleCharacters: [
            { name: "Sucrose", priority: 10 },
            { name: "Jean", priority: 10 },
            { name: "Venti", priority: 10 },
        ],
    },
    {
        artifactName: "Ritual Antiguo de la Nobleza",
        compatibleCharacters: [
            { name: "Bennett", priority: 10 },
            { name: "Mona", priority: 9 },
            { name: "Kaeya", priority: 9 },
            { name: "Amber", priority: 9 },
            { name: "Chongyun", priority: 8 },
            { name: "Lisa", priority: 8 },
            { name: "Xingqiu", priority: 8 },
            { name: "Xiangling", priority: 8 },
            { name: "Razor", priority: 7 },
        ],
    },
    {
        artifactName: "Tenacidad de la Geoarmada",
        compatibleCharacters: [
            { name: "Fischl", priority: 10 }, // Oz continuo desde fuera de campo
            { name: "Mona", priority: 7 },   // E de pulsos continuos
            { name: "Qiqi", priority: 7 },   // Orbe orbital continuo
        ],
    },
    {
        artifactName: "Instructor",
        compatibleCharacters: [
            { name: "Bennett", priority: 8 },
            { name: "Mona", priority: 9 },
            { name: "Sucrose", priority: 8 },
            { name: "Kaeya", priority: 8 },
            { name: "Lisa", priority: 8 },
            { name: "Amber", priority: 9 },
            { name: "Chongyun", priority: 8 },
            { name: "Xiangling", priority: 7 },
            { name: "Razor", priority: 7 },
            { name: "Barbara", priority: 6 },
        ],
    },
    {
        artifactName: "Son de Antaño",
        compatibleCharacters: [
            { name: "Qiqi", priority: 10 },
            { name: "Barbara", priority: 10 },
            { name: "Jean", priority: 8 },
        ],
    },
    {
        artifactName: "Petra Arcaica",
        compatibleCharacters: [
            { name: "Noelle", priority: 8 },
            { name: "Ningguang", priority: 8 },
        ],
    },
    {
        artifactName: "Pergamino del Héroe",
        compatibleCharacters: [
            { name: "Bennett", priority: 7 },
            { name: "Mona", priority: 7 },
            { name: "Fischl", priority: 7 },
            { name: "Kaeya", priority: 7 },
            { name: "Xiangling", priority: 7 },
            { name: "Amber", priority: 7 },
            { name: "Lisa", priority: 7 },
            { name: "Chongyun", priority: 7 },
            { name: "Razor", priority: 7 },
            { name: "Barbara", priority: 6 },
        ],
    },
    {
        artifactName: "Recuerdos del Bosque",
        compatibleCharacters: [
            { name: "Lisa", priority: 6 },
            { name: "Fischl", priority: 6 },
        ],
    },
    {
        artifactName: "Corazón Forjado",
        compatibleCharacters: [
            { name: "Kaeya", priority: 7 },
            { name: "Lisa", priority: 7 },
            { name: "Fischl", priority: 7 },
        ],
    },
    {
        artifactName: "Alborada de la Estrella del Alba y la Luna",
        compatibleCharacters: [
            { name: "Mona", priority: 7 },
            { name: "Lisa", priority: 7 },
            { name: "Fischl", priority: 7 },
        ],
    },
    {
        artifactName: "Serenata de la Luna Tejida",
        compatibleCharacters: [
            { name: "Sucrose", priority: 7 },
            { name: "Mona", priority: 7 },
            { name: "Lisa", priority: 7 },
        ],
    },
];

const characterDescriptions: Record<string, string> = {
    "Amber": "Arquera Pyro especializada en romper escudos a distancia y utilidad táctica. Su señuelo Barón Bunny absorbe el aggro quitando presión al equipo, y su Definitiva de 6U de calibre aplica fuego masivo ultra-rápido. A C6 otorga +15% de ATK y velocidad de movimiento al equipo.",
    "Barbara": "Catalizadora Hydro centrada en la supervivencia sostenida. Su Habilidad Elemental crea un aro que cura y moja a los enemigos en melé, mientras que su Definitiva restaura la vida a todo el grupo de forma inmediata. A C2 potencia el daño Hydro y a C6 revive a un aliado.",
    "Beidou": "Sub-DPS Electro off-field excepcional en situaciones multiobjetivo. Su Definitiva desata rayos en cadena que rebotan entre múltiples enemigos con cada ataque básico del personaje activo, reduciendo además el daño recibido y confiriendo gran resistencia a la interrupción.",
    "Bennett": "El buffer ofensivo y soporte universal por excelencia. Su Definitiva crea un área que proporciona curación ultrarrápida y un aumento masivo de ATK basado en su ataque básico. Es además la batería Pyro primaria del juego para recargar a Xiangling.",
    "Chongyun": "Sub-DPS Cryo y habilitador táctico de infusiones. Su campo de habilidad imbuye armas cuerpo a cuerpo en daño Cryo y reduce los tiempos de enfriamiento de habilidades en un 15% (C2). Su Definitiva lanza espadas gigantes capaces de derretir instantáneamente.",
    "Diluc": "Main DPS Pyro clásico enfocado en daño sostenido cuerpo a cuerpo. Encadena tres golpes de habilidad elemental con ataques normales y remata con un fénix que encanta su mandoble en Pyro. Exige aplicadores Hydro continuos como Xingqiu para vaporizar cada impacto.",
    "Fischl": "Sub-DPS Electro de objetivo único y la batería universal más versátil de Mondstadt. Su cuervo Oz permanece en campo infligiendo daño Electro continuo con un uptime casi del 100%. Como miembro de Hexerei, potencia las sinergias de rito de brujas.",
    "Jean": "Soporte Anemo y curadora de emergencia. Su Definitiva cura instantáneamente a todo el equipo al máximo y genera un campo de regeneración continua que limpia auras elementales. Combinada con Bennett, desata la rotación Sunfire de torbellinos Pyro continuos.",
    "Kaeya": "Sub-DPS Cryo off-field de proximidad. Su Habilidad Definitiva invoca carámbanos orbitales que rotan alrededor del personaje activo, ideal para acompañar a carrys cuerpo a cuerpo como Diluc o Razor mientras genera partículas de energía Cryo con frecuencia.",
    "Keqing": "Main DPS Electro rápida y ágil. Destaca por su alta cadencia de ataques cargados y movilidad con su daga relámpago. Su kit es hiperversátil: brilla tanto en Intensificación con Dendro, como en Taser con Hydro o Sobrecarga con Pyro.",
    "Klee": "Main DPS Pyro explosiva a media distancia y soporte de debuff a C2. Su enorme peso de impacto tumba a los enemigos más pesados y su pasiva genera energía fija para todo el equipo al asestar golpes críticos. A C2 sus minas reducen la Defensa enemiga un -23%.",
    "Lisa": "Sub-DPS Electro y debuffer de área. Su Definitiva crea una rosa de relámpagos que electrocuta continuamente a los enemigos durante 15s y reduce su Defensa en un -15% gracias a su pasiva A4. Puede equipar Cuento de Cazadores de Dragones para bufar al Carry.",
    "Mona": "Buffer de daño masivo y soporte Hydro. Su Definitiva aplica una marca de Presagio que amplifica el daño recibido por los enemigos hasta en un +60%. A C1 y con el rito Hexerei de brujas, amplifica notablemente las reacciones de Vaporizado y prolonga el congelamiento.",
    "Ningguang": "Main DPS Geo a distancia y batería Geo táctica. Su Pantalla de Jade bloquea proyectiles y otorga +12% de daño Geo a los aliados que la crucen. A C2 reinicia el enfriamiento de su pantalla, alimentando de partículas de energía a carrys Geo pesados como Noelle.",
    "Noelle": "El tanque Geo por excelencia y carry demoledor a C6. Combina un escudo impenetrable que absorbe daño con curación simultánea a todo el equipo al atacar. Su Definitiva transforma su mandoble en Geo con un alcance colosal e infusión absoluta inamovible.",
    "Qiqi": "La curadora con mayor volumen de regeneración de vida sostenida del juego base. Mantiene al equipo con vida máxima mediante su orbe orbital y talismanes de combate. Con alineamiento Witch Revelation, amplifica el daño de la reacción de Superconductor.",
    "Razor": "Main DPS de daño Físico cuerpo a cuerpo puro. Desata un espíritu de lobo que le confiere aplomo total e inmunidad a electrocargado mientras asesta veloces golpes físicos. A C4 reduce la Defensa enemiga en un -15% y exige aplicadores Cryo para Superconductor.",
    "Sucrose": "Soporte Anemo y buffer de Maestría Elemental. Succión y control de masas en área mientras comparte un porcentaje masivo de su propia Maestría con todo el equipo. Equipada con Sombra Verde Esmeralda, reduce las resistencias elementales de los enemigos en un -40%.",
    "Venti": "El rey del control de masas del juego. Su Habilidad Definitiva crea un agujero negro que absorbe y neutraliza a enemigos ligeros y medianos, regenerando además 15 puntos de energía fija para todo el equipo del elemento absorbido.",
    "Xiangling": "La reina del daño Pyro off-field. Su Pyronado gira alrededor del personaje activo sin enfriamiento interno (ICD), vaporizando o derritiendo en cada impacto con daño arrollador. Su única necesidad es contar con Bennett como batería para recargar su definitiva.",
    "Xingqiu": "El soporte y habilitador Hydro por excelencia. Sus espadas de lluvia aplican Hydro a la velocidad más alta del juego en coordinación con los ataques normales del carry, aportando además mitigación de daño de hasta un 40% y máxima resistencia a la interrupción.",
};

async function seed() {
    console.log("Limpiando datos previos de genshin-impact...");
    const existing = await db.query.games.findFirst({
        where: eq(games.slug, "genshin-impact"),
    });

    if (existing) {
        const charIds = await db
            .select({ id: characters.id })
            .from(characters)
            .where(eq(characters.gameId, existing.id));

        for (const c of charIds) {
            await db.delete(characterTags).where(eq(characterTags.characterId, c.id));
            await db.delete(characterNeeds).where(eq(characterNeeds.characterId, c.id));
            await db.delete(characterAntiTags).where(eq(characterAntiTags.characterId, c.id));
            await db.delete(characterArtifactSets).where(eq(characterArtifactSets.characterId, c.id));
        }

        await db.delete(artifactSets).where(eq(artifactSets.gameId, existing.id));
        await db.delete(characters).where(eq(characters.gameId, existing.id));
        await db.delete(tags).where(eq(tags.gameId, existing.id));
        await db.delete(games).where(eq(games.id, existing.id));
    }

    console.log("Insertando juego 'Genshin Impact'...");
    const [game] = await db
        .insert(games)
        .values({ slug: "genshin-impact", name: "Genshin Impact" })
        .returning();

    console.log("Inicializando mapa de tags únicos...");
    const tagMap = new Map<string, number>();

    async function getOrCreateTag(category: string, value: string) {
        const key = `${category}:${value}`;
        if (tagMap.has(key)) return tagMap.get(key)!;

        const [tag] = await db
            .insert(tags)
            .values({ gameId: game.id, category, value })
            .returning();
        tagMap.set(key, tag.id);
        return tag.id;
    }

    console.log(`Insertando ${ROSTER.length} personajes y sus tags colectivos...`);
    for (const c of ROSTER) {
        const [character] = await db
            .insert(characters)
            .values({
                gameId: game.id,
                name: c.name,
                element: c.elemento,
                weaponType: c.weaponType,
                rarity: c.rarity,
                region: c.region,
                alignmentClass: c.alignmentClass ?? null,
                damageProfile: c.damageProfile ?? null,
                imageUrl: c.imageUrl,
                description: characterDescriptions[c.name] ?? null,
            })
            .returning();

        // 1. Insertar roles del personaje
        for (const r of c.roles) {
            const rolTagId = await getOrCreateTag("rol", r);
            await db.insert(characterTags).values({
                characterId: character.id,
                tagId: rolTagId,
            });
        }

        // 2. Insertar mecánicas que OFRECE al equipo
        for (const m of c.mechanics) {
            const tagId = await getOrCreateTag("mecanica", m.value);
            await db.insert(characterTags).values({
                characterId: character.id,
                tagId,
                minConstellation: m.minConstellation ?? null,
                minAlignmentCount: m.minAlignmentCount ?? null,
            }).onConflictDoNothing();
        }

        // 3. Insertar demandas (NEEDS) si actúa como Main DPS o carry
        if (c.needs) {
            for (const n of c.needs) {
                const needTagId = await getOrCreateTag("necesidad", n.value);
                await db.insert(characterNeeds).values({
                    characterId: character.id,
                    tagId: needTagId,
                    priority: n.priority,
                });
            }
        }

        // 4. Insertar incompatibilidades duras (ANTI-TAGS)
        if (c.antiTags) {
            for (const at of c.antiTags) {
                const antiTagId = await getOrCreateTag("mecanica", at.value);
                await db.insert(characterAntiTags).values({
                    characterId: character.id,
                    tagId: antiTagId,
                    reason: at.reason,
                });
            }
        }
    }

    console.log("Insertando los 11 Sets de Artefactos de soporte clave...");
    for (const art of SUPPORT_ARTIFACT_SETS) {
        const providedTagId = await getOrCreateTag("mecanica", art.providedTag);
        await db.insert(artifactSets).values({
            gameId: game.id,
            name: art.name,
            description: art.description,
            providedTagId,
            isSupportSet: true,
        });
    }

    console.log("Insertando compatibilidad de sets de soporte (characterArtifactSets)...");
    for (const bind of ARTIFACT_BINDINGS) {
        const artSet = await db.query.artifactSets.findFirst({
            where: eq(artifactSets.name, bind.artifactName),
        });
        if (!artSet) continue;

        for (const comp of bind.compatibleCharacters) {
            const char = await db.query.characters.findFirst({
                where: eq(characters.name, comp.name),
            });
            if (!char) continue;

            await db.insert(characterArtifactSets).values({
                characterId: char.id,
                artifactSetId: artSet.id,
                priority: comp.priority,
            });
        }
    }

    console.log("Seed completado exitosamente con estándar KQM v2.0 ✅");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Error al ejecutar el seed:", err);
    process.exit(1);
});
