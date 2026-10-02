import { db } from "./client";
import { games, characters, tags, characterTags } from "./schema";
import { eq } from "drizzle-orm";

/**
 * Task 1.1.2 / 1.1.3 — Taxonomía de tags + roster inicial (21 personajes
 * del lanzamiento de Genshin Impact, sin contar al Traveler).
 *
 * ESTE ES UN BORRADOR PARA VALIDAR EN EQUIPO, no la versión final. Edita
 * el array ROSTER de abajo para corregir/ajustar tags, y vuelve a correr:
 *
 *   bun run db:seed
 *
 * El script borra y vuelve a insertar todo lo de "genshin-impact" cada vez
 * que corre, así que es seguro ejecutarlo tantas veces como necesiten
 * mientras iteran la taxonomía.
 */

type CharacterSeed = {
    name: string;
    elemento: string;
    rol: string;
    weaponType: string;
    rarity: number;
    region: string;
    alignmentClass?: string;
    imageUrl: string | null;
    mechanics: Array<{ value: string; minConstellation?: number; minAlignmentCount?: number }>;
};

const ROSTER: CharacterSeed[] = [
    { name: "Amber", elemento: "Pyro", rol: "Support", weaponType:"Bow", rarity: 4, region: "Mondstadt", imageUrl: null, mechanics: [{value: "taunt"},{value: "pyro_application"},{value: "off_field_pyro_dmg"},{value: "buff_attack", minConstellation: 6}]},
    { name: "Barbara",  elemento: "Hydro", rol: "Healer", weaponType:"Catalyst", rarity: 4, region: "Mondstadt", imageUrl: null, mechanics: [{value: "healer"},{value: "hydro_application"},{value: "buff_hydro_dmg", minConstellation: 2},{value: "revive", minConstellation: 6}]},
    { name: "Beidou",  elemento: "Electro", rol: "Sub-DPS", weaponType:"Claymore", rarity: 4, region: "Liyue", imageUrl: null, mechanics: [{value: "off_field_electro_dmg"},{value: "electro_application"},{value: "coordinated_attacks"},{value: "damage_reduction"},{value: "interruption_resistance"},{value: "shield", minConstellation: 1},{value: "debuff_electro_res", minConstellation: 6}]},
    { name: "Bennett",  elemento: "Pyro", rol: "Support", weaponType:"Sword", rarity: 4, region: "Mondstadt", imageUrl: null, mechanics: [{value: "healer"},{value: "buff_attack"},{value: "battery"},{value: "buff_pyro_dmg", minConstellation: 6},{value: "pyro_infusion", minConstellation: 6}]},
    { name: "Chongyun",  elemento: "Cryo", rol: "Support", weaponType:"Claymore", rarity: 4, region: "Liyue", imageUrl: null, mechanics: [{value: "cryo_infusion"},{value: "buff_attack_speed"},{value: "debuff_cryo_res"},{value: "cooldown_reduction", minConstellation: 2}]},
    { name: "Diluc",  elemento: "Pyro", rol: "Main DPS", weaponType:"Claymore", rarity: 5, region: "Mondstadt", imageUrl: null, mechanics: [{value: "pyro_application"},{value: "pyro_infusion"},{value: "buff_attack_speed", minConstellation: 2}]},
    { name: "Fischl",  elemento: "Electro", rol: "Sub-DPS", weaponType:"Bow", rarity: 4, region: "Mondstadt", imageUrl: null, mechanics: [{value: "off_field_electro_dmg"},{value: "battery"},{value: "electro_application"},{value: "snapshot"},{value: "coordinated_attacks", minConstellation: 6},{value: "buff_attack", minAlignmentCount: 2}, {value: "buff_elemental_mastery", minAlignmentCount: 2}]},
    { name: "Jean",  elemento: "Anemo", rol: "Support", weaponType: "Sword", rarity: 4, region: "Mondstadt", imageUrl: null, mechanics: [{value: "healer"},{value: "anemo_application"},{value: "crowd_control"},{value: "buff_attack_speed", minConstellation: 2},{value: "debuff_anemo_res", minConstellation: 4}]},
    { name: "Kaeya",  elemento: "Cryo", rol: "Sub-DPS", weaponType: "Sword", rarity: 4, region: "Mondstadt", imageUrl: null, mechanics: [{value: "off_field_cryo_dmg"},{value: "cryo_application"},{value: "battery"},{value: "shield", minConstellation: 4}]},
    { name: "Keqing",  elemento: "Electro", rol: "Main DPS", weaponType: "Sword", rarity: 5, region: "Liyue", imageUrl: null, mechanics: [{value: "electro_application"}]},
    { name: "Klee",   elemento: "Pyro", rol: "Main DPS", weaponType: "Catalyst", rarity: 5, region: "Mondstadt", alignmentClass: "Hexerei", imageUrl: null, mechanics: [{value: "pyro_application"},{value: "battery"},{value: "coordinated_attacks"}]},
    { name: "Lisa",   elemento: "Electro", rol: "Sub-DPS", weaponType: "Catalyst", rarity: 4, region: "Mondstadt",  imageUrl: null, mechanics: [{value: "off_field_electro_dmg"},{value: "electro_application"},{value: "debuff_defense"}]},
    { name: "Mona",   elemento: "Hydro", rol: "Sub-DPS", weaponType: "Catalyst", rarity: 5, region: "Mondstadt", alignmentClass: "Hexerei", imageUrl: null, mechanics: [{value: "off_field_hydro_dmg"},{value: "hydro_application"},{value: "taunt"},{value: "crowd_control"},{value: "buff_all_dmg"}, {value: "buff_vaporize_dmg", minConstellation: 1},{value: "buff_electrocharged_dmg", minConstellation: 1},{value: "buff_hydro_swirl_dmg", minConstellation: 1},{value: "extend_frozen_duration", minConstellation: 1},{value: "buff_vaporize_dmg", minAlignmentCount: 2}]},
    { name: "Ningguang",  elemento: "Geo", rol: "Sub-DPS", weaponType: "Catalyst", rarity: 4, region: "Liyue", imageUrl: null, mechanics: [{value: "geo_construct"},{value: "buff_geo_dmg"},{value: "battery", minConstellation: 2}]},
    { name: "Noelle",  elemento: "Geo", rol: "Support", weaponType: "Claymore", rarity: 4, region: "Mondstadt", imageUrl: null, mechanics: [{value: "shield"},{value: "healer"},{value: "geo_application"},{value: "geo_infusion"},{value: "cooldown_reduction"}]},
    { name: "Qiqi",  elemento: "Cryo", rol: "Healer", weaponType: "Sword", rarity: 5, region: "Liyue", alignmentClass: "Witch", imageUrl: null, mechanics: [{value: "healer"},{value: "cryo_application"},{value: "coordinated_attacks"},{value: "buff_superconduct_dmg", minAlignmentCount: 2},{value: "revive", minConstellation: 6}]},
    { name: "Razor", elemento: "Electro", rol: "Main DPS", weaponType: "Claymore", rarity: 4, region: "Mondstadt", alignmentClass: "Hexerei", imageUrl: null, mechanics: [{value: "electro_application"},{value: "debuff_defense", minConstellation: 4}]},
    { name: "Sucrose",  elemento: "Anemo", rol: "Support", weaponType: "Catalyst", rarity: 4, region: "Mondstadt", alignmentClass: "Hexerei", imageUrl: null, mechanics: [{value: "anemo_application"},{value: "battery"},{value: "buff_elemental_mastery"},{value: "buff_all_dmg", minAlignmentCount: 2},{value: "buff_hexerei_dmg", minAlignmentCount: 2}, {value: "buff_absorbed_elemental_dmg", minConstellation: 6}]},
    { name: "Venti",  elemento: "Anemo", rol: "Support", weaponType: "Bow", rarity: 5, region: "Mondstadt", alignmentClass: "Hexerei", imageUrl: null, mechanics: [{value: "off_field_anemo_dmg"},{value: "anemo_application"},{value: "battery"},{value: "snapshot"},{value: "debuff_anemo_res", minConstellation: 2},{value: "debuff_physical_res", minAlignmentCount: 2},{value: "debuff_absorbed_elemental_res", minConstellation: 6}]},
    { name: "Xiangling",  elemento: "Pyro", rol: "Sub-DPS", weaponType: "Polearm", rarity: 4, region: "Liyue", imageUrl: null, mechanics: [{value: "off_field_pyro_dmg"},{value: "pyro_application"},{value: "snapshot"},{value: "buff_attack"},{value: "debuff_pyro_res", minConstellation: 1},{value: "buff_pyro_dmg", minAlignmentCount: 6}]},
    { name: "Xingqiu",  elemento: "Hydro", rol: "Sub-DPS", weaponType: "Sword", rarity: 4, region: "Liyue", imageUrl: null, mechanics: [{value: "off_field_hydro_dmg"},{value: "hydro_application"},{value: "coordinated_attacks"},{value: "damage_reduction"},{value: "interruption_resistance"},{value: "healer"},{value: "debuff_hydro_res", minConstellation: 2}]},
];


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
        }
        await db.delete(characters).where(eq(characters.gameId, existing.id));
        await db.delete(tags).where(eq(tags.gameId, existing.id));
        await db.delete(games).where(eq(games.id, existing.id));
    }

    console.log("Insertando juego...");
    const [game] = await db
        .insert(games)
        .values({ slug: "genshin-impact", name: "Genshin Impact" })
        .returning();

    console.log("Insertando tags únicos...");
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

    console.log(`Insertando ${ROSTER.length} personajes y sus tags...`);
    for (const c of ROSTER) {
        const [character] = await db
            .insert(characters)
            .values({ gameId: game.id, name: c.name, element: c.elemento, weaponType: c.weaponType, rarity: c.rarity, region: c.region, alignmentClass: c.alignmentClass ?? null, imageUrl: c.imageUrl,})
            .returning();

        const rolTagId = await getOrCreateTag("rol", c.rol);
        const mecanicaTagId = await getOrCreateTag("mecanica", c.mecanica);

        await db.insert(characterTags).values([
            { characterId: character.id, tagId: rolTagId },
            { characterId: character.id, tagId: mecanicaTagId },
        ]);
    }

    console.log("Listo ✅");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
