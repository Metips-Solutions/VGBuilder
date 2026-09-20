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
    mecanica: string;
};

const ROSTER: CharacterSeed[] = [
    { name: "Amber", elemento: "Pyro", rol: "Support", mecanica: "Aplicador Pyro off-field" },
    { name: "Barbara", elemento: "Hydro", rol: "Healer", mecanica: "Aplicadora Hydro / curación" },
    { name: "Beidou", elemento: "Electro", rol: "Sub-DPS", mecanica: "Aplicadora Electro on-field / shield" },
    { name: "Bennett", elemento: "Pyro", rol: "Support", mecanica: "Aplicador Pyro off-field / buff ATK+curación" },
    { name: "Chongyun", elemento: "Cryo", rol: "Support", mecanica: "Enabler de Freeze" },
    { name: "Diluc", elemento: "Pyro", rol: "Main DPS", mecanica: "Aplicador Pyro on-field" },
    { name: "Fischl", elemento: "Electro", rol: "Sub-DPS", mecanica: "Aplicadora Electro off-field / batería" },
    { name: "Jean", elemento: "Anemo", rol: "Support", mecanica: "Enabler de Swirl / curación" },
    { name: "Kaeya", elemento: "Cryo", rol: "Sub-DPS", mecanica: "Aplicador Cryo on-field" },
    { name: "Keqing", elemento: "Electro", rol: "Main DPS", mecanica: "Aplicadora Electro on-field / movilidad" },
    { name: "Klee", elemento: "Pyro", rol: "Main DPS", mecanica: "Aplicadora Pyro on-field / AoE" },
    { name: "Lisa", elemento: "Electro", rol: "Sub-DPS", mecanica: "Aplicadora Electro AoE / CC" },
    { name: "Mona", elemento: "Hydro", rol: "Sub-DPS", mecanica: "Aplicadora Hydro / amplificadora de daño" },
    { name: "Ningguang", elemento: "Geo", rol: "Sub-DPS", mecanica: "Aplicadora Geo / shield" },
    { name: "Noelle", elemento: "Geo", rol: "Support", mecanica: "Aplicadora Geo / shield+curación" },
    { name: "Qiqi", elemento: "Cryo", rol: "Healer", mecanica: "Aplicadora Cryo / curación" },
    { name: "Razor", elemento: "Electro", rol: "Main DPS", mecanica: "Aplicador Electro on-field" },
    { name: "Sucrose", elemento: "Anemo", rol: "Support", mecanica: "Enabler de Swirl / buff EM" },
    { name: "Venti", elemento: "Anemo", rol: "Support", mecanica: "Enabler de Swirl / agrupamiento (CC)" },
    { name: "Xiangling", elemento: "Pyro", rol: "Sub-DPS", mecanica: "Aplicadora Pyro off-field / Vaporize-enabler" },
    { name: "Xingqiu", elemento: "Hydro", rol: "Sub-DPS", mecanica: "Aplicador Hydro off-field / Vaporize-enabler" },
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
