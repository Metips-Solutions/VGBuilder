import { Elysia } from "elysia";
import * as affinityService from "./affinity.service";

export const affinityModule = new Elysia({ prefix: "/affinity" })
  .get("/tag-affinities", async () => affinityService.getTagAffinityTable())
  .get("/presets", async () => affinityService.getTeamPresets())
  .get("/support-artifacts", async () => affinityService.getSupportArtifacts())
  .get("/character-artifact-sets", async () => affinityService.getCharacterArtifactSets());
