import { Elysia, t } from "elysia";
import * as affinityService from "./affinity.service";

const MatchInputSchema = t.Object({
  targetCharacterId: t.Numeric(),
  inventory: t.Array(
    t.Object({
      characterId: t.Numeric(),
      constellation: t.Optional(t.Numeric()),
    })
  ),
  blacklist: t.Optional(t.Array(t.Numeric())),
});

export const affinityModule = new Elysia({ prefix: "/affinity" })
  .get("/tag-affinities", async () => affinityService.getTagAffinityTable())
  .get("/presets", async () => affinityService.getTeamPresets())
  .get("/support-artifacts", async () => affinityService.getSupportArtifacts())
  .get("/character-artifact-sets", async () => affinityService.getCharacterArtifactSets())
  .post(
    "/match",
    async ({ body }) => {
      return affinityService.calculateMatch({
        targetCharacterId: Number(body.targetCharacterId),
        inventory: body.inventory.map((item) => ({
          characterId: Number(item.characterId),
          constellation:
            item.constellation !== undefined ? Number(item.constellation) : 0,
        })),
        blacklist: body.blacklist?.map(Number),
      });
    },
    {
      body: MatchInputSchema,
    }
  );
