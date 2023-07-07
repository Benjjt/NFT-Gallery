import { type } from "os";

export type NFT = {
  accent_material_item: string;
  accent_material_on: boolean;
  accent_material_rarity: string;
  alt_material_item: string;
  alt_material_on: boolean;
  alt_material_rarity: string;
  base_item: string;
  base_rarity: string;
  board: string;
  body_item: string;
  body_rarity: string;
  environment: string;
  felt_item: string;
  felt_rarity: string;
  head_item: string;
  head_rarity: string;
  main_material_item: string;
  main_material_rarity: string;
  pfp_file_name: string;
  piece_color: string;
  piece_name: string;
  piece_type: string;
  rarity_score: number;
};

export type APIReturn = {
  total_records: number;
  total_pages: number;
  page: number;
  records: NFT[];
  remaining_counts: object;
};

export interface canverseRarity {
  FilterTitle: "Rarity";
  RarityFilters: {
    BaseRarity: "common" | "rare" | "epic" | "legendary";
    BodyRarity: "common" | "rare" | "epic" | "legendary";
    HeadRarity: "common" | "rare" | "epic" | "legendary";
    FeltRarity: "common" | "rare" | "epic" | "legendary";
    MainMaterialRarity: "common" | "rare" | "epic" | "legendary";
    AltMaterialRarity: "common" | "rare" | "epic" | "legendary";
    AccentMaterialRarity: "common" | "rare" | "epic" | "legendary";
  };
}

export interface canverseItems {
  BaseItem: string;
  BodyItem: string;
  HeadItem: string;
  FeltItem: string;
  MainMaterialItem: string;
  AltMaterialItem: string;
  AccentMaterialItem: string;
}

export interface canversePieceType {
  PieceType: string;
}

export interface canverseEnvironment {
  Environment: string;
}
