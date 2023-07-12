import { type } from "os";

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

export type RemainingCounts = {
  accent_material_item?: object;
  accent_material_on?: object;
  accent_material_rarity?: object;
  alt_material_item?: object;
  alt_material_on?: object;
  alt_material_rarity?: object;
  base_item?: object;
  base_rarity?: object;
  board?: object;
  body_item?: object;
  body_rarity?: object;
  environment?: object;
  felt_item?: object;
  felt_rarity?: object;
  head_item?: object;
  head_rarity?: object;
  main_material_item?: object;
  main_material_rarity?: object;
  pfp_file_name?: object;
  piece_color?: object;
  piece_name?: object;
  piece_type?: object;
  rarity_score?: object;
};

export type APIReturn = {
  total_records: number;
  total_pages: number;
  page: number;
  records: NFT[];
  remaining_counts: { [key: string]: { [key: string]: number } };
};
