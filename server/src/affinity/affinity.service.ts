import { db } from "../shared/db/client";
import { tagAffinities, teamPresets } from "../shared/db/schema";

/**
 * OJO: este servicio NO calcula sinergia ni match. Esa lógica vive en
 * `shared/affinity-engine/` y se ejecuta en el cliente.
 *
 * Lo único que hace este módulo del backend es servir los datos que el
 * cliente necesita para poder calcular ahí (la tabla de afinidad y los
 * presets) — es una extensión de solo lectura del catálogo, específica
 * para el motor de afinidad.
 */

export async function getTagAffinityTable() {
  return db.select().from(tagAffinities);
}

export async function getTeamPresets() {
  return db.select().from(teamPresets);
}
