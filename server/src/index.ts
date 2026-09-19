import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { catalogModule } from "./catalog/catalog.routes";
import { inventoryModule } from "./inventory/inventory.routes";
import { affinityModule } from "./affinity/affinity.routes";

const port = Number(process.env.PORT ?? 3000);

const app = new Elysia()
  .use(cors()) // TODO: acotar orígenes permitidos antes de producción
  .get("/", () => ({ status: "ok", service: "vgbuilder-server" }))
  .use(catalogModule)
  .use(inventoryModule)
  .use(affinityModule)
  .listen(port);

console.log(
  `🦊 VGBuilder server corriendo en http://${app.server?.hostname}:${app.server?.port}`
);
