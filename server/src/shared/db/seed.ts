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
    rol: string;
    mecanica: string;
    weapon_type: string;
    rarity: BigInteger;
    region: string;
    alignment_class: string;
    imageURL: string;
};

const ROSTER: CharacterSeed[] = [
    { name: "Amber", rol: "Support", mecanica: "Aplicador Pyro off-field",  weapon_type:"Bow", rarity: 4, region: "Mondstadt", alignment_class: null, imageURL: null},
    { name: "Barbara", rol: "Healer", mecanica: "Aplicadora Hydro / curación", weapon_type:"Catalyst", rarity: 4, region: "Mondstadt", alignment_class: null, imageURL: null},
    { name: "Beidou", rol: "Sub-DPS", mecanica: "Aplicadora Electro on-field / shield", weapon_type:"Claymore", rarity: 4, region: "Liyue", alignment_class: null, imageURL: null},
    { name: "Bennett", rol: "Support", mecanica: "Aplicador Pyro off-field / buff ATK+curación", weapon_type:"Sword", rarity: 4, region: "Mondstadt", alignment_class: null, imageURL: null},
    { name: "Chongyun", rol: "Support", mecanica: "Enabler de Freeze", weapon_type:"Claymore", rarity: 4, region: "Liyue", alignment_class: null, imageURL: null},
    { name: "Diluc", rol: "Main DPS", mecanica: "Aplicador Pyro on-field", weapon_type:"Claymore", rarity: 5, region: "Mondstadt", alignment_class: null, imageURL: null},
    { name: "Fischl", rol: "Sub-DPS", mecanica: "Aplicadora Electro off-field / batería", weapon_type:"Bow", rarity: 4, region: "Mondstadt", alignment_class: "Hexerei", imageURL: null},
    { name: "Jean", rol: "Support", mecanica: "Enabler de Swirl / curación", weapon_type: "Sword", rarity: 4, region: "Mondstadt", alignment_class: null, imageURL: null},
    { name: "Kaeya", rol: "Sub-DPS", mecanica: "Aplicador Cryo on-field", weapon_type: "Sword", rarity: 4, region: "Mondstadt", alignment_class: , imageURL: null},
    { name: "Keqing", rol: "Main DPS", mecanica: "Aplicadora Electro on-field / movilidad", weapon_type: "Sword", rarity: 5, region: "Liyue", alignment_class: null, imageURL: null},
    { name: "Klee",  rol: "Main DPS", mecanica: "Aplicadora Pyro on-field / AoE", weapon_type: "Catalyst", rarity: 5, region: "Mondstadt", alignment_class: "Hexerei", imageURL: null},
    { name: "Lisa",  rol: "Sub-DPS", mecanica: "Aplicadora Electro AoE / CC", weapon_type: "Catalyst", rarity: 4, region: "Mondstadt", alignment_class: null, imageURL: null},
    { name: "Mona",  rol: "Sub-DPS", mecanica: "Aplicadora Hydro / amplificadora de daño", weapon_type: "Catalyst", rarity: 5, region: "Mondstadt", alignment_class: "Hexerei", imageURL: null},
    { name: "Ningguang", rol: "Sub-DPS", mecanica: "Aplicadora Geo / shield", weapon_type: "Catalyst", rarity: 4, region: "Liyue", alignment_class: null, imageURL: null},
    { name: "Noelle", rol: "Support", mecanica: "Aplicadora Geo / shield+curación", weapon_type: "Claymore", rarity: 4, region: "Mondstadt", alignment_class: null, imageURL: null},
    { name: "Qiqi", rol: "Healer", mecanica: "Aplicadora Cryo / curación", weapon_type: "Sword", rarity: 5, region: "Liyue", alignment_class: "Witch", imageURL: null},
    { name: "Razor", rol: "Main DPS", mecanica: "Aplicador Electro on-field", weapon_type: "Claymore", rarity: 4, region: "Mondstadt", alignment_class: "Hexerei", imageURL: null},
    { name: "Sucrose", rol: "Support", mecanica: "Enabler de Swirl / buff EM", weapon_type: "Catalyst", rarity: 4, region: "Mondstadt", alignment_class: "Hexerei", imageURL: null},
    { name: "Venti", rol: "Support", mecanica: "Enabler de Swirl / agrupamiento (CC)", weapon_type: "Bow", rarity: 5, region: "Mondstadt", alignment_class: "Hexerei", imageURL: null},
    { name: "Xiangling", rol: "Sub-DPS", mecanica: "Aplicadora Pyro off-field / Vaporize-enabler", weapon_type: "Polearm", rarity: 4, region: "Liyue", alignment_class: null, imageURL: null},
    { name: "Xingqiu", rol: "Sub-DPS", mecanica: "Aplicador Hydro off-field / Vaporize-enabler", weapon_type: "Sword", rarity: 4, region: "Liyue", alignment_class: null, imageURL: null},
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
            .values({ gameId: game.id, name: c.name })
            .returning();

        const elementoTagId = await getOrCreateTag("elemento", c.elemento);
        const rolTagId = await getOrCreateTag("rol", c.rol);
        const mecanicaTagId = await getOrCreateTag("mecanica", c.mecanica);

        await db.insert(characterTags).values([
            { characterId: character.id, tagId: elementoTagId },
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
