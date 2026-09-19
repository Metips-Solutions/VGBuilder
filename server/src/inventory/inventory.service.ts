import { fetchEnkaProfile } from "./enka.client";

/**
 * Task 2.1.1 — Integrar el endpoint público de Enka.Network.
 *
 * Actúa como proxy: el cliente le pide esto a NUESTRO servidor, nosotros
 * le pedimos a Enka (servidor a servidor, sin restricción de CORS), y
 * regresamos el resultado ya normalizado.
 *
 * TODO(Epic 2): normalizar la respuesta cruda de Enka a la forma interna
 * que espera el motor de afinidad (solo lo necesario: personajes
 * mostrados, arma, set de artefactos equipado — no substats individuales,
 * ver decisión de arquitectura sobre artefactos).
 */
export async function getInventoryByUid(uid: string) {
  const rawProfile = await fetchEnkaProfile(uid);

  // TODO(Epic 2): reemplazar con el mapeo real.
  return rawProfile;
}
