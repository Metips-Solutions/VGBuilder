import { Elysia } from "elysia";
import * as catalogService from "./catalog.service";

export const catalogModule = new Elysia({ prefix: "/catalog" }).get(
  "/characters",
  async () => catalogService.getCharactersWithTags()
);
