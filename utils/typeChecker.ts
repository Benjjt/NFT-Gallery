import { NumericObject, ValidKeys } from "@/app/types";
export function isValidNumericObject(obj: NumericObject): boolean {
  console.log("object being typechecked: ", obj);
  const validKeys: string[] = [
    "br",
    "bi",
    "bor",
    "boi",
    "hr",
    "hi",
    "fr",
    "fi",
    "mmr",
    "mmi",
    "amo",
    "amr",
    "ami",
    "acmo",
    "acr",
    "acmi",
    "e",
    "b",
    "pt",
    "pc",
    "rs",
    "page",
  ];

  const isValidKey = (key: string): boolean => validKeys.includes(key);

  const isNumeric = (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  return Object.keys(obj).every(
    (key) => isValidKey(key) && isNumeric((obj as any)[key])
  );
}
