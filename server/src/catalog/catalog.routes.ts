import { Elysia, t } from "elysia";
import * as catalogService from "./catalog.service";

const TagRef = t.Object({
  category: t.String(),
  value: t.String(),
  minConstellation: t.Optional(t.Nullable(t.Number())),
  minAlignmentCount: t.Optional(t.Nullable(t.Number())),
});

const NeedRef = t.Object({
  value: t.String(),
  priority: t.Number(),
});

const AntiTagRef = t.Object({
  value: t.String(),
  reason: t.Optional(t.Nullable(t.String())),
});

const Character = t.Object({
  id: t.String(),
  name: t.String(),
  element: t.String(),
  weaponType: t.String(),
  rarity: t.Number(),
  region: t.String(),
  alignmentClass: t.Nullable(t.String()),
  damageProfile: t.Optional(t.Nullable(t.String())),
  imageUrl: t.Nullable(t.String()),
  description: t.Nullable(t.String()),
  tags: t.Array(TagRef),
  needs: t.Optional(t.Array(NeedRef)),
  antiTags: t.Optional(t.Array(AntiTagRef)),
});

export const catalogModule = new Elysia({ prefix: "/catalog" }).get(
  "/characters",
  async () => catalogService.getCharactersWithTags(),
  { response: t.Array(Character) }
);
