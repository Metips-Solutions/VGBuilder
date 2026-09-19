/**
 * Adaptador aislado hacia la API pública de Enka.Network (Task 2.1.2).
 *
 * Toda llamada externa a Enka pasa por aquí. Si Enka cambia su forma de
 * respuesta o su URL, el cambio se hace en este único archivo.
 *
 * PENDIENTE DE PROBAR: si Enka permite CORS desde el navegador, el
 * frontend puede llamarlo directo y este archivo (y el proxy en
 * inventory.service.ts) dejan de ser necesarios. Hasta confirmar eso,
 * dejamos el proxy armado como plan seguro.
 */

const ENKA_BASE_URL = "https://enka.network/api/uid";

export async function fetchEnkaProfile(uid: string): Promise<unknown> {
  const response = await fetch(`${ENKA_BASE_URL}/${uid}`);

  if (!response.ok) {
    throw new Error(`Enka respondió con status ${response.status}`);
  }

  return response.json();
}
