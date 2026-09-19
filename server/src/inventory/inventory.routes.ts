import { Elysia, t } from "elysia";
import * as inventoryService from "./inventory.service";

export const inventoryModule = new Elysia({ prefix: "/inventory" }).get(
  "/:uid",
  async ({ params }) => inventoryService.getInventoryByUid(params.uid),
  {
    params: t.Object({ uid: t.String() }),
  }
);
