import { type } from "os";

export interface ValidKeys {
  base_rarity: "br";
  base_item: "bi";
  body_rarity: "bor";
  body_item: "boi";
  head_rarity: "hr";
  head_item: "hi";
  felt_rarity: "fr";
  felt_item: "fi";
  main_material_rarity: "mmr";
  main_material_item: "mmi";
  alt_material_on: "amo";
  alt_material_rarity: "amr";
  alt_material_item: "ami";
  accent_material_on: "acmo";
  accent_material_rarity: "acr";
  accent_material_item: "acmi";
  environment: "e";
  board: "b";
  piece_type: "pt";
  piece_color: "pc";
  rarity_score: "rs";
  page: "page";
}

export type NumericObject = {
  [K in ValidKeys[keyof ValidKeys]]?: number;
};
export type NFT = {
  accent_material_item?: string;
  accent_material_on?: boolean;
  accent_material_rarity?: string;
  alt_material_item?: string;
  alt_material_on?: boolean;
  alt_material_rarity?: string;
  base_item?: string;
  base_rarity?: string;
  board?: string;
  body_item?: string;
  body_rarity?: string;
  environment?: string;
  felt_item?: string;
  felt_rarity?: string;
  head_item?: string;
  head_rarity?: string;
  main_material_item?: string;
  main_material_rarity?: string;
  pfp_file_name?: string;
  piece_color?: string;
  piece_name?: string;
  piece_type?: string;
  rarity_score?: number;
  int_list?: number;
  json_id?: number;
};

export type KEYS = {
  base_rarity: string;
  base_item: string;
  body_rarity: string;
  body_item: string;
  head_rarity: string;
  head_item: string;
  felt_rarity: string;
  felt_item: string;
  main_material_rarity: string;
  main_material_item: string;
  alt_material_on: string;
  alt_material_rarity: string;
  alt_material_item: string;
  accent_material_on: string;
  accent_material_rarity: string;
  accent_material_item: string;
  environment: string;
  board: string;
  piece_type: string;
  piece_color: string;
  rarity_score: string;
};

export interface UserFilters {
  accent_material_item?: {
    [key: string]: number;
  };
  accent_material_on?: {
    [key: string]: number;
  };
  accent_material_rarity?: {
    [key: string]: number;
  };
  alt_material_item?: {
    [key: string]: number;
  };
  alt_material_on?: {
    [key: string]: number;
  };
  alt_material_rarity?: {
    [key: string]: number;
  };
  base_item?: {
    [key: string]: number;
  };
  base_rarity?: {
    [key: string]: number;
  };
  board?: {
    [key: string]: number;
  };
  body_item?: {
    [key: string]: number;
  };
  body_rarity?: {
    [key: string]: number;
  };
  environment?: {
    [key: string]: number;
  };
  felt_item?: {
    [key: string]: number;
  };
  felt_rarity?: {
    [key: string]: number;
  };
  head_item?: {
    [key: string]: number;
  };
  head_rarity?: {
    [key: string]: number;
  };
  main_material_item?: {
    [key: string]: number;
  };
  main_material_rarity?: {
    [key: string]: number;
  };
  piece_color?: {
    [key: string]: number;
  };
  piece_type?: {
    [key: string]: number;
  };
  rarity_score?: {
    [key: string]: number;
  };
  page?: number;
}

export interface RemainingCounts {
  accent_material_item?: {
    [key: string]: number[];
  };
  accent_material_on?: {
    [key: string]: number[];
  };
  accent_material_rarity?: {
    [key: string]: number[];
  };
  alt_material_item?: {
    [key: string]: number[];
  };
  alt_material_on?: {
    [key: string]: number[];
  };
  alt_material_rarity?: {
    [key: string]: number[];
  };
  base_item?: {
    [key: string]: number[];
  };
  base_rarity?: {
    [key: string]: number[];
  };
  board?: {
    [key: string]: number[];
  };
  body_item?: {
    [key: string]: number[];
  };
  body_rarity?: {
    [key: string]: number[];
  };
  environment?: {
    [key: string]: number[];
  };
  felt_item?: {
    [key: string]: number[];
  };
  felt_rarity?: {
    [key: string]: number[];
  };
  head_item?: {
    [key: string]: number[];
  };
  head_rarity?: {
    [key: string]: number[];
  };
  main_material_item?: {
    [key: string]: number[];
  };
  main_material_rarity?: {
    [key: string]: number[];
  };
  piece_color?: {
    [key: string]: number[];
  };
  piece_type?: {
    [key: string]: number[];
  };
  rarity_score?: {
    [key: string]: number[];
  };
}

export type APIReturn = {
  total_records: number;
  total_pages: number;
  page: number;
  records: NFT[];
  remaining_counts: RemainingCounts;
};
