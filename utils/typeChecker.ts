import { NFT } from "../app/types";

function isNFT(obj: any): obj is NFT {
  const keys: (keyof NFT)[] = [
    "accent_material_item",
    "accent_material_on",
    "accent_material_rarity",
    "alt_material_item",
    "alt_material_on",
    "alt_material_rarity",
    "base_item",
    "base_rarity",
    "board",
    "body_item",
    "body_rarity",
    "environment",
    "felt_item",
    "felt_rarity",
    "head_item",
    "head_rarity",
    "main_material_item",
    "main_material_rarity",
    "pfp_file_name",
    "piece_color",
    "piece_name",
    "piece_type",
    "rarity_score",
    "int_list",
    "json_id",
  ];

  return keys.every(
    (key) => obj[key] === undefined || typeof obj[key] === typeof {}[key]
  );
}
