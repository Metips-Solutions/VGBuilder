import { Elysia, t } from "elysia";
import { getInventoryFromBuildsUrl } from "./inventory.service";

export const inventoryModule = new Elysia({ prefix: "/api/inventory" })
  .post(
    "/sync-by-url",
    async ({ body, set }) => {
      try {
        const characters = await getInventoryFromBuildsUrl(body.url);

        return {
          success: true,
          count: characters.length,
          data: characters
        };
      } catch (err: any) {
        set.status = 400;
        return {
          success: false,
          message: err.message || "Error al procesar la URL de Enka"
        };
      }
    },
    {
      body: t.Object({
        url: t.String({
          error: "Debe proporcionar una URL válida de Enka"
        })
      })
    }
  );